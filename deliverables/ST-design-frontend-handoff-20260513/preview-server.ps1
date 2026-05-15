param(
  [switch] $Server,
  [string] $Root,
  [int] $Port
)

$ErrorActionPreference = 'Stop'
$Marker = 'ST_DESIGN_HANDOFF_PREVIEW_20260513'

function Show-Message {
  param([string] $Message)
  try {
    Add-Type -AssemblyName System.Windows.Forms | Out-Null
    [System.Windows.Forms.MessageBox]::Show($Message, 'ST-design Preview') | Out-Null
  } catch {
    Write-Host $Message
  }
}

function Get-Content-Type {
  param([string] $Path)
  switch ([IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    '.html' { 'text/html; charset=utf-8'; break }
    '.js' { 'text/javascript; charset=utf-8'; break }
    '.mjs' { 'text/javascript; charset=utf-8'; break }
    '.css' { 'text/css; charset=utf-8'; break }
    '.json' { 'application/json; charset=utf-8'; break }
    '.svg' { 'image/svg+xml'; break }
    '.png' { 'image/png'; break }
    '.jpg' { 'image/jpeg'; break }
    '.jpeg' { 'image/jpeg'; break }
    '.gif' { 'image/gif'; break }
    '.ico' { 'image/x-icon'; break }
    '.woff' { 'font/woff'; break }
    '.woff2' { 'font/woff2'; break }
    '.ttf' { 'font/ttf'; break }
    '.map' { 'application/json; charset=utf-8'; break }
    default { 'application/octet-stream' }
  }
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream] $Stream,
    [string] $Status,
    [string] $ContentType,
    [byte[]] $Body
  )
  $header = "HTTP/1.1 $Status`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n"
  $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

function Start-StaticServer {
  param([string] $ServerRoot, [int] $ListenPort)

  $rootFull = [IO.Path]::GetFullPath($ServerRoot)
  if (-not $rootFull.EndsWith([IO.Path]::DirectorySeparatorChar)) {
    $rootFull += [IO.Path]::DirectorySeparatorChar
  }

  $listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Parse('127.0.0.1'), $ListenPort)
  $listener.Start()

  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $buffer = New-Object byte[] 8192
      $read = $stream.Read($buffer, 0, $buffer.Length)
      if ($read -le 0) {
        continue
      }

      $request = [Text.Encoding]::ASCII.GetString($buffer, 0, $read)
      $firstLine = ($request -split "`r?`n")[0]
      $parts = $firstLine -split ' '
      if ($parts.Length -lt 2 -or $parts[0] -ne 'GET') {
        Send-Response $stream '405 Method Not Allowed' 'text/plain; charset=utf-8' ([Text.Encoding]::UTF8.GetBytes('Method Not Allowed'))
        continue
      }

      $path = ($parts[1] -split '\?')[0]
      $path = [Uri]::UnescapeDataString($path)
      if ([string]::IsNullOrWhiteSpace($path) -or $path -eq '/') {
        $path = '/index.html'
      }

      if ($path -eq '/__st_preview_marker.txt') {
        Send-Response $stream '200 OK' 'text/plain; charset=utf-8' ([Text.Encoding]::UTF8.GetBytes($Marker))
        continue
      }

      $relativePath = $path.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar)
      $fullPath = [IO.Path]::GetFullPath([IO.Path]::Combine($rootFull, $relativePath))

      if (-not $fullPath.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
        Send-Response $stream '403 Forbidden' 'text/plain; charset=utf-8' ([Text.Encoding]::UTF8.GetBytes('Forbidden'))
        continue
      }

      if (-not (Test-Path $fullPath -PathType Leaf)) {
        Send-Response $stream '404 Not Found' 'text/plain; charset=utf-8' ([Text.Encoding]::UTF8.GetBytes('Not Found'))
        continue
      }

      $bytes = [IO.File]::ReadAllBytes($fullPath)
      Send-Response $stream '200 OK' (Get-Content-Type $fullPath) $bytes
    } catch {
      try {
        Send-Response $stream '500 Internal Server Error' 'text/plain; charset=utf-8' ([Text.Encoding]::UTF8.GetBytes('Internal Server Error'))
      } catch {
      }
    } finally {
      $client.Close()
    }
  }
}

function Test-PreviewServer {
  param([int] $TestPort)
  try {
    $response = Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 -Uri "http://127.0.0.1:$TestPort/__st_preview_marker.txt"
    return ($response.Content -eq $Marker)
  } catch {
    return $false
  }
}

function Test-PortOpen {
  param([int] $TestPort)
  $client = New-Object Net.Sockets.TcpClient
  try {
    $async = $client.BeginConnect('127.0.0.1', $TestPort, $null, $null)
    if (-not $async.AsyncWaitHandle.WaitOne(200, $false)) {
      return $false
    }
    $client.EndConnect($async)
    return $true
  } catch {
    return $false
  } finally {
    $client.Close()
  }
}

if ($Server) {
  Start-StaticServer -ServerRoot $Root -ListenPort $Port
  exit 0
}

$packageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ports = 8012..8020
$selectedPort = $null

foreach ($candidate in $ports) {
  if (Test-PreviewServer $candidate) {
    $selectedPort = $candidate
    break
  }

  if (-not (Test-PortOpen $candidate)) {
    $selectedPort = $candidate
    $argumentLine = "-NoProfile -ExecutionPolicy Bypass -File `"$($MyInvocation.MyCommand.Path)`" -Server -Root `"$packageRoot`" -Port $candidate"
    Start-Process -FilePath 'powershell.exe' -WindowStyle Hidden -ArgumentList $argumentLine
    break
  }
}

if ($null -eq $selectedPort) {
  Show-Message 'No available preview port was found. Please close an old preview window or restart the computer, then try again.'
  exit 1
}

$ready = $false
for ($i = 0; $i -lt 40; $i++) {
  if (Test-PreviewServer $selectedPort) {
    $ready = $true
    break
  }
  Start-Sleep -Milliseconds 250
}

if (-not $ready) {
  Show-Message 'Preview server failed to start. Please try Start-Preview-Windows.cmd, or ask the frontend developer to start source project.'
  exit 1
}

Start-Process "http://127.0.0.1:$selectedPort/preview/index.html#/auth/login"

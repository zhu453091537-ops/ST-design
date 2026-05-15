@echo off
setlocal
set "ROOT=%~dp0"
start "" powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%ROOT%preview-server.ps1"
exit /b 0

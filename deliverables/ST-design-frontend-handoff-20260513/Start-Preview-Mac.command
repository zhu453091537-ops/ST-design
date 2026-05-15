#!/bin/bash

set -e

cd "$(dirname "$0")"

PYTHON_BIN="$(command -v python3 || true)"

if [ -z "${PYTHON_BIN}" ]; then
  osascript -e 'display alert "ST-design Preview" message "未找到 python3，无法启动本地预览服务。请使用 source 源码项目启动。"'
  exit 1
fi

PORT=""
for candidate in 8012 8013 8014 8015 8016 8017 8018 8019 8020; do
  if curl -fs "http://127.0.0.1:${candidate}/__st_preview_marker.txt" 2>/dev/null | grep -q "ST_DESIGN_HANDOFF_PREVIEW_20260513"; then
    PORT="${candidate}"
    break
  fi
  if ! lsof -iTCP:"${candidate}" -sTCP:LISTEN >/dev/null 2>&1; then
    PORT="${candidate}"
    break
  fi
done

if [ -z "${PORT}" ]; then
  osascript -e 'display alert "ST-design Preview" message "未找到可用预览端口，请关闭旧预览后重试。"'
  exit 1
fi

URL="http://127.0.0.1:${PORT}/preview/index.html#/auth/login"
LOG_FILE="/tmp/st-design-handoff-preview-${PORT}.log"

if ! curl -fs "http://127.0.0.1:${PORT}/__st_preview_marker.txt" 2>/dev/null | grep -q "ST_DESIGN_HANDOFF_PREVIEW_20260513"; then
  nohup "${PYTHON_BIN}" -m http.server "${PORT}" --bind 127.0.0.1 >"${LOG_FILE}" 2>&1 &
  for _ in {1..30}; do
    if curl -sf "http://127.0.0.1:${PORT}/preview/index.html" >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

open -a Safari "${URL}" >/dev/null 2>&1 || open "${URL}" >/dev/null 2>&1 || true

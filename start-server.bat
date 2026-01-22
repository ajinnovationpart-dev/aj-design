@echo off
chcp 65001 >nul
echo ========================================
echo AJ네트웍스 디자인 시스템 서버 시작 중...
echo ========================================
echo.
node start-server.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 서버 시작에 실패했습니다.
    pause
)

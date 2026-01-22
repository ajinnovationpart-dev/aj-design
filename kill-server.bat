@echo off
chcp 65001 >nul
echo 포트 3000을 사용하는 프로세스를 찾는 중...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo 프로세스 %%a 종료 중...
    taskkill /F /PID %%a >nul 2>&1
)
echo 완료!
timeout /t 2 >nul

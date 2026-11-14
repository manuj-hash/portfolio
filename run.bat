@echo off
title MANUJ DIGITAL ENVIRONMENT // DEV SERVER
cd /d "%~dp0"

echo ========================================================
echo   MANUJ DIGITAL ENVIRONMENT // LOCAL WORKSPACE
echo ========================================================
echo   [1] Launching Vite development server at http://localhost:5173
echo   [2] Opening your default browser in 2 seconds...
echo   (Press Ctrl+C in this window anytime to stop the server)
echo ========================================================
echo.

start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5173"
call npm.cmd run dev
pause

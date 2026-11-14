@echo off
title MANUJ DIGITAL ENVIRONMENT // PRODUCTION PREVIEW
cd /d "%~dp0"

echo ========================================================
echo   MANUJ DIGITAL ENVIRONMENT // COMPILED PREVIEW
echo ========================================================
echo   [1] Starting production preview server at http://localhost:4173
echo   [2] Opening your default browser in 2 seconds...
echo   (Press Ctrl+C in this window anytime to stop the server)
echo ========================================================
echo.

start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:4173"
call npm.cmd run preview
pause

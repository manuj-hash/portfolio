@echo off
title MANUJ DIGITAL ENVIRONMENT // PRODUCTION PREVIEW
echo ========================================================
echo   PREVIEWING COMPILED MANUJ DIGITAL ENVIRONMENT...
echo   Local URL: http://localhost:4173
echo ========================================================
echo.

start http://localhost:4173
npm run preview
pause

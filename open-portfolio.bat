@echo off
title MANUJ DIGITAL ENVIRONMENT // INSTANT LAUNCHER
cd /d "%~dp0"

echo ========================================================
echo   OPENING MANUJ DIGITAL ENVIRONMENT INSTANTLY...
echo ========================================================
echo   Launching standalone portfolio in your default browser...
echo.

start "" "%~dp0index-standalone.html"
exit

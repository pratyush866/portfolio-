@echo off
echo ========================================================
echo   Pushing Pratyush Portfolio to GitHub (main branch)...
echo ========================================================
cd /d "%~dp0"
git push -u origin main
echo.
echo ========================================================
echo   Push Completed! Press any key to exit.
echo ========================================================
pause

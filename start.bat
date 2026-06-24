@echo off
REM Script de démarrage ISPA Form System (Windows)

echo.
echo 🚀 Demarrage du systeme de formulaire ISPA...
echo.

REM Verifier si Node.js est installe
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js n'est pas installe. Visitez https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js trouve: %NODE_VERSION%
echo.

REM Verifier si npm install est necessaire
if not exist "node_modules" (
    echo 📦 Installation des dependances...
    call npm install
    echo.
)

echo ✅ Dependances prete
echo.
echo 🎯 Demarrage du serveur...
echo 📍 Ouvrir: http://localhost:3000
echo.

call npm start
pause

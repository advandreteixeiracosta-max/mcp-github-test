@echo off
REM Script para iniciar o servidor de desenvolvimento Word Frequency

echo.
echo ============================================================
echo  Word Frequency Analyzer - Dev Server
echo ============================================================
echo.

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo [*] node_modules nao encontrado
    echo [*] Instalando dependencias...
    call npm install --force
    if errorlevel 1 (
        echo [ERROR] Falha ao instalar dependencias
        echo [INFO] Consulte SETUP_TROUBLESHOOTING.md para solucoes
        pause
        exit /b 1
    )
)

REM Verificar se vite está instalado
if not exist "node_modules\vite" (
    echo [*] Vite nao encontrado, instalando...
    call npm install vite --force
    if errorlevel 1 (
        echo [ERROR] Falha ao instalar vite
        pause
        exit /b 1
    )
)

echo [OK] Iniciando servidor de desenvolvimento...
echo.
echo [INFO] Abra no navegador: http://localhost:5173
echo [INFO] Aperte Ctrl+C para parar o servidor
echo.

REM Tentar npx vite como fallback
npx vite

pause

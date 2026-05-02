# Script para iniciar o servidor de desenvolvimento Word Frequency

Write-Host ""
Write-Host "============================================================"
Write-Host " Word Frequency Analyzer - Dev Server"
Write-Host "============================================================"
Write-Host ""

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "[*] node_modules nao encontrado"
    Write-Host "[*] Instalando dependencias..."
    & npm install --force
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Falha ao instalar dependencias"
        Write-Host "[INFO] Consulte SETUP_TROUBLESHOOTING.md para solucoes"
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

# Verificar se vite está instalado
if (-not (Test-Path "node_modules\vite")) {
    Write-Host "[*] Vite nao encontrado, instalando..."
    & npm install vite --force
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Falha ao instalar vite"
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

Write-Host "[OK] Iniciando servidor de desenvolvimento..."
Write-Host ""
Write-Host "[INFO] Abra no navegador: http://localhost:5173"
Write-Host "[INFO] Aperte Ctrl+C para parar o servidor"
Write-Host ""

# Tentar npx vite
& npx vite

Read-Host "Pressione Enter para sair"

# Script para iniciar desenvolvimento com Yarn
# Copie este arquivo para a raiz do projeto e execute:
# PowerShell -ExecutionPolicy Bypass -File .\dev.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Word Frequency Analyzer - Dev Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "[*] Instalando dependencias com Yarn..." -ForegroundColor Yellow
    npx yarn install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[!] Erro ao instalar. Verifique sua conexao." -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

Write-Host ""
Write-Host "[OK] Iniciando servidor de desenvolvimento..." -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Local:   http://localhost:5173/" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Dicas:" -ForegroundColor Cyan
Write-Host "  - Abra http://localhost:5173 no navegador" -ForegroundColor Cyan
Write-Host "  - Pressione Ctrl+C para parar o servidor" -ForegroundColor Cyan
Write-Host "  - Mudancas no codigo sao refletidas automaticamente (HMR)" -ForegroundColor Cyan
Write-Host ""

# Iniciar servidor
npx yarn dev

Read-Host "Pressione Enter para sair"

# Push H-vard-Farm til https://github.com/aicodeai50/H-vard-Farm
# Kjør dette scriptet ETTER at du er logget inn som aicodeai50 på GitHub.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== Push til aicodeai50/H-vard-Farm ===" -ForegroundColor Cyan
Write-Host "Repo: https://github.com/aicodeai50/H-vard-Farm.git"
Write-Host ""

git remote set-url origin https://github.com/aicodeai50/H-vard-Farm.git
git branch -M main

Write-Host "Pusher main ..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "OK — GitHub skal nå vise website/, docs/, README.md" -ForegroundColor Green
    Write-Host "https://github.com/aicodeai50/H-vard-Farm"
} else {
    Write-Host ""
    Write-Host "Push feilet. Logg inn som aicodeai50:" -ForegroundColor Red
    Write-Host "  1. https://github.com/settings/tokens → New token (classic) → scope: repo"
    Write-Host "  2. Kjor push igjen — bruk aicodeai50 som brukernavn og TOKEN som passord"
    Write-Host ""
    Write-Host "Eller importer fra backup:" -ForegroundColor Yellow
    Write-Host "  https://github.com/havard50/H-vard-Farm (hvis du eier begge kontoer)"
}

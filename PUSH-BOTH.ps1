# Push til BEGGE GitHub-kontoer
#   https://github.com/aicodeai50/H-vard-Farm
#   https://github.com/havard50/H-vard-Farm
#
# Kjor i PowerShell (ikke i Cursor-agent) sa du kan logge inn nar Git spor.

$ErrorActionPreference = "Continue"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=== 1/2 Push: havard50/H-vard-Farm ===" -ForegroundColor Cyan
git push "https://havard50@github.com/havard50/H-vard-Farm.git" main
$ok1 = ($LASTEXITCODE -eq 0)

Write-Host ""
Write-Host "=== 2/2 Push: aicodeai50/H-vard-Farm ===" -ForegroundColor Cyan
Write-Host "(Logg inn som aicodeai50 om du blir spurt — token med scope repo som passord)"
git push "https://aicodeai50@github.com/aicodeai50/H-vard-Farm.git" main
$ok2 = ($LASTEXITCODE -eq 0)

Write-Host ""
if ($ok1 -and $ok2) {
    Write-Host "OK — begge repos er oppdatert." -ForegroundColor Green
    Write-Host "  https://github.com/havard50/H-vard-Farm"
    Write-Host "  https://github.com/aicodeai50/H-vard-Farm"
} elseif ($ok1) {
    Write-Host "havard50 OK. aicodeai50 feilet — kjør linjen under på nytt etter innlogging:" -ForegroundColor Yellow
    Write-Host '  git push "https://aicodeai50@github.com/aicodeai50/H-vard-Farm.git" main'
} elseif ($ok2) {
    Write-Host "aicodeai50 OK. havard50 feilet." -ForegroundColor Yellow
} else {
    Write-Host "Begge feilet — sjekk innlogging / token." -ForegroundColor Red
}

# Valgfritt: token fra miljovariabel (ikke lagre i fil)
if (-not $ok2 -and $env:GITHUB_TOKEN_AICODEAI50) {
    Write-Host ""
    Write-Host "Prover aicodeai50 med GITHUB_TOKEN_AICODEAI50 ..." -ForegroundColor Yellow
    git push "https://aicodeai50:$($env:GITHUB_TOKEN_AICODEAI50)@github.com/aicodeai50/H-vard-Farm.git" main
}

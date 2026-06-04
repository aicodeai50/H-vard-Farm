# Push til aicodeai50/H-vard-Farm

Koden ligger **lokalt** og ble tidligere pushet til `havard50/H-vard-Farm` (feil konto).  
GitHub-repoet ditt er: **https://github.com/aicodeai50/H-vard-Farm**

## Hvorfor GitHub ser «tomt» ut

Push må gjøres med en konto som har tilgang til **aicodeai50** (privat repo).  
Denne PC-en er logget inn som en annen GitHub-bruker, derfor feilet automatisk push.

## Løsning — kjør i PowerShell (som aicodeai50)

```powershell
cd "c:\Users\sandr\OneDrive\Documents\Håvard-Farm"

git remote set-url origin https://github.com/aicodeai50/H-vard-Farm.git

git push -u origin main
```

Ved første push: logg inn med **aicodeai50** (browser eller Personal Access Token).

### Personal Access Token (anbefalt)

1. GitHub → **Settings → Developer settings → Personal access tokens**
2. **Generate new token (classic)** — scope: `repo`
3. Ved passord-prompt: lim inn token (ikke passordet)

```powershell
git push -u origin main
```

## Etter vellykket push

Du skal se bl.a.:

- `README.md`
- `website/` (hele nettsiden)
- `docs/` (brief)

Deretter: **Railway** → Deploy from GitHub → `aicodeai50/H-vard-Farm` → Root Directory: `website`

## Valgfritt: begge remotes

```powershell
git remote add havard50 https://github.com/havard50/H-vard-Farm.git
git push havard50 main
```

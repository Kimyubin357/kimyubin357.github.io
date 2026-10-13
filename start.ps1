$ErrorActionPreference = 'Stop'
$portfolioPythonCandidates = @(
    (Join-Path $PSScriptRoot '.venv\Scripts\python.exe'),
    (Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe')
)
$portfolioPython = $portfolioPythonCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if ($portfolioPython) {
    & $portfolioPython (Join-Path $PSScriptRoot 'serve.py')
    exit $LASTEXITCODE
}
if (Get-Command py -ErrorAction SilentlyContinue) {
    & py -3 (Join-Path $PSScriptRoot 'serve.py')
    exit $LASTEXITCODE
}
if (Get-Command python -ErrorAction SilentlyContinue) {
    & python (Join-Path $PSScriptRoot 'serve.py')
    exit $LASTEXITCODE
}
Write-Host 'Python 3 is required. Install Python or open index.html directly.'
exit 1

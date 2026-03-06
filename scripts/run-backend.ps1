$py = "$env:LocalAppData\Programs\Python\Python312\python.exe"
if (-not (Test-Path $py)) {
  Write-Host "Python not found at: $py" -ForegroundColor Red
  exit 1
}

Set-Location "d:/protfolio/protfolio/backend/python-api"
& $py -m uvicorn main:app --reload --port 8000

$ErrorActionPreference = "Stop"

# ✅ URLs RAW correctes (pas de /blob/)
$GATEWAY_SPEC_URL  = "https://raw.githubusercontent.com/jeanElossy/api-gateway/main/api-gateway/docs/openapi.yaml"
$INTERNAL_SPEC_URL = "https://raw.githubusercontent.com/jeanElossy/api-paynoval/main/docs/openapi.yaml"

New-Item -ItemType Directory -Path "specs" -Force | Out-Null

Write-Host "Downloading Gateway spec..."
Invoke-WebRequest -Uri $GATEWAY_SPEC_URL -OutFile "specs/gateway.yaml"

Write-Host "Downloading Internal spec..."
Invoke-WebRequest -Uri $INTERNAL_SPEC_URL -OutFile "specs/internal.yaml"

Write-Host ""
Write-Host "Specs fetched:"
Get-ChildItem specs/*.yaml | ForEach-Object {
  $lines = (Get-Content $_.FullName | Measure-Object -Line).Lines
  Write-Host ("{0}  ->  {1} lines" -f $_.Name, $lines)
}

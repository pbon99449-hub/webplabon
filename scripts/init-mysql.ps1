param(
  [string]$MySqlUser = "root",
  [string]$MySqlHost = "127.0.0.1",
  [string]$SchemaPath = "d:/protfolio/protfolio/backend/schema.mysql.sql"
)

Write-Host "Initializing MySQL database portfolio_db..."

$cmd = @"
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;
SOURCE $SchemaPath;
"@

$cmd | mysql -h $MySqlHost -u $MySqlUser -p

if ($LASTEXITCODE -eq 0) {
  Write-Host "MySQL schema applied successfully."
} else {
  Write-Host "MySQL initialization failed." -ForegroundColor Red
  exit 1
}

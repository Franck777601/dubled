param()

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Google Sheets ISPA CRM - Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Copier le code dans le presse-papiers
Write-Host "Copying Apps Script code..." -ForegroundColor Yellow
$gsCode = Get-Content ".\crm_export\create_ispa_crm.gs" -Raw
$gsCode | Set-Clipboard
Write-Host "Done!" -ForegroundColor Green
Write-Host ""

# Ouvrir Google Apps Script
Write-Host "Opening Google Apps Script..." -ForegroundColor Yellow
Start-Process "https://script.google.com/"
Write-Host ""

Write-Host "MANUAL STEPS REQUIRED:" -ForegroundColor Cyan
Write-Host "1. Sign in to Google (if needed)" 
Write-Host "2. Click on '+ New project'"
Write-Host "3. Paste the code (Ctrl+V)"
Write-Host "4. Click 'Run' and select 'createISPAcrm'"
Write-Host "5. Authorize permissions"
Write-Host "6. Click Deployments (top left)"
Write-Host "7. Click '+ New Deployment'"
Write-Host "8. Select Type: 'Web app'"
Write-Host "9. Execute as: Your Google account"
Write-Host "10. Who has access: 'Anyone with the URL'"
Write-Host "11. Click 'Deploy'"
Write-Host "12. Copy the deployment URL"
Write-Host ""

$url = Read-Host "Paste the deployment URL here"

Write-Host ""
Write-Host "Creating .env file..." -ForegroundColor Yellow

$envContent = "WHATSAPP_PHONE=15559707710`nPORT=3000`nNODE_ENV=development`nGOOGLE_APPS_SCRIPT_URL=$url"
$envContent | Out-File ".env" -Encoding UTF8

Write-Host "Done!" -ForegroundColor Green
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "SUCCESS!" -ForegroundColor Green
Write-Host "Run: npm start" -ForegroundColor Cyan

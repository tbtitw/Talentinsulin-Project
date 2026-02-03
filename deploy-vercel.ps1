# Vercel Deployment Script for Windows
# Run with: powershell -ExecutionPolicy Bypass -File deploy-vercel.ps1

Write-Host "🚀 Talentinsulin - Vercel Deployment" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Pre-deployment checklist:" -ForegroundColor Yellow
Write-Host "- [ ] MongoDB Atlas cluster created"
Write-Host "- [ ] Environment variables prepared"
Write-Host "- [ ] Code pushed to Git repository"
Write-Host ""

$checklist = Read-Host "Have you completed the checklist? (y/n)"

if ($checklist -ne "y" -and $checklist -ne "Y") {
    Write-Host "❌ Please complete the checklist first" -ForegroundColor Red
    Write-Host "📚 See DEPLOY_CHECKLIST.md for details" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🔑 You'll need these environment variables:" -ForegroundColor Yellow
Write-Host "1. MONGODB_URI - Your MongoDB Atlas connection string"
Write-Host "2. JWT_SECRET - A secure random string (min 32 chars)"
Write-Host "3. NODE_ENV - Set to 'production'"
Write-Host ""
Write-Host "💡 Generate JWT_SECRET with:" -ForegroundColor Cyan
Write-Host "   node -e `"console.log(require('crypto').randomBytes(32).toString('hex'))`"" -ForegroundColor Gray
Write-Host ""

$envVars = Read-Host "Do you have all environment variables ready? (y/n)"

if ($envVars -ne "y" -and $envVars -ne "Y") {
    Write-Host "❌ Please prepare environment variables first" -ForegroundColor Red
    Write-Host "📚 See VERCEL_ENV_VARS.md for details" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🚀 Starting deployment..." -ForegroundColor Cyan
Write-Host ""

# Login to Vercel
Write-Host "Step 1: Vercel login" -ForegroundColor Yellow
vercel login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Login failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Deploy to Vercel" -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Write-Host "📚 Check DEPLOYMENT.md for troubleshooting" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅ Deployment successful!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Add environment variables in Vercel Dashboard"
Write-Host "2. Go to: https://vercel.com/dashboard"
Write-Host "3. Select your project → Settings → Environment Variables"
Write-Host "4. Add: MONGODB_URI, JWT_SECRET, NODE_ENV"
Write-Host "5. Redeploy (automatic after adding env vars)"
Write-Host ""
Write-Host "📚 Full guide: VERCEL_ENV_VARS.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Your app will be live at your Vercel URL!" -ForegroundColor Green

#!/bin/bash
# Vercel Deployment Script
# Run with: bash deploy-vercel.sh

echo "🚀 Talentinsulin - Vercel Deployment"
echo "======================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI found"
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo "- [ ] MongoDB Atlas cluster created"
echo "- [ ] Environment variables prepared"
echo "- [ ] Code pushed to Git repository"
echo ""

read -p "Have you completed the checklist? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please complete the checklist first"
    echo "📚 See DEPLOY_CHECKLIST.md for details"
    exit 1
fi

echo ""
echo "🔑 You'll need these environment variables:"
echo "1. MONGODB_URI - Your MongoDB Atlas connection string"
echo "2. JWT_SECRET - A secure random string (min 32 chars)"
echo "3. NODE_ENV - Set to 'production'"
echo ""
echo "💡 Generate JWT_SECRET with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
echo ""

read -p "Do you have all environment variables ready? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please prepare environment variables first"
    echo "📚 See VERCEL_ENV_VARS.md for details"
    exit 1
fi

echo ""
echo "🚀 Starting deployment..."
echo ""

# Login to Vercel
echo "Step 1: Vercel login"
vercel login

if [ $? -ne 0 ]; then
    echo "❌ Login failed"
    exit 1
fi

echo ""
echo "Step 2: Deploy to Vercel"
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    echo "📚 Check DEPLOYMENT.md for troubleshooting"
    exit 1
fi

echo ""
echo "✅ Deployment successful!"
echo ""
echo "📝 Next steps:"
echo "1. Add environment variables in Vercel Dashboard"
echo "2. Go to: https://vercel.com/dashboard"
echo "3. Select your project → Settings → Environment Variables"
echo "4. Add: MONGODB_URI, JWT_SECRET, NODE_ENV"
echo "5. Redeploy (automatic after adding env vars)"
echo ""
echo "📚 Full guide: VERCEL_ENV_VARS.md"
echo ""
echo "🎉 Your app will be live at your Vercel URL!"

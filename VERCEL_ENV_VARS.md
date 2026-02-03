# Environment Variables for Vercel

Copy these variables to Vercel Dashboard → Settings → Environment Variables

## Production Environment Variables

### Required Variables

**MONGODB_URI**
```
mongodb+srv://username:password@cluster.mongodb.net/talentinsulin?retryWrites=true&w=majority
```
Description: MongoDB Atlas connection string
- Replace `username` with your database user
- Replace `password` with your database password
- Replace `cluster` with your cluster name

**JWT_SECRET**
```
your_super_secret_jwt_key_change_this_minimum_32_characters_long
```
Description: Secret key for JWT token generation
- Must be at least 32 characters
- Use random string for production
- Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**NODE_ENV**
```
production
```
Description: Node environment

### Optional Variables

**OPENAI_API_KEY** (if using AI features)
```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Description: OpenAI API key for AI-powered course generation

**RESEND_API_KEY** (if using email features)
```
re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Description: Resend API key for sending emails

**FRONTEND_URL** (optional, auto-detected)
```
https://talentinsulin.vercel.app
```
Description: Your frontend URL for CORS configuration

---

## How to Add to Vercel

### Method 1: Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Click "Add New"
5. Enter Key and Value
6. Select environment: Production (or All)
7. Click "Save"

### Method 2: CLI
```bash
vercel env add MONGODB_URI production
# Paste value when prompted

vercel env add JWT_SECRET production
# Paste value when prompted

vercel env add NODE_ENV production
# Enter: production
```

---

## Generating Secure JWT_SECRET

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using Python
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## MongoDB Atlas Setup

1. Create cluster at https://cloud.mongodb.com
2. Database Access → Add New Database User
   - Username: `talentinsulin_user`
   - Password: Generate secure password
   - Role: Read and write to any database

3. Network Access → Add IP Address
   - IP: `0.0.0.0/0` (Required for Vercel)
   - Comment: "Vercel Deployment"

4. Connect → Connect your application
   - Driver: Node.js
   - Version: Latest
   - Copy connection string
   - Replace `<password>` with your password
   - Replace database name with `talentinsulin`

---

## Security Checklist

- [ ] JWT_SECRET is at least 32 characters
- [ ] JWT_SECRET is randomly generated (not a dictionary word)
- [ ] MongoDB user has minimum required permissions
- [ ] .env file is NOT committed to Git
- [ ] Environment variables added to Vercel only
- [ ] MongoDB Atlas network access configured
- [ ] All secrets are unique per environment

---

## Verification

After adding environment variables:

1. Redeploy your project (Vercel does this automatically)
2. Check deployment logs for any errors
3. Test API health: `curl https://your-app.vercel.app/api/health`
4. Test login/registration
5. Check MongoDB Atlas for new connections

---

## Troubleshooting

**Problem:** MongoDB connection fails
**Solution:** 
- Verify MONGODB_URI is correct
- Check Network Access allows 0.0.0.0/0
- Verify username/password are correct

**Problem:** JWT authentication fails
**Solution:**
- Verify JWT_SECRET is set in Vercel
- Redeploy after adding environment variable

**Problem:** Changes not reflected
**Solution:**
- Redeploy: `vercel --prod` or push to Git
- Environment variable changes require redeployment

---

Need help? See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide.

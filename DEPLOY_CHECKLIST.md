# Quick Deployment Checklist ✅

## Before Deploying

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables prepared (see `.env.example`)
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` file is in `.gitignore` (already configured)

## Deploy to Vercel (5 minutes)

### 1. Import Project
1. Go to https://vercel.com/new
2. Import your Git repository
3. Select `talentinsulin` project

### 2. Configure Build Settings
- **Framework Preset:** Create React App (auto-detected)
- **Build Command:** `npm run build` (auto-configured)
- **Output Directory:** `build` (auto-configured)
- **Install Command:** `npm install` (auto-configured)

### 3. Add Environment Variables

Click "Add Environment Variables" and add these:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talentinsulin?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
NODE_ENV=production
```

Optional (if using these features):
```
OPENAI_API_KEY=your_openai_key
RESEND_API_KEY=your_resend_key
```

### 4. Deploy!
Click **"Deploy"** button and wait 2-3 minutes.

## After Deployment

### Test Your App
- [ ] Visit your Vercel URL (e.g., `https://talentinsulin.vercel.app`)
- [ ] Test registration/login
- [ ] Check if courses load
- [ ] Verify blog posts open
- [ ] Test contact form
- [ ] Check FAQ search

### MongoDB Atlas Security
1. Go to MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (Allow from anywhere - required for Vercel)
3. Or add Vercel's specific IPs if you want more security

### Automatic Deployments
✅ Every push to `main` branch = automatic production deploy
✅ Every PR = preview deployment with unique URL
✅ Rollback available in Vercel dashboard

## Custom Domain (Optional)

1. Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `talentinsulin.com`)
3. Update DNS records as shown by Vercel
4. Update `FRONTEND_URL` in environment variables

## Troubleshooting

### API Not Working?
- Check environment variables are set
- Check MongoDB Atlas allows connections from anywhere
- View logs: `vercel logs` or in Dashboard

### 404 on Page Refresh?
- Already fixed with `vercel.json` configuration

### Build Fails?
- Run `npm run build` locally to test
- Check Vercel build logs for errors

## Monitoring

- **Logs:** https://vercel.com/dashboard → Project → Logs
- **Analytics:** Available in Vercel Dashboard
- **API Health:** `https://your-app.vercel.app/api/health`

## Need Help?

See full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Ready to deploy? Just push to GitHub and import to Vercel!** 🚀

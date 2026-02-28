# Web Application Hosting Guide

## Overview
This guide covers hosting your wedding website with:
- **Backend**: .NET 10 API with SQLite
- **Frontend**: React + Vite
- **Custom Domain**: brunowedding.com (example)

---

## 📋 Table of Contents

**Fast Track (Most users start here):**
- [Part 0: Get Your Custom Domain](#part-0-get-your-custom-domain-do-this-first)
- [Part 10: Quick Start Steps (45-min walkthrough)](#part-10-quick-start-steps-complete-walkthrough)

**Detailed Guides:**
- [Part 1: Prepare .NET API](#part-1-prepare-your-net-api-for-deployment)
- [Part 2: Deploy API (Railway/Azure)](#part-2-deploy-net-api)
- [Part 3: Prepare React Frontend](#part-3-prepare-reactvite-frontend)
- [Part 4: Deploy Frontend (Vercel/Netlify)](#part-4-deploy-react-frontend)
- [Part 5: Configure Custom Domain](#part-5-configure-your-custom-domain)
- [Part 6: Database Considerations](#part-6-database-considerations-for-production)
- [Part 7: Deployment Checklist](#part-7-deployment-checklist)
- [Part 8: Testing](#part-8-testing-your-deployment)
- [Part 9: Cost Breakdown](#part-9-cost-breakdown)
- [Part 11: Ongoing Maintenance](#part-11-ongoing-maintenance)

---

## Recommended Modern Stack (Best Approach) ⭐

### The Simplest & Most Cost-Effective Setup:
- **API**: Railway.app (Free tier - 500 hours/month, $5/month after)
- **Frontend**: Vercel (Free tier - unlimited)
- **Database**: SQLite file included with API
- **Domain**: Namecheap or Cloudflare (~$10-15/year)
- **Total Cost**: $0-5/month + $10-15/year for domain

### Why This Stack?
- ✅ **Easy deployment**: Push to GitHub, auto-deploys
- ✅ **Free SSL certificates**: Automatic
- ✅ **Global CDN**: Fast worldwide
- ✅ **Zero configuration**: Just works
- ✅ **Custom domains**: Built-in support
- ✅ **No server management**: Fully managed

### Quick Setup Time: ~45 minutes total

**Jump to**: [Part 10: Quick Start Steps](#part-10-quick-start-steps-complete-walkthrough) for the fastest path!

---

### Alternative Options

**Option 2: All Microsoft**
- **API + Frontend**: Azure App Service (Free tier available, then ~$13/month)
- **Database**: SQLite file included
- **Domain**: Any registrar
- **Best for**: If you prefer Azure ecosystem

**Option 3: All Railway**
- **API**: Railway.app
- **Frontend**: Railway.app (can host static sites)
- **Database**: SQLite or add PostgreSQL easily
- **Domain**: Any registrar
- **Best for**: Simplicity, everything in one place

---

## Part 0: Get Your Custom Domain (Do This First!)

### Recommended Domain Registrars

**Best Options:**

1. **Cloudflare Registrar** (~$10/year) ⭐ Recommended
   - At-cost pricing (no markup)
   - Built-in free CDN and SSL
   - Best DNS management
   - Easy setup with Vercel/Railway
   - Go to: https://www.cloudflare.com/products/registrar/

2. **Namecheap** (~$12-15/year)
   - User-friendly interface
   - Often has promo codes
   - Free WHOIS privacy
   - Go to: https://www.namecheap.com

3. **Google Domains** / **Squarespace Domains** (~$12/year)
   - Simple interface
   - Good integration with Google services
   - Go to: https://domains.google (now Squarespace)

4. **Porkbun** (~$10/year)
   - Cheap pricing
   - Free WHOIS privacy
   - Good support
   - Go to: https://porkbun.com

### How to Buy Your Domain

#### Step 1: Search for Your Domain
1. Go to your chosen registrar
2. Search for "brunowedding.com" (or your preferred name)
3. Check availability

#### Step 2: Purchase
1. Add to cart (.com is recommended)
2. Choose 1 year registration (you can renew)
3. Add WHOIS privacy protection (usually free)
4. Complete purchase

#### Step 3: Don't Configure DNS Yet!
- We'll configure DNS after deploying your apps
- This ensures no downtime

**Cost**: Expect $8-15/year for a .com domain

---

## Part 1: Prepare Your .NET API for Deployment

### 1.1 Update Configuration for Production

Create or update `appsettings.Production.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=wedding.db"
  },
  "Cors": {
    "AllowedOrigins": [
      "https://brunowedding.com",
      "https://www.brunowedding.com",
      "https://*.vercel.app"
    ]
  }
}
```

**Note**: Include `*.vercel.app` to allow your preview deployments to work during testing.

### 1.2 Ensure SQLite Database is Included

Update your `.csproj` file to include the database:

```xml
<ItemGroup>
  <None Update="wedding.db">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
  </None>
</ItemGroup>
```

### 1.3 Update CORS Settings

In `Program.cs`, ensure CORS is configured properly:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://brunowedding.com",
            "https://www.brunowedding.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// After app is built
app.UseCors("AllowFrontend");
```

**For development/testing**, you can temporarily allow all origins:
```csharp
policy.SetIsOriginAllowed(_ => true) // Allow any origin during testing
```
Remember to remove this before production!

### 1.4 Create Deployment Package

```powershell
# Navigate to your API project folder
cd path\to\your\api\project

# Publish the application
dotnet publish -c Release -o ./publish
```

---

## Part 2: Deploy .NET API

### Option A: Railway.app (Recommended - Easiest!) ⭐

Railway is the simplest way to deploy .NET applications with zero configuration.

#### Step 1: Prepare Your Code

1. Create a GitHub repository (if you haven't already)
2. Push your API code to GitHub

#### Step 2: Sign Up for Railway
1. Go to https://railway.app
2. Click "Login" → Sign in with GitHub
3. Authorize Railway to access your repositories

#### Step 3: Create and Deploy Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your API repository
4. Railway automatically detects it's a .NET app and deploys!

**That's it!** Railway will:
- Build your .NET app
- Run database migrations
- Provide a public URL: `your-app.up.railway.app`

#### Step 4: Configure Environment Variables (if needed)
1. Click on your service in Railway
2. Go to "Variables" tab
3. Add any needed variables:
   - `ASPNETCORE_ENVIRONMENT` = `Production`

#### Step 5: Get Your API URL
1. Go to "Settings" tab
2. Click "Generate Domain"
3. Your API will be available at: `https://your-wedding-api.up.railway.app`

**Free Tier**: 500 hours/month ($0), then $5/month for unlimited

#### Step 6: Add Custom Domain (Later)
Once you have your domain:
1. In Railway, go to Settings → Domains
2. Click "Custom Domain"
3. Add `api.brunowedding.com`
4. Railway provides DNS instructions
5. Add the CNAME record in your domain registrar

---

### Option B: Azure App Service (Microsoft Stack)

#### Step 1: Create Azure Account
1. Go to https://azure.microsoft.com
2. Sign up for free ($200 credit + free services for 12 months)

#### Step 2: Create App Service
1. In Azure Portal, click "Create a resource"
2. Search for "Web App"
3. Configure:
   - **Name**: `your-wedding-api` (will be your-wedding-api.azurewebsites.net)
   - **Runtime**: .NET 8 or .NET 9 (Azure may not have .NET 10 yet, but it's compatible)
   - **Region**: Choose closest to your users
   - **Pricing**: F1 (Free) for testing, B1 ($13/month) for production

#### Step 3: Deploy Your API
Using Visual Studio:
1. Right-click your API project
2. Select "Publish"
3. Choose "Azure" → "Azure App Service (Windows)"
4. Sign in and select your app service
5. Click "Publish"

Using Azure CLI:
```powershell
# Install Azure CLI if needed
winget install Microsoft.AzureCLI

# Login
az login

# Deploy
az webapp deployment source config-zip `
  --resource-group YourResourceGroup `
  --name your-wedding-api `
  --src ./publish.zip
```

#### Step 4: Configure App Settings
In Azure Portal:
1. Go to your App Service
2. Settings → Configuration
3. Add Application Settings:
   - `ASPNETCORE_ENVIRONMENT` = `Production`
4. Save and restart

Your API will be available at: `https://your-wedding-api.azurewebsites.net`

**Add Custom Domain**: In Azure Portal → Custom domains → Add custom domain → Follow instructions

---

## Part 3: Prepare React/Vite Frontend

### 3.1 Update API URL

Create `.env.production` in your React project:

```env
VITE_API_URL=https://your-wedding-api.azurewebsites.net
```

Update your `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  // ... other methods
};
```

### 3.2 Build for Production

```powershell
# Navigate to your React project
cd c:\Users\BrunoBaradel\source\repos\up.railway.app
```

**Or if using Azure:**
```env
VITE_API_URL=https://your-wedding-api.azurewebsites.net
```

Update your `src/services/api.js` (if not already done)

# Build for production
npm run build
```

This creates a `dist` folder with your optimized static files.

---

## Part 4: Deploy React Frontend

### Option A: Hostgator (Use Your Existing Hosting)

#### Step 1: Access cPanel
1. Log in to your Hostgator account
2. Go to cPanel

#### Step 2: Upload Files
1. Open "File Manager"
2. Navigate to `public_html` (for main domain) or `public_html/subdomain` (for subdomain)
3. Delete default files (like `index.html`, `cgi-bin`)
4. Upload all files from your `dist` folder

#### Step 3: Configure .htaccess for React Router
Create `.htaccess` in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>Vercel (Recommended - Best for React/Vite!) ⭐

Vercel is made by the creators of Next.js and has the best React/Vite support.

#### Step 1: Push to GitHub
If not already done:
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wedding-ui.git
git push -u origin main
```

#### Step 2: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up" → Continue with GitHub
3. Authorize Vercel

#### Step 3: Import Your Project
1. Click "Add New..." → "Project"
2. Import your `WeddingUI` repository
3. Vercel auto-detects Vite configuration

#### Step 4: Configure Build Settings
Vercel usually gets this right automatically, but verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Step 5: Add Environment Variable
1. Expand "Environment Variables"
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-wedding-api.up.railway.app`
   - **Environment**: Production

### Option B: Netlify (Great Alternative)

Similar features to Vercel, also excellent for React apps.

#### Quick Deploy:
1. Go to https://netlify.com and sign up
2. Click "Add new site" → "Import from Git"
3. Select your repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variable**: `VITE_API_URL` = `https://your-api-url`
5. Deploy!

#### Add Custom Domain:
1. Site settings → Domain management
2. Add custom domain: `brunowedding.com`
3. Configure DNS:
```
Type   Name   Value
A      @      75.2.60.5
CNAME  www    your-site.netlify.app
```

**React Router Support**: Netlify handles this automatically, or create `public/_redirects`:
```
/*    /index.html   200
```

---

## Part 5: Configure Your Custom Domain

### Summary of DNS Configuration

Once you've deployed both API and Frontend, configure your domain DNS:

**At Your Domain Registrar (Cloudflare/Namecheap/etc.):**

```
Type    Name    Value                           Purpose
A       @       76.76.21.21                     Main domain → Vercel
CNAME   www     cname.vercel-dns.com            www subdomain → Vercel
CNAME   api     your-api.up.railway.app         API subdomain → Railway
```

**Result:**
- `https://brunowedding.com` → Your React app
- `https://www.brunowedding.com` → Your React app
- `https://api.brunowedding.com` → Your .NET API

**Alternative**: Keep Railway's default domain for API (`your-api.up.railway.app`) to avoid CNAME setup.

### DNS Propagation
- Changes take 1-48 hours to propagate globally
- Use https://dnschecker.org to monitor progress
- SSL certificates provision automatically once DNS is configured in Hosting Platform
In Netlify or Vercel:
1. Go to Domain settings
2. Add custom domain: `yourdomain.com`
3. Follow their instructions to verify
4. Enable SSL (automatic)

**DNS propagation takes 1-48 hours**

---

## Part 6: Database Considerations for Production

### SQLite in Production

**Pros:**
- Simple, no additional service needed
- Perfect for small websites (wedding sites are typically small)
- No additional costs
- Easy to backup (just copy the .db file)

**Cons:**
- Not suitable for high traffic (but wedding sites are usually low traffic)
- Limited concurrent writes (read-heavy is fine)
- Need to backup carefully when deploying updates

### Backup Strategy

#### Option 1: Manual Backups
```powershell
# Download database from Azure
az webapp deployment source download `
  --resource-group YourResourceGroup `
  --name your-wedding-api `
  --slot production `
  --target-path ./backup
```

#### Option 2: Automated Backups (Azure)
In Azure Portal:
1. Go to your App Service
2. Backups → Configure
3. Set up automated backups to Azure Storage

### Alternative: Upgrade to PostgreSQL (If Needed)

If you need better reliability:

**Free PostgreSQL Hosting:**
- Supabase: https://supabase.com (500MB free)
- ElephantSQL: https://elephantsql.com (20MB free)
- Railway: Includes PostgreSQL

**Migration:**
1. Install EF Core PostgreSQL: `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL`
2. Update connection string
3. Run migrations: `dotnet ef database update`

---

## Part 7: Deployment Checklist

### Before Deploying

- [ ] API uses production configuration
- [ ] CORS configured with actual domain
- [ ] SQLite database included in deployment
- [ ] React app uses production API URL
- [ ] Environment variables set
- [ ] Build completes without errors

### API Deployment

- [ ] .NET API published to Azure/Railway
- [ ] API URL accessible: `https://your-api.azurewebsites.net/api/health`
- [ ] CORS allows your frontend domain
- [ ] Database works (test endpoints)

### Frontend Deployment

- [ ] React app built (`npm run build`)
- [ ] Uploaded to Hostgator/Netlify/Vercel
- [ ] `.htaccess` or redirects configured
- [ ] Can access at temporary URL
- [ ] API calls work from frontend

### Domain Configuration

- [ ] DNS records updated: `brunowedding.com`
- [ ] SQLite database included in deployment
- [ ] React app uses production API URL in `.env.production`
- [ ] Environment variables set
- [ ] Build completes without errors
- [ ] Code pushed to GitHub

### API Deployment (Railway)

- [ ] Railway account created
- [ ] GitHub repository connected to Railway
- [ ] .NET API deployed successfully
- [ ] API URL accessible: `https://your-api.up.railway.app/api/health`
- [ ] CORS allows your frontend domain
- [ ] Database works (test endpoints)

### Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] `VITE_API_URL` environment variable set
- [ ] React app built and deployed
- [ ] Can access at Vercel URL
- [ ] API calls work from frontend

### Domain Configuration

- [ ] Custom domain purchased (brunowedding.com)
- [ ] DNS A record added for @ → Vercel
- [ ] DNS CNAME added for www → Vercel
- [ ] DNS CNAME added for api → Railway (if using custom API domain)
- [ ] Domain added in Vercel dashboard
- [ ] SSL certificate active (automatic)
- [ ] www and non-www both work
- [ ] Waited for DNS propagation (1-48 hours)

---

## Part 8: Testing Your Deployment

### Test API
```powershell
# Test health endpoint
curl https://your-api.up.railway.app/api/health

# Test your actual endpoints
curl https://your-api.up.railway.app/api/users

# Or using your custom domain (if configured)
curl https://api.brunowedding.com/api/users
```

### Test Frontend
1. Open your domain in browser: `https://brunowedding.com`
2. Open Developer Tools (F12)
3. Check Console for errors
4. Check Network tab for API calls
5. Verify CORS is working
6. Test all features (forms, navigation, etc.)

### Common Issues

**CORS Errors:**
- Check API CORS configuration includes your domain
- Ensure using HTTPS (not HTTP)
- Check browser console for specific error

**API Not Found (404):**
- Verify API URL in `.env.production`
- Check API is actually running
- Test API URL directly in browser

**React Router Not Working (404 on refresh):**
- Vercel/Netlify usually handle this automatically
- If issues persist, check build logs
- Ensure framework was auto-detected correctly

---

## Part 9: Cost Breakdown

### Recommended Stack (Railway + Vercel) ⭐
- **API**: Railway Free Tier → **$0** (500 hours/month)
- **Frontend**: Vercel Free → **$0** (unlimited)
- **Domain**: Cloudflare/Namecheap → **$10-15/year**
- **Monthly**: **$0-1.25** (domain cost amortized)
- **First Year Total**: **~$10-15**

### If You Need More Resources
- **API**: Railway Pro → **$5/month** (unlimited hours)
- **Frontend**: Vercel Free → **$0**
- **Domain**: → **$10-15/year**
- **Monthly**: **~$6.25** 
- **First Year Total**: **~$70**

### Microsoft Stack Alternative
- **API + Frontend**: Azure App Service B1 → **$13/month**
- **Domain**: → **$10-15/year**
- **Monthly**: **~$14.25**
- **First Year Total**: **~$170**

### What You Get (Free Tier)
✅ Global CDN  
✅ Automatic SSL certificates  
✅ Unlimited bandwidth (Vercel: 100GB/month)  
✅ CI/CD (auto-deploy on git push)  
✅ 99.9% uptime  
✅ DDoS protection  
✅ Preview deployments  

**Perfect for a wedding website!**

---

## Part 10: Quick Start Steps (Complete Walkthrough)

### The Absolute Fastest Path (45 minutes total):

#### Phase 1: Buy Domain (5 minutes)
1. Go to https://www.cloudflare.com/products/registrar/ or https://www.namecheap.com
2. Search for "brunowedding.com" (or your preferred name)
3. Purchase domain (~$10-15/year)
4. Don't configure DNS yet!

#### Phase 2: Push Code to GitHub (5 minutes)
If not already done:
```powershell
# In your API project folder
git init
git add .
git commit -m "Initial API commit"
git remote add origin https://github.com/yourusername/wedding-api.git
git push -u origin main

# In your UI project folder (WeddingUI)
cd c:\Users\BrunoBaradel\source\repos\WeddingUI
git init
git add .
git commit -m "Initial UI commit"
git remote add origin https://github.com/yourusername/wedding-ui.git
git push -u origin main
```

#### Phase 3: Deploy API to Railway (10 minutes)
1. Go to https://railway.app
2. Click "Login" → Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your API repository
5. Wait for deployment (2-3 minutes)
6. Click service → Settings → "Generate Domain"
7. Copy your API URL: `https://your-api.up.railway.app`

**Test it:**
```powershell
curl https://your-api.up.railway.app/api/health
```

#### Phase 4: Configure and Deploy Frontend to Vercel (15 minutes)
```powershell
# In your UI project folder
cd c:\Users\BrunoBaradel\source\repos\WeddingUI

# Create production environment file
echo VITE_API_URL=https://your-api.up.railway.app > .env.production

# Commit this change
git add .env.production
git commit -m "Add production API URL"
git push
```

1. Go to https://vercel.com
2. Click "Sign Up" → Continue with GitHub
3. Click "Add New..." → "Project"
4. Import your `wedding-ui` repository
5. Configure:
   - Framework: **Vite** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-api.up.railway.app`
7. Click "Deploy"
8. Wait 1-2 minutes
9. Get your URL: `https://wedding-ui.vercel.app`

**Test it:** Open the URL in your browser and check if it loads!

#### Phase 5: Update CORS in API (5 minutes)
In your API `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://wedding-ui.vercel.app",  // Add this
            "https://brunowedding.com",        // Your custom domain
            "https://www.brunowedding.com"     // www version
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});
```

Push to GitHub:
```powershell
git add .
git commit -m "Update CORS for production"
git push
```

Railway will auto-deploy! Wait 2 minutes, then test again.

#### Phase 6: Connect Custom Domain (5 minutes)
1. In Vercel dashboard → Your Project → Settings → Domains
2. Add domain: `brunowedding.com`
3. Also add: `www.brunowedding.com`
4. Vercel shows DNS configuration

5. Go to your domain registrar (Cloudflare/Namecheap)
6. Add DNS records:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

7. Save DNS changes
8. Back in Vercel, verify domain
9. Wait for DNS propagation (1-48 hours)
10. SSL certificate auto-provisions

**Done! 🎉** Your site will be live at `https://brunowedding.com`

---

### Troubleshooting the Quick Path

**API Deployment Failed on Railway:**
- Check build logs in Railway dashboard
- Ensure your `.csproj` has correct .NET version
- Try manually adding `ASPNETCORE_ENVIRONMENT=Production` in Variables

**Frontend Can't Reach API:**
- Open browser DevTools (F12) → Network tab
- Check API URL in requests
- Verify CORS is updated and deployed
- Test API URL directly: `curl https://your-api.up.railway.app/api/users`

**Domain Not Working:**
- DNS takes 1-48 hours to propagate
- Check DNS: https://dnschecker.org
- Verify DNS records match Vercel's instructions exactly
- Try accessing via Vercel URL first: `wedding-ui.vercel.app`

---

## Part 11: Ongoing Maintenance

### Updating Your Site

**Frontend Changes:**
1. Make changes locally
2. Test: `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys (1-2 minutes)
5. Check preview deployment before it goes live

**Backend Changes:**
1. Make changes locally
2. Test: `dotnet run`
3. Commit and push to GitHub
4. Railway auto-deploys (2-3 minutes)

### Monitoring
- **Railway**: Dashboard shows logs, metrics, deployment history
- **Vercel**: Analytics, deployment logs, real-time visitors
- Both platforms email you if deployment fails

### Backups

**SQLite Database:**
```powershell
# Railway CLI (install: npm install -g railway)
railway login
railway link
railway run bash
# Then: cp wedding.db /tmp/backup.db
```

**Or use Railway's Volume backups (if configured)**

### Costs to Watch
- **Railway Free Tier**: 500 hours/month
  - If site is up 24/7: 720 hours/month = need $5/month plan
  - Solution: Use railway's sleep feature or upgrade
- **Vercel**: Free tier is generous, unlikely to exceed

---

## Support Resources
   - Add `railway.toml` configuration
   - Get your API URL

2. **Update React with API URL:**
   ```bash
   # Create .env.production
   echo VITE_API_URL=https://your-api.up.railway.app > .env.production
   
---

## Support Resources

### Documentation
- **Railway**: https://docs.railway.app/
- **Vercel**: https://vercel.com/docs
- **Netlify** (alternative): https://docs.netlify.com/
- **Azure** (alternative): https://docs.microsoft.com/azure/app-service/
- **Cloudflare**: https://developers.cloudflare.com/

### Helpful Tools
- **DNS Checker**: https://dnschecker.org (check DNS propagation)
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html
- **Webhook Testing**: https://webhook.site (test API endpoints)

### Common Commands

```powershell
# Build React app
npm run build

# Test React app locally after build
npm run preview

# Publish .NET API
dotnet publish -c Release -o ./publish

# Run .NET API locally in production mode
dotnet run --environment Production

# Test API endpoint
curl https://your-api-url/api/endpoint

# Check Railway logs
railway logs

# Check Vercel logs
vercel logs
```

### Getting Help
- **Railway Discord**: https://discord.gg/railway
- **Vercel Discord**: https://discord.gg/vercel
- **Stack Overflow**: Tag questions with `railway`, `vercel`, `.net`, `react`

---

## Summary: Your Final Setup

### What You'll Have:
✅ **Frontend**: `https://brunowedding.com` (Vercel)  
✅ **API**: `https://your-api.up.railway.app` or `https://api.brunowedding.com`  
✅ **Database**: SQLite (included with API)  
✅ **SSL**: Automatic and free  
✅ **CDN**: Global, fast delivery  
✅ **Deployments**: Automatic (git push = deploy)  
✅ **Cost**: $0-5/month + $10-15/year domain  

### Deployment Flow (After Initial Setup):
1. Make code changes locally
2. Test locally
3. `git commit` and `git push`
4. Automatic deployment (1-3 minutes)
5. Site updates automatically!

### Next Steps

1. **Buy your domain** → Cloudflare or Namecheap (~$10-15/year)
2. **Deploy API** → Railway.app (5-10 minutes)
3. **Deploy Frontend** → Vercel (5-10 minutes)
4. **Connect domain** → Add DNS records (5 minutes + propagation wait)
5. **Test everything** → Verify all features work
6. **Celebrate!** 🎉💒

### Pro Tips
- Deploy API first, then frontend (frontend needs API URL)
- Test with temporary URLs before connecting custom domain
- Keep `.env.production` in git (it's safe, contains public URLs)
- Use Railway/Vercel preview URLs for testing changes
- Set up monitoring/alerts in both platforms
- Backup your SQLite database weekly

Good luck with your wedding website! 💒✨

# 🚀 Quick Start: Deploy Your Wedding Website (45 minutes)

## What You'll Deploy
- **.NET 10 API** → Railway.app
- **React + Vite** → Vercel
- **Custom Domain** → brunowedding.com (example)
- **Cost**: $0-5/month + $10-15/year for domain

---

## Step 1: Buy Domain (5 min)
1. Go to [Cloudflare](https://www.cloudflare.com/products/registrar/) or [Namecheap](https://www.namecheap.com)
2. Search "brunowedding.com" and purchase (~$10-15/year)
3. Don't configure DNS yet!

---

## Step 2: Push to GitHub (5 min)

**API Project:**
```powershell
cd path\to\your\api
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wedding-api.git
git push -u origin main
```

**UI Project:**
```powershell
cd c:\Users\BrunoBaradel\source\repos\WeddingUI
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wedding-ui.git
git push -u origin main
```

---

## Step 3: Deploy API (10 min)

1. Go to [railway.app](https://railway.app)
2. **Login** → Sign in with GitHub
3. **New Project** → Deploy from GitHub repo
4. Select your API repo
5. Wait 2-3 minutes for deployment
6. Click service → **Settings** → **Generate Domain**
7. **Copy URL**: `https://your-api.up.railway.app`

**Test it:**
```powershell
curl https://your-api.up.railway.app/api/health
```

---

## Step 4: Deploy Frontend (15 min)

**A. Create production config:**
```powershell
cd c:\Users\BrunoBaradel\source\repos\WeddingUI
echo VITE_API_URL=https://your-api.up.railway.app > .env.production
git add .env.production
git commit -m "Add production API URL"
git push
```

**B. Deploy to Vercel:**
1. Go to [vercel.com](https://vercel.com)
2. **Sign Up** → Continue with GitHub
3. **Add New...** → **Project**
4. Import your `wedding-ui` repository
5. Verify settings (auto-detected):
   - Framework: **Vite**
   - Build: `npm run build`
   - Output: `dist`
6. Add **Environment Variable**:
   - `VITE_API_URL` = `https://your-api.up.railway.app`
7. **Deploy** → Wait 1-2 minutes
8. **Copy URL**: `https://wedding-ui.vercel.app`

**Test it:** Open URL in browser!

---

## Step 5: Update CORS (5 min)

In your API `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://wedding-ui.vercel.app",
            "https://brunowedding.com",
            "https://www.brunowedding.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

Push:
```powershell
git add .
git commit -m "Update CORS"
git push
```

Railway auto-deploys in 2 minutes.

---

## Step 6: Connect Custom Domain (5 min + propagation wait)

**A. In Vercel:**
1. Dashboard → Your Project → **Settings** → **Domains**
2. Add: `brunowedding.com`
3. Add: `www.brunowedding.com`
4. Note the DNS instructions

**B. In Your Domain Registrar:**
1. Go to DNS settings
2. Add records:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```
3. **Save**

**C. Verify:**
1. Back in Vercel, click **Verify**
2. Wait for DNS propagation (1-48 hours)
3. SSL auto-provisions

**Done!** 🎉 Your site will be at: `https://brunowedding.com`

---

## ✅ Checklist

- [ ] Domain purchased
- [ ] API + UI code pushed to GitHub
- [ ] API deployed to Railway
- [ ] API URL obtained
- [ ] Frontend deployed to Vercel with API URL
- [ ] CORS updated in API
- [ ] Custom domain added to Vercel
- [ ] DNS records configured
- [ ] Tested site loads
- [ ] Tested API calls work

---

## 🔧 Troubleshooting

**API Won't Deploy?**
- Check Railway logs for errors
- Ensure `.csproj` has correct .NET version

**Frontend Can't Reach API?**
- Open DevTools (F12) → Network tab
- Check API URL in requests
- Verify CORS includes Vercel URL

**Domain Not Working?**
- DNS takes 1-48 hours
- Check: [dnschecker.org](https://dnschecker.org)
- Verify DNS records match exactly

**CORS Errors?**
- Ensure API CORS includes your domain
- Check API redeployed after CORS change
- Use HTTPS (not HTTP)

---

## 📚 Need More Help?

See [HOSTING-GUIDE.md](HOSTING-GUIDE.md) for:
- Detailed explanations
- Alternative hosting options
- Database migration
- Cost breakdowns
- Monitoring and maintenance

---

## 🎯 What You Now Have

✅ **Frontend**: `https://brunowedding.com`  
✅ **API**: `https://your-api.up.railway.app`  
✅ **Auto-deployment**: Push to GitHub = auto deploy  
✅ **SSL**: Free & automatic  
✅ **Global CDN**: Fast worldwide  
✅ **Cost**: $0-5/month + domain

**Future Updates**: Just `git push` and your site updates in 1-3 minutes! 🚀

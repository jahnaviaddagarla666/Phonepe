# PhonePe Wallet - Deployment Guide Index

Welcome! This file helps you navigate all deployment documentation.

---

## 📚 Quick Navigation

### For First-Time Setup
1. Read this file (you're here!)
2. Read **[DEPLOYMENT-CHANGES.md](./DEPLOYMENT-CHANGES.md)** - Learn what was changed
3. Run **test-deployment-ready.bat** (Windows) or **test-deployment-ready.sh** (Linux/Mac)
4. Read **[DEPLOYMENT-README.md](./DEPLOYMENT-README.md)** - Choose your platform

### For Quick Environment Setup
- Read **[ENV-VARIABLES-REFERENCE.md](./ENV-VARIABLES-REFERENCE.md)** - Environment variable guide

### For Specific Platforms
- **Vercel**: See "Deployment on Vercel" in [DEPLOYMENT-README.md](./DEPLOYMENT-README.md#deployment-on-vercel)
- **Render**: See "Deployment on Render" in [DEPLOYMENT-README.md](./DEPLOYMENT-README.md#deployment-on-render)
- **Railway**: See "Deployment on Railway" in [DEPLOYMENT-README.md](./DEPLOYMENT-README.md#deployment-on-railway)

---

## 📋 Files Overview

### Documentation Files

| File | Purpose | Read Time |
|------|---------|-----------|
| **DEPLOYMENT-CHANGES.md** | Summary of code changes made for deployment | 5 min |
| **DEPLOYMENT-README.md** | Comprehensive deployment guide for all 3 platforms | 20 min |
| **ENV-VARIABLES-REFERENCE.md** | Environment variable setup guide | 10 min |
| **This File** | Index and navigation guide | 2 min |

### Configuration Files

| File | Platform | Purpose |
|------|----------|---------|
| `vercel.json` (root) | Vercel | Root-level Vercel configuration |
| `frontend/vercel.json` | Vercel | Frontend-specific Vercel configuration |
| `render.yaml` | Render | Complete Render deployment config |
| `railway.json` | Railway | Railway deployment configuration |
| `backend/Dockerfile` | Docker | Backend container configuration |

### Environment Templates

| File | Purpose | Example |
|------|---------|---------|
| `backend/.env.example` | Backend env variables template | PORT, DB_URL, DB_USERNAME, etc. |
| `frontend/.env.example` | Frontend env variables template | VITE_API_BASE_URL |

### Test Scripts

| File | OS | Purpose |
|------|----|---------| 
| `test-deployment-ready.sh` | Linux/Mac | Verify all deployment files are present |
| `test-deployment-ready.bat` | Windows | Verify all deployment files are present |

---

## 🚀 Quick Start Checklist

### Phase 1: Preparation (Local)
- [ ] Read DEPLOYMENT-CHANGES.md to understand what changed
- [ ] Run test-deployment-ready script (test-deployment-ready.bat on Windows)
- [ ] All checks should pass
- [ ] Commit changes: `git add . && git commit -m "Add deployment configs"`

### Phase 2: Platform Selection & Setup
Choose your deployment strategy:

**Option A: Recommended - Separate Platforms**
- [ ] Frontend on Vercel
- [ ] Backend on Render or Railway
- [ ] Database on Render/Railway or external (RDS)

**Option B: Single Platform Stack**
- [ ] Everything on Render
- [ ] Everything on Railway
- [ ] Single point of management

**Option C: Full Vercel**
- [ ] Frontend on Vercel
- [ ] Backend on Vercel Serverless (requires more setup)

### Phase 3: Create Accounts & Connect GitHub
- [ ] Create Vercel account: https://vercel.com
- [ ] Create Render account: https://render.com (or Railway: https://railway.app)
- [ ] Connect GitHub repository to platform(s)
- [ ] Generate authentication tokens if needed

### Phase 4: Deploy Backend
- [ ] Set up database (Render, Railway, or external)
- [ ] Note database credentials
- [ ] Deploy backend service
- [ ] Copy backend URL from platform

### Phase 5: Deploy Frontend
- [ ] Get backend URL from Step 4
- [ ] Add VITE_API_BASE_URL environment variable
- [ ] Deploy frontend
- [ ] Copy frontend URL

### Phase 6: Final Configuration
- [ ] Update backend CORS_ALLOWED_ORIGINS with frontend URL
- [ ] Restart backend service
- [ ] Test API from frontend
- [ ] Check application logs

### Phase 7: Verification
- [ ] Test user registration
- [ ] Test login
- [ ] Test wallet operations
- [ ] Test transactions
- [ ] Monitor logs for errors

---

## 🌐 Deployment Decision Tree

```
Are you deploying for the first time?
│
├─ YES → Follow Phase 1-7 above
│
└─ NO → Skip to relevant phase

Choose platform(s):
│
├─ VERCEL FRONTEND + RENDER/RAILWAY BACKEND
│   ├─ Frontend: Read "Deployment on Vercel"
│   ├─ Backend: Read "Deployment on Render/Railway"
│   └─ Go to Phase 4
│
├─ ALL ON RENDER
│   ├─ Read render.yaml section
│   └─ Go to Phase 4
│
├─ ALL ON RAILWAY
│   ├─ Read railway.json section
│   └─ Go to Phase 4
│
└─ OTHER SETUP
    └─ Refer to Troubleshooting in DEPLOYMENT-README.md
```

---

## 📊 Platform Comparison

### Vercel (Frontend)
- ✅ **Pros**: Optimized for React, free tier generous, automatic optimizations
- ❌ **Cons**: Limited backend support, not ideal for Java/Spring Boot
- 💰 **Cost**: Free tier for standard frontends
- ⏱️ **Setup Time**: 5-10 minutes

### Render (Full Stack)
- ✅ **Pros**: Supports Docker, free tier for both frontend/backend, PostgreSQL included
- ✅ **Cons**: Free tier limited resources, may be slower startup
- 💰 **Cost**: Free tier available with limitations
- ⏱️ **Setup Time**: 15-20 minutes

### Railway (Full Stack)
- ✅ **Pros**: Fast deployments, supports Docker, free trial credits, MySQL included
- ✅ **Cons**: Free trial is time-limited, requires credit card
- 💰 **Cost**: Free trial + credits, then paid
- ⏱️ **Setup Time**: 15-20 minutes

### Recommended Setup
```
Frontend:  Vercel
Backend:   Render (free) or Railway
Database:  Render/Railway managed or AWS RDS
```

---

## 🔧 Common Tasks

### Update Environment Variables
1. Go to platform dashboard
2. Find your service
3. Go to "Environment" or "Settings"
4. Update variable
5. Restart/redeploy service

See [ENV-VARIABLES-REFERENCE.md](./ENV-VARIABLES-REFERENCE.md) for detailed steps per platform.

### View Application Logs
- **Vercel**: Dashboard → Deployments → Logs
- **Render**: Dashboard → Service → Logs
- **Railway**: Project → Service → Logs

### Restart Service
- **Vercel**: Redeploy (Settings → Deployments → Redeploy)
- **Render**: Manual (Service → Manual Deploy)
- **Railway**: Restart (Service → Restart)

### Update Code
1. Push changes to GitHub
2. Platform automatically redeploys (if auto-deploy enabled)
3. Or manually trigger deployment in platform dashboard

---

## 🆘 Need Help?

### Issue: Something doesn't work
1. Check [Troubleshooting Section](./DEPLOYMENT-README.md#troubleshooting) in DEPLOYMENT-README.md
2. Check application logs in platform dashboard
3. Verify environment variables are set correctly
4. Ensure database is running and accessible

### Issue: Can't find something
- Use Ctrl+F (Cmd+F on Mac) to search in docs
- Check [EN-VARIABLES-REFERENCE.md](./ENV-VARIABLES-REFERENCE.md) for env variable issues
- Check [DEPLOYMENT-CHANGES.md](./DEPLOYMENT-CHANGES.md) for code changes

### Issue: Need platform-specific help
- **Vercel**: https://vercel.com/docs
- **Render**: https://render.com/docs
- **Railway**: https://docs.railway.app

---

## 📈 After Deployment

### Monitoring
- [ ] Set up error tracking (Sentry, DataDog)
- [ ] Configure database backups
- [ ] Monitor application logs regularly
- [ ] Set up alerts for service failures

### Maintenance
- [ ] Keep dependencies updated
- [ ] Regular security audits
- [ ] Performance optimization
- [ ] Database optimization

### Scaling
- [ ] Monitor usage and costs
- [ ] Upgrade plans if needed
- [ ] Optimize database queries
- [ ] Consider caching strategies

---

## 📝 File Descriptions

### DEPLOYMENT-CHANGES.md
- **What**: Summary of all code changes
- **When to Read**: First, to understand modifications
- **Length**: 5 minutes

### DEPLOYMENT-README.md
- **What**: Complete deployment guides for all 3 platforms
- **When to Read**: For detailed platform-specific instructions
- **Sections**:
  - Architecture overview
  - Prerequisites
  - Step-by-step guides for each platform
  - Troubleshooting
  - Performance optimization
  - **Length**: 20-30 minutes

### ENV-VARIABLES-REFERENCE.md
- **What**: Environment variable setup guide
- **When to Read**: When setting up variables on a platform
- **Sections**:
  - Variable reference table
  - How to set variables on each platform
  - Common scenarios with examples
  - Database connection strings
  - **Length**: 10-15 minutes

### Configuration Files
- **Dockerfile**: Docker build configuration (unchanged from original)
- **vercel.json**: Vercel-specific settings
- **render.yaml**: Render deployment specification
- **railway.json**: Railway deployment configuration

### .env.example Files
- **Use**: Copy to `.env` and fill in your values
- **Location**: Root of backend/ and frontend/ directories
- **Important**: Never commit actual `.env` files (add to .gitignore)

---

## ✨ What Changed in Code

### Backend Changes (Java)
1. **application.properties**:
   - `server.port` now uses `${PORT:8080}` (environment variable)
   - `app.cors.allowed-origins` now uses environment variable

2. **CorsConfig.java**:
   - Improved to handle multiple comma-separated origins
   - Added `.trim()` to handle spacing

### Frontend Changes (React)
1. **api.js**:
   - API base URL now dynamic
   - Uses `VITE_API_BASE_URL` environment variable
   - Falls back to relative URLs in production
   - Defaults to localhost:8080 for development

### New Files Added
- Configuration files for all 3 platforms
- Environment templates for local setup
- Test scripts to verify readiness
- Comprehensive documentation

---

## 🎯 Next Steps

1. **Right Now**:
   - You're reading DEPLOYMENT-INDEX.md ✅

2. **Next**:
   - Run: `test-deployment-ready.bat` (Windows) or `test-deployment-ready.sh` (Linux/Mac)
   - This verifies all necessary files are present

3. **Then**:
   - Read: `DEPLOYMENT-CHANGES.md` (understand what changed)
   - Read: `DEPLOYMENT-README.md` (choose your platform)

4. **Finally**:
   - Follow the step-by-step guide for your chosen platform
   - Reference `ENV-VARIABLES-REFERENCE.md` as needed
   - Deploy! 🚀

---

## 📞 Support Resources

- **Spring Boot**: https://spring.io/guides
- **React/Vite**: https://vitejs.dev/guide/
- **Maven**: https://maven.apache.org/guides/
- **Docker**: https://docs.docker.com/
- **Platform Docs**:
  - Vercel: https://vercel.com/docs
  - Render: https://render.com/docs
  - Railway: https://docs.railway.app

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Ready for Deployment ✅

Start with the checklist above or jump to the section you need!

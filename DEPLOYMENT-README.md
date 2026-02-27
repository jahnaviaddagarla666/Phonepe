# PhonePe Wallet - Deployment Guide

This guide provides step-by-step instructions to deploy the PhonePe Wallet application on **Vercel**, **Render**, and **Railway**.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Deployment on Vercel](#deployment-on-vercel)
- [Deployment on Render](#deployment-on-render)
- [Deployment on Railway](#deployment-on-railway)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The PhonePe Wallet application consists of:

- **Backend**: Java Spring Boot application (REST API)
- **Frontend**: React + Vite application (SPA)
- **Database**: MySQL

### Deployment Strategy

| Platform | Best For | Backend | Frontend | Database |
|----------|----------|---------|----------|----------|
| **Vercel** | Frontend Only | ❌ Not Recommended | ✅ Optimal | External |
| **Render** | Full Stack | ✅ Docker Support | ✅ Node Support | ✅ PostgreSQL/MySQL |
| **Railway** | Full Stack | ✅ Docker Support | ✅ Node Support | ✅ PostgreSQL/MySQL |

### Recommended Setup

- **Frontend**: Deploy on **Vercel** (free, optimized for React)
- **Backend**: Deploy on **Render** or **Railway** (free tier available)
- **Database**: Use managed database from Render/Railway or cloud provider

---

## Prerequisites

### Local Setup
```bash
# Clone the repository
git clone https://github.com/your-username/PhonePe.git
cd PhonePe

# Install backend dependencies (Maven already configured)
cd backend

# Install frontend dependencies
cd ../frontend
npm install
```

### Required Accounts
1. **GitHub Account** - For repository hosting
2. **Vercel Account** - For frontend deployment (https://vercel.com)
3. **Render Account** - For backend deployment (https://render.com)
4. **Railway Account** - Alternative to Render (https://railway.app)

---

## Deployment on Vercel

### Step 1: Push Code to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/PhonePe.git
git push -u origin main
```

### Step 2: Create Vercel Project

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Select your **PhonePe** repository
4. Configure the project:
   - **Framework**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables

1. Go to **Settings → Environment Variables**
2. Add the following variables:

| Key | Value | Type |
|-----|-------|------|
| `VITE_API_BASE_URL` | `https://phonepe-backend-XXXX.onrender.com/api` | Production |

> **Note**: Replace with your actual backend URL from Render/Railway

3. Click **Deploy**

### Step 4: Configure Rewrites (Already in vercel.json)

The `vercel.json` file in the root directory already handles:
- SPA routing (all routes go to index.html)
- Environment variable setup

### Step 5: Update CORS in Backend

After getting your Vercel frontend URL, update the backend environment variable:
```
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app/
```

### Example Vercel URL Format
```
https://phonepe-frontend-XXXXX.vercel.app
```

---

## Deployment on Render

### Option A: Deploy Backend (Docker)

#### Step 1: Create Render Account & Connect GitHub
1. Go to [https://render.com](https://render.com)
2. Sign up and connect your GitHub account
3. Click **"New +"** → **"Web Service"**

#### Step 2: Configure Backend Service
1. Select your **PhonePe** repository
2. Configure:
   - **Name**: `phonepe-backend`
   - **Branch**: `main`
   - **Runtime**: `Docker`
   - **Build Command**: `docker build -f backend/Dockerfile -t phonepe-backend .`
   - **Start Command**: Automatically detected from Dockerfile

#### Step 3: Add Environment Variables
Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `PORT` | `8080` |
| `DB_URL` | `jdbc:mysql://your-db-host:3306/phonepe_wallet` |
| `DB_USERNAME` | Your DB username |
| `DB_PASSWORD` | Your DB password |
| `CORS_ALLOWED_ORIGINS` | `https://phonepe-frontend-XXXXX.vercel.app/,https://phonepe-frontend-XXXXX.onrender.com/` |

#### Step 4: Set Up Database

**Option 1: Use Render's PostgreSQL (Free Tier)**
1. Click **"New +"** → **"PostgreSQL"**
2. Configure database:
   - **Name**: `phonepe-db`
   - **Database**: `phonepe_wallet`
   - **User**: `phonepe_user`
   - **Region**: Same as backend

3. Update backend `DB_URL` to use PostgreSQL:
```
DB_URL=jdbc:postgresql://your-render-db-host:5432/phonepe_wallet
```

**Option 2: External MySQL Database**
- Use AWS RDS, Google Cloud SQL, or similar service
- Provide connection details in environment variables

#### Step 5: Deploy
Click **"Create Web Service"** and wait for deployment (2-3 minutes)

### Option B: Deploy Frontend on Render (Node)

#### Step 1: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Select your repository

#### Step 2: Configure
```
- Name: phonepe-frontend
- Root Directory: frontend
- Runtime: Node
- Build Command: npm install && npm run build
- Start Command: npm run preview
- Environment: VITE_API_BASE_URL=https://phonepe-backend-XXXXX.onrender.com/api
```

#### Step 3: Deploy
Click **"Create Web Service"**

### Render URLs Format
```
Backend: https://phonepe-backend-xxxxx.onrender.com
Frontend: https://phonepe-frontend-xxxxx.onrender.com
```

---

## Deployment on Railway

### Step 1: Connect GitHub Account
1. Go to [https://railway.app](https://railway.app)
2. Sign up and authorize GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **PhonePe** repository

### Step 3: Configure Backend Service

#### Option A: Using railway.json (Automatic)
Railway will automatically read `railway.json` if present:
```json
{
  "build": {
    "builder": "dockerfile",
    "context": "./backend"
  },
  "deploy": {
    "startCommand": "java -jar app.jar"
  }
}
```

#### Option B: Manual Configuration
1. Click **"Add Service"** → **"Docker"**
2. Configure:
   - **Repository**: Your PhonePe repo
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Root Directory**: `backend`

### Step 4: Add Environment Variables
1. Click on the service
2. Go to **"Variables"**
3. Add:

| Key | Value |
|-----|-------|
| `PORT` | `8080` |
| `DB_URL` | From Railway MySQL plugin |
| `DB_USERNAME` | From Railway MySQL plugin |
| `DB_PASSWORD` | From Railway MySQL plugin |
| `CORS_ALLOWED_ORIGINS` | Your frontend URL |

### Step 5: Add Database

#### Option A: Railway MySQL
1. Click **"Add Service"** → **"MySQL"**
2. Configure:
   - **Database Name**: `phonepe_wallet`
3. Railway automatically provides connection variables
4. Link variables to backend service

#### Option B: External Database
Use AWS RDS or Google Cloud SQL connection details

### Step 6: Deploy Frontend (Optional)

1. Add another service for frontend
2. Configure as Node.js:
```
- Runtime: Node
- Start Command: npm run preview
- Environment: VITE_API_BASE_URL=your-backend-url
```

### Railway URLs Format
```
Backend: https://your-backend-name.up.railway.app
Frontend: https://your-frontend-name.up.railway.app
```

---

## Environment Variables

### Backend Variables (.env)

```properties
# Server Port
PORT=8080

# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/phonepe_wallet
DB_USERNAME=root
DB_PASSWORD=your_password

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app

# Environment
ENVIRONMENT=production
```

### Frontend Variables (.env)

```bash
# API Base URL
# Leave empty for development (uses localhost:8080)
# For production, set to backend URL
VITE_API_BASE_URL=https://your-backend-url.com/api
```

### Platform-Specific Examples

#### Vercel Frontend
```env
VITE_API_BASE_URL=https://phonepe-backend-xxxxx.onrender.com/api
```

#### Render Backend
```env
DB_URL=postgresql://user:password@host:5432/phonepe_wallet
# or for MySQL:
DB_URL=jdbc:mysql://host:3306/phonepe_wallet
```

#### Railway Backend
```env
DATABASE_PUBLIC_URL=postgresql://user:password@host/phonepe_wallet
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. CORS Errors
**Problem**: Frontend can't access backend
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:
- Update `CORS_ALLOWED_ORIGINS` in backend with frontend URL
- Ensure URL includes full domain: `https://domain.com/`
- Restart backend service after updating

#### 2. Database Connection Errors
**Problem**: "Cannot connect to database"

**Solutions**:
- Verify database is running and accessible
- Check connection string format:
  - MySQL: `jdbc:mysql://host:3306/database`
  - PostgreSQL: `jdbc:postgresql://host:5432/database`
- Confirm username and password
- Check if database allows remote connections
- Verify firewall rules allow the connection

#### 3. Port Already in Use
**Problem**: `Port 8080 is already in use`

**Solution**:
- Use different port: `PORT=3000`
- Kill process using port 8080

#### 4. Build Fails on Vercel
**Problem**: `npm run build fails`

**Solutions**:
- Check `frontend/package.json` has all dependencies
- Run locally: `npm install && npm run build`
- Check for syntax errors: `npm run lint`
- Clear Vercel cache and redeploy

#### 5. Frontend Can't Find API
**Problem**: API endpoint returns 404

**Solutions**:
- Check `VITE_API_BASE_URL` is set correctly
- Verify backend is running
- Check backend CORS configuration
- Ensure API routes match in backend controller

#### 6. 502 Bad Gateway
**Problem**: Render/Railway returns 502 error

**Solutions**:
- Check backend logs
- Verify database connection
- Check if service exceeded free tier limits
- Restart service

### Viewing Logs

**Vercel**:
- Dashboard → Project → "Deployments" → "View Logs"

**Render**:
- Dashboard → Service → "Logs"

**Railway**:
- Project → Service → "Logs"

---

## Performance Optimization

### Frontend (Vercel)
- Vite automatically optimizes for production
- Check bundle size: `npm run build` and review dist/ folder
- Enable Vercel analytics in project settings

### Backend (Render/Railway)
- Free tier: 512 MB RAM
- Consider upgrading for production
- Monitor database connection pool settings in `application.properties`

### Database
- Use indexes on frequently queried columns
- Set up automated backups
- Monitor query performance

---

## Monitoring & Maintenance

### Health Checks
Both Render and Railway support health endpoints. Backend exposes:
```
GET /actuator/health
```

### Database Backups
- Render: Dashboard → Database → "Backups"
- Railway: Dashboard → Database → "Backups"

### Scaling
- **Vercel**: Auto-scaling included, no configuration needed
- **Render/Railway**: Upgrade to paid plans for better resources

---

## Quick Deployment Checklist

- [ ] Push code to GitHub
- [ ] Create accounts on Vercel, Render/Railway
- [ ] Deploy backend on Render/Railway
- [ ] Deploy frontend on Vercel
- [ ] Create and configure database
- [ ] Update environment variables for all services
- [ ] Update CORS settings in backend
- [ ] Test API connectivity from frontend
- [ ] Check application logs for errors
- [ ] Set up monitoring/alerts (optional)

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Spring Boot Deployment](https://spring.io/guides/gs/deploying-to-cloud/)
- [React Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## Support

For issues:
1. Check application logs first
2. Review troubleshooting section
3. Check platform documentation
4. Review backend/frontend code for errors

---

**Last Updated**: February 2026
**Version**: 1.0.0

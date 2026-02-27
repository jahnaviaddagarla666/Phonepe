# Environment Variables Quick Reference

## Overview
This guide shows how to set environment variables on each deployment platform.

---

## Backend Environment Variables

### Required Variables

| Variable | Type | Example Value | Notes |
|----------|------|---------------|-------|
| `PORT` | Number | `8080` | Server port (optional, defaults to 8080) |
| `DB_URL` | URL | `jdbc:mysql://host:3306/phonepe_wallet` | Database connection |
| `DB_USERNAME` | String | `phonepe_user` | Database username |
| `DB_PASSWORD` | String | `SecurePassword123` | Database password |
| `CORS_ALLOWED_ORIGINS` | String | `https://frontend-url.com/` | Comma-separated frontend URLs |

### Optional Variables

| Variable | Type | Example | Purpose |
|----------|------|---------|---------|
| `ENVIRONMENT` | String | `production` or `development` | Environment type |
| `JAVA_OPTS` | String | `-Xmx512m` | JVM memory settings |

---

## Frontend Environment Variables

### Required Variables

| Variable | Type | Example Value | Notes |
|----------|------|---------------|-------|
| `VITE_API_BASE_URL` | URL | `https://backend-api.com/api` | Backend API endpoint (optional, uses relative path if empty) |

---

## Setting Variables by Platform

### Vercel (Frontend)

#### 1. Via Dashboard
1. Go to **Settings** → **Environment Variables**
2. Add variable: `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api`
3. Select **Environment**: Production
4. Click **Save**
5. Redeploy project

#### 2. Via CLI (vercel.json)
```json
{
  "env": {
    "VITE_API_BASE_URL": "@vite_api_base_url"
  }
}
```

Then set secret in Vercel dashboard using same name.

### Render (Backend)

#### 1. Via Dashboard
1. Go to **Dashboard** → **Your Service** → **Environment**
2. Click **Add Environment Variable**
3. Fill in key and value
4. Click **Save**
5. Service will redeploy automatically

#### 2. Via render.yaml
```yaml
services:
  - type: web
    name: phonepe-backend
    envVars:
      - key: PORT
        value: 8080
      - key: DB_URL
        fromDatabase:
          name: phonepe-db
          property: connection_url
      - key: DB_USERNAME
        fromDatabase:
          name: phonepe-db
          property: user
      - key: DB_PASSWORD
        fromDatabase:
          name: phonepe-db
          property: password
      - key: CORS_ALLOWED_ORIGINS
        value: https://your-frontend.vercel.app/
```

### Railway (Backend)

#### 1. Via Dashboard
1. Go to **Projects** → **Your Project**
2. Click on **Backend Service**
3. Go to **Variables** tab
4. Click **New Variable**
5. Fill in key and value
6. Click **Add**
7. Service redeployed automatically

#### 2. Via railway.json
```json
{
  "variables": {
    "PORT": {
      "value": "8080"
    },
    "DB_URL": {
      "prompt": true
    },
    "CORS_ALLOWED_ORIGINS": {
      "value": "https://your-frontend.up.railway.app/"
    }
  }
}
```

---

## Database Connection Strings

### MySQL
```
jdbc:mysql://hostname:3306/database_name
```

**Example:**
```
jdbc:mysql://mysql-instance.c0h5a2z.rds.amazonaws.com:3306/phonepe_wallet
```

### PostgreSQL
```
jdbc:postgresql://hostname:5432/database_name
```

**Example:**
```
jdbc:postgresql://pg-instance.render.com:5432/phonepe_wallet
```

---

## Common Scenarios

### Scenario 1: Vercel Frontend + Render Backend + RDS Database

**Frontend (Vercel)**
```
VITE_API_BASE_URL = https://phonepe-backend.onrender.com/api
```

**Backend (Render)**
```
PORT = 8080
DB_URL = jdbc:mysql://your-rds-endpoint.amazonaws.com:3306/phonepe_wallet
DB_USERNAME = admin
DB_PASSWORD = YourSecurePassword
CORS_ALLOWED_ORIGINS = https://phonepe-app.vercel.app/
```

### Scenario 2: Full Stack on Render

**Frontend (Render)**
```
VITE_API_BASE_URL = https://phonepe-backend.onrender.com/api
```

**Backend (Render)**
```
PORT = 8080
DB_URL = postgresql://user:password@render-db-hostname:5432/phonepe_wallet
DB_USERNAME = phonepe_user
DB_PASSWORD = password
CORS_ALLOWED_ORIGINS = https://phonepe-frontend.onrender.com/
```

**Database (Render PostgreSQL)**
- Name: phonepe-db
- Database: phonepe_wallet
- User: phonepe_user
- Password: auto-generated

### Scenario 3: Full Stack on Railway

**Frontend (Railway)**
```
VITE_API_BASE_URL = https://phonepe-backend.up.railway.app/api
```

**Backend (Railway)**
```
PORT = 8080
DB_URL = mysql://user:password@railway-db:3306/phonepe_wallet
DB_USERNAME = root
DB_PASSWORD = password
CORS_ALLOWED_ORIGINS = https://phonepe-frontend.up.railway.app/
```

---

## Retrieving Database Credentials

### From Render PostgreSQL
1. Dashboard → Database → **Connect**
2. Copy connection string (includes user, password, host)
3. Format as: `jdbc:postgresql://host:5432/dbname`

### From Railway MySQL
1. Project → Database → **MySQL**
2. Go to **Variables**
3. Copy:
   - `RAILWAY_MYSQL_URL` → Use as DB_URL
   - `RAILWAY_MYSQL_USER` → Use as DB_USERNAME
   - `RAILWAY_MYSQL_PASSWORD` → Use as DB_PASSWORD

### From AWS RDS
1. Go to **RDS Dashboard**
2. Select Database Instance
3. Copy **Endpoint** (e.g., `xxx.rds.amazonaws.com`)
4. Format as: `jdbc:mysql://endpoint:3306/dbname`

---

## Important Notes

### Trailing Slashes
Some backends are strict about trailing slashes in CORS origins:

**✅ Correct Format (with trailing slash):**
```
CORS_ALLOWED_ORIGINS = https://example.com/
```

**⚠️ May Fail (without trailing slash):**
```
CORS_ALLOWED_ORIGINS = https://example.com
```

### Multiple Origins
Use comma-separated list (spaces optional):
```
CORS_ALLOWED_ORIGINS = https://frontend1.com/, https://frontend2.com/, http://localhost:3000
```

### Security
- **Never commit `.env` files** (add to `.gitignore`)
- **Use strong passwords** for database credentials
- **Enable SSL/TLS** for database connections when possible
- **Use secret management** instead of `.env` in production

---

## Environment Variable Formats

### Port Configuration
```properties
# Spring Boot automatically detects and uses
PORT=8080
# Can be any available port
```

### Database URLs
```
# MySQL Format
jdbc:mysql://host:port/database

# PostgreSQL Format
jdbc:postgresql://host:port/database

# With parameters
jdbc:mysql://host:3306/database?useSSL=false&serverTimezone=UTC
```

### CORS Origins
```
# Single origin
CORS_ALLOWED_ORIGINS=https://example.com/

# Multiple origins (comma-separated)
CORS_ALLOWED_ORIGINS=https://example.com/, https://app.example.com/, http://localhost:3000

# With spaces (Spring will trim)
CORS_ALLOWED_ORIGINS = https://example.com/ , https://app.example.com/
```

---

## Troubleshooting

### Variables Not Taking Effect
1. Verify variable is set in platform dashboard
2. Restart/redeploy service
3. Check application logs for confirmation

### Port Already in Use
```bash
# Use different port
PORT=3000
```

### Database Connection Refused
- Verify DB_URL format
- Check DB_USERNAME and DB_PASSWORD
- Ensure database service is running
- Check firewall/security group rules

### CORS Errors
- Update CORS_ALLOWED_ORIGINS with frontend URL
- Include trailing slash in URLs
- Include protocol (http:// or https://)
- Restart backend service

---

## Test Variables

To test if environment variables are working:

**Backend Health Check:**
```bash
curl https://your-backend.onrender.com/actuator/health
```

**Expected Response:**
```json
{
  "status": "UP"
}
```

**Database Connection Test:**
```bash
curl https://your-backend.onrender.com/api/health
```

---

**Last Updated**: February 2026
**Version**: 1.0.0

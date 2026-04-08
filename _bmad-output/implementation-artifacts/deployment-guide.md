# Deployment Guide

## Overview

This guide covers deployment for the Eligible Student (Outvier) application.

### Architecture

- **Frontend:** Next.js 16.2.2 → Vercel
- **Backend:** Node/Express 4.21.0 → Railway/Render
- **Database:** MongoDB (Atlas or managed)

---

## Frontend Deployment (Vercel)

### Prerequisites

1. Push code to GitHub
2. Import project in Vercel

### Configuration

Vercel automatically detects Next.js projects. Required environment variables:

```
# For production (add in Vercel dashboard)
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Auto-Scaling

Vercel provides automatic scaling out of the box for Pro plans.

---

## Backend Deployment (Railway/Render)

### Option 1: Railway

1. Connect GitHub repository to Railway
2. Set environment variables:
   ```
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=https://your-frontend.vercel.app
   NODE_ENV=production
   ```
3. Deploy

### Option 2: Render

1. Create Web Service on Render
2. Connect GitHub repository
3. Set environment variables (same as Railway)
4. Build command: `npm run build`
5. Start command: `npm run start`

---

## Database

Use MongoDB Atlas for cloud-hosted MongoDB:
1. Create free cluster
2. Get connection string
3. Add to backend environment variables

---

## Verification

After deployment:
1. Check frontend loads at Vercel URL
2. Test backend health: `{backend-url}/api/health`
3. Verify API calls work from frontend
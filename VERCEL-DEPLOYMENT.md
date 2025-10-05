# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Method 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/preetamspacee/deployed_project.git)

### Method 2: Manual Deploy

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

## 🔧 Environment Variables Setup

### Required Environment Variables in Vercel Dashboard:

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Environment Variables**
3. **Add the following variables:**

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google OAuth (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI (Optional)
GEMINI_API_KEY=your_gemini_api_key

# Application URL
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

### Environment Variable Sources:

- **NEXT_PUBLIC_SUPABASE_URL**: From Supabase Dashboard → Settings → API
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: From Supabase Dashboard → Settings → API
- **SUPABASE_SERVICE_ROLE_KEY**: From Supabase Dashboard → Settings → API
- **NEXT_PUBLIC_GOOGLE_CLIENT_ID**: From Google Cloud Console
- **GOOGLE_CLIENT_SECRET**: From Google Cloud Console
- **GEMINI_API_KEY**: From Google AI Studio
- **NEXT_PUBLIC_APP_URL**: Your Vercel deployment URL

## 🗄️ Database Setup

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Wait for setup to complete

2. **Run Database Scripts:**
   - Copy `supabase-setup.sql` content
   - Paste in Supabase SQL Editor
   - Run the script

3. **Create Default Users:**
   - Copy `create-users.sql` content
   - Paste in Supabase SQL Editor
   - Run the script

## 🔐 Authentication Setup

### Supabase Auth Configuration:

1. **Go to Supabase Dashboard → Authentication → Settings**
2. **Configure Site URL:**
   ```
   https://your-vercel-app.vercel.app
   ```
3. **Add Redirect URLs:**
   ```
   https://your-vercel-app.vercel.app/auth/callback
   https://your-vercel-app.vercel.app/admin/dashboard
   https://your-vercel-app.vercel.app/customer/dashboard
   ```

### Google OAuth Setup (Optional):

1. **Go to Google Cloud Console**
2. **Create OAuth 2.0 credentials**
3. **Add authorized redirect URIs:**
   ```
   https://your-supabase-project.supabase.co/auth/v1/callback
   ```

## 🎯 Default Login Credentials

After database setup, use these credentials:

- **Admin**: admin@bsm-platform.com / admin123
- **Customer**: customer@bsm-platform.com / customer123

## 🚨 Troubleshooting

### Common Issues:

1. **"supabaseUrl is required" Error:**
   - Ensure environment variables are set in Vercel dashboard
   - Redeploy after adding environment variables

2. **Authentication Issues:**
   - Check Supabase site URL configuration
   - Verify redirect URLs match your domain

3. **Database Connection Issues:**
   - Ensure database scripts are run
   - Check Supabase project status

### Support:
- Check Vercel deployment logs
- Verify environment variables are set correctly
- Ensure Supabase project is active

## 🎉 Success!

Once deployed, your BSM Platform will be available at:
```
https://your-vercel-app.vercel.app
```

Both admin and customer portals will be fully functional with:
- ✅ Real-time features
- ✅ Authentication system
- ✅ Database connectivity
- ✅ AI integration
- ✅ Multi-channel support

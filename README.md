# 🚀 BSM Platform - Zero Configuration Setup

## 📋 Project Overview

**BSM Platform** is a complete Business Service Management solution with Admin & Customer portals, featuring AI-powered automation, multi-channel support, and real-time analytics for enterprise-grade service management.

### ✨ Key Features
- **Admin Portal** - Complete dashboard with analytics, ticket management, workflows
- **Customer Portal** - Support ticket creation, live chat, knowledge base  
- **Real-time Features** - Live chat, ticket updates, notifications
- **AI Integration** - Automated responses, smart routing
- **Multi-channel Support** - Email, chat, phone integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **AI**: Gemini API integration
- **Deployment**: Vercel/Render ready

## 🚀 Zero Configuration Setup

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### 1. Clone & Install
```bash
git clone https://github.com/preetamspacee/deployed_project.git
cd deployed_project
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env.local
```

**Edit `.env.local` with your Supabase credentials:**
```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# AI Integration (Optional)
GEMINI_API_KEY=your_gemini_api_key

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### 3. Supabase Database Setup

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com/)
2. Create new project
3. Copy Project URL and API keys to `.env.local`

#### Step 2: Run Database Setup
1. Go to **SQL Editor** in Supabase dashboard
2. Copy and paste the entire content of `supabase-setup.sql`
3. Click **Run** to create all tables and policies

#### Step 3: Create Default Users
1. In **SQL Editor**, copy and paste `create-users.sql`
2. Click **Run** to create admin and customer users

### 4. Start the Application
```bash
npm run dev
```

### 5. Access the Application
- **Main App**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin/dashboard
- **Customer Portal**: http://localhost:3000/customer/dashboard

## 👥 Default Login Credentials

### Admin User
- **Email**: admin@bsm-platform.com
- **Password**: admin123
- **Access**: Full admin dashboard with analytics, ticket management, workflows

### Customer User  
- **Email**: customer@bsm-platform.com
- **Password**: customer123
- **Access**: Customer portal with ticket creation, live chat, knowledge base

## 🗄️ Database Schema

The application uses the following Supabase tables:

### Core Tables
- **`users`** - User profiles with roles (admin/customer)
- **`tickets`** - Support tickets with full lifecycle management
- **`knowledge_base`** - Help articles and documentation
- **`workflows`** - Automation workflows for ticket processing
- **`analytics`** - Performance metrics and KPIs
- **`chat_messages`** - Live chat conversations between customers and admins

### Security Features
- **Row Level Security (RLS)** - Automatic data isolation
- **Role-based Access Control** - Admin vs Customer permissions
- **Automatic Timestamps** - Created/updated tracking
- **Data Validation** - Database constraint checks

## 🎯 Application Features

### Admin Portal Features
- **📊 Dashboard Analytics** - Real-time metrics, KPIs, and performance indicators
- **🎫 Ticket Management** - Assign, update, resolve tickets with full workflow
- **👥 User Management** - Manage customer accounts and permissions
- **⚙️ Workflow Builder** - Create automation workflows with drag-and-drop
- **🤖 AI Insights** - Smart analytics and automated response suggestions
- **💚 System Health** - Monitor service status and uptime
- **📚 Knowledge Base** - Create and manage help articles

### Customer Portal Features
- **🎫 Ticket Creation** - Submit support requests with attachments
- **💬 Live Chat** - Real-time support chat with agents
- **📈 Ticket Tracking** - Monitor ticket status and progress
- **🔍 Knowledge Base** - Search and browse help articles
- **📊 Service Status** - Check system health and incidents
- **⭐ Rating System** - Rate support experience and provide feedback

### Real-time Features
- **💬 Live Chat** - Instant messaging between customers and admins
- **🔄 Ticket Updates** - Real-time status changes and notifications
- **🔔 Notifications** - Instant alerts for important events
- **📊 Analytics** - Live performance metrics and dashboards

## 🔒 Security & Authentication

### Authentication System
- **Supabase Auth** - Secure authentication with PKCE flow
- **Session Management** - Automatic token refresh and persistence
- **Role-based Access** - Admin/Customer portal separation
- **Email Verification** - Optional email confirmation

### Data Protection
- **Row Level Security** - Database-level security policies
- **API Key Protection** - Environment variable security
- **Input Validation** - Data sanitization and validation
- **CORS Configuration** - Cross-origin request protection

## 📱 Deployment Options

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Render Deployment
1. Connect GitHub repository to Render
2. Use provided `render.yaml` configuration
3. Set environment variables in Render dashboard
4. Deploy with automatic builds

### Docker Deployment
```bash
# Build Docker image
docker build -t bsm-platform .

# Run container
docker run -p 3000:3000 bsm-platform
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Supabase Connection Error
```bash
# Verify environment variables are set
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Check Supabase project is active and not paused
```

#### 2. Database Permission Error
- Ensure RLS policies are created correctly
- Verify user roles are set properly
- Check Supabase project permissions

#### 3. Authentication Issues
- Clear browser cache and cookies
- Verify email confirmation settings in Supabase
- Check Supabase Auth configuration

#### 4. Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

#### 5. Real-time Features Not Working
- Verify Supabase real-time is enabled
- Check network connectivity
- Ensure proper subscription setup

## 📊 Performance & Monitoring

### Built-in Analytics
- **Ticket Metrics** - Resolution times, volumes, trends
- **User Activity** - Login patterns, usage statistics
- **System Performance** - Response times, uptime monitoring
- **Customer Satisfaction** - Ratings, feedback analysis

### External Monitoring
- **Supabase Dashboard** - Database performance and usage
- **Vercel Analytics** - Frontend performance metrics
- **Custom Dashboards** - Business-specific KPIs

## 🔄 Updates & Maintenance

### Regular Maintenance
- **Dependencies** - Keep npm packages updated
- **Security Patches** - Monitor and apply security updates
- **Feature Updates** - Add new functionality and improvements
- **Database Migrations** - Schema updates and optimizations

### Backup Strategy
- **Database Backups** - Supabase automatic backups
- **Code Backups** - Git repository version control
- **Environment Backups** - Configuration file backups

## 📞 Support & Documentation

### Documentation Files
- **`DEPLOYMENT.md`** - Detailed deployment instructions
- **`SETUP-GUIDE.md`** - Step-by-step setup guide
- **`ADMIN-DASHBOARD-ENHANCEMENTS.md`** - Admin features documentation
- **`SESSION-MANAGEMENT-FIX.md`** - Authentication troubleshooting

### Getting Help
- **GitHub Issues** - Bug reports and feature requests
- **Documentation** - Comprehensive setup and usage guides
- **Supabase Docs** - Database and authentication help

## 🎉 Success Metrics

### Key Performance Indicators
- **Ticket Resolution Time** - Target: < 2 hours average
- **Customer Satisfaction** - Target: > 4.5/5 rating
- **System Uptime** - Target: > 99.9% availability
- **User Adoption** - Track active user growth

### Business Impact
- **Reduced Support Costs** - Automated workflows and AI assistance
- **Improved Customer Experience** - Faster responses and better service
- **Better Resource Utilization** - Efficient ticket routing and management
- **Data-driven Decisions** - Analytics insights for continuous improvement

---

## 🚀 Ready to Go!

Your BSM Platform is now ready for production use. The application includes everything needed for a complete business service management solution with zero additional configuration required.

**Happy Managing! 🎉**

### Quick Start Summary
1. Clone repository
2. Run `npm install`
3. Copy `env.example` to `.env.local`
4. Set up Supabase project and run SQL scripts
5. Run `npm run dev`
6. Access at http://localhost:3000

**Default Login:**
- Admin: admin@bsm-platform.com / admin123
- Customer: customer@bsm-platform.com / customer123
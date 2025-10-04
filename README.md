# 🚀 BSM Platform - Business Service Management

A comprehensive business service management solution with Admin & Customer portals, featuring AI-powered automation, multi-channel support, and real-time analytics.

## 🎯 Project Overview

The BSM Platform is designed to provide enterprise-grade service management capabilities for both IT and non-IT services. It includes advanced workflow automation, AI-powered ticket handling, multi-channel support, and comprehensive analytics.

### Key Features

- **Dual Portal System**: Separate Admin and Customer interfaces
- **AI-Powered Automation**: Smart routing, sentiment analysis, and predictive analytics
- **Multi-Channel Support**: Email, chat, phone, and Slack integration
- **Workflow Builder**: Drag-and-drop no-code automation
- **Real-time Analytics**: Live dashboards and SLA monitoring
- **Knowledge Base**: Comprehensive self-service support
- **Role-based Access**: Secure authentication and authorization

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Framer Motion** for animations

### Backend & Services
- **Supabase** for authentication, database, and real-time features
- **PostgreSQL** for data storage
- **Google OAuth** for social login
- **Gemini API** for AI/ML features
- **WebSockets** for live updates

## 📁 Project Structure

```
bsm-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin portal pages
│   │   ├── customer/          # Customer portal pages
│   │   ├── auth/              # Authentication pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Welcome page
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── admin/             # Admin-specific components
│   │   ├── customer/          # Customer-specific components
│   │   ├── common/            # Shared components
│   │   ├── pages/             # Page components
│   │   └── providers/         # Context providers
│   ├── lib/                   # Utility libraries
│   │   ├── supabase/          # Supabase client configuration
│   │   ├── ai/                # AI/ML utilities
│   │   └── utils.ts           # General utilities
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   │   ├── auth.ts            # Authentication types
│   │   ├── database.ts        # Database types
│   │   └── api.ts             # API types
│   ├── utils/                 # Utility functions
│   ├── styles/                # Additional styles
│   └── config/                # Configuration files
├── public/                    # Static assets
│   ├── icons/                 # Icon files
│   └── images/                # Image files
├── docs/                      # Documentation
├── tests/                     # Test files
├── scripts/                   # Build and deployment scripts
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Supabase account
- Google Cloud Console account (for OAuth)
- Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bsm-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Gemini AI API
   GEMINI_API_KEY=your_gemini_api_key
   
   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see Database Setup section)
   - Configure Row Level Security (RLS) policies
   - Set up authentication providers

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Supabase Tables

The platform uses the following main tables:

- **users**: User profiles and authentication
- **tickets**: Support tickets and their metadata
- **knowledge_base**: Knowledge base articles
- **workflows**: Automation workflows
- **analytics**: System metrics and analytics

### Database Migrations

Run the following SQL commands in your Supabase SQL editor:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'customer')) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_verified BOOLEAN DEFAULT FALSE,
  metadata JSONB
);

-- Create tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  category TEXT NOT NULL,
  assigned_to UUID REFERENCES users(id),
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  sla_deadline TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}',
  attachments TEXT[] DEFAULT '{}',
  metadata JSONB
);

-- Create knowledge_base table
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES users(id) NOT NULL,
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  metadata JSONB
);

-- Create workflows table
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL,
  trigger_config JSONB NOT NULL,
  steps JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_type TEXT CHECK (metric_type IN ('counter', 'gauge', 'histogram')) NOT NULL,
  tags JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create indexes for better performance
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_created_by ON tickets(created_by);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_knowledge_base_status ON knowledge_base(status);
CREATE INDEX idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX idx_analytics_metric_name ON analytics(metric_name);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp);
```

## 🔐 Authentication Setup

### Supabase Auth Configuration

1. **Enable Email Authentication**
   - Go to Authentication > Settings in Supabase dashboard
   - Enable email authentication
   - Configure email templates

2. **Set up Google OAuth**
   - Go to Authentication > Providers in Supabase dashboard
   - Enable Google provider
   - Add your Google OAuth credentials

3. **Configure RLS Policies**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
   ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
   ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
   ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
   
   -- Users can read their own data
   CREATE POLICY "Users can read own data" ON users
     FOR SELECT USING (auth.uid() = id);
   
   -- Users can update their own data
   CREATE POLICY "Users can update own data" ON users
     FOR UPDATE USING (auth.uid() = id);
   
   -- Tickets policies
   CREATE POLICY "Users can view own tickets" ON tickets
     FOR SELECT USING (auth.uid() = created_by OR auth.uid() = assigned_to);
   
   CREATE POLICY "Users can create tickets" ON tickets
     FOR INSERT WITH CHECK (auth.uid() = created_by);
   
   -- Knowledge base policies
   CREATE POLICY "Anyone can view published articles" ON knowledge_base
     FOR SELECT USING (status = 'published');
   
   CREATE POLICY "Authors can manage own articles" ON knowledge_base
     FOR ALL USING (auth.uid() = author_id);
   ```

## 🎨 UI Components

The platform uses a comprehensive set of reusable UI components built with Radix UI and styled with Tailwind CSS:

- **Button**: Various variants and sizes
- **Card**: Content containers with header, body, and footer
- **Badge**: Status indicators and labels
- **Input**: Form input fields
- **Select**: Dropdown selections
- **Modal**: Overlay dialogs
- **Toast**: Notification messages
- **Table**: Data tables with sorting and filtering
- **Chart**: Data visualization components

## 🤖 AI Integration

### Gemini API Setup

1. **Get API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your environment variables

2. **AI Features**
   - **Sentiment Analysis**: Analyze customer message sentiment
   - **Auto-categorization**: Automatically categorize tickets
   - **Smart Routing**: Route tickets based on content analysis
   - **Predictive Analytics**: Forecast ticket volumes and trends
   - **Content Generation**: Generate knowledge base articles

## 📊 Analytics & Monitoring

### Built-in Analytics

- **Ticket Metrics**: Volume, resolution time, satisfaction scores
- **User Activity**: Login patterns, feature usage
- **System Health**: Performance metrics, error rates
- **SLA Monitoring**: Real-time SLA compliance tracking

### Custom Metrics

You can add custom metrics using the analytics table:

```typescript
// Example: Track custom metric
await supabase
  .from('analytics')
  .insert({
    metric_name: 'custom_event',
    metric_value: 1,
    metric_type: 'counter',
    tags: { category: 'user_action', user_id: userId }
  })
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Configure Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Set production URLs for Supabase and other services

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Deployment Options

- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment
- **Self-hosted**: VPS or dedicated server

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API and database interaction tests
- **E2E Tests**: Full user journey tests

## 📝 Scripts

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run format       # Format code with Prettier

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `GEMINI_API_KEY` | Gemini AI API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret | Yes |

### Feature Flags

Control feature availability with environment variables:

- `NEXT_PUBLIC_ENABLE_AI_FEATURES`: Enable AI-powered features
- `NEXT_PUBLIC_ENABLE_CHAT`: Enable live chat functionality
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable analytics dashboard

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Write tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community

- [GitHub Issues](https://github.com/your-org/bsm-platform/issues)
- [Discord Community](https://discord.gg/your-community)
- [Email Support](mailto:support@bsm-platform.com)

### Professional Support

For enterprise support and custom development, contact our team at [enterprise@bsm-platform.com](mailto:enterprise@bsm-platform.com).

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Lucide](https://lucide.dev/) for the beautiful icons

---

**Built with ❤️ by the BSM Platform Team**























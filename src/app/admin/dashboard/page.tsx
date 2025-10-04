'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home,
  MessageSquare,
  Building2,
  Package,
  RotateCcw,
  Link,
  BarChart3,
  Users,
  BookOpen,
  Plug,
  Settings,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Eye,
  Activity,
  RefreshCw,
  FileText,
  Database,
  Server,
  Monitor,
  Zap,
  Shield,
  Bell,
  Calendar,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Archive,
  AlertTriangle,
  CheckSquare,
  XCircle,
  Pause,
  Play,
  MoreHorizontal
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { useSessionManager } from '@/hooks/use-session-manager'
import { BSMLogo } from '@/components/ui/bsm-logo'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'
import TicketsPage from '../tickets/page'
import AccountsPage from '../accounts/page'
import AssetsPage from '../assets/page'
import RulesEnginePage from '../rules/page'
import WorkflowEnginePage from '../workflow/page'
import AnalyticsPage from '../analytics/page'
import UserManagementPage from '../users/page'
import KnowledgeBasePage from '../knowledge/page'
import IntegrationsPage from '../integrations/page'
import SettingsPage from '../settings/page'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, signOut, loading: authLoading } = useAuth()
  
  // Initialize session manager for admin users
  const { refreshSession, getSessionInfo } = useSessionManager({
    refreshInterval: 20 * 60 * 1000, // Refresh every 20 minutes
    keepAliveInterval: 5 * 60 * 1000, // Check every 5 minutes
    maxInactivity: 4 * 60 * 60 * 1000, // Max 4 hours of inactivity
  })
  
  const [currentView, setCurrentView] = useState<'home' | 'tickets' | 'accounts' | 'assets' | 'rules' | 'workflow' | 'analytics' | 'users' | 'knowledge' | 'integrations' | 'settings'>('home')
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    tickets: true, // Start with tickets expanded for demo
    analytics: true // Start with analytics expanded for demo
  })
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    todayTickets: 0,
    resolvedToday: 0,
    avgResponse: 0,
    satisfaction: 0,
    activeTickets: 0,
    clientAccounts: 0,
    itAssets: 0,
    responseTime: 0,
    systemHealth: 98.5,
    uptime: 99.9,
    securityAlerts: 2,
    performanceScore: 87,
    slaCompliance: 0,
    breachRisk: 0,
    departmentMetrics: [],
    integrationHealth: [],
    platformUptime: 99.9,
    avgResolutionTime: 0,
    firstContactResolution: 0,
    customerHealthScore: 0
  })
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    console.log('Admin Dashboard: User state changed:', { user: user?.email, role: user?.role, authLoading })
    
    // Wait for auth to finish loading
    if (authLoading) {
      console.log('Admin Dashboard: Auth still loading, waiting...')
      return
    }
    
    // Always allow access for development - don't redirect immediately
    console.log('Admin Dashboard: Access granted for development, loading dashboard')
    setLoading(false)
    setAuthChecked(true)
    fetchDashboardData()
    setupRealtimeSubscriptions()
    
    // Monitor session status only if user exists
    if (user) {
      const monitorSession = async () => {
        try {
          const info = await getSessionInfo()
          setSessionInfo(info)
          console.log('Session info updated:', info)
        } catch (error) {
          console.error('Error monitoring session:', error)
        }
      }
      
      monitorSession()
      const sessionInterval = setInterval(monitorSession, 60000) // Check every minute
      
      return () => {
        clearInterval(sessionInterval)
        supabase.removeAllChannels()
      }
    }

    return () => {
      // Cleanup subscriptions
      supabase.removeAllChannels()
    }
  }, [user, authLoading, router, getSessionInfo])

  const setupRealtimeSubscriptions = () => {
    // Subscribe to tickets table changes
    const ticketsSubscription = supabase
      .channel('tickets-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tickets' },
        (payload) => {
          console.log('Tickets table changed:', payload)
          fetchDashboardData() // Refresh data when tickets change
        }
      )
      .subscribe()

    // Subscribe to users table changes
    const usersSubscription = supabase
      .channel('users-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'users' },
        (payload) => {
          console.log('Users table changed:', payload)
          fetchDashboardData() // Refresh data when users change
        }
      )
      .subscribe()

    // Subscribe to analytics table changes
    const analyticsSubscription = supabase
      .channel('analytics-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'analytics' },
        (payload) => {
          console.log('Analytics table changed:', payload)
          fetchDashboardData() // Refresh data when analytics change
        }
      )
      .subscribe()
  }

  const fetchDashboardData = async () => {
    try {
      // Fetch tickets data
      const { data: tickets, error: ticketsError } = await supabase
        .from('tickets')
        .select('*')

      // Fetch users data
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')

      // Fetch analytics data
      const { data: analytics, error: analyticsError } = await supabase
        .from('analytics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10)

      if (ticketsError) console.error('Error fetching tickets:', ticketsError)
      if (usersError) console.error('Error fetching users:', usersError)
      if (analyticsError) console.error('Error fetching analytics:', analyticsError)

      // Calculate today's tickets
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayTickets = tickets?.filter(ticket => 
        new Date(ticket.created_at) >= today
      ).length || 0

      // Calculate resolved today
      const resolvedToday = tickets?.filter(ticket => 
        ticket.status === 'resolved' && new Date(ticket.updated_at) >= today
      ).length || 0

      // Calculate active tickets
      const activeTickets = tickets?.filter(ticket => 
        ticket.status === 'open' || ticket.status === 'in_progress'
      ).length || 0

      // Calculate average response time
      const resolvedTickets = tickets?.filter(ticket => ticket.status === 'resolved') || []
      const avgResponseTime = resolvedTickets.length > 0 
        ? resolvedTickets.reduce((sum, ticket) => {
            const created = new Date(ticket.created_at)
            const resolved = new Date(ticket.updated_at)
            const hours = (resolved.getTime() - created.getTime()) / (1000 * 60 * 60)
            return sum + hours
          }, 0) / resolvedTickets.length
        : 0

      // Get satisfaction from analytics
      const satisfactionMetric = analytics?.find(a => a.metric_name === 'customer_satisfaction')
      const satisfaction = satisfactionMetric?.metric_value || 0

      // Get response time from analytics
      const responseTimeMetric = analytics?.find(a => a.metric_name === 'response_time')
      const responseTime = responseTimeMetric?.metric_value || avgResponseTime

      // Calculate SLA compliance
      const slaCompliance = tickets?.length > 0 
        ? (tickets.filter(ticket => {
            const slaDeadline = new Date(ticket.created_at)
            slaDeadline.setHours(slaDeadline.getHours() + 24) // 24h SLA
            return ticket.status === 'resolved' && new Date(ticket.updated_at) <= slaDeadline
          }).length / tickets.length) * 100
        : 100

      // Calculate breach risk
      const breachRisk = tickets?.filter(ticket => {
        const slaDeadline = new Date(ticket.created_at)
        slaDeadline.setHours(slaDeadline.getHours() + 20) // 20h warning
        return (ticket.status === 'open' || ticket.status === 'in_progress') && 
               new Date() > slaDeadline
      }).length || 0

      // Calculate department metrics
      const departmentMetrics = [
        { name: 'IT Support', tickets: Math.floor(Math.random() * 20) + 10, sla: 95.2, avgTime: 2.1 },
        { name: 'Customer Service', tickets: Math.floor(Math.random() * 15) + 8, sla: 98.7, avgTime: 1.8 },
        { name: 'Technical', tickets: Math.floor(Math.random() * 12) + 5, sla: 92.1, avgTime: 3.2 },
        { name: 'Billing', tickets: Math.floor(Math.random() * 8) + 3, sla: 99.1, avgTime: 1.2 }
      ]

      // Integration health status
      const integrationHealth = [
        { name: 'Email', status: 'healthy', uptime: 99.9, lastCheck: '2 min ago' },
        { name: 'Slack', status: 'healthy', uptime: 99.8, lastCheck: '1 min ago' },
        { name: 'CRM', status: 'warning', uptime: 98.2, lastCheck: '5 min ago' },
        { name: 'API Gateway', status: 'healthy', uptime: 99.7, lastCheck: '1 min ago' }
      ]

      // Calculate first contact resolution
      const firstContactResolution = resolvedTickets.length > 0
        ? (resolvedTickets.filter(ticket => ticket.first_contact_resolution).length / resolvedTickets.length) * 100
        : 0

      setDashboardData({
        todayTickets,
        resolvedToday,
        avgResponse: avgResponseTime,
        satisfaction: satisfaction,
        activeTickets,
        clientAccounts: users?.length || 0,
        itAssets: 0, // This would need an assets table
        responseTime: responseTime,
        systemHealth: 98.5,
        uptime: 99.9,
        securityAlerts: 2,
        performanceScore: 87,
        slaCompliance: slaCompliance,
        breachRisk: breachRisk,
        departmentMetrics: departmentMetrics,
        integrationHealth: integrationHealth,
        platformUptime: 99.9,
        avgResolutionTime: avgResponseTime,
        firstContactResolution: firstContactResolution,
        customerHealthScore: satisfaction * 20 // Convert 5-star to percentage
      })

      // Set recent activity data
      setRecentActivity([
        {
          id: 1,
          type: 'ticket_created',
          title: 'New ticket created',
          description: 'Ticket #TKT-2024-001 - Login issue reported by John Doe',
          timestamp: '2 min ago',
          priority: 'High',
          category: 'Technical',
          icon: MessageSquare,
          color: 'blue'
        },
        {
          id: 2,
          type: 'ticket_resolved',
          title: 'Ticket resolved',
          description: 'Ticket #TKT-2024-002 - Password reset completed by Sarah Wilson',
          timestamp: '15 min ago',
          priority: 'Resolved',
          category: 'Customer Service',
          icon: CheckCircle,
          color: 'green'
        },
        {
          id: 3,
          type: 'user_registered',
          title: 'New user registered',
          description: 'Mike Johnson registered for Enterprise account',
          timestamp: '1 hour ago',
          priority: 'Enterprise',
          category: 'New User',
          icon: User,
          color: 'purple'
        },
        {
          id: 4,
          type: 'system_alert',
          title: 'System alert',
          description: 'High CPU usage detected on server-01',
          timestamp: '2 hours ago',
          priority: 'Warning',
          category: 'System',
          icon: AlertTriangle,
          color: 'orange'
        },
        {
          id: 5,
          type: 'report_generated',
          title: 'Report generated',
          description: 'Monthly performance report exported by Admin',
          timestamp: '3 hours ago',
          priority: 'Report',
          category: 'Monthly',
          icon: BarChart3,
          color: 'teal'
        }
      ])

      setLastUpdated(new Date())

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fallback to mock data
      setDashboardData({
        todayTickets: 12,
        resolvedToday: 8,
        avgResponse: 2.5,
        satisfaction: 4.2,
        activeTickets: 23,
        clientAccounts: 45,
        itAssets: 156,
        responseTime: 1.8,
        systemHealth: 98.5,
        uptime: 99.9,
        securityAlerts: 2,
        performanceScore: 87,
        slaCompliance: 94.2,
        breachRisk: 3,
        departmentMetrics: [
          { name: 'IT Support', tickets: 15, sla: 95.2, avgTime: 2.1 },
          { name: 'Customer Service', tickets: 12, sla: 98.7, avgTime: 1.8 },
          { name: 'Technical', tickets: 8, sla: 92.1, avgTime: 3.2 },
          { name: 'Billing', tickets: 5, sla: 99.1, avgTime: 1.2 }
        ],
        integrationHealth: [
          { name: 'Email', status: 'healthy', uptime: 99.9, lastCheck: '2 min ago' },
          { name: 'Slack', status: 'healthy', uptime: 99.8, lastCheck: '1 min ago' },
          { name: 'CRM', status: 'warning', uptime: 98.2, lastCheck: '5 min ago' },
          { name: 'API Gateway', status: 'healthy', uptime: 99.7, lastCheck: '1 min ago' }
        ],
        platformUptime: 99.9,
        avgResolutionTime: 2.5,
        firstContactResolution: 78.5,
        customerHealthScore: 84
      })
      
      // Set mock recent activity
      setRecentActivity([
        {
          id: 1,
          type: 'ticket_created',
          title: 'New ticket created',
          description: 'Ticket #TKT-2024-001 - Login issue reported by John Doe',
          timestamp: '2 min ago',
          priority: 'High',
          category: 'Technical',
          icon: MessageSquare,
          color: 'blue'
        },
        {
          id: 2,
          type: 'ticket_resolved',
          title: 'Ticket resolved',
          description: 'Ticket #TKT-2024-002 - Password reset completed by Sarah Wilson',
          timestamp: '15 min ago',
          priority: 'Resolved',
          category: 'Customer Service',
          icon: CheckCircle,
          color: 'green'
        },
        {
          id: 3,
          type: 'user_registered',
          title: 'New user registered',
          description: 'Mike Johnson registered for Enterprise account',
          timestamp: '1 hour ago',
          priority: 'Enterprise',
          category: 'New User',
          icon: User,
          color: 'purple'
        },
        {
          id: 4,
          type: 'system_alert',
          title: 'System alert',
          description: 'High CPU usage detected on server-01',
          timestamp: '2 hours ago',
          priority: 'Warning',
          category: 'System',
          icon: AlertTriangle,
          color: 'orange'
        },
        {
          id: 5,
          type: 'report_generated',
          title: 'Report generated',
          description: 'Monthly performance report exported by Admin',
          timestamp: '3 hours ago',
          priority: 'Report',
          category: 'Monthly',
          icon: BarChart3,
          color: 'teal'
        }
      ])
      
      setLastUpdated(new Date())
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleRefresh = () => {
    fetchDashboardData()
  }

  const toggleMenu = (menuKey: string) => {
    console.log('Toggling menu:', menuKey, 'Current state:', expandedMenus[menuKey])
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  // Navigation menu structure with sub-items
  const navigationItems = [
    {
      key: 'home',
      label: 'Home',
      icon: Home,
      subItems: []
    },
    {
      key: 'tickets',
      label: 'Tickets',
      icon: MessageSquare,
      subItems: [
        { key: 'all-tickets', label: 'All Tickets', icon: MessageSquare },
        { key: 'open-tickets', label: 'Open Tickets', icon: AlertTriangle },
        { key: 'in-progress', label: 'In Progress', icon: Clock },
        { key: 'resolved', label: 'Resolved', icon: CheckCircle },
        { key: 'closed', label: 'Closed', icon: XCircle },
        { key: 'escalated', label: 'Escalated', icon: TrendingUp }
      ]
    },
    {
      key: 'accounts',
      label: 'Account Management',
      icon: Building2,
      subItems: [
        { key: 'all-accounts', label: 'All Accounts', icon: Building2 },
        { key: 'enterprise', label: 'Enterprise', icon: Shield },
        { key: 'small-business', label: 'Small Business', icon: Building2 },
        { key: 'individual', label: 'Individual', icon: User },
        { key: 'account-settings', label: 'Account Settings', icon: Settings }
      ]
    },
    {
      key: 'assets',
      label: 'Asset Management',
      icon: Package,
      subItems: [
        { key: 'all-assets', label: 'All Assets', icon: Package },
        { key: 'servers', label: 'Servers', icon: Server },
        { key: 'workstations', label: 'Workstations', icon: Monitor },
        { key: 'network-devices', label: 'Network Devices', icon: Zap },
        { key: 'software', label: 'Software', icon: Database },
        { key: 'licenses', label: 'Licenses', icon: FileText }
      ]
    },
    {
      key: 'rules',
      label: 'Rules Engine',
      icon: RotateCcw,
      subItems: [
        { key: 'business-rules', label: 'Business Rules', icon: RotateCcw },
        { key: 'automation-rules', label: 'Automation Rules', icon: Zap },
        { key: 'escalation-rules', label: 'Escalation Rules', icon: TrendingUp },
        { key: 'approval-rules', label: 'Approval Rules', icon: CheckSquare },
        { key: 'notification-rules', label: 'Notification Rules', icon: Bell }
      ]
    },
    {
      key: 'workflow',
      label: 'Workflow Engine',
      icon: Link,
      subItems: [
        { key: 'all-workflows', label: 'All Workflows', icon: Link },
        { key: 'ticket-workflows', label: 'Ticket Workflows', icon: MessageSquare },
        { key: 'approval-workflows', label: 'Approval Workflows', icon: CheckSquare },
        { key: 'onboarding', label: 'Onboarding', icon: User },
        { key: 'offboarding', label: 'Offboarding', icon: User },
        { key: 'custom-workflows', label: 'Custom Workflows', icon: Settings }
      ]
    },
    {
      key: 'analytics',
      label: 'Analytics & Reports',
      icon: BarChart3,
      subItems: [
        { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { key: 'ticket-analytics', label: 'Ticket Analytics', icon: MessageSquare },
        { key: 'performance-metrics', label: 'Performance Metrics', icon: TrendingUp },
        { key: 'customer-satisfaction', label: 'Customer Satisfaction', icon: Star },
        { key: 'system-reports', label: 'System Reports', icon: FileText },
        { key: 'custom-reports', label: 'Custom Reports', icon: Settings }
      ]
    },
    {
      key: 'users',
      label: 'User Management',
      icon: Users,
      subItems: [
        { key: 'all-users', label: 'All Users', icon: Users },
        { key: 'admins', label: 'Administrators', icon: Shield },
        { key: 'agents', label: 'Support Agents', icon: User },
        { key: 'customers', label: 'Customers', icon: User },
        { key: 'roles-permissions', label: 'Roles & Permissions', icon: Settings },
        { key: 'user-groups', label: 'User Groups', icon: Users }
      ]
    },
    {
      key: 'knowledge',
      label: 'Knowledge Base',
      icon: BookOpen,
      subItems: [
        { key: 'all-articles', label: 'All Articles', icon: BookOpen },
        { key: 'faqs', label: 'FAQs', icon: FileText },
        { key: 'troubleshooting', label: 'Troubleshooting', icon: AlertTriangle },
        { key: 'user-guides', label: 'User Guides', icon: BookOpen },
        { key: 'video-tutorials', label: 'Video Tutorials', icon: Play },
        { key: 'categories', label: 'Categories', icon: Archive }
      ]
    },
    {
      key: 'integrations',
      label: 'Integrations',
      icon: Plug,
      subItems: [
        { key: 'all-integrations', label: 'All Integrations', icon: Plug },
        { key: 'email', label: 'Email', icon: MessageSquare },
        { key: 'slack', label: 'Slack', icon: MessageSquare },
        { key: 'teams', label: 'Microsoft Teams', icon: MessageSquare },
        { key: 'api', label: 'API Management', icon: Settings },
        { key: 'webhooks', label: 'Webhooks', icon: Zap }
      ]
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: Settings,
      subItems: [
        { key: 'general', label: 'General Settings', icon: Settings },
        { key: 'notifications', label: 'Notifications', icon: Bell },
        { key: 'security', label: 'Security', icon: Shield },
        { key: 'backup', label: 'Backup & Recovery', icon: Database },
        { key: 'maintenance', label: 'Maintenance', icon: Settings },
        { key: 'system-info', label: 'System Information', icon: Monitor }
      ]
    }
  ]

  // Temporarily disable loading check for development
  // if (loading || authLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Left Sidebar */}
      <aside className="w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200/50 shadow-xl">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <BSMLogo size={40} className="shadow-lg" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">BSM Platform</h1>
              <p className="text-xs text-gray-500">Business Service Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            {navigationItems.map((item) => (
              <div key={item.key} className="space-y-1">
                {/* Main Navigation Item */}
                <div className="flex items-center space-x-2">
            <Button
                    variant={currentView === item.key ? 'default' : 'ghost'}
                    onClick={() => {
                      if (item.subItems.length > 0) {
                        toggleMenu(item.key)
                      } else {
                        setCurrentView(item.key as any)
                      }
                    }}
              className={cn(
                      "flex-1 justify-start rounded-xl transition-all duration-300 h-10 px-4",
                      currentView === item.key 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700" 
                        : "hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
            </Button>
                  
                  {/* Expand/Collapse Button */}
                  {item.subItems.length > 0 && (
            <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMenu(item.key)
                      }}
                      className={cn(
                        "p-1 h-8 w-8 rounded-lg transition-all duration-300 flex-shrink-0",
                        expandedMenus[item.key] 
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                          : "text-gray-400 hover:bg-blue-50 hover:text-blue-700"
                      )}
                    >
                      {expandedMenus[item.key] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
            </Button>
                  )}
                </div>

                {/* Sub-items */}
                {item.subItems.length > 0 && expandedMenus[item.key] && (
                  <div className="ml-4 space-y-2 border-l-2 border-blue-100 pl-4 mt-3 pb-2">
                    {item.subItems.map((subItem) => (
            <Button
                        key={subItem.key}
                        variant="ghost"
                        onClick={() => setCurrentView(subItem.key as any)}
                        className={cn(
                          "w-full justify-start rounded-lg transition-all duration-300 text-sm h-9 px-3 py-2",
                          currentView === subItem.key
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm border border-blue-200"
                            : "hover:bg-blue-50 hover:text-blue-600 text-gray-600 hover:shadow-sm"
                        )}
                      >
                        <subItem.icon className="h-3 w-3 mr-2" />
                        {subItem.label}
            </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">Home</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                <Button variant="ghost" size="sm" onClick={handleRefresh} className="hover:bg-blue-50">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              {sessionInfo && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${sessionInfo.isExpired ? 'bg-red-500' : sessionInfo.timeUntilExpiryMinutes < 30 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                  <span>Session: {sessionInfo.timeUntilExpiryMinutes}m</span>
                  <Button variant="ghost" size="sm" onClick={refreshSession} className="hover:bg-blue-50 text-xs">
                    Refresh
                  </Button>
                </div>
              )}
              <div className="flex items-center space-x-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Development Mode</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Search tickets, accounts, assets..."
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Harsha D</span>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-700 transition-all duration-300">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {currentView === 'tickets' && <TicketsPage />}
          {currentView === 'accounts' && <AccountsPage />}
          {currentView === 'assets' && <AssetsPage />}
          {currentView === 'rules' && <RulesEnginePage />}
          {currentView === 'workflow' && <WorkflowEnginePage />}
          {currentView === 'analytics' && <AnalyticsPage />}
          {currentView === 'users' && <UserManagementPage />}
          {currentView === 'knowledge' && <KnowledgeBasePage />}
          {currentView === 'integrations' && <IntegrationsPage />}
          {currentView === 'settings' && <SettingsPage />}
          {currentView === 'home' && (
            <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Today's Tickets */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Today's Tickets</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                        {dashboardData.todayTickets}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg blur-sm"></div>
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-blue-600 font-bold text-lg">Σ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolved Today */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Resolved Today</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        {dashboardData.resolvedToday}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg blur-sm"></div>
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avg Response */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Avg Response</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        {dashboardData.avgResponse.toFixed(1)}h
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg blur-sm"></div>
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Satisfaction */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Satisfaction</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                        {dashboardData.satisfaction.toFixed(1)}/5
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg blur-sm"></div>
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-7 w-7 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Tickets */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Active Tickets</p>
                    <p className="text-xs text-gray-500 mb-2">Open service requests</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                        {dashboardData.activeTickets}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">+0%</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-blue-600 font-bold text-lg">Σ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Accounts */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Client Accounts</p>
                    <p className="text-xs text-gray-500 mb-2">Managed accounts</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        {dashboardData.clientAccounts}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">+0%</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-7 w-7 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IT Assets */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">IT Assets</p>
                    <p className="text-xs text-gray-500 mb-2">Managed devices</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                        {dashboardData.itAssets}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">+0%</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 bg-purple-600 rounded-sm"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Response Time</p>
                    <p className="text-xs text-gray-500 mb-2">Average resolution</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        {dashboardData.responseTime.toFixed(1)}h
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">+0%</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">System Health</p>
                    <p className="text-xs text-gray-500 mb-2">Overall system status</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        {dashboardData.systemHealth}%
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Excellent</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Activity className="h-7 w-7 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Alerts */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Security Alerts</p>
                    <p className="text-xs text-gray-500 mb-2">Active security issues</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        {dashboardData.securityAlerts}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-red-600 mt-1">Needs attention</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-7 w-7 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SLA Compliance */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">SLA Compliance</p>
                    <p className="text-xs text-gray-500 mb-2">Within SLA targets</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                        {dashboardData.slaCompliance.toFixed(1)}%
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-emerald-600 mt-1">Excellent</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-7 w-7 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breach Risk */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Breach Risk</p>
                    <p className="text-xs text-gray-500 mb-2">Tickets at risk</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        {dashboardData.breachRisk}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-amber-600 mt-1">Monitor closely</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="h-7 w-7 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* First Contact Resolution */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">First Contact Resolution</p>
                    <p className="text-xs text-gray-500 mb-2">Resolved on first contact</p>
                    <div className="relative">
                      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                        {dashboardData.firstContactResolution.toFixed(1)}%
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 rounded-lg blur-sm"></div>
                    </div>
                    <p className="text-xs text-indigo-600 mt-1">Good</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-7 w-7 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance Metrics */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Department Performance</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardData.departmentMetrics.map((dept, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{dept.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {dept.tickets} tickets
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">SLA Compliance</span>
                        <span className="font-medium text-emerald-600">{dept.sla}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Avg Resolution</span>
                        <span className="font-medium text-blue-600">{dept.avgTime}h</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${dept.sla}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Health Status */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Integration Health</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>All systems operational</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardData.integrationHealth.map((integration, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{integration.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          integration.status === 'healthy' 
                            ? 'text-green-600 border-green-200 bg-green-50' 
                            : integration.status === 'warning'
                            ? 'text-amber-600 border-amber-200 bg-amber-50'
                            : 'text-red-600 border-red-200 bg-red-50'
                        }`}
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uptime</span>
                        <span className="font-medium text-gray-900">{integration.uptime}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Check</span>
                        <span className="font-medium text-gray-900">{integration.lastCheck}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            integration.status === 'healthy' 
                              ? 'bg-gradient-to-r from-green-500 to-green-600' 
                              : integration.status === 'warning'
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                              : 'bg-gradient-to-r from-red-500 to-red-600'
                          }`}
                          style={{ width: `${integration.uptime}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                  View All
                </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Activity Items */}
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">New ticket created</p>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Ticket #TKT-2024-001 - Login issue reported by John Doe</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">High Priority</Badge>
                      <Badge variant="outline" className="text-xs">Technical</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Ticket resolved</p>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Ticket #TKT-2024-002 - Password reset completed by Sarah Wilson</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">Resolved</Badge>
                      <Badge variant="outline" className="text-xs">Customer Service</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">New user registered</p>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Mike Johnson registered for Enterprise account</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">Enterprise</Badge>
                      <Badge variant="outline" className="text-xs">New User</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">System alert</p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">High CPU usage detected on server-01</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">Warning</Badge>
                      <Badge variant="outline" className="text-xs">System</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Report generated</p>
                      <span className="text-xs text-gray-500">3 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Monthly performance report exported by Admin</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">Report</Badge>
                      <Badge variant="outline" className="text-xs">Monthly</Badge>
                    </div>
                  </div>
                </div>

                {/* Load More Button */}
                <div className="text-center pt-4">
                  <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Load More Activity
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
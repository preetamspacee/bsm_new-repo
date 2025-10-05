'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Users,
  Package,
  Server,
  Shield,
  Activity,
  AlertTriangle,
  BarChart3,
  Eye,
  RefreshCw,
  Download,
  Plus,
  Settings,
  Home,
  Building2,
  RotateCcw,
  Link,
  BookOpen,
  Plug,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  FileText,
  Database,
  Monitor,
  Zap,
  Bell,
  Calendar,
  Filter,
  Edit,
  Trash2,
  Archive,
  CheckSquare,
  XCircle,
  Pause,
  Play,
  MoreHorizontal,
  Save,
  Upload,
  Copy,
  Share,
  Lock,
  Unlock,
  Key,
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  DollarSign,
  Target,
  Award,
  TrendingDown,
  Minus,
  Maximize,
  Minimize,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronLeft,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  Lightbulb,
  Flame,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  File as FileIcon,
  Laptop,
  Code,
  Network,
  Printer
} from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  
  // Parse URL segments to determine active tab and sub-tab
  const segments = params.segments as string[] || []
  const activeTab = segments[0] || 'dashboard'
  const activeSubTab = segments[1] || ''
  
  const [loading, setLoading] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({})
  const [dashboardData, setDashboardData] = useState({
    todayTickets: Math.floor(Math.random() * 20) + 10,
    resolvedToday: Math.floor(Math.random() * 15) + 8,
    avgResponse: Math.floor(Math.random() * 60) + 30,
    satisfaction: Math.floor(Math.random() * 20) + 80,
    activeTickets: Math.floor(Math.random() * 50) + 20,
    clientAccounts: Math.floor(Math.random() * 100) + 50,
    itAssets: Math.floor(Math.random() * 200) + 100,
    responseTime: Math.floor(Math.random() * 120) + 60,
    systemHealth: 98.5,
    uptime: 99.9,
    securityAlerts: Math.floor(Math.random() * 5),
    performanceScore: Math.floor(Math.random() * 20) + 80,
    slaCompliance: Math.floor(Math.random() * 10) + 90,
    breachRisk: Math.floor(Math.random() * 5)
  })

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tickets', label: 'Tickets', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'accounts', label: 'Accounts', icon: Building2 },
    { id: 'assets', label: 'Assets', icon: Package },
    { id: 'rules', label: 'Rules Engine', icon: Shield },
    { id: 'workflow', label: 'Workflow', icon: RotateCcw },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const subTabs = {
    tickets: [
      { id: 'all', label: 'All Tickets' },
      { id: 'open', label: 'Open' },
      { id: 'in-progress', label: 'In Progress' },
      { id: 'resolved', label: 'Resolved' },
      { id: 'closed', label: 'Closed' }
    ],
    users: [
      { id: 'all', label: 'All Users' },
      { id: 'admins', label: 'Administrators' },
      { id: 'agents', label: 'Agents' },
      { id: 'customers', label: 'Customers' },
      { id: 'groups', label: 'Groups' }
    ],
    accounts: [
      { id: 'enterprise', label: 'Enterprise' },
      { id: 'small-business', label: 'Small Business' },
      { id: 'individual', label: 'Individual' },
      { id: 'settings', label: 'Account Settings' }
    ],
    assets: [
      { id: 'all', label: 'All Assets' },
      { id: 'hardware', label: 'Hardware' },
      { id: 'software', label: 'Software' },
      { id: 'network', label: 'Network' },
      { id: 'peripheral', label: 'Peripheral' }
    ],
    rules: [
      { id: 'automation', label: 'Automation Rules' },
      { id: 'escalation', label: 'Escalation Rules' },
      { id: 'notification', label: 'Notification Rules' },
      { id: 'approval', label: 'Approval Rules' }
    ],
    workflow: [
      { id: 'ticket-workflow', label: 'Ticket Workflows' },
      { id: 'approval-workflow', label: 'Approval Workflows' },
      { id: 'onboarding', label: 'Onboarding' },
      { id: 'offboarding', label: 'Offboarding' },
      { id: 'custom', label: 'Custom Workflows' }
    ],
    analytics: [
      { id: 'ticket-analytics', label: 'Ticket Analytics' },
      { id: 'performance', label: 'Performance Metrics' },
      { id: 'satisfaction', label: 'Customer Satisfaction' },
      { id: 'reports', label: 'System Reports' }
    ],
    knowledge: [
      { id: 'articles', label: 'Articles' },
      { id: 'faqs', label: 'FAQs' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
      { id: 'guides', label: 'User Guides' },
      { id: 'videos', label: 'Video Tutorials' },
      { id: 'categories', label: 'Categories' }
    ],
    integrations: [
      { id: 'all', label: 'All Integrations' },
      { id: 'email', label: 'Email' },
      { id: 'slack', label: 'Slack' },
      { id: 'teams', label: 'Microsoft Teams' },
      { id: 'api', label: 'API Management' },
      { id: 'webhooks', label: 'Webhooks' }
    ],
    settings: [
      { id: 'general', label: 'General' },
      { id: 'security', label: 'Security' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'backup', label: 'Backup' },
      { id: 'maintenance', label: 'Maintenance' },
      { id: 'system-info', label: 'System Info' }
    ]
  }

  // Auto-expand menu when navigating to a sub-tab
  useEffect(() => {
    if (activeTab && activeSubTab) {
      setExpandedMenus(prev => ({
        ...prev,
        [activeTab]: true
      }))
    }
  }, [activeTab, activeSubTab])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">BSM Platform</h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        
        <nav className="mt-6 flex-1 overflow-y-auto scrollable">
          {tabs.map((tab: any) => {
            const Icon = tab.icon
            return (
              <div key={tab.id}>
                <button
                  onClick={() => {
                    if (subTabs[tab.id as keyof typeof subTabs]) {
                      // Toggle submenu expansion
                      setExpandedMenus(prev => ({
                        ...prev,
                        [tab.id]: !prev[tab.id]
                      }))
                    } else {
                      // Navigate to main tab
                      router.push(`/admin/dashboard/${tab.id}`)
                    }
                  }}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                    activeTab === tab.id ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.label}
                  {subTabs[tab.id as keyof typeof subTabs] && (
                    <div className="ml-auto">
                      {expandedMenus[tab.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </button>
                
                {/* Sub-tabs */}
                {expandedMenus[tab.id] && subTabs[tab.id as keyof typeof subTabs] && (
                  <div className="bg-gray-50">
                    {subTabs[tab.id as keyof typeof subTabs].map((subTab: any) => (
                      <button
                        key={subTab.id}
                        onClick={() => router.push(`/admin/dashboard/${tab.id}/${subTab.id}`)}
                        className={`w-full flex items-center px-12 py-2 text-left text-sm hover:bg-gray-100 ${
                          activeSubTab === subTab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                        }`}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label}
                {activeSubTab && subTabs[activeTab as keyof typeof subTabs] && (
                  <span className="text-gray-500 ml-2">
                    - {subTabs[activeTab as keyof typeof subTabs].find(s => s.id === activeSubTab)?.label}
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => window.location.reload()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto scrollable">
          {activeTab === 'dashboard' && <DashboardContent data={dashboardData} />}
          {activeTab === 'tickets' && <TicketsContent subTab={activeSubTab} />}
          {activeTab === 'users' && <UsersContent subTab={activeSubTab} />}
          {activeTab === 'accounts' && <AccountsContent subTab={activeSubTab} />}
          {activeTab === 'assets' && <AssetsContent subTab={activeSubTab} />}
          {activeTab === 'rules' && <RulesContent subTab={activeSubTab} />}
          {activeTab === 'workflow' && <WorkflowContent subTab={activeSubTab} />}
          {activeTab === 'analytics' && <AnalyticsContent subTab={activeSubTab} />}
          {activeTab === 'knowledge' && <KnowledgeContent subTab={activeSubTab} />}
          {activeTab === 'integrations' && <IntegrationsContent subTab={activeSubTab} />}
          {activeTab === 'settings' && <SettingsContent subTab={activeSubTab} />}
        </div>
      </div>
    </div>
  )
}

// Dashboard Content Component
function DashboardContent({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.todayTickets}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 5) + 1} from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.resolvedToday}</div>
            <p className="text-xs text-muted-foreground">
              {Math.floor((data.resolvedToday / data.todayTickets) * 100)}% resolution rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgResponse}m</div>
            <p className="text-xs text-muted-foreground">
              -{Math.floor(Math.random() * 10) + 5}% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.satisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 3) + 1}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">System Health</span>
              </div>
              <Badge className="bg-green-100 text-green-800">{data.systemHealth}%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Uptime</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{data.uptime}%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Performance Score</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">{data.performanceScore}%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Security Alerts</span>
              </div>
              <Badge className={data.securityAlerts > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                {data.securityAlerts}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium">Create Ticket</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium">Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium">System Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Enhanced Tickets Content Component
function TicketsContent({ subTab }: { subTab: string }) {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [subTab])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      // Mock ticket data
      const mockTickets = [
        {
          id: 1,
          title: 'Email server not responding',
          description: 'Users cannot send or receive emails',
          status: 'open',
          priority: 'high',
          assignee: 'John Doe',
          requester: 'Sarah Wilson',
          created: '2024-01-15',
          updated: '2024-01-15'
        },
        {
          id: 2,
          title: 'Printer setup assistance',
          description: 'Need help setting up new printer',
          status: 'in-progress',
          priority: 'medium',
          assignee: 'Mike Johnson',
          requester: 'David Brown',
          created: '2024-01-14',
          updated: '2024-01-15'
        },
        {
          id: 3,
          title: 'Password reset request',
          description: 'User forgot password and needs reset',
          status: 'resolved',
          priority: 'low',
          assignee: 'Jane Smith',
          requester: 'Lisa Davis',
          created: '2024-01-13',
          updated: '2024-01-14'
        }
      ]
      setTickets(mockTickets)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSubTab = !subTab || subTab === 'all' || ticket.status === subTab
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
            <div>
          <h2 className="text-2xl font-bold text-gray-900">Ticket Management</h2>
          <p className="text-gray-600">Manage and track support tickets</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
            </div>
          </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {tickets.filter(t => t.status === 'open').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {tickets.filter(t => t.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {tickets.filter(t => t.status === 'resolved').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{tickets.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
                </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
          <CardDescription>
            Showing {filteredTickets.length} tickets
            {subTab && subTab !== 'all' && ` - ${subTab.replace('-', ' ')}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('-', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Requester: {ticket.requester}</span>
                      <span>Assignee: {ticket.assignee}</span>
                      <span>Created: {ticket.created}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
            </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
              </div>
            ))}
              {filteredTickets.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Ticket #{selectedTicket.id}</h2>
              <Button variant="ghost" onClick={() => setSelectedTicket(null)}>
                <X className="h-4 w-4" />
                </Button>
              </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">{selectedTicket.title}</h3>
                <p className="text-gray-600 mt-1">{selectedTicket.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={getPriorityColor(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </Badge>
                </div>
                <div>
                  <Label>Requester</Label>
                  <p className="text-sm">{selectedTicket.requester}</p>
                </div>
                <div>
                  <Label>Assignee</Label>
                  <p className="text-sm">{selectedTicket.assignee}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Ticket
                </Button>
                <Button variant="outline">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                  </Button>
              </div>
            </div>
          </div>
                </div>
              )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Ticket</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
              </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter ticket title" />
            </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Enter ticket description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select id="priority" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="assignee">Assignee</Label>
                  <select id="assignee" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="john-doe">John Doe</option>
                    <option value="jane-smith">Jane Smith</option>
                    <option value="mike-johnson">Mike Johnson</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Ticket
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Users Content Component
function UsersContent({ subTab }: { subTab: string }) {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [subTab])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      // Mock user data
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@company.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-15',
          department: 'IT',
          phone: '+1-555-0123'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@company.com',
          role: 'agent',
          status: 'active',
          lastLogin: '2024-01-14',
          department: 'Support',
          phone: '+1-555-0124'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike.johnson@company.com',
          role: 'agent',
          status: 'inactive',
          lastLogin: '2024-01-10',
          department: 'Support',
          phone: '+1-555-0125'
        },
        {
          id: 4,
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          role: 'customer',
          status: 'active',
          lastLogin: '2024-01-15',
          department: 'Sales',
          phone: '+1-555-0126'
        }
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSubTab = !subTab || subTab === 'all' || user.role === subTab.replace('s', '')
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubTab && matchesSearch
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'agent': return 'bg-blue-100 text-blue-800'
      case 'customer': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage users, roles, and permissions</p>
                    </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
                  </div>
                  </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.role === 'admin').length}
                </div>
              </CardContent>
            </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agents</CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role === 'agent').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'customer').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
                    <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                    </div>
                  </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
                </div>
              </CardContent>
            </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} users
            {subTab && subTab !== 'all' && ` - ${subTab}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user: any) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                  </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                  </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Department: {user.department}</span>
                        <span>Last Login: {user.lastLogin}</span>
                </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          )}
              </CardContent>
            </Card>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">User Details</h2>
              <Button variant="ghost" onClick={() => setSelectedUser(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                  <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                    </div>
                  </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Badge className={getRoleColor(selectedUser.role)}>
                    {selectedUser.role}
                  </Badge>
                  </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedUser.status)}>
                    {selectedUser.status}
                  </Badge>
                </div>
                  <div>
                  <Label>Department</Label>
                  <p className="text-sm">{selectedUser.department}</p>
                    </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-sm">{selectedUser.phone}</p>
                  </div>
                <div>
                  <Label>Last Login</Label>
                  <p className="text-sm">{selectedUser.lastLogin}</p>
                  </div>
                </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                <Button variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  Suspend User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New User</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                    </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select id="role" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="customer">Customer</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                  <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Enter department" />
                    </div>
                  </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create User
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Accounts Content Component
function AccountsContent({ subTab }: { subTab: string }) {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchAccounts()
  }, [subTab])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      // Mock accounts data
      const mockAccounts = [
        {
          id: 1,
          companyName: 'Acme Corporation',
          contactName: 'John Smith',
          email: 'john.smith@acme.com',
          phone: '+1-555-0123',
          status: 'active',
          plan: 'Enterprise',
          monthlyRevenue: 2500,
          lastPayment: '2024-01-15',
          nextBilling: '2024-02-15',
          users: 45,
          createdAt: '2023-06-15',
          address: '123 Business St, New York, NY 10001'
        },
        {
          id: 2,
          companyName: 'TechStart Inc',
          contactName: 'Sarah Johnson',
          email: 'sarah@techstart.com',
          phone: '+1-555-0124',
          status: 'active',
          plan: 'Professional',
          monthlyRevenue: 1200,
          lastPayment: '2024-01-14',
          nextBilling: '2024-02-14',
          users: 23,
          createdAt: '2023-08-20',
          address: '456 Innovation Ave, San Francisco, CA 94105'
        },
        {
          id: 3,
          companyName: 'Global Solutions Ltd',
          contactName: 'Mike Wilson',
          email: 'mike@globalsolutions.com',
          phone: '+1-555-0125',
          status: 'suspended',
          plan: 'Standard',
          monthlyRevenue: 800,
          lastPayment: '2023-12-15',
          nextBilling: '2024-01-15',
          users: 12,
          createdAt: '2023-04-10',
          address: '789 Corporate Blvd, Chicago, IL 60601'
        },
        {
          id: 4,
          companyName: 'Digital Dynamics',
          contactName: 'Lisa Brown',
          email: 'lisa@digitaldynamics.com',
          phone: '+1-555-0126',
          status: 'active',
          plan: 'Professional',
          monthlyRevenue: 1500,
          lastPayment: '2024-01-13',
          nextBilling: '2024-02-13',
          users: 18,
          createdAt: '2023-09-05',
          address: '321 Tech Park, Austin, TX 78701'
        },
        {
          id: 5,
          companyName: 'Future Systems',
          contactName: 'David Lee',
          email: 'david@futuresystems.com',
          phone: '+1-555-0127',
          status: 'trial',
          plan: 'Trial',
          monthlyRevenue: 0,
          lastPayment: null,
          nextBilling: '2024-02-01',
          users: 5,
          createdAt: '2024-01-01',
          address: '654 Future Lane, Seattle, WA 98101'
        }
      ]
      setAccounts(mockAccounts)
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAccounts = accounts.filter(account => {
    const matchesSubTab = !subTab || subTab === 'all' || account.status === subTab
    const matchesSearch = account.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'trial': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800'
      case 'Professional': return 'bg-blue-100 text-blue-800'
      case 'Standard': return 'bg-green-100 text-green-800'
      case 'Trial': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalRevenue = accounts.reduce((sum, account) => sum + account.monthlyRevenue, 0)
  const activeAccounts = accounts.filter(account => account.status === 'active').length
  const trialAccounts = accounts.filter(account => account.status === 'trial').length
  const suspendedAccounts = accounts.filter(account => account.status === 'suspended').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
          <p className="text-gray-600">Manage customer accounts and billing</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeAccounts}</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Accounts</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{trialAccounts}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{suspendedAccounts}</div>
            <p className="text-xs text-muted-foreground">-1 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>
            Showing {filteredAccounts.length} accounts
            {subTab && subTab !== 'all' && ` - ${subTab}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAccounts.map((account: any) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{account.companyName}</h3>
                        <Badge className={getStatusColor(account.status)}>
                          {account.status}
                        </Badge>
                        <Badge className={getPlanColor(account.plan)}>
                          {account.plan}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{account.contactName} • {account.email}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Users: {account.users}</span>
                        <span>Revenue: ${account.monthlyRevenue}</span>
                        <span>Next Billing: {account.nextBilling}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredAccounts.length === 0 && (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Detail Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedAccount.companyName}</h2>
              <Button variant="ghost" onClick={() => setSelectedAccount(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6">
              {/* Account Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedAccount.status)}>
                      {selectedAccount.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Plan: {selectedAccount.plan}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ${selectedAccount.monthlyRevenue.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Per month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{selectedAccount.users}</div>
                    <p className="text-sm text-gray-600">Active users</p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Contact Name</Label>
                      <p className="text-sm">{selectedAccount.contactName}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm">{selectedAccount.email}</p>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="text-sm">{selectedAccount.phone}</p>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <p className="text-sm">{selectedAccount.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Last Payment</Label>
                      <p className="text-sm">{selectedAccount.lastPayment || 'No payments yet'}</p>
                    </div>
                    <div>
                      <Label>Next Billing</Label>
                      <p className="text-sm">{selectedAccount.nextBilling}</p>
                    </div>
                    <div>
                      <Label>Account Created</Label>
                      <p className="text-sm">{selectedAccount.createdAt}</p>
                    </div>
                    <div>
                      <Label>Plan</Label>
                      <Badge className={getPlanColor(selectedAccount.plan)}>
                        {selectedAccount.plan}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Account
                </Button>
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Billing
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Suspend Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Account</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Enter company name" />
                </div>
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input id="contactName" placeholder="Enter contact name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
              </div>
              <div>
                <Label htmlFor="plan">Plan</Label>
                <select id="plan" className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="Trial">Trial</option>
                  <option value="Standard">Standard</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <textarea
                  id="address"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter company address"
                />
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Rules Engine Content Component
function RulesContent({ subTab }: { subTab: string }) {
  const [rules, setRules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRule, setSelectedRule] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchRules()
  }, [subTab])

  const fetchRules = async () => {
    try {
      setLoading(true)
      // Mock rules data
      const mockRules = [
        {
          id: 1,
          name: 'High Priority Auto-Assignment',
          description: 'Automatically assign high priority tickets to senior agents',
          category: 'assignment',
          status: 'active',
          priority: 'high',
          conditions: [
            { field: 'priority', operator: 'equals', value: 'high' },
            { field: 'category', operator: 'equals', value: 'technical' }
          ],
          actions: [
            { type: 'assign', value: 'senior-agent' },
            { type: 'notify', value: 'team-lead' }
          ],
          lastTriggered: '2024-01-15 14:30:00',
          triggerCount: 45,
          createdAt: '2023-06-15',
          createdBy: 'John Smith'
        },
        {
          id: 2,
          name: 'SLA Escalation Rule',
          description: 'Escalate tickets that exceed SLA response time',
          category: 'escalation',
          status: 'active',
          priority: 'high',
          conditions: [
            { field: 'response_time', operator: 'greater_than', value: '4_hours' },
            { field: 'status', operator: 'not_equals', value: 'resolved' }
          ],
          actions: [
            { type: 'escalate', value: 'manager' },
            { type: 'notify', value: 'customer' },
            { type: 'update_priority', value: 'urgent' }
          ],
          lastTriggered: '2024-01-15 12:15:00',
          triggerCount: 23,
          createdAt: '2023-07-20',
          createdBy: 'Sarah Johnson'
        },
        {
          id: 3,
          name: 'Customer Satisfaction Follow-up',
          description: 'Send follow-up emails for resolved tickets',
          category: 'notification',
          status: 'active',
          priority: 'medium',
          conditions: [
            { field: 'status', operator: 'equals', value: 'resolved' },
            { field: 'customer_tier', operator: 'equals', value: 'premium' }
          ],
          actions: [
            { type: 'send_email', value: 'satisfaction_survey' },
            { type: 'schedule_task', value: 'follow_up_call' }
          ],
          lastTriggered: '2024-01-15 10:45:00',
          triggerCount: 67,
          createdAt: '2023-08-10',
          createdBy: 'Mike Wilson'
        },
        {
          id: 4,
          name: 'Duplicate Ticket Detection',
          description: 'Detect and merge duplicate tickets automatically',
          category: 'automation',
          status: 'active',
          priority: 'medium',
          conditions: [
            { field: 'title_similarity', operator: 'greater_than', value: '80%' },
            { field: 'customer', operator: 'equals', value: 'same_customer' }
          ],
          actions: [
            { type: 'merge_tickets', value: 'auto' },
            { type: 'notify', value: 'agent' }
          ],
          lastTriggered: '2024-01-15 09:20:00',
          triggerCount: 12,
          createdAt: '2023-09-05',
          createdBy: 'Lisa Brown'
        },
        {
          id: 5,
          name: 'Weekend Auto-Response',
          description: 'Send automatic responses for weekend tickets',
          category: 'notification',
          status: 'active',
          priority: 'low',
          conditions: [
            { field: 'day_of_week', operator: 'in', value: 'saturday,sunday' },
            { field: 'time', operator: 'between', value: '18:00-08:00' }
          ],
          actions: [
            { type: 'send_email', value: 'weekend_response' },
            { type: 'set_status', value: 'pending' }
          ],
          lastTriggered: '2024-01-14 20:30:00',
          triggerCount: 89,
          createdAt: '2023-10-15',
          createdBy: 'David Lee'
        },
        {
          id: 6,
          name: 'VIP Customer Priority',
          description: 'Automatically prioritize tickets from VIP customers',
          category: 'priority',
          status: 'inactive',
          priority: 'high',
          conditions: [
            { field: 'customer_tier', operator: 'equals', value: 'vip' },
            { field: 'priority', operator: 'not_equals', value: 'urgent' }
          ],
          actions: [
            { type: 'update_priority', value: 'high' },
            { type: 'assign', value: 'senior-agent' }
          ],
          lastTriggered: '2024-01-10 16:45:00',
          triggerCount: 34,
          createdAt: '2023-11-20',
          createdBy: 'Emma Davis'
        }
      ]
      setRules(mockRules)
    } catch (error) {
      console.error('Error fetching rules:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRules = rules.filter(rule => {
    const matchesSubTab = !subTab || subTab === 'all' || rule.category === subTab
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'assignment': return 'bg-blue-100 text-blue-800'
      case 'escalation': return 'bg-orange-100 text-orange-800'
      case 'notification': return 'bg-purple-100 text-purple-800'
      case 'automation': return 'bg-green-100 text-green-800'
      case 'priority': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalRules = rules.length
  const activeRules = rules.filter(rule => rule.status === 'active').length
  const inactiveRules = rules.filter(rule => rule.status === 'inactive').length
  const totalTriggers = rules.reduce((sum, rule) => sum + rule.triggerCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
            <div>
          <h2 className="text-2xl font-bold text-gray-900">Rules Engine</h2>
          <p className="text-gray-600">Manage automation rules and workflows</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
            </div>
          </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalRules}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeRules}</div>
            <p className="text-xs text-muted-foreground">83% active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <Pause className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{inactiveRules}</div>
            <p className="text-xs text-muted-foreground">17% inactive</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Triggers</CardTitle>
            <Zap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalTriggers}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search rules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rules List */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>
            Showing {filteredRules.length} rules
            {subTab && subTab !== 'all' && ` - ${subTab}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRules.map((rule: any) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedRule(rule)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Settings className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{rule.name}</h3>
                        <Badge className={getStatusColor(rule.status)}>
                          {rule.status}
                        </Badge>
                        <Badge className={getPriorityColor(rule.priority)}>
                          {rule.priority}
                        </Badge>
                        <Badge className={getCategoryColor(rule.category)}>
                          {rule.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Triggers: {rule.triggerCount}</span>
                        <span>Last: {rule.lastTriggered}</span>
                        <span>Created: {rule.createdAt}</span>
                        <span>By: {rule.createdBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
            </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredRules.length === 0 && (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No rules found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
                  )}
                </div>
          )}
        </CardContent>
      </Card>

      {/* Rule Detail Modal */}
      {selectedRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedRule.name}</h2>
              <Button variant="ghost" onClick={() => setSelectedRule(null)}>
                <X className="h-4 w-4" />
            </Button>
            </div>
            <div className="space-y-6">
              {/* Rule Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedRule.status)}>
                      {selectedRule.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Priority: {selectedRule.priority}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Trigger Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedRule.triggerCount}
                    </div>
                    <p className="text-sm text-gray-600">Total executions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Last Triggered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-bold text-green-600">
                      {selectedRule.lastTriggered}
                    </div>
                    <p className="text-sm text-gray-600">Most recent</p>
                  </CardContent>
                </Card>
              </div>

              {/* Rule Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedRule.description}</p>
                </CardContent>
              </Card>

              {/* Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle>Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedRule.conditions.map((condition: any, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{condition.field}</span>
                        <span className="text-gray-500">{condition.operator}</span>
                        <span className="font-mono text-sm bg-white px-2 py-1 rounded">
                          {condition.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedRule.actions.map((action: any, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">{action.type}</span>
                        <span className="text-gray-500">→</span>
                        <span className="font-mono text-sm bg-white px-2 py-1 rounded">
                          {action.value}
                        </span>
              </div>
            ))}
        </div>
                </CardContent>
              </Card>

              {/* Rule Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Rule Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Badge className={getCategoryColor(selectedRule.category)}>
                        {selectedRule.category}
                      </Badge>
              </div>
                    <div>
                      <Label>Priority</Label>
                      <Badge className={getPriorityColor(selectedRule.priority)}>
                        {selectedRule.priority}
                      </Badge>
                    </div>
                    <div>
                      <Label>Created</Label>
                      <p className="text-sm">{selectedRule.createdAt}</p>
                    </div>
                    <div>
                      <Label>Created By</Label>
                      <p className="text-sm">{selectedRule.createdBy}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Rule
                </Button>
                <Button variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Test Rule
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                  </Button>
              </div>
            </div>
          </div>
                </div>
              )}

      {/* Create Rule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Rule</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
              </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input id="ruleName" placeholder="Enter rule name" />
            </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter rule description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="assignment">Assignment</option>
                    <option value="escalation">Escalation</option>
                    <option value="notification">Notification</option>
                    <option value="automation">Automation</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select id="priority" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Conditions</Label>
                <div className="mt-2 p-4 border border-gray-300 rounded-md">
                  <p className="text-sm text-gray-600">Configure rule conditions...</p>
                </div>
              </div>
              <div>
                <Label>Actions</Label>
                <div className="mt-2 p-4 border border-gray-300 rounded-md">
                  <p className="text-sm text-gray-600">Configure rule actions...</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Rule
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Workflow Builder Content Component
function WorkflowContent({ subTab }: { subTab: string }) {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showVisualEditor, setShowVisualEditor] = useState(false)

  useEffect(() => {
    fetchWorkflows()
  }, [subTab])

  const fetchWorkflows = async () => {
    try {
      setLoading(true)
      // Mock workflows data
      const mockWorkflows = [
        {
          id: 1,
          name: 'Customer Onboarding',
          description: 'Automated workflow for new customer onboarding process',
          category: 'customer',
          status: 'active',
          priority: 'high',
          steps: [
            { id: 1, name: 'Account Creation', type: 'action', status: 'completed' },
            { id: 2, name: 'Welcome Email', type: 'notification', status: 'completed' },
            { id: 3, name: 'Setup Call', type: 'task', status: 'pending' },
            { id: 4, name: 'Training Session', type: 'task', status: 'pending' }
          ],
          triggers: ['new_customer_signup'],
          lastRun: '2024-01-15 14:30:00',
          runCount: 45,
          createdAt: '2023-06-15',
          createdBy: 'John Smith'
        },
        {
          id: 2,
          name: 'Ticket Resolution',
          description: 'Standard workflow for resolving customer tickets',
          category: 'support',
          status: 'active',
          priority: 'high',
          steps: [
            { id: 1, name: 'Ticket Assignment', type: 'action', status: 'completed' },
            { id: 2, name: 'Initial Response', type: 'notification', status: 'completed' },
            { id: 3, name: 'Investigation', type: 'task', status: 'in_progress' },
            { id: 4, name: 'Solution Implementation', type: 'task', status: 'pending' },
            { id: 5, name: 'Customer Confirmation', type: 'notification', status: 'pending' }
          ],
          triggers: ['ticket_created'],
          lastRun: '2024-01-15 12:15:00',
          runCount: 123,
          createdAt: '2023-07-20',
          createdBy: 'Sarah Johnson'
        },
        {
          id: 3,
          name: 'Employee Onboarding',
          description: 'HR workflow for new employee onboarding',
          category: 'hr',
          status: 'active',
          priority: 'medium',
          steps: [
            { id: 1, name: 'Contract Signing', type: 'action', status: 'completed' },
            { id: 2, name: 'IT Setup', type: 'task', status: 'completed' },
            { id: 3, name: 'Orientation', type: 'task', status: 'in_progress' },
            { id: 4, name: 'Team Introduction', type: 'notification', status: 'pending' }
          ],
          triggers: ['new_employee_hired'],
          lastRun: '2024-01-15 10:45:00',
          runCount: 67,
          createdAt: '2023-08-10',
          createdBy: 'Mike Wilson'
        },
        {
          id: 4,
          name: 'Invoice Processing',
          description: 'Automated invoice processing and approval workflow',
          category: 'finance',
          status: 'active',
          priority: 'medium',
          steps: [
            { id: 1, name: 'Invoice Received', type: 'action', status: 'completed' },
            { id: 2, name: 'Validation', type: 'task', status: 'completed' },
            { id: 3, name: 'Approval', type: 'approval', status: 'pending' },
            { id: 4, name: 'Payment', type: 'action', status: 'pending' }
          ],
          triggers: ['invoice_received'],
          lastRun: '2024-01-15 09:20:00',
          runCount: 89,
          createdAt: '2023-09-05',
          createdBy: 'Lisa Brown'
        },
        {
          id: 5,
          name: 'Product Launch',
          description: 'Marketing workflow for new product launches',
          category: 'marketing',
          status: 'draft',
          priority: 'low',
          steps: [
            { id: 1, name: 'Content Creation', type: 'task', status: 'pending' },
            { id: 2, name: 'Review', type: 'approval', status: 'pending' },
            { id: 3, name: 'Campaign Launch', type: 'action', status: 'pending' },
            { id: 4, name: 'Performance Tracking', type: 'task', status: 'pending' }
          ],
          triggers: ['product_launch_approved'],
          lastRun: null,
          runCount: 0,
          createdAt: '2023-10-15',
          createdBy: 'David Lee'
        },
        {
          id: 6,
          name: 'Security Incident Response',
          description: 'Emergency workflow for security incident handling',
          category: 'security',
          status: 'inactive',
          priority: 'high',
          steps: [
            { id: 1, name: 'Incident Detection', type: 'action', status: 'completed' },
            { id: 2, name: 'Alert Team', type: 'notification', status: 'completed' },
            { id: 3, name: 'Investigation', type: 'task', status: 'pending' },
            { id: 4, name: 'Mitigation', type: 'action', status: 'pending' },
            { id: 5, name: 'Post-Incident Review', type: 'task', status: 'pending' }
          ],
          triggers: ['security_incident_detected'],
          lastRun: '2024-01-10 16:45:00',
          runCount: 12,
          createdAt: '2023-11-20',
          createdBy: 'Emma Davis'
        }
      ]
      setWorkflows(mockWorkflows)
    } catch (error) {
      console.error('Error fetching workflows:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSubTab = !subTab || subTab === 'all' || workflow.category === subTab
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'customer': return 'bg-blue-100 text-blue-800'
      case 'support': return 'bg-green-100 text-green-800'
      case 'hr': return 'bg-purple-100 text-purple-800'
      case 'finance': return 'bg-orange-100 text-orange-800'
      case 'marketing': return 'bg-pink-100 text-pink-800'
      case 'security': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'action': return Play
      case 'notification': return Mail
      case 'task': return CheckSquare
      case 'approval': return Shield
      default: return CheckCircle
    }
  }

  const totalWorkflows = workflows.length
  const activeWorkflows = workflows.filter(workflow => workflow.status === 'active').length
  const draftWorkflows = workflows.filter(workflow => workflow.status === 'draft').length
  const totalRuns = workflows.reduce((sum, workflow) => sum + workflow.runCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflow Builder</h2>
          <p className="text-gray-600">Design and manage business workflows</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
          <Button variant="outline" onClick={() => setShowVisualEditor(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Visual Editor
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <RotateCcw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalWorkflows}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">67% active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{draftWorkflows}</div>
            <p className="text-xs text-muted-foreground">17% drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Play className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalRuns}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow: any) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <Badge className={getCategoryColor(workflow.category)}>
                      {workflow.category}
                    </Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(workflow.status)}>
                  {workflow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Steps:</span>
                  <span>{workflow.steps.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Runs:</span>
                  <span>{workflow.runCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last Run:</span>
                  <span>{workflow.lastRun ? workflow.lastRun.split(' ')[0] : 'Never'}</span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedWorkflow(workflow)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedWorkflow.name}</h2>
              <Button variant="ghost" onClick={() => setSelectedWorkflow(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6">
              {/* Workflow Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedWorkflow.status)}>
                      {selectedWorkflow.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Priority: {selectedWorkflow.priority}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Run Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedWorkflow.runCount}
                    </div>
                    <p className="text-sm text-gray-600">Total executions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Last Run</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-bold text-green-600">
                      {selectedWorkflow.lastRun || 'Never'}
                    </div>
                    <p className="text-sm text-gray-600">Most recent</p>
                  </CardContent>
                </Card>
              </div>

              {/* Workflow Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedWorkflow.description}</p>
                </CardContent>
              </Card>

              {/* Workflow Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedWorkflow.steps.map((step: any, index: number) => {
                      const StepIcon = getStepTypeIcon(step.type)
                      return (
                        <div key={step.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <StepIcon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{step.name}</span>
                              <Badge className={getStepStatusColor(step.status)}>
                                {step.status}
                              </Badge>
                              <Badge variant="outline">{step.type}</Badge>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Triggers */}
              <Card>
                <CardHeader>
                  <CardTitle>Triggers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorkflow.triggers.map((trigger: any, index: number) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Workflow Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Badge className={getCategoryColor(selectedWorkflow.category)}>
                        {selectedWorkflow.category}
                      </Badge>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Badge className={getPriorityColor(selectedWorkflow.priority)}>
                        {selectedWorkflow.priority}
                      </Badge>
                    </div>
                    <div>
                      <Label>Created</Label>
                      <p className="text-sm">{selectedWorkflow.createdAt}</p>
                    </div>
                    <div>
                      <Label>Created By</Label>
                      <p className="text-sm">{selectedWorkflow.createdBy}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Workflow
                </Button>
                <Button variant="outline" onClick={() => setShowVisualEditor(true)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Visual Editor
                </Button>
                <Button variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Test Run
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Workflow</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="workflowName">Workflow Name</Label>
                <Input id="workflowName" placeholder="Enter workflow name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter workflow description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="customer">Customer</option>
                    <option value="support">Support</option>
                    <option value="hr">HR</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="security">Security</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select id="priority" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Triggers</Label>
                <div className="mt-2 p-4 border border-gray-300 rounded-md">
                  <p className="text-sm text-gray-600">Configure workflow triggers...</p>
                </div>
              </div>
              <div>
                <Label>Steps</Label>
                <div className="mt-2 p-4 border border-gray-300 rounded-md">
                  <p className="text-sm text-gray-600">Configure workflow steps...</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Workflow
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Editor Modal */}
      {showVisualEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Visual Workflow Editor</h2>
              <Button variant="ghost" onClick={() => setShowVisualEditor(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Components</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Play className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Action</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Notification</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <CheckSquare className="h-4 w-4 text-purple-500" />
                          <span className="text-sm">Task</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Approval</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Workflow Canvas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <RotateCcw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Drag components here to build your workflow</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Workflow
                </Button>
                <Button variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Test Workflow
                </Button>
                <Button variant="outline" onClick={() => setShowVisualEditor(false)}>
                  Close Editor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Analytics Content Component
function AnalyticsContent({ subTab }: { subTab: string }) {
  const [analyticsData, setAnalyticsData] = useState({
    ticketAnalytics: {
      totalTickets: 1247,
      resolvedTickets: 1156,
      avgResolutionTime: 2.4,
      satisfactionScore: 4.6
    },
    performanceMetrics: {
      responseTime: 1.2,
      uptime: 99.9,
      systemLoad: 45,
      memoryUsage: 67
    },
    customerSatisfaction: {
      overall: 4.6,
      response: 4.5,
      resolution: 4.7,
      communication: 4.4
    },
    systemReports: {
      dailyTickets: [12, 19, 15, 25, 22, 30, 28],
      weeklyTrends: [85, 92, 78, 96, 88, 94, 91],
      monthlyGrowth: [120, 135, 142, 158, 145, 167, 189]
    }
  })
  const [dateRange, setDateRange] = useState('7d')
  const [loading, setLoading] = useState(false)

  const getChartData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return {
      labels: days,
      datasets: [
        {
          label: 'Tickets Created',
          data: analyticsData.systemReports.dailyTickets,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        },
        {
          label: 'Tickets Resolved',
          data: analyticsData.systemReports.weeklyTrends,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4
        }
      ]
    }
  }

  const renderTicketAnalytics = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.ticketAnalytics.totalTickets}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((analyticsData.ticketAnalytics.resolvedTickets / analyticsData.ticketAnalytics.totalTickets) * 100)}%
                    </div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.ticketAnalytics.avgResolutionTime}h</div>
            <p className="text-xs text-muted-foreground">-0.3h from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.ticketAnalytics.satisfactionScore}/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
                  </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Trends</CardTitle>
            <CardDescription>Daily ticket creation and resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Chart visualization would go here</p>
                <p className="text-sm text-gray-500">Using Chart.js or similar library</p>
                  </div>
                </div>
              </CardContent>
            </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolution Time Distribution</CardTitle>
            <CardDescription>Time taken to resolve tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Pie chart visualization would go here</p>
                <p className="text-sm text-gray-500">Showing resolution time ranges</p>
                    </div>
                  </div>
          </CardContent>
        </Card>
                  </div>
                </div>
  )

  const renderPerformanceMetrics = () => (
    <div className="space-y-6">
      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.responseTime}s</div>
            <p className="text-xs text-muted-foreground">-0.2s from last week</p>
              </CardContent>
            </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.uptime}%</div>
            <p className="text-xs text-muted-foreground">+0.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
            <Activity className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.systemLoad}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Database className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.memoryUsage}%</div>
            <p className="text-xs text-muted-foreground">+3% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>CPU, Memory, and Disk usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Monitor className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Performance chart would go here</p>
                <p className="text-sm text-gray-500">Real-time system metrics</p>
                    </div>
                  </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
            <CardDescription>Average response time over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Response time chart would go here</p>
                <p className="text-sm text-gray-500">Showing improvement trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
    </div>
  )

  const renderCustomerSatisfaction = () => (
    <div className="space-y-6">
      {/* Satisfaction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.customerSatisfaction.overall}/5</div>
            <p className="text-xs text-muted-foreground">+0.1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Quality</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.customerSatisfaction.response}/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Quality</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.customerSatisfaction.resolution}/5</div>
            <p className="text-xs text-muted-foreground">+0.1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communication</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.customerSatisfaction.communication}/5</div>
            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
          </CardContent>
        </Card>
                    </div>

      {/* Satisfaction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
            <CardTitle>Satisfaction Trends</CardTitle>
            <CardDescription>Customer satisfaction over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Satisfaction trend chart would go here</p>
                <p className="text-sm text-gray-500">Monthly satisfaction scores</p>
                  </div>
              </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Distribution of customer ratings</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Rating distribution chart would go here</p>
                <p className="text-sm text-gray-500">1-5 star ratings breakdown</p>
                  </div>
                </div>
              </CardContent>
            </Card>
                      </div>
                      </div>
  )

  const renderSystemReports = () => (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Report Controls</CardTitle>
          <CardDescription>Generate and customize reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
                  <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <select 
                id="dateRange" 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="w-32 p-2 border border-gray-300 rounded-md"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
                    </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader>
            <CardTitle>Ticket Volume Report</CardTitle>
            <CardDescription>Total tickets by period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {analyticsData.systemReports.monthlyGrowth[analyticsData.systemReports.monthlyGrowth.length - 1]}
                    </div>
            <p className="text-sm text-gray-600">Tickets this month</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Growth</span>
                <span className="text-green-600">+12%</span>
                  </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance Report</CardTitle>
            <CardDescription>System performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {analyticsData.performanceMetrics.uptime}%
                    </div>
            <p className="text-sm text-gray-600">System uptime</p>
            <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                <span>Reliability</span>
                <span className="text-green-600">Excellent</span>
                  </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '99%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction Report</CardTitle>
            <CardDescription>Overall satisfaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {analyticsData.customerSatisfaction.overall}/5
                    </div>
            <p className="text-sm text-gray-600">Average rating</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Satisfaction</span>
                <span className="text-green-600">High</span>
                  </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Ticket volume and resolution trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Monthly trends chart would go here</p>
                <p className="text-sm text-gray-500">12-month historical data</p>
                    </div>
                  </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>Individual agent performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Agent performance chart would go here</p>
                <p className="text-sm text-gray-500">Resolution rates by agent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
                    </div>
                  </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">View performance metrics and generate reports</p>
                    </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
                  </div>
                  </div>

      {/* Content based on sub-tab */}
      {!subTab || subTab === 'ticket-analytics' ? renderTicketAnalytics() : null}
      {subTab === 'performance' ? renderPerformanceMetrics() : null}
      {subTab === 'satisfaction' ? renderCustomerSatisfaction() : null}
      {subTab === 'reports' ? renderSystemReports() : null}
                </div>
  )
}

// Enhanced Knowledge Base Content Component
function KnowledgeContent({ subTab }: { subTab: string }) {
  const [knowledgeItems, setKnowledgeItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchKnowledgeItems()
  }, [subTab])

  const fetchKnowledgeItems = async () => {
    try {
      setLoading(true)
      // Mock knowledge base data
      const mockItems = [
        {
          id: 1,
          title: 'How to Reset Your Password',
          type: 'article',
          category: 'Account Management',
          content: 'Step-by-step guide to reset your password...',
          author: 'John Doe',
          created: '2024-01-15',
          updated: '2024-01-15',
          views: 156,
          helpful: 23,
          tags: ['password', 'security', 'account']
        },
        {
          id: 2,
          title: 'Email Server Configuration',
          type: 'article',
          category: 'Technical Support',
          content: 'Complete guide to configuring email servers...',
          author: 'Jane Smith',
          created: '2024-01-14',
          updated: '2024-01-15',
          views: 89,
          helpful: 12,
          tags: ['email', 'server', 'configuration']
        },
        {
          id: 3,
          title: 'Frequently Asked Questions',
          type: 'faq',
          category: 'General',
          content: 'Common questions and answers...',
          author: 'Mike Johnson',
          created: '2024-01-13',
          updated: '2024-01-14',
          views: 234,
          helpful: 45,
          tags: ['faq', 'general', 'help']
        },
        {
          id: 4,
          title: 'Printer Troubleshooting Guide',
          type: 'troubleshooting',
          category: 'Hardware',
          content: 'Troubleshooting steps for printer issues...',
          author: 'Sarah Wilson',
          created: '2024-01-12',
          updated: '2024-01-13',
          views: 78,
          helpful: 15,
          tags: ['printer', 'hardware', 'troubleshooting']
        },
        {
          id: 5,
          title: 'User Guide - Getting Started',
          type: 'guide',
          category: 'Documentation',
          content: 'Complete user guide for new users...',
          author: 'David Brown',
          created: '2024-01-11',
          updated: '2024-01-12',
          views: 167,
          helpful: 28,
          tags: ['guide', 'getting-started', 'documentation']
        },
        {
          id: 6,
          title: 'Video Tutorial - System Overview',
          type: 'video',
          category: 'Training',
          content: 'Video tutorial covering system overview...',
          author: 'Lisa Davis',
          created: '2024-01-10',
          updated: '2024-01-11',
          views: 145,
          helpful: 32,
          tags: ['video', 'tutorial', 'overview']
        }
      ]
      setKnowledgeItems(mockItems)
    } catch (error) {
      console.error('Error fetching knowledge items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSubTab = !subTab || subTab === 'all' || item.type === subTab.replace('s', '')
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some((tag: any) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesSubTab && matchesSearch && matchesCategory
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800'
      case 'faq': return 'bg-green-100 text-green-800'
      case 'troubleshooting': return 'bg-yellow-100 text-yellow-800'
      case 'guide': return 'bg-purple-100 text-purple-800'
      case 'video': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText
      case 'faq': return HelpCircle
      case 'troubleshooting': return AlertTriangle
      case 'guide': return BookOpen
      case 'video': return Play
      default: return FileIcon
    }
  }

  const categories = ['All', 'Account Management', 'Technical Support', 'General', 'Hardware', 'Documentation', 'Training']

  return (
    <div className="space-y-6">
      {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
          <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
          <p className="text-gray-600">Manage articles, FAQs, and documentation</p>
                    </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
                  </div>
                  </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {knowledgeItems.filter(i => i.type === 'article').length}
                </div>
              </CardContent>
            </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {knowledgeItems.filter(i => i.type === 'faq').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Troubleshooting</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {knowledgeItems.filter(i => i.type === 'troubleshooting').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guides</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {knowledgeItems.filter(i => i.type === 'guide').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Play className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {knowledgeItems.filter(i => i.type === 'video').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{knowledgeItems.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
                    <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                    </div>
                  </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
                  </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
                </div>
              </CardContent>
            </Card>

      {/* Knowledge Items */}
      <Card>
            <CardHeader>
          <CardTitle>Knowledge Base Content</CardTitle>
          <CardDescription>
            Showing {filteredItems.length} items
            {subTab && subTab !== 'all' && ` - ${subTab}`}
            {selectedCategory && ` in ${selectedCategory}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item: any) => {
                const TypeIcon = getTypeIcon(item.type)
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {React.createElement(getTypeIcon(item.type), { className: "h-5 w-5 text-gray-600" })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <Badge className={getTypeColor(item.type)}>
                            {item.type}
                          </Badge>
                          <Badge variant="outline">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.content}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Author: {item.author}</span>
                          <span>Views: {item.views}</span>
                          <span>Helpful: {item.helpful}</span>
                          <span>Updated: {item.updated}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {item.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
                )
              })}
              {filteredItems.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedItem.title}</h2>
              <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge className={getTypeColor(selectedItem.type)}>
                  {selectedItem.type}
                      </Badge>
                <Badge variant="outline">
                  {selectedItem.category}
                </Badge>
                <span className="text-sm text-gray-500">by {selectedItem.author}</span>
                    </div>
              <div className="prose max-w-none">
                <p className="text-gray-700">{selectedItem.content}</p>
                      </div>
              <div className="flex items-center space-x-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{selectedItem.views} views</span>
                      </div>
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{selectedItem.helpful} helpful</span>
                      </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Updated {selectedItem.updated}</span>
                    </div>
                  </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Content
                </Button>
                <Button variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Content</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter content title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Content Type</Label>
                  <select id="type" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="article">Article</option>
                    <option value="faq">FAQ</option>
                    <option value="troubleshooting">Troubleshooting</option>
                    <option value="guide">User Guide</option>
                    <option value="video">Video Tutorial</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="Account Management">Account Management</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="General">General</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={6}
                  placeholder="Enter content details..."
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="tag1, tag2, tag3" />
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Content
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Settings Content Component
function SettingsContent({ subTab }: { subTab: string }) {
  const [settings, setSettings] = useState({
    general: {
      companyName: 'BSM Platform',
      timezone: 'UTC',
      language: 'English',
      dateFormat: 'MM/DD/YYYY',
      autoLogout: 30
    },
    security: {
      passwordPolicy: 'strong',
      twoFactorAuth: true,
      sessionTimeout: 60,
      ipWhitelist: false,
      auditLogging: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      ticketUpdates: true,
      systemAlerts: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
      cloudBackup: false,
      lastBackup: '2024-01-15'
    },
    maintenance: {
      maintenanceMode: false,
      scheduledMaintenance: false,
      maintenanceWindow: '02:00-04:00',
      autoUpdates: true,
      logRetention: 90
    }
  })
  const [loading, setLoading] = useState(false)

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [key]: value
      }
    }))
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Settings saved:', settings)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic system configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={settings.general.companyName}
                onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={settings.general.timezone}
                onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">Greenwich Mean Time</option>
              </select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={settings.general.language}
                onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <div>
              <Label htmlFor="dateFormat">Date Format</Label>
              <select
                id="dateFormat"
                value={settings.general.dateFormat}
                onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="autoLogout">Auto Logout (minutes)</Label>
            <Input
              id="autoLogout"
              type="number"
              value={settings.general.autoLogout}
              onChange={(e) => handleSettingChange('general', 'autoLogout', parseInt(e.target.value))}
            />
              </div>
            </CardContent>
          </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
            <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Configure security policies and authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <select
                id="passwordPolicy"
                value={settings.security.passwordPolicy}
                onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="basic">Basic</option>
                <option value="strong">Strong</option>
                <option value="very-strong">Very Strong</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-4">
              <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Require 2FA for all users</p>
                </div>
              <Switch
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
              />
              </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>IP Whitelist</Label>
                <p className="text-sm text-gray-600">Restrict access to specific IP addresses</p>
              </div>
              <Switch
                checked={settings.security.ipWhitelist}
                onCheckedChange={(checked) => handleSettingChange('security', 'ipWhitelist', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Audit Logging</Label>
                <p className="text-sm text-gray-600">Log all user actions for security</p>
              </div>
              <Switch
                checked={settings.security.auditLogging}
                onCheckedChange={(checked) => handleSettingChange('security', 'auditLogging', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
        <CardContent className="space-y-4">
              <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
              <Switch
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
              />
            </div>
                    <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Send notifications via SMS</p>
                    </div>
              <Switch
                checked={settings.notifications.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'smsNotifications', checked)}
              />
                    </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Send browser push notifications</p>
                  </div>
              <Switch
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
              />
                </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Ticket Updates</Label>
                <p className="text-sm text-gray-600">Notify on ticket status changes</p>
                  </div>
              <Switch
                checked={settings.notifications.ticketUpdates}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'ticketUpdates', checked)}
              />
            </div>
                    <div className="flex items-center justify-between">
              <div>
                <Label>System Alerts</Label>
                <p className="text-sm text-gray-600">Notify on system issues</p>
                    </div>
              <Switch
                checked={settings.notifications.systemAlerts}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'systemAlerts', checked)}
              />
                    </div>
                  </div>
        </CardContent>
      </Card>
                </div>
  )

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backup Settings</CardTitle>
          <CardDescription>Configure data backup and recovery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <select
                id="backupFrequency"
                value={settings.backup.backupFrequency}
                onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
                  </div>
            <div>
              <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
              <Input
                id="retentionPeriod"
                type="number"
                value={settings.backup.retentionPeriod}
                onChange={(e) => handleSettingChange('backup', 'retentionPeriod', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-4">
                    <div className="flex items-center justify-between">
              <div>
                <Label>Automatic Backup</Label>
                <p className="text-sm text-gray-600">Enable automatic backups</p>
                    </div>
              <Switch
                checked={settings.backup.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('backup', 'autoBackup', checked)}
              />
                    </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Cloud Backup</Label>
                <p className="text-sm text-gray-600">Store backups in cloud storage</p>
                  </div>
              <Switch
                checked={settings.backup.cloudBackup}
                onCheckedChange={(checked) => handleSettingChange('backup', 'cloudBackup', checked)}
              />
                </div>
                  </div>
          <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
              <div>
                <Label>Last Backup</Label>
                <p className="text-sm text-gray-600">{settings.backup.lastBackup}</p>
                    </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Backup Now
              </Button>
                    </div>
                  </div>
        </CardContent>
      </Card>
                </div>
  )

  const renderMaintenanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Settings</CardTitle>
          <CardDescription>Configure system maintenance and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maintenanceWindow">Maintenance Window</Label>
              <select
                id="maintenanceWindow"
                value={settings.maintenance.maintenanceWindow}
                onChange={(e) => handleSettingChange('maintenance', 'maintenanceWindow', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="02:00-04:00">02:00-04:00</option>
                <option value="01:00-03:00">01:00-03:00</option>
                <option value="03:00-05:00">03:00-05:00</option>
                <option value="weekend">Weekend Only</option>
              </select>
                  </div>
            <div>
              <Label htmlFor="logRetention">Log Retention (days)</Label>
              <Input
                id="logRetention"
                type="number"
                value={settings.maintenance.logRetention}
                onChange={(e) => handleSettingChange('maintenance', 'logRetention', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-4">
                    <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Enable maintenance mode</p>
                    </div>
              <Switch
                checked={settings.maintenance.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenance', 'maintenanceMode', checked)}
              />
                    </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Scheduled Maintenance</Label>
                <p className="text-sm text-gray-600">Enable scheduled maintenance</p>
                  </div>
              <Switch
                checked={settings.maintenance.scheduledMaintenance}
                onCheckedChange={(checked) => handleSettingChange('maintenance', 'scheduledMaintenance', checked)}
              />
                </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Automatic Updates</Label>
                <p className="text-sm text-gray-600">Enable automatic system updates</p>
              </div>
              <Switch
                checked={settings.maintenance.autoUpdates}
                onCheckedChange={(checked) => handleSettingChange('maintenance', 'autoUpdates', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>System Version</Label>
              <p className="text-sm text-gray-600">BSM Platform v2.1.0</p>
            </div>
            <div>
              <Label>Database Version</Label>
              <p className="text-sm text-gray-600">PostgreSQL 15.2</p>
            </div>
            <div>
              <Label>Server Status</Label>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div>
              <Label>Last Update</Label>
              <p className="text-sm text-gray-600">2024-01-15 14:30:00</p>
            </div>
            <div>
              <Label>Uptime</Label>
              <p className="text-sm text-gray-600">15 days, 8 hours</p>
            </div>
            <div>
              <Label>Memory Usage</Label>
              <p className="text-sm text-gray-600">67% (2.1GB / 3.2GB)</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Label>System Health</Label>
                <p className="text-sm text-gray-600">All systems operational</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={saveSettings} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Settings
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
      </div>
      </div>

      {/* Content based on sub-tab */}
      {!subTab || subTab === 'general' ? renderGeneralSettings() : null}
      {subTab === 'security' ? renderSecuritySettings() : null}
      {subTab === 'notifications' ? renderNotificationSettings() : null}
      {subTab === 'backup' ? renderBackupSettings() : null}
      {subTab === 'maintenance' ? renderMaintenanceSettings() : null}
      {subTab === 'system-info' ? renderSystemInfo() : null}
    </div>
  )
}

// Fresh Assets Management Component
function AssetsContent({ subTab }: { subTab: string }) {
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadAssets()
  }, [subTab])

  const loadAssets = () => {
    // Fresh mock data for assets
    const mockAssets = [
      {
        id: 1,
        name: 'Dell OptiPlex 7090',
        type: 'Desktop',
        category: 'hardware',
        serialNumber: 'DL7090-001234',
        status: 'active',
        assignedTo: 'John Smith',
        location: 'Office Floor 1',
        purchaseDate: '2023-01-15',
        warrantyExpiry: '2026-01-15',
        cost: 1200,
        vendor: 'Dell Technologies',
        specifications: {
          cpu: 'Intel Core i7-11700',
          ram: '16GB DDR4',
          storage: '512GB SSD',
          os: 'Windows 11 Pro'
        }
      },
      {
        id: 2,
        name: 'MacBook Pro 16"',
        type: 'Laptop',
        category: 'hardware',
        serialNumber: 'MBP16-789012',
        status: 'active',
        assignedTo: 'Sarah Johnson',
        location: 'Office Floor 2',
        purchaseDate: '2023-03-20',
        warrantyExpiry: '2026-03-20',
        cost: 2500,
        vendor: 'Apple Inc',
        specifications: {
          cpu: 'Apple M2 Pro',
          ram: '16GB Unified Memory',
          storage: '512GB SSD',
          os: 'macOS Ventura'
        }
      },
      {
        id: 3,
        name: 'Microsoft Office 365',
        type: 'Software License',
        category: 'software',
        serialNumber: 'MSO365-456789',
        status: 'active',
        assignedTo: 'Multiple Users',
        location: 'Cloud',
        purchaseDate: '2023-01-01',
        warrantyExpiry: '2024-12-31',
        cost: 300,
        vendor: 'Microsoft',
        specifications: {
          license: 'Business Premium',
          users: '50',
          features: 'Office Apps, Teams, SharePoint'
        }
      },
      {
        id: 4,
        name: 'Cisco Catalyst 2960',
        type: 'Network Switch',
        category: 'network',
        serialNumber: 'CS2960-123456',
        status: 'maintenance',
        assignedTo: 'IT Department',
        location: 'Server Room',
        purchaseDate: '2022-08-10',
        warrantyExpiry: '2025-08-10',
        cost: 800,
        vendor: 'Cisco Systems',
        specifications: {
          ports: '24 Port Gigabit',
          power: 'PoE+',
          management: 'Web Interface'
        }
      },
      {
        id: 5,
        name: 'HP LaserJet Pro',
        type: 'Printer',
        category: 'peripheral',
        serialNumber: 'HPLJ-987654',
        status: 'active',
        assignedTo: 'Office Staff',
        location: 'Office Floor 1',
        purchaseDate: '2023-02-15',
        warrantyExpiry: '2026-02-15',
        cost: 150,
        vendor: 'HP Inc',
        specifications: {
          type: 'Laser Printer',
          speed: '25 ppm',
          resolution: '1200 x 1200 dpi',
          connectivity: 'WiFi, USB'
        }
      },
      {
        id: 6,
        name: 'Adobe Creative Cloud',
        type: 'software',
        category: 'software',
        serialNumber: 'ACC-321098',
        status: 'active',
        assignedTo: 'Design Team',
        location: 'Cloud',
        purchaseDate: '2023-02-01',
        warrantyExpiry: '2024-01-31',
        cost: 600,
        vendor: 'Adobe Inc',
        specifications: {
          license: 'Team License',
          users: '10',
          apps: 'Photoshop, Illustrator, InDesign'
        }
      }
    ]
    setAssets(mockAssets)
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSubTab = !subTab || subTab === 'all' || asset.category === subTab
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'retired': return 'bg-gray-100 text-gray-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Desktop': return Monitor
      case 'Laptop': return Laptop
      case 'Software License': return Code
      case 'Network Switch': return Network
      case 'Printer': return Printer
      default: return Package
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hardware': return 'bg-blue-100 text-blue-800'
      case 'software': return 'bg-purple-100 text-purple-800'
      case 'network': return 'bg-green-100 text-green-800'
      case 'peripheral': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalAssets = assets.length
  const activeAssets = assets.filter(asset => asset.status === 'active').length
  const maintenanceAssets = assets.filter(asset => asset.status === 'maintenance').length
  const totalValue = assets.reduce((sum, asset) => sum + asset.cost, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Asset Management</h2>
          <p className="text-gray-600">Manage IT assets and inventory</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalAssets}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeAssets}</div>
            <p className="text-xs text-muted-foreground">95% operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{maintenanceAssets}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Asset value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset: any) => {
          const TypeIcon = getTypeIcon(asset.type)
          return (
            <Card key={asset.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <TypeIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{asset.name}</CardTitle>
                      <Badge className={getCategoryColor(asset.category)}>
                        {asset.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getStatusColor(asset.status)}>
                    {asset.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Serial:</span>
                    <span className="font-mono text-xs">{asset.serialNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Assigned to:</span>
                    <span>{asset.assignedTo}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span>{asset.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Cost:</span>
                    <span className="font-semibold">${asset.cost}</span>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAsset(asset)}
                      className="flex-1"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedAsset.name}</h2>
              <Button variant="ghost" onClick={() => setSelectedAsset(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6">
              {/* Asset Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedAsset.status)}>
                      {selectedAsset.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Category: {selectedAsset.category}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ${selectedAsset.cost.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Purchase price</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Warranty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-bold text-blue-600">
                      {selectedAsset.warrantyExpiry}
                    </div>
                    <p className="text-sm text-gray-600">Expiry date</p>
                  </CardContent>
                </Card>
              </div>

              {/* Asset Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Serial Number</Label>
                      <p className="text-sm font-mono">{selectedAsset.serialNumber}</p>
                    </div>
                    <div>
                      <Label>Assigned To</Label>
                      <p className="text-sm">{selectedAsset.assignedTo}</p>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <p className="text-sm">{selectedAsset.location}</p>
                    </div>
                    <div>
                      <Label>Vendor</Label>
                      <p className="text-sm">{selectedAsset.vendor}</p>
                    </div>
                    <div>
                      <Label>Purchase Date</Label>
                      <p className="text-sm">{selectedAsset.purchaseDate}</p>
                    </div>
                    <div>
                      <Label>Warranty Expiry</Label>
                      <p className="text-sm">{selectedAsset.warrantyExpiry}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedAsset.specifications).map(([key, value]: [string, any]) => (
                      <div key={key}>
                        <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                        <p className="text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Asset
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Reassign
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Asset Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Asset</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assetName">Asset Name</Label>
                  <Input id="assetName" placeholder="Enter asset name" />
                </div>
                <div>
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input id="serialNumber" placeholder="Enter serial number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                    <option value="network">Network</option>
                    <option value="peripheral">Peripheral</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select id="type" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="Desktop">Desktop</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Software License">Software License</option>
                    <option value="Network Switch">Network Switch</option>
                    <option value="Printer">Printer</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input id="assignedTo" placeholder="Enter assigned user" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cost">Cost</Label>
                  <Input id="cost" type="number" placeholder="Enter cost" />
                </div>
                <div>
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input id="vendor" placeholder="Enter vendor" />
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Asset
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Fresh Integrations Management Component
function IntegrationsContent({ subTab }: { subTab: string }) {
  const [integrations, setIntegrations] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadIntegrations()
  }, [subTab])

  const loadIntegrations = () => {
    // Fresh mock data for integrations
    const mockIntegrations = [
      {
        id: 1,
        name: 'Slack',
        type: 'communication',
        status: 'active',
        description: 'Send notifications to Slack channels',
        icon: 'slack',
        lastSync: '2024-01-15 14:30:00',
        config: {
          webhookUrl: 'https://hooks.slack.com/services/...',
          channel: '#support',
          notifications: ['ticket_created', 'ticket_updated']
        }
      },
      {
        id: 2,
        name: 'Microsoft Teams',
        type: 'communication',
        status: 'active',
        description: 'Integrate with Microsoft Teams for notifications',
        icon: 'teams',
        lastSync: '2024-01-15 13:45:00',
        config: {
          webhookUrl: 'https://outlook.office.com/webhook/...',
          channel: 'Support Team',
          notifications: ['ticket_created', 'ticket_resolved']
        }
      },
      {
        id: 3,
        name: 'Gmail',
        type: 'email',
        status: 'active',
        description: 'Send and receive emails through Gmail',
        icon: 'gmail',
        lastSync: '2024-01-15 14:00:00',
        config: {
          email: 'support@company.com',
          smtpServer: 'smtp.gmail.com',
          port: 587
        }
      },
      {
        id: 4,
        name: 'Jira',
        type: 'project-management',
        status: 'inactive',
        description: 'Sync tickets with Jira issues',
        icon: 'jira',
        lastSync: '2024-01-10 09:15:00',
        config: {
          serverUrl: 'https://company.atlassian.net',
          projectKey: 'SUP',
          issueType: 'Bug'
        }
      },
      {
        id: 5,
        name: 'Zendesk',
        type: 'helpdesk',
        status: 'active',
        description: 'Import tickets from Zendesk',
        icon: 'zendesk',
        lastSync: '2024-01-15 12:20:00',
        config: {
          subdomain: 'company',
          apiToken: '***',
          syncDirection: 'bidirectional'
        }
      },
      {
        id: 6,
        name: 'Salesforce',
        type: 'crm',
        status: 'inactive',
        description: 'Sync customer data with Salesforce',
        icon: 'salesforce',
        lastSync: '2024-01-08 16:30:00',
        config: {
          instanceUrl: 'https://company.salesforce.com',
          apiVersion: 'v58.0',
          syncFields: ['name', 'email', 'phone']
        }
      },
      {
        id: 7,
        name: 'GitHub',
        type: 'development',
        status: 'active',
        description: 'Link tickets to GitHub issues and pull requests',
        icon: 'github',
        lastSync: '2024-01-15 11:45:00',
        config: {
          repository: 'company/support-system',
          token: '***',
          autoLink: true
        }
      },
      {
        id: 8,
        name: 'Webhook',
        type: 'custom',
        status: 'active',
        description: 'Custom webhook integration for external systems',
        icon: 'webhook',
        lastSync: '2024-01-15 14:15:00',
        config: {
          url: 'https://api.external-system.com/webhook',
          method: 'POST',
          headers: { 'Authorization': 'Bearer ***' }
        }
      }
    ]
    setIntegrations(mockIntegrations)
  }

  const filteredIntegrations = integrations.filter(integration => {
    if (!subTab || subTab === 'all') return true
    return integration.type === subTab.replace('s', '')
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'communication': return 'bg-blue-100 text-blue-800'
      case 'email': return 'bg-purple-100 text-purple-800'
      case 'project-management': return 'bg-orange-100 text-orange-800'
      case 'helpdesk': return 'bg-green-100 text-green-800'
      case 'crm': return 'bg-indigo-100 text-indigo-800'
      case 'development': return 'bg-gray-100 text-gray-800'
      case 'custom': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'communication': return MessageSquare
      case 'email': return Mail
      case 'project-management': return Calendar
      case 'helpdesk': return HelpCircle
      case 'crm': return Users
      case 'development': return Code
      case 'custom': return Link
      default: return Plug
    }
  }

  const toggleIntegration = async (id: number) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, status: integration.status === 'active' ? 'inactive' : 'active' }
        : integration
    ))
  }

  const testIntegration = async (id: number) => {
    // Simulate testing integration
    console.log('Testing integration:', id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
          <p className="text-gray-600">Manage third-party integrations and APIs</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {integrations.filter(i => i.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <Pause className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {integrations.filter(i => i.status === 'inactive').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Plug className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{integrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
            <RefreshCw className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-purple-600">
              {integrations.length > 0 ? integrations[0].lastSync.split(' ')[1] : 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration: any) => {
          const TypeIcon = getTypeIcon(integration.type)
          return (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <TypeIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge className={getTypeColor(integration.type)}>
                        {integration.type.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Last Sync:</span>
                    <span>{integration.lastSync}</span>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleIntegration(integration.id)}
                      className="flex-1"
                    >
                      {integration.status === 'active' ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          Disable
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Enable
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testIntegration(integration.id)}
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Integration Configuration Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedIntegration.name} Configuration</h2>
              <Button variant="ghost" onClick={() => setSelectedIntegration(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Description</Label>
                <p className="text-sm text-gray-600">{selectedIntegration.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedIntegration.status)}>
                    {selectedIntegration.status}
                  </Badge>
                </div>
                <div>
                  <Label>Type</Label>
                  <Badge className={getTypeColor(selectedIntegration.type)}>
                    {selectedIntegration.type.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Last Sync</Label>
                <p className="text-sm text-gray-600">{selectedIntegration.lastSync}</p>
              </div>
              <div>
                <Label>Configuration</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <pre className="text-xs text-gray-600">
                    {JSON.stringify(selectedIntegration.config, null, 2)}
                  </pre>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Integration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Integration</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="integrationName">Integration Name</Label>
                <Input id="integrationName" placeholder="Enter integration name" />
              </div>
              <div>
                <Label htmlFor="integrationType">Type</Label>
                <select id="integrationType" className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="communication">Communication</option>
                  <option value="email">Email</option>
                  <option value="project-management">Project Management</option>
                  <option value="helpdesk">Helpdesk</option>
                  <option value="crm">CRM</option>
                  <option value="development">Development</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter integration description"
                />
              </div>
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input id="webhookUrl" placeholder="https://api.example.com/webhook" />
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

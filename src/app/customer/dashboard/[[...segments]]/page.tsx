'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BSMLogo } from '@/components/ui/bsm-logo'
import { 
  MessageSquare, 
  Star, 
  Monitor, 
  HelpCircle,
  Search,
  RefreshCw,
  Download,
  Bell,
  Settings,
  User,
  ChevronDown,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Plus,
  X,
  Save,
  Filter,
  Calendar,
  TrendingUp,
  Activity,
  FileText,
  BookOpen,
  Phone,
  Mail,
  Globe,
  Shield,
  Zap,
  Target,
  Award,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  Archive,
  Trash2,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Server,
  Database,
  Cloud,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Router,
  Smartphone,
  Laptop,
  Printer,
  Camera,
  Headphones,
  Mic,
  Video,
  MapPin,
  CreditCard,
  DollarSign,
  Receipt,
  Package,
  Truck,
  Home,
  Building,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'

export default function CustomerDashboard({ params }: { params: { segments?: string[] } }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  
  // Parse URL segments to determine active tab and sub-tab
  const segments = params.segments || []
  const activeTab = segments[0] || 'dashboard'
  const activeSubTab = segments[1] || 'overview'

  const [customerData, setCustomerData] = useState({
    openTickets: 3,
    inProgressTickets: 2,
    resolvedTickets: 15,
    totalTickets: 20,
    recentTickets: [] as any[],
    serviceHealth: [] as any[],
    recentActivity: [] as any[],
    slaPerformance: {
      compliance: 95,
      averageResponseTime: '2.5h',
      resolutionRate: 92
    },
    accountInfo: {
      companyName: 'gmail.com',
      supportTier: 'Professional',
      accountManager: 'Sarah Johnson',
      supportHours: '24/7'
    }
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateMockCustomerData()
  }, [])

  const generateMockCustomerData = () => {
    const mockData = {
      openTickets: 3,
      inProgressTickets: 2,
      resolvedTickets: 15,
      totalTickets: 20,
      recentTickets: [
        {
          id: '1',
          title: 'Login issues with mobile app',
          status: 'open',
          priority: 'high',
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Unable to login to mobile application',
          category: 'Authentication',
          assigned_to: 'Support Team'
        },
        {
          id: '2',
          title: 'Password reset not working',
          status: 'in_progress',
          priority: 'medium',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Password reset email not received',
          category: 'Account Management',
          assigned_to: 'John Smith'
        },
        {
          id: '3',
          title: 'Feature request: Dark mode',
          status: 'resolved',
          priority: 'low',
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Would like to see dark mode option',
          category: 'Feature Request',
          assigned_to: 'Product Team'
        }
      ],
      serviceHealth: [
        { service: 'Email System', status: 'operational', uptime: '99.9%', lastIncident: '7d ago' },
        { service: 'Web Application', status: 'operational', uptime: '99.8%', lastIncident: '2d ago' },
        { service: 'API Services', status: 'degraded', uptime: '98.5%', lastIncident: 'Active' },
        { service: 'Database', status: 'operational', uptime: '100%', lastIncident: '30d ago' }
      ],
      recentActivity: [
        {
          id: '1',
          type: 'ticket_created',
          message: 'New ticket created: Login issues',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          type: 'ticket_updated',
          message: 'Ticket #1234 assigned to support agent',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          type: 'system_announcement',
          message: 'Scheduled maintenance on Saturday 2 AM - 4 AM',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        }
      ],
      slaPerformance: {
        compliance: 95,
        averageResponseTime: '2.5h',
        resolutionRate: 92
      },
      accountInfo: {
        companyName: user?.email?.split('@')[1] || 'gmail.com',
        supportTier: 'Professional',
        accountManager: 'Sarah Johnson',
        supportHours: '24/7'
      }
    }
    setCustomerData(mockData)
  }

  const handleTabClick = (tab: string) => {
    router.push(`/customer/dashboard/${tab}`)
  }

  const handleSubTabClick = (subTab: string) => {
    router.push(`/customer/dashboard/${activeTab}/${subTab}`)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays}d ago`
  }

  const getStatusBadge = (status: string, priority: string) => {
    if (status === 'open') {
      return (
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="destructive">{status}</Badge>
          <Badge variant="destructive">{priority}</Badge>
        </div>
      )
    } else if (status === 'in_progress') {
      return (
        <div className="flex items-center space-x-2 mb-2">
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">{priority}</Badge>
        </div>
      )
    } else {
      return (
        <div className="flex items-center space-x-2 mb-2">
          <Badge className="bg-green-100 text-green-800">{status}</Badge>
          <Badge className="bg-green-100 text-green-800">{priority}</Badge>
        </div>
      )
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: MessageSquare },
    { id: 'ratings', label: 'Ratings', icon: Star },
    { id: 'services', label: 'Services', icon: Monitor },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ]

  const subTabs = {
    tickets: [
      { id: 'overview', label: 'Overview' },
      { id: 'open', label: 'Open' },
      { id: 'in-progress', label: 'In Progress' },
      { id: 'resolved', label: 'Resolved' },
      { id: 'create', label: 'Create New' }
    ],
    ratings: [
      { id: 'overview', label: 'Overview' },
      { id: 'submit', label: 'Submit Rating' },
      { id: 'history', label: 'Rating History' },
      { id: 'feedback', label: 'Feedback' }
    ],
    services: [
      { id: 'overview', label: 'Overview' },
      { id: 'status', label: 'System Status' },
      { id: 'health', label: 'Health Check' },
      { id: 'incidents', label: 'Incidents' }
    ],
    help: [
      { id: 'overview', label: 'Overview' },
      { id: 'knowledge-base', label: 'Knowledge Base' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact Support' }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <BSMLogo size={40} className="shadow-lg" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">BSM Platform</h1>
                <p className="text-sm text-gray-600">Customer Experience</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    onClick={() => handleTabClick(tab.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </Button>
                )
              })}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={generateMockCustomerData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">{user?.full_name || 'Test Customer'}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      {activeTab !== 'dashboard' && subTabs[activeTab as keyof typeof subTabs] && (
        <div className="bg-white border-b">
          <div className="px-6 py-3">
            <nav className="flex items-center space-x-6">
              {subTabs[activeTab as keyof typeof subTabs].map((subTab) => (
                <Button
                  key={subTab.id}
                  variant={activeSubTab === subTab.id ? 'default' : 'ghost'}
                  onClick={() => handleSubTabClick(subTab.id)}
                  size="sm"
                >
                  {subTab.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-6 overflow-y-auto scrollable flex-1">
        {activeTab === 'dashboard' && <DashboardContent data={customerData} />}
        {activeTab === 'tickets' && <TicketsContent subTab={activeSubTab} />}
        {activeTab === 'ratings' && <RatingsContent subTab={activeSubTab} />}
        {activeTab === 'services' && <ServicesContent subTab={activeSubTab} />}
        {activeTab === 'help' && <HelpContent subTab={activeSubTab} />}
      </div>
    </div>
  )
}

// Dashboard Content Component
function DashboardContent({ data }: { data: any }) {
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays}d ago`
  }

  const getStatusBadge = (status: string, priority: string) => {
    if (status === 'open') {
      return (
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="destructive">{status}</Badge>
          <Badge variant="destructive">{priority}</Badge>
        </div>
      )
    } else if (status === 'in_progress') {
      return (
        <div className="flex items-center space-x-2 mb-2">
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">{priority}</Badge>
        </div>
      )
    } else {
      return (
        <div className="flex items-center space-x-2 mb-2">
          <Badge className="bg-green-100 text-green-800">{status}</Badge>
          <Badge className="bg-green-100 text-green-800">{priority}</Badge>
        </div>
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Test Customer!
        </h2>
        <p className="text-gray-600">
          Manage your support tickets and access our services
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
          onClick={() => router.push('/customer/dashboard/tickets')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">View Tickets</h3>
                <p className="text-blue-100">Check your support requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
          onClick={() => router.push('/customer/dashboard/ratings')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Rate Service</h3>
                <p className="text-blue-100">Rate your experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
          onClick={() => router.push('/customer/dashboard/services')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Monitor className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">System Status</h3>
                <p className="text-blue-100">Check service status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
          onClick={() => router.push('/customer/dashboard/help')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Get Help</h3>
                <p className="text-blue-100">Find answers and support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Open</p>
                <p className="text-3xl font-bold text-gray-900">{data.openTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">{data.inProgressTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-gray-900">{data.resolvedTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-bold text-gray-900">{data.totalTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets and Service Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Tickets</CardTitle>
              <Button variant="outline" size="sm" onClick={() => router.push('/customer/dashboard/tickets')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentTickets.length > 0 ? (
                data.recentTickets.map((ticket: any) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{ticket.title}</h4>
                      {getStatusBadge(ticket.status, ticket.priority)}
                      <p className="text-sm text-gray-600">
                        Created {formatDate(ticket.created_at)} • Updated {formatDate(ticket.updated_at)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No tickets found</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/customer/dashboard/tickets/create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Ticket
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Service Health Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.serviceHealth.map((service: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'operational' ? 'bg-green-500' :
                      service.status === 'degraded' ? 'bg-yellow-500' :
                      service.status === 'maintenance' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{service.service}</h4>
                      <p className="text-xs text-gray-500">Last incident: {service.lastIncident}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      service.status === 'operational' ? 'bg-green-100 text-green-800' :
                      service.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                      service.status === 'maintenance' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }>
                      {service.status}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">{service.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLA Performance and Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* SLA Performance */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Compliance Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{data.slaPerformance.compliance}%</p>
                </div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  data.slaPerformance.compliance >= 95 ? 'bg-green-100' :
                  data.slaPerformance.compliance >= 85 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <CheckCircle className={`h-8 w-8 ${
                    data.slaPerformance.compliance >= 95 ? 'text-green-600' :
                    data.slaPerformance.compliance >= 85 ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{data.slaPerformance.averageResponseTime}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Resolution Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{data.slaPerformance.resolutionRate}%</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity: any) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'ticket_created' ? 'bg-blue-100' :
                    activity.type === 'ticket_updated' ? 'bg-yellow-100' :
                    activity.type === 'ticket_resolved' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'ticket_created' ? <Plus className="h-4 w-4 text-blue-600" /> :
                     activity.type === 'ticket_updated' ? <RefreshCw className="h-4 w-4 text-yellow-600" /> :
                     activity.type === 'ticket_resolved' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                     <Bell className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Company</p>
              <p className="font-medium text-gray-900">{data.accountInfo.companyName}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Support Tier</p>
              <Badge className="bg-blue-100 text-blue-800">{data.accountInfo.supportTier}</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Account Manager</p>
              <p className="font-medium text-gray-900">{data.accountInfo.accountManager}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Support Hours</p>
              <p className="font-medium text-gray-900">{data.accountInfo.supportHours}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Tickets Content Component
function TicketsContent({ subTab }: { subTab: string }) {
  const [tickets, setTickets] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    const mockTickets = [
      {
        id: 1,
        title: 'Login issues with mobile app',
        status: 'open',
        priority: 'high',
        category: 'Authentication',
        description: 'Unable to login to mobile application.',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T14:20:00Z',
        assigned_to: 'Support Team'
      },
      {
        id: 2,
        title: 'Password reset not working',
        status: 'in_progress',
        priority: 'medium',
        category: 'Account Management',
        description: 'Password reset email not received.',
        created_at: '2024-01-14T09:15:00Z',
        updated_at: '2024-01-15T11:45:00Z',
        assigned_to: 'John Smith'
      },
      {
        id: 3,
        title: 'Feature request: Dark mode',
        status: 'resolved',
        priority: 'low',
        category: 'Feature Request',
        description: 'Would like to see dark mode option.',
        created_at: '2024-01-10T16:20:00Z',
        updated_at: '2024-01-12T10:30:00Z',
        assigned_to: 'Product Team'
      }
    ]
    setTickets(mockTickets)
  }, [subTab])

  const filteredTickets = tickets.filter(ticket => {
    const matchesSubTab = !subTab || subTab === 'overview' || ticket.status === subTab.replace('-', '_')
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
          <p className="text-gray-600">Manage your support requests</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
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
              {tickets.filter(t => t.status === 'in_progress').length}
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
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{tickets.length}</div>
          </CardContent>
        </Card>
      </div>

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

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{ticket.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Created: {formatDate(ticket.created_at)}</span>
                    <span>Assigned to: {ticket.assigned_to}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto scrollable">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedTicket.title}</h2>
              <Button variant="ghost" onClick={() => setSelectedTicket(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Status</Label>
                <Badge className={getStatusColor(selectedTicket.status)}>
                  {selectedTicket.status.replace('_', ' ')}
                </Badge>
              </div>
              <div>
                <Label>Description</Label>
                <p className="text-sm mt-1">{selectedTicket.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Ticket
              </Button>
              <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto scrollable">
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
                <Textarea id="description" placeholder="Describe your issue..." rows={4} />
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
      )}
    </div>
  )
}

// Ratings Content Component
function RatingsContent({ subTab }: { subTab: string }) {
  const [ratings, setRatings] = useState<any[]>([])
  const [showRatingModal, setShowRatingModal] = useState(false)

  useEffect(() => {
    const mockRatings = [
      {
        id: 1,
        ticketId: 'T-001',
        rating: 5,
        comment: 'Excellent support! Issue resolved quickly.',
        createdAt: '2024-01-12T10:30:00Z',
        category: 'Technical Support'
      },
      {
        id: 2,
        ticketId: 'T-002',
        rating: 4,
        comment: 'Good service, minor delay in response.',
        createdAt: '2024-01-10T14:20:00Z',
        category: 'Account Management'
      }
    ]
    setRatings(mockRatings)
  }, [subTab])

  const averageRating = ratings.length > 0 ? 
    (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1) : '0.0'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Ratings</h2>
          <p className="text-gray-600">Rate your support experience</p>
        </div>
        <Button onClick={() => setShowRatingModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Star className="h-4 w-4 mr-2" />
          Submit Rating
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{averageRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{ratings.length}</div>
            <p className="text-xs text-muted-foreground">Submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {ratings.length > 0 ? Math.round((ratings.filter(r => r.rating >= 4).length / ratings.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">4+ stars</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rating History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-medium">Ticket #{rating.ticketId}</p>
                    <p className="text-sm text-gray-600">{rating.comment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800">{rating.category}</Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Rate Your Experience</h2>
              <Button variant="ghost" onClick={() => setShowRatingModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Rating</Label>
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-gray-300 cursor-pointer hover:text-yellow-400" />
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea id="comment" placeholder="Share your feedback..." rows={3} />
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Submit Rating
              </Button>
              <Button variant="outline" onClick={() => setShowRatingModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Services Content Component
function ServicesContent({ subTab }: { subTab: string }) {
  const [services, setServices] = useState<any[]>([])
  const [incidents, setIncidents] = useState<any[]>([])

  useEffect(() => {
    const mockServices = [
      { name: 'Email System', status: 'operational', uptime: '99.9%', lastIncident: '7d ago' },
      { name: 'Web Application', status: 'operational', uptime: '99.8%', lastIncident: '2d ago' },
      { name: 'API Services', status: 'degraded', uptime: '98.5%', lastIncident: 'Active' },
      { name: 'Database', status: 'operational', uptime: '100%', lastIncident: '30d ago' }
    ]
    setServices(mockServices)

    const mockIncidents = [
      {
        id: 1,
        title: 'API Response Time Degradation',
        status: 'investigating',
        severity: 'medium',
        description: 'Some API endpoints experiencing slower response times',
        createdAt: '2024-01-15T09:00:00Z'
      }
    ]
    setIncidents(mockIncidents)
  }, [subTab])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800'
      case 'degraded': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-blue-100 text-blue-800'
      case 'outage': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Status</h2>
          <p className="text-gray-600">Monitor system health and incidents</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {services.filter(s => s.status === 'operational').length}
            </div>
            <p className="text-xs text-muted-foreground">Services running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Degraded</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {services.filter(s => s.status === 'degraded').length}
            </div>
            <p className="text-xs text-muted-foreground">Performance issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {services.filter(s => s.status === 'maintenance').length}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled work</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {incidents.filter(i => i.status === 'investigating').length}
            </div>
            <p className="text-xs text-muted-foreground">Under investigation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'operational' ? 'bg-green-500' :
                      service.status === 'degraded' ? 'bg-yellow-500' :
                      service.status === 'maintenance' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-xs text-gray-500">Last incident: {service.lastIncident}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">{service.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidents.map((incident) => (
                <div key={incident.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{incident.title}</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">{incident.severity}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Status: {incident.status}</span>
                    <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Help Content Component
function HelpContent({ subTab }: { subTab: string }) {
  const [articles, setArticles] = useState<any[]>([])
  const [faqs, setFaqs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const mockArticles = [
      {
        id: 1,
        title: 'How to Reset Your Password',
        category: 'Account Management',
        content: 'Step-by-step guide to reset your password...',
        views: 1250,
        helpful: 89
      },
      {
        id: 2,
        title: 'Setting Up Two-Factor Authentication',
        category: 'Security',
        content: 'Learn how to enable 2FA for better security...',
        views: 890,
        helpful: 76
      }
    ]
    setArticles(mockArticles)

    const mockFaqs = [
      {
        id: 1,
        question: 'How do I create a new ticket?',
        answer: 'Click on the "Create Ticket" button in the Tickets section and fill out the form with your issue details.',
        category: 'Tickets'
      },
      {
        id: 2,
        question: 'What is the response time for support?',
        answer: 'We aim to respond to all tickets within 2 hours during business hours (9 AM - 6 PM EST).',
        category: 'Support'
      }
    ]
    setFaqs(mockFaqs)
  }, [subTab])

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Help Center</h2>
          <p className="text-gray-600">Find answers and get support</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call Support
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Knowledge Base</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div key={article.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{article.content.substring(0, 100)}...</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{article.views} views</span>
                        <span>{article.helpful} helpful</span>
                        <Badge className="bg-blue-100 text-blue-800">{article.category}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600 mb-2">{faq.answer}</p>
                      <Badge className="bg-green-100 text-green-800">{faq.category}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Live Chat</h4>
              <p className="text-sm text-gray-600 mb-3">Chat with our support team</p>
              <Button className="w-full">Start Chat</Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Email Support</h4>
              <p className="text-sm text-gray-600 mb-3">Send us an email</p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Phone Support</h4>
              <p className="text-sm text-gray-600 mb-3">Call us directly</p>
              <Button variant="outline" className="w-full">Call Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

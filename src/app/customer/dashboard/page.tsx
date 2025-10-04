'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Plus
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'

export default function CustomerDashboardPage() {
  const router = useRouter()
  const { user, signOut, loading: authLoading } = useAuth()
  const [currentView, setCurrentView] = useState<'dashboard' | 'tickets' | 'ratings' | 'services' | 'help'>('dashboard')
  const [loading, setLoading] = useState(true)
  const [customerData, setCustomerData] = useState({
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    totalTickets: 0,
    recentTickets: [] as any[],
    serviceHealth: [] as any[],
    recentActivity: [] as any[],
    slaPerformance: {
      compliance: 95,
      averageResponseTime: '2.5h',
      resolutionRate: 92
    },
    accountInfo: {
      companyName: '',
      supportTier: 'Professional',
      accountManager: 'Sarah Johnson',
      supportHours: '24/7'
    }
  })

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      console.log('Customer Dashboard: Auth still loading, waiting...')
      return
    }
    
    // Always allow access for development - don't redirect immediately
    console.log('Customer Dashboard: Access granted for development, loading dashboard')
    fetchCustomerData()
    setLoading(false)
  }, [user, authLoading, router])

  const fetchCustomerData = async () => {
    try {
      if (!user) return

      // Fetch customer's tickets
      const { data: tickets, error: ticketsError } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (ticketsError) {
        console.error('Error fetching customer tickets:', ticketsError)
        // Use mock data as fallback
        setCustomerData({
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
              updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: '2',
              title: 'Password reset not working',
              status: 'in_progress',
              priority: 'medium',
              created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
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
            }
          ],
          slaPerformance: {
            compliance: 95,
            averageResponseTime: '2.5h',
            resolutionRate: 92
          },
          accountInfo: {
            companyName: user?.email?.split('@')[1] || 'Your Company',
            supportTier: 'Professional',
            accountManager: 'Sarah Johnson',
            supportHours: '24/7'
          }
        })
        return
      }

      // Calculate ticket counts
      const openTickets = tickets?.filter(ticket => ticket.status === 'open').length || 0
      const inProgressTickets = tickets?.filter(ticket => ticket.status === 'in_progress').length || 0
      const resolvedTickets = tickets?.filter(ticket => ticket.status === 'resolved').length || 0
      const totalTickets = tickets?.length || 0

      // Get recent tickets (last 5)
      const recentTickets = tickets?.slice(0, 5) || []

      // Generate service health data
      const serviceHealth = [
        { service: 'Email System', status: 'operational', uptime: '99.9%', lastIncident: '7d ago' },
        { service: 'Web Application', status: 'operational', uptime: '99.8%', lastIncident: '2d ago' },
        { service: 'API Services', status: 'degraded', uptime: '98.5%', lastIncident: 'Active' },
        { service: 'Database', status: 'operational', uptime: '100%', lastIncident: '30d ago' },
        { service: 'File Storage', status: 'maintenance', uptime: '99.5%', lastIncident: 'Scheduled' }
      ]

      // Generate recent activity
      const recentActivity = [
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
        },
        {
          id: '4',
          type: 'ticket_resolved',
          message: 'Ticket #1230 marked as resolved',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
        }
      ]

      setCustomerData({
        openTickets,
        inProgressTickets,
        resolvedTickets,
        totalTickets,
        recentTickets,
        serviceHealth,
        recentActivity,
        slaPerformance: {
          compliance: 95,
          averageResponseTime: '2.5h',
          resolutionRate: 92
        },
        accountInfo: {
          companyName: user?.email?.split('@')[1] || 'Your Company',
          supportTier: 'Professional',
          accountManager: 'Sarah Johnson',
          supportHours: '24/7'
        }
      })

    } catch (error) {
      console.error('Error fetching customer data:', error)
      // Fallback to mock data
      setCustomerData({
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
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            title: 'Password reset not working',
            status: 'in_progress',
            priority: 'medium',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
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
          }
        ],
        slaPerformance: {
          compliance: 95,
          averageResponseTime: '2.5h',
          resolutionRate: 92
        },
        accountInfo: {
          companyName: user?.email?.split('@')[1] || 'Your Company',
          supportTier: 'Professional',
          accountManager: 'Sarah Johnson',
          supportHours: '24/7'
        }
      })
    }
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

  // Temporarily disable loading check for development
  // if (loading || authLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center space-x-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <Button
                variant={currentView === 'tickets' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('tickets')}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Tickets</span>
              </Button>
              <Button
                variant={currentView === 'ratings' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('ratings')}
                className="flex items-center space-x-2"
              >
                <Star className="h-4 w-4" />
                <span>Ratings</span>
              </Button>
              <Button
                variant={currentView === 'services' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('services')}
                className="flex items-center space-x-2"
              >
                <Monitor className="h-4 w-4" />
                <span>Services</span>
              </Button>
              <Button
                variant={currentView === 'help' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('help')}
                className="flex items-center space-x-2"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Button>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={fetchCustomerData}>
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
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name || 'Test Customer'}!
          </h2>
          <p className="text-gray-600">
            Manage your support tickets and access our services
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
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

          <Card className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
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

          <Card className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
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

          <Card className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
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
                  <p className="text-3xl font-bold text-gray-900">{customerData.openTickets}</p>
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
                  <p className="text-3xl font-bold text-gray-900">{customerData.inProgressTickets}</p>
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
                  <p className="text-3xl font-bold text-gray-900">{customerData.resolvedTickets}</p>
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
                  <p className="text-3xl font-bold text-gray-900">{customerData.totalTickets}</p>
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
                <Button variant="outline" size="sm" onClick={() => router.push('/customer/tickets')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData.recentTickets.length > 0 ? (
                  customerData.recentTickets.map((ticket) => (
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
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/customer/tickets')}>
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
                {customerData.serviceHealth.map((service, index) => (
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
                    <p className="text-2xl font-bold text-gray-900">{customerData.slaPerformance.compliance}%</p>
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    customerData.slaPerformance.compliance >= 95 ? 'bg-green-100' :
                    customerData.slaPerformance.compliance >= 85 ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <CheckCircle className={`h-8 w-8 ${
                      customerData.slaPerformance.compliance >= 95 ? 'text-green-600' :
                      customerData.slaPerformance.compliance >= 85 ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">{customerData.slaPerformance.averageResponseTime}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Resolution Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{customerData.slaPerformance.resolutionRate}%</p>
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
                {customerData.recentActivity.map((activity) => (
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
                <p className="font-medium text-gray-900">{customerData.accountInfo.companyName}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Support Tier</p>
                <Badge className="bg-blue-100 text-blue-800">{customerData.accountInfo.supportTier}</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Account Manager</p>
                <p className="font-medium text-gray-900">{customerData.accountInfo.accountManager}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Support Hours</p>
                <p className="font-medium text-gray-900">{customerData.accountInfo.supportHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
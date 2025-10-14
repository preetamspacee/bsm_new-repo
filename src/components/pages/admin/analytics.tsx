'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, TrendingDown, Activity, Target, DollarSign, Users, Clock, Star, AlertTriangle, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      // Fetch comprehensive analytics from all tables
      const [
        ticketsResult,
        usersResult,
        knowledgeResult,
        workflowsResult,
        ratingsResult,
        servicesResult,
        assetsResult,
        rulesResult
      ] = await Promise.all([
        supabase.from('tickets').select('status, priority, created_at, resolved_at'),
        supabase.from('users').select('role, created_at, last_login'),
        supabase.from('knowledge_base').select('view_count, helpful_count, created_at'),
        supabase.from('workflows').select('is_active, created_at'),
        supabase.from('ratings').select('rating, created_at'),
        supabase.from('services').select('status, uptime'),
        supabase.from('assets').select('status, uptime'),
        supabase.from('rules').select('is_active, type')
      ])

      // Process tickets analytics
      const ticketsData = ticketsResult.data || []
      const ticketAnalytics = {
        total: ticketsData.length,
        open: ticketsData.filter(t => t.status === 'open').length,
        in_progress: ticketsData.filter(t => t.status === 'in_progress').length,
        resolved: ticketsData.filter(t => t.status === 'resolved').length,
        approved: ticketsData.filter(t => t.status === 'approved').length,
        urgent: ticketsData.filter(t => t.priority === 'urgent').length,
        high: ticketsData.filter(t => t.priority === 'high').length,
        avgResolutionTime: calculateAvgResolutionTime(ticketsData)
      }

      // Process user analytics
      const usersData = usersResult.data || []
      const userAnalytics = {
        total: usersData.length,
        admins: usersData.filter(u => u.role === 'admin').length,
        customers: usersData.filter(u => u.role === 'customer').length,
        activeUsers: usersData.filter(u => {
          const lastLogin = new Date(u.last_login)
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          return lastLogin > thirtyDaysAgo
        }).length
      }

      // Process knowledge base analytics
      const knowledgeData = knowledgeResult.data || []
      const knowledgeAnalytics = {
        totalArticles: knowledgeData.length,
        totalViews: knowledgeData.reduce((sum, article) => sum + (article.view_count || 0), 0),
        totalHelpful: knowledgeData.reduce((sum, article) => sum + (article.helpful_count || 0), 0),
        avgViewsPerArticle: knowledgeData.length > 0 ? 
          knowledgeData.reduce((sum, article) => sum + (article.view_count || 0), 0) / knowledgeData.length : 0
      }

      // Process workflow analytics
      const workflowsData = workflowsResult.data || []
      const workflowAnalytics = {
        total: workflowsData.length,
        active: workflowsData.filter(w => w.is_active).length,
        inactive: workflowsData.filter(w => !w.is_active).length
      }

      // Process ratings analytics
      const ratingsData = ratingsResult.data || []
      const ratingAnalytics = {
        totalRatings: ratingsData.length,
        avgRating: ratingsData.length > 0 ? 
          ratingsData.reduce((sum, rating) => sum + rating.rating, 0) / ratingsData.length : 0,
        fiveStar: ratingsData.filter(r => r.rating === 5).length,
        fourStar: ratingsData.filter(r => r.rating === 4).length,
        threeStar: ratingsData.filter(r => r.rating === 3).length,
        twoStar: ratingsData.filter(r => r.rating === 2).length,
        oneStar: ratingsData.filter(r => r.rating === 1).length
      }

      // Process services analytics
      const servicesData = servicesResult.data || []
      const serviceAnalytics = {
        total: servicesData.length,
        operational: servicesData.filter(s => s.status === 'operational').length,
        degraded: servicesData.filter(s => s.status === 'degraded').length,
        maintenance: servicesData.filter(s => s.status === 'maintenance').length,
        outage: servicesData.filter(s => s.status === 'outage').length,
        avgUptime: servicesData.length > 0 ? 
          servicesData.reduce((sum, service) => sum + parseFloat(service.uptime || '0'), 0) / servicesData.length : 0
      }

      // Process assets analytics
      const assetsData = assetsResult.data || []
      const assetAnalytics = {
        total: assetsData.length,
        operational: assetsData.filter(a => a.status === 'operational').length,
        degraded: assetsData.filter(a => a.status === 'degraded').length,
        maintenance: assetsData.filter(a => a.status === 'maintenance').length,
        outage: assetsData.filter(a => a.status === 'outage').length,
        avgUptime: assetsData.length > 0 ? 
          assetsData.reduce((sum, asset) => sum + parseFloat(asset.uptime || '0'), 0) / assetsData.length : 0
      }

      // Process rules analytics
      const rulesData = rulesResult.data || []
      const ruleAnalytics = {
        total: rulesData.length,
        active: rulesData.filter(r => r.is_active).length,
        automation: rulesData.filter(r => r.type === 'automation').length,
        escalation: rulesData.filter(r => r.type === 'escalation').length,
        approval: rulesData.filter(r => r.type === 'approval').length,
        notification: rulesData.filter(r => r.type === 'notification').length
      }

      // Combine all analytics
      const comprehensiveAnalytics = {
        tickets: ticketAnalytics,
        users: userAnalytics,
        knowledge: knowledgeAnalytics,
        workflows: workflowAnalytics,
        ratings: ratingAnalytics,
        services: serviceAnalytics,
        assets: assetAnalytics,
        rules: ruleAnalytics,
        timestamp: new Date().toISOString()
      }

      setAnalyticsData(comprehensiveAnalytics)
      console.log('Comprehensive analytics loaded:', comprehensiveAnalytics)

    } catch (error) {
      console.error('Error fetching analytics:', error)
      toast.error('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  const calculateAvgResolutionTime = (tickets: any[]) => {
    const resolvedTickets = tickets.filter(t => t.resolved_at && t.created_at)
    if (resolvedTickets.length === 0) return 0
    
    const totalTime = resolvedTickets.reduce((sum, ticket) => {
      const created = new Date(ticket.created_at)
      const resolved = new Date(ticket.resolved_at)
      return sum + (resolved.getTime() - created.getTime())
    }, 0)
    
    return Math.round(totalTime / resolvedTickets.length / (1000 * 60 * 60)) // Convert to hours
  }

  const getMetricIcon = (metricName: string) => {
    switch (metricName) {
      case 'ticket_volume': return MessageSquare
      case 'response_time': return Clock
      case 'customer_satisfaction': return Star
      case 'resolution_rate': return CheckCircle
      case 'system_health': return Activity
      case 'uptime': return Target
      case 'performance_score': return TrendingUp
      case 'sla_compliance': return AlertTriangle
      default: return BarChart3
    }
  }

  const getMetricColor = (metricName: string) => {
    switch (metricName) {
      case 'ticket_volume': return 'text-blue-600'
      case 'response_time': return 'text-orange-600'
      case 'customer_satisfaction': return 'text-green-600'
      case 'resolution_rate': return 'text-purple-600'
      case 'system_health': return 'text-green-600'
      case 'uptime': return 'text-blue-600'
      case 'performance_score': return 'text-purple-600'
      case 'sla_compliance': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const filteredData = selectedMetric === 'all' 
    ? analyticsData 
    : analyticsData.filter(item => item.metric_name === selectedMetric)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive system performance and business metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button onClick={fetchAnalytics} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Volume</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.find(a => a.metric_name === 'ticket_volume')?.metric_value || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.find(a => a.metric_name === 'average_response_time')?.metric_value || 0}m
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.find(a => a.metric_name === 'customer_satisfaction')?.metric_value || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.find(a => a.metric_name === 'resolution_rate')?.metric_value || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Real-time system health metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">System Health</span>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {analyticsData.find(a => a.metric_name === 'system_health')?.metric_value || 0}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Uptime</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {analyticsData.find(a => a.metric_name === 'uptime')?.metric_value || 0}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Performance Score</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">
                {analyticsData.find(a => a.metric_name === 'performance_score')?.metric_value || 0}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">SLA Compliance</span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">
                {analyticsData.find(a => a.metric_name === 'sla_compliance')?.metric_value || 0}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Active Users</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {analyticsData.find(a => a.metric_name === 'active_users')?.metric_value || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Revenue</span>
              </div>
              <Badge className="bg-green-100 text-green-800">
                ${analyticsData.find(a => a.metric_name === 'revenue')?.metric_value || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Growth Rate</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">
                {analyticsData.find(a => a.metric_name === 'growth_rate')?.metric_value || 0}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {analyticsData.find(a => a.metric_name === 'success_rate')?.metric_value || 0}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
          <CardDescription>
            Comprehensive view of all system metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((metric: any) => {
              const Icon = getMetricIcon(metric.metric_name)
              const colorClass = getMetricColor(metric.metric_name)
              
              return (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${colorClass}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">
                          {metric.metric_name.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </h3>
                        <Badge variant="secondary">{metric.metric_type || 'N/A'}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {metric.description || 'No description available'}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Value: {metric.metric_value}</span>
                        <span>Unit: {metric.metric_unit || 'N/A'}</span>
                        <span>Updated: {new Date(metric.updated_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No metrics found</h3>
                <p className="text-gray-600">Try adjusting your filter criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


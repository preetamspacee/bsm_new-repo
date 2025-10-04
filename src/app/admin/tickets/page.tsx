'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  User, 
  Calendar,
  MessageSquare,
  FileText,
  Tag,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Circle,
  Square,
  Triangle,
  Zap,
  Mail,
  Phone,
  Slack,
  Globe,
  Bot,
  TrendingUp,
  Shield,
  Timer,
  Users,
  BarChart3,
  Activity,
  RefreshCw,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Paperclip,
  Send,
  Mic,
  Video,
  Monitor,
  Smartphone,
  Laptop
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function TicketsPage() {
  console.log('TicketsPage component rendering...')
  const [activeTab, setActiveTab] = useState('all')
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterChannel, setFilterChannel] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [slaBreachRisk, setSlaBreachRisk] = useState<any[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([])
  const [unassignedTickets, setUnassignedTickets] = useState<any[]>([])
  const [channelStats, setChannelStats] = useState<any>({})
  const [departmentStats, setDepartmentStats] = useState<any>({})
  const [realTimeUpdates, setRealTimeUpdates] = useState(true)

  const tabs = [
    { id: 'all', label: 'All Tickets', count: 0 },
    { id: 'my-assigned', label: 'My Assigned', count: 0 },
    { id: 'unassigned', label: 'Unassigned', count: 0 },
    { id: 'sla-risk', label: 'SLA Risk', count: 0 },
    { id: 'email', label: 'Email', count: 0 },
    { id: 'slack', label: 'Slack', count: 0 },
    { id: 'portal', label: 'Portal', count: 0 },
    { id: 'voice', label: 'Voice', count: 0 },
    { id: 'open', label: 'Open', count: 0 },
    { id: 'in_progress', label: 'In Progress', count: 0 },
    { id: 'resolved', label: 'Resolved', count: 0 },
    { id: 'closed', label: 'Closed', count: 0 }
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800', icon: ArrowDown },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: ArrowRight },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800', icon: ArrowUp },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
  ]

  const statuses = [
    { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800', icon: Circle },
    { value: 'in_progress', label: 'In Progress', color: 'bg-purple-100 text-purple-800', icon: Clock },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800', icon: Square },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle }
  ]

  const channels = [
    { value: 'email', label: 'Email', icon: Mail, color: 'bg-blue-100 text-blue-800' },
    { value: 'slack', label: 'Slack', icon: Slack, color: 'bg-purple-100 text-purple-800' },
    { value: 'portal', label: 'Portal', icon: Globe, color: 'bg-green-100 text-green-800' },
    { value: 'voice', label: 'Voice', icon: Phone, color: 'bg-orange-100 text-orange-800' },
    { value: 'chat', label: 'Live Chat', icon: MessageCircle, color: 'bg-cyan-100 text-cyan-800' }
  ]

  const departments = [
    { value: 'it-support', label: 'IT Support', icon: Monitor, color: 'bg-blue-100 text-blue-800' },
    { value: 'customer-service', label: 'Customer Service', icon: Users, color: 'bg-green-100 text-green-800' },
    { value: 'technical', label: 'Technical', icon: Zap, color: 'bg-purple-100 text-purple-800' },
    { value: 'billing', label: 'Billing', icon: FileText, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'security', label: 'Security', icon: Shield, color: 'bg-red-100 text-red-800' }
  ]

  const categories = [
    'Technical Support',
    'Account Issues',
    'Billing Questions',
    'Feature Requests',
    'Bug Reports',
    'General Inquiry',
    'Security Issues',
    'Performance Issues'
  ]

  const subcategories = {
    'Technical Support': ['Login Issues', 'Performance', 'Integration', 'API Problems'],
    'Account Issues': ['Password Reset', 'Account Locked', 'Profile Update', 'Access Rights'],
    'Billing Questions': ['Payment Issues', 'Invoice Requests', 'Refund Requests', 'Plan Changes'],
    'Feature Requests': ['New Features', 'Enhancements', 'Customizations', 'Integrations'],
    'Bug Reports': ['UI Issues', 'Functionality Bugs', 'Data Issues', 'System Errors'],
    'General Inquiry': ['Information Request', 'Training', 'Documentation', 'Support'],
    'Security Issues': ['Suspicious Activity', 'Access Violations', 'Data Breach', 'Compliance'],
    'Performance Issues': ['Slow Loading', 'Timeout Errors', 'Resource Usage', 'Scalability']
  }

  useEffect(() => {
    console.log('TicketsPage useEffect running...')
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      console.log('Starting fetchTickets...')
      setLoading(true)
      
      // Try to fetch from Supabase first
      const { data: supabaseTickets, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false })

      let allTickets = []
      if (error) {
        console.log('Supabase error, using mock data:', error)
        // Use mock data if Supabase fails
        allTickets = generateMockTickets()
        console.log('Generated mock tickets:', allTickets.length)
      } else {
        // Combine Supabase data with mock data if needed
        const mockTickets = generateMockTickets()
        allTickets = [...(supabaseTickets || []), ...mockTickets]
        console.log('Combined tickets:', allTickets.length)
      }

      // Set tickets first
      console.log('Setting tickets:', allTickets.length)
      setTickets(allTickets)

      // Calculate SLA breach risk and AI suggestions using the tickets data directly
      const riskTickets = allTickets.filter(ticket => 
        ticket.sla_status === 'at_risk' || ticket.sla_status === 'breached'
      )
      setSlaBreachRisk(riskTickets)

      // Generate AI suggestions
      const suggestions = allTickets.filter(ticket => !ticket.assignee).map(ticket => ({
        ticketId: ticket.id,
        suggestedAssignee: ticket.ai_suggested_assignee,
        confidence: ticket.ai_confidence,
        reason: `Based on expertise in ${ticket.category} and current workload`
      }))
      setAiSuggestions(suggestions)

      // Calculate channel stats
      const channelStats = channels.map(channel => {
        const channelTickets = allTickets.filter(ticket => ticket.channel === channel.id)
        return {
          ...channel,
          count: channelTickets.length,
          avgResolutionTime: channelTickets.length > 0 ? 
            channelTickets.reduce((sum, ticket) => sum + (ticket.actual_hours || 0), 0) / channelTickets.length : 0,
          satisfaction: channelTickets.length > 0 ?
            channelTickets.reduce((sum, ticket) => sum + (ticket.customer_satisfaction || 0), 0) / channelTickets.length : 0
        }
      })
      setChannelStats(channelStats)

      // Calculate department stats
      const departmentStats = departments.map(dept => {
        const deptTickets = allTickets.filter(ticket => ticket.department === dept.id)
        return {
          ...dept,
          count: deptTickets.length,
          avgResolutionTime: deptTickets.length > 0 ? 
            deptTickets.reduce((sum, ticket) => sum + (ticket.actual_hours || 0), 0) / deptTickets.length : 0,
          slaCompliance: deptTickets.length > 0 ?
            (deptTickets.filter(ticket => ticket.sla_status !== 'breached').length / deptTickets.length) * 100 : 100
        }
      })
      setDepartmentStats(departmentStats)

    } catch (error) {
      console.error('Error fetching tickets:', error)
      // Fallback to mock data
      const mockTickets = generateMockTickets()
      setTickets(mockTickets)
    } finally {
      setLoading(false)
    }
  }

  const getRandomTitle = (status: string, category: string) => {
    const titles = {
      'Technical Support': ['Login not working', 'Slow performance', 'Integration error', 'API timeout'],
      'Account Issues': ['Cannot reset password', 'Account locked', 'Profile update failed', 'Access denied'],
      'Billing Questions': ['Payment failed', 'Invoice missing', 'Refund request', 'Plan upgrade'],
      'Feature Requests': ['New dashboard needed', 'Export functionality', 'Mobile app request', 'API enhancement'],
      'Bug Reports': ['Button not clickable', 'Data not saving', 'Display error', 'System crash'],
      'General Inquiry': ['How to use feature', 'Training request', 'Documentation needed', 'Support question']
    }
    
    const categoryTitles = titles[category] || ['General issue']
    return categoryTitles[Math.floor(Math.random() * categoryTitles.length)]
  }

  const getRandomTags = () => {
    const allTags = ['urgent', 'bug', 'enhancement', 'documentation', 'ui', 'backend', 'frontend', 'mobile', 'api', 'security']
    const numTags = Math.floor(Math.random() * 3) + 1
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags)
  }

  const generateMockTickets = () => {
    const mockTickets = []
    const statuses = ['open', 'in_progress', 'resolved', 'closed', 'pending', 'cancelled']
    const priorities = ['low', 'medium', 'high', 'critical']
    const categories = ['Technical Support', 'Account Issues', 'Billing Questions', 'Feature Requests', 'Bug Reports', 'General Inquiry']
    const channels = ['email', 'slack', 'portal', 'voice', 'chat']
    const departments = ['it-support', 'customer-service', 'technical', 'billing', 'security']
    
    for (let i = 1; i <= 50; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const priority = priorities[Math.floor(Math.random() * priorities.length)]
      const category = categories[Math.floor(Math.random() * categories.length)]
      const channel = channels[Math.floor(Math.random() * channels.length)]
      const department = departments[Math.floor(Math.random() * departments.length)]
      const createdDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      const updatedDate = new Date(createdDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
      
      // Calculate SLA deadline (24 hours for most tickets, 4 hours for critical)
      const slaHours = priority === 'critical' ? 4 : 24
      const slaDeadline = new Date(createdDate.getTime() + slaHours * 60 * 60 * 1000)
      
      // Calculate SLA status
      let slaStatus = 'on_track'
      if (status === 'open' || status === 'in_progress') {
        const timeRemaining = slaDeadline.getTime() - new Date().getTime()
        if (timeRemaining < 0) {
          slaStatus = 'breached'
        } else if (timeRemaining < 2 * 60 * 60 * 1000) { // Less than 2 hours
          slaStatus = 'at_risk'
        }
      } else if (status === 'resolved' || status === 'closed') {
        slaStatus = new Date(updatedDate) <= slaDeadline ? 'met' : 'breached'
      }
      
      mockTickets.push({
        id: `TICKET-${String(i).padStart(4, '0')}`,
        title: `Ticket ${i}: ${getRandomTitle(status, category)}`,
        description: `This is a detailed description for ticket ${i}. The issue involves ${category.toLowerCase()} and requires attention.`,
        status,
        priority,
        category,
        subcategory: subcategories[category]?.[Math.floor(Math.random() * (subcategories[category]?.length || 1))] || 'General',
        channel,
        department,
        assignee: Math.random() > 0.3 ? `User ${Math.floor(Math.random() * 10) + 1}` : null, // 30% unassigned
        reporter: `Customer ${Math.floor(Math.random() * 20) + 1}`,
        created_at: createdDate.toISOString(),
        updated_at: updatedDate.toISOString(),
        resolved_at: status === 'resolved' || status === 'closed' ? updatedDate.toISOString() : null,
        sla_deadline: slaDeadline.toISOString(),
        sla_status: slaStatus,
        sla_hours: slaHours,
        tags: getRandomTags(),
        attachments: Math.floor(Math.random() * 3),
        comments: Math.floor(Math.random() * 10),
        estimated_hours: Math.floor(Math.random() * 8) + 1,
        actual_hours: status === 'resolved' || status === 'closed' ? Math.floor(Math.random() * 8) + 1 : null,
        first_contact_resolution: Math.random() > 0.7, // 30% FCR
        customer_satisfaction: status === 'resolved' || status === 'closed' ? Math.floor(Math.random() * 2) + 4 : null, // 4-5 stars
        ai_suggested_assignee: `AI Agent ${Math.floor(Math.random() * 5) + 1}`,
        ai_confidence: Math.floor(Math.random() * 30) + 70, // 70-100% confidence
        emotion_analysis: channel === 'voice' ? ['frustrated', 'calm', 'urgent', 'satisfied'][Math.floor(Math.random() * 4)] : null,
        transcript: channel === 'voice' ? `Call transcript for ticket ${i}: Customer reported issue with ${category.toLowerCase()}. Agent provided solution.` : null,
        thread_data: channel === 'email' ? `Email thread with ${Math.floor(Math.random() * 5) + 1} messages` : null,
        slack_data: channel === 'slack' ? `Slack conversation in #support channel` : null
      })
    }
    
    return mockTickets
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    const matchesChannel = filterChannel === 'all' || ticket.channel === filterChannel
    const matchesDepartment = filterDepartment === 'all' || ticket.department === filterDepartment
    
    // Handle special tabs
    let matchesTab = true
    if (activeTab === 'my-assigned') {
      matchesTab = ticket.assignee === 'User 1' // Current user
    } else if (activeTab === 'unassigned') {
      matchesTab = !ticket.assignee
    } else if (activeTab === 'sla-risk') {
      matchesTab = ticket.sla_status === 'at_risk' || ticket.sla_status === 'breached'
    } else if (['email', 'slack', 'portal', 'voice', 'chat'].includes(activeTab)) {
      matchesTab = ticket.channel === activeTab
    } else if (activeTab !== 'all') {
      matchesTab = ticket.status === activeTab
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesChannel && matchesDepartment && matchesTab
  })

  const getStatusIcon = (status: string) => {
    const statusMap = {
      'open': Circle,
      'in_progress': Clock,
      'resolved': CheckCircle,
      'closed': Square,
      'pending': Clock,
      'cancelled': XCircle
    }
    return statusMap[status] || Circle
  }

  const getPriorityIcon = (priority: string) => {
    const priorityMap = {
      'low': ArrowDown,
      'medium': ArrowRight,
      'high': ArrowUp,
      'critical': AlertTriangle
    }
    return priorityMap[priority] || ArrowRight
  }

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.value === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.value === priority)
    return priorityObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getChannelIcon = (channel: string) => {
    const channelObj = channels.find(c => c.value === channel)
    return channelObj?.icon || MessageSquare
  }

  const getChannelColor = (channel: string) => {
    const channelObj = channels.find(c => c.value === channel)
    return channelObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getDepartmentIcon = (department: string) => {
    const deptObj = departments.find(d => d.value === department)
    return deptObj?.icon || Users
  }

  const getDepartmentColor = (department: string) => {
    const deptObj = departments.find(d => d.value === department)
    return deptObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getSlaStatusColor = (slaStatus: string) => {
    const statusMap = {
      'on_track': 'bg-green-100 text-green-800',
      'at_risk': 'bg-yellow-100 text-yellow-800',
      'breached': 'bg-red-100 text-red-800',
      'met': 'bg-blue-100 text-blue-800'
    }
    return statusMap[slaStatus] || 'bg-gray-100 text-gray-800'
  }

  const formatTimeRemaining = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffMs = deadlineDate.getTime() - now.getTime()
    
    if (diffMs < 0) {
      const hoursOverdue = Math.abs(Math.floor(diffMs / (1000 * 60 * 60)))
      return `${hoursOverdue}h overdue`
    }
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  // Update tab counts
  tabs.forEach(tab => {
    if (tab.id === 'all') {
      tab.count = tickets.length
    } else if (tab.id === 'my-assigned') {
      tab.count = tickets.filter(ticket => ticket.assignee === 'User 1').length
    } else if (tab.id === 'unassigned') {
      tab.count = tickets.filter(ticket => !ticket.assignee).length
    } else if (tab.id === 'sla-risk') {
      tab.count = tickets.filter(ticket => ticket.sla_status === 'at_risk' || ticket.sla_status === 'breached').length
    } else if (['email', 'slack', 'portal', 'voice', 'chat'].includes(tab.id)) {
      tab.count = tickets.filter(ticket => ticket.channel === tab.id).length
    } else {
      tab.count = tickets.filter(ticket => ticket.status === tab.id).length
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tickets Management</h1>
          <p className="text-gray-600">Manage and track all support tickets</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'resolved').length}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">-0.2h from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Priority</option>
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="channel">Channel</Label>
              <select
                id="channel"
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Channels</option>
                {channels.map(channel => (
                  <option key={channel.value} value={channel.value}>{channel.label}</option>
                ))}
              </select>
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>{dept.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Temporarily disable loading for development */}
          {/* {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : ( */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Channel</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">SLA</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Assignee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => {
                    const StatusIcon = getStatusIcon(ticket.status)
                    const PriorityIcon = getPriorityIcon(ticket.priority)
                    const ChannelIcon = getChannelIcon(ticket.channel)
                    const DepartmentIcon = getDepartmentIcon(ticket.department)
                    
                    return (
                      <tr key={ticket.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-blue-600">{ticket.id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{ticket.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(ticket.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getPriorityColor(ticket.priority)}>
                            <PriorityIcon className="h-3 w-3 mr-1" />
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getChannelColor(ticket.channel)}>
                            <ChannelIcon className="h-3 w-3 mr-1" />
                            {ticket.channel}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getDepartmentColor(ticket.department)}>
                            <DepartmentIcon className="h-3 w-3 mr-1" />
                            {ticket.department.replace('-', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col space-y-1">
                            <Badge className={getSlaStatusColor(ticket.sla_status)}>
                              {ticket.sla_status.replace('_', ' ')}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              {formatTimeRemaining(ticket.sla_deadline)}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {ticket.assignee ? (
                              <>
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{ticket.assignee}</span>
                              </>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Bot className="h-4 w-4 text-blue-500" />
                                <span className="text-sm text-blue-600">{ticket.ai_suggested_assignee}</span>
                                <Badge variant="outline" className="text-xs">
                                  {ticket.ai_confidence}%
                                </Badge>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-500">
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(ticket)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          {/* )} */}
        </CardContent>
      </Card>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Ticket</h2>
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter ticket title" />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter detailed description" rows={4} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full p-2 border border-gray-300 rounded-md">
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select id="priority" className="w-full p-2 border border-gray-300 rounded-md">
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignee">Assignee</Label>
                  <Input id="assignee" placeholder="Assign to user" />
                </div>
                
                <div>
                  <Label htmlFor="reporter">Reporter</Label>
                  <Input id="reporter" placeholder="Reported by" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateModal(false)}>
                Create Ticket
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Ticket Details - {selectedTicket.id}</h2>
              <Button variant="ghost" onClick={() => setSelectedTicket(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedTicket.title}</h3>
                  <p className="text-gray-600 mt-2">{selectedTicket.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <p className="text-sm">{selectedTicket.category}</p>
                  </div>
                  <div>
                    <Label>Subcategory</Label>
                    <p className="text-sm">{selectedTicket.subcategory}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Assignee</Label>
                    <p className="text-sm">{selectedTicket.assignee}</p>
                  </div>
                  <div>
                    <Label>Reporter</Label>
                    <p className="text-sm">{selectedTicket.reporter}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTicket.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Timeline</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Created: {new Date(selectedTicket.created_at).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Updated: {new Date(selectedTicket.updated_at).toLocaleString()}</span>
                    </div>
                    {selectedTicket.resolved_at && (
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Resolved: {new Date(selectedTicket.resolved_at).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label>Comments ({selectedTicket.comments})</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">No comments yet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

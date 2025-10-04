'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Zap, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Play,
  Pause,
  Square,
  RefreshCw,
  Settings,
  Users,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Circle,
  Square as SquareIcon,
  Triangle,
  Bot,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Database,
  FileText,
  Link,
  Copy,
  Save,
  Upload,
  Download as DownloadIcon,
  Monitor,
  Smartphone,
  Laptop,
  Server,
  HardDrive,
  Network,
  Package,
  Globe,
  Lock,
  Unlock,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Paperclip,
  Send,
  Mic,
  Video,
  Camera,
  Image,
  File,
  Folder,
  Archive,
  Bookmark,
  Tag,
  Tags,
  Flag,
  Pin,
  MapPin,
  Navigation,
  Compass,
  Layers,
  Grid,
  List,
  Table,
  Columns,
  Rows,
  Layout,
  Sidebar,
  Menu,
  MoreHorizontal,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus as PlusIcon,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Move,
  Grip,
  Hand,
  MousePointer,
  Cursor,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  List as ListIcon,
  ListOrdered,
  Quote,
  Code,
  Terminal,
  Command,
  Keyboard,
  Mouse,
  Touchpad,
  Wifi,
  Bluetooth,
  Battery,
  Power,
  Volume2,
  VolumeX,
  Volume1,
  Mic as MicIcon,
  MicOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Tablet,
  Watch,
  Gamepad2,
  Joystick,
  Controller,
  Remote,
  Cable,
  Plug,
  Usb,
  Hdmi,
  Ethernet,
  Wifi as WifiIcon,
  Signal,
  Battery as BatteryIcon,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Charging,
  PowerOff,
  PowerOn,
  Sleep,
  Wake,
  Restart,
  Shutdown,
  Boot,
  Login,
  Logout,
  User,
  UserPlus,
  UserMinus,
  UserX,
  UserCheck,
  UserCircle,
  UserSquare,
  Users as UsersIcon,
  UserGroup,
  Team,
  Organization,
  Company,
  Building,
  Building2,
  Home,
  House,
  Apartment,
  Office,
  Store,
  Shop,
  Mall,
  Market,
  Bank,
  Hospital,
  School,
  University,
  Library,
  Museum,
  Theater,
  Cinema,
  Stadium,
  Arena,
  Gym,
  Pool,
  Beach,
  Mountain,
  Forest,
  Park,
  Garden,
  Farm,
  Factory,
  Warehouse,
  Garage,
  Parking,
  Road,
  Street,
  Highway,
  Bridge,
  Tunnel,
  Airport,
  Station,
  Port,
  Harbor,
  Dock,
  Pier,
  Lighthouse,
  Tower,
  Castle,
  Palace,
  Temple,
  Church,
  Mosque,
  Synagogue,
  Cemetery,
  Grave,
  Tomb,
  Monument,
  Statue,
  Sculpture,
  Art,
  Painting,
  Drawing,
  Sketch,
  Design,
  Blueprint,
  Plan,
  Map,
  Globe as GlobeIcon,
  World,
  Earth,
  Moon,
  Sun,
  Star as StarIcon,
  Cloud,
  Rain,
  Snow,
  Wind,
  Storm,
  Lightning,
  Thunder,
  Fire,
  Water,
  Ice,
  Steam,
  Smoke,
  Fog,
  Mist,
  Dew,
  Frost,
  Heat,
  Cold,
  Temperature,
  Thermometer,
  Gauge,
  Meter,
  Scale,
  Weight,
  Balance,
  Scale as ScaleIcon,
  Ruler,
  Measure,
  Compass as CompassIcon,
  Clock as ClockIcon,
  Timer as TimerIcon,
  Stopwatch,
  Hourglass,
  Calendar as CalendarIcon,
  Date,
  Time,
  Schedule,
  Event,
  Meeting,
  Appointment,
  Reminder,
  Notification,
  Bell,
  Alarm,
  Siren,
  Horn,
  Whistle,
  Chime,
  Gong,
  Drum,
  Piano,
  Guitar,
  Violin,
  Trumpet,
  Saxophone,
  Flute,
  Clarinet,
  Oboe,
  Bassoon,
  Tuba,
  Trombone,
  FrenchHorn,
  Harp,
  Organ,
  Accordion,
  Banjo,
  Mandolin,
  Ukulele,
  Harmonica,
  Xylophone,
  Marimba,
  Vibraphone,
  Glockenspiel,
  Celesta,
  Harpsichord,
  Clavichord,
  Synthesizer,
  Keyboard as KeyboardIcon,
  Piano as PianoIcon,
  Guitar as GuitarIcon,
  Violin as ViolinIcon,
  Trumpet as TrumpetIcon,
  Saxophone as SaxophoneIcon,
  Flute as FluteIcon,
  Clarinet as ClarinetIcon,
  Oboe as OboeIcon,
  Bassoon as BassoonIcon,
  Tuba as TubaIcon,
  Trombone as TromboneIcon,
  FrenchHorn as FrenchHornIcon,
  Harp as HarpIcon,
  Organ as OrganIcon,
  Accordion as AccordionIcon,
  Banjo as BanjoIcon,
  Mandolin as MandolinIcon,
  Ukulele as UkuleleIcon,
  Harmonica as HarmonicaIcon,
  Xylophone as XylophoneIcon,
  Marimba as MarimbaIcon,
  Vibraphone as VibraphoneIcon,
  Glockenspiel as GlockenspielIcon,
  Celesta as CelestaIcon,
  Harpsichord as HarpsichordIcon,
  Clavichord as ClavichordIcon,
  Synthesizer as SynthesizerIcon
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function WorkflowEnginePage() {
  const [activeTab, setActiveTab] = useState('all')
  const [workflows, setWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)
  const [showBuilder, setShowBuilder] = useState(false)
  const [workflowTemplates, setWorkflowTemplates] = useState<any[]>([])
  const [executionHistory, setExecutionHistory] = useState<any[]>([])
  const [performanceMetrics, setPerformanceMetrics] = useState<any>({})

  const tabs = [
    { id: 'all', label: 'All Workflows', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'draft', label: 'Draft', count: 0 },
    { id: 'paused', label: 'Paused', count: 0 },
    { id: 'templates', label: 'Templates', count: 0 },
    { id: 'executions', label: 'Executions', count: 0 },
    { id: 'performance', label: 'Performance', count: 0 }
  ]

  const categories = [
    { value: 'ticket', label: 'Ticket Management', icon: MessageSquare, color: 'bg-blue-100 text-blue-800' },
    { value: 'approval', label: 'Approval Workflows', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    { value: 'notification', label: 'Notifications', icon: Bell, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'data', label: 'Data Processing', icon: Database, color: 'bg-purple-100 text-purple-800' },
    { value: 'integration', label: 'Integrations', icon: Link, color: 'bg-orange-100 text-orange-800' },
    { value: 'scheduled', label: 'Scheduled Tasks', icon: Calendar, color: 'bg-cyan-100 text-cyan-800' },
    { value: 'escalation', label: 'Escalation', icon: TrendingUp, color: 'bg-red-100 text-red-800' }
  ]

  const statuses = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: Play },
    { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: Edit },
    { value: 'paused', label: 'Paused', color: 'bg-yellow-100 text-yellow-800', icon: Pause },
    { value: 'archived', label: 'Archived', color: 'bg-red-100 text-red-800', icon: Archive }
  ]

  const nodeTypes = [
    { type: 'trigger', label: 'Trigger', icon: Zap, color: 'bg-blue-500', description: 'Start of workflow' },
    { type: 'action', label: 'Action', icon: Play, color: 'bg-green-500', description: 'Perform an action' },
    { type: 'condition', label: 'Condition', icon: Circle, color: 'bg-yellow-500', description: 'Decision point' },
    { type: 'approval', label: 'Approval', icon: CheckCircle, color: 'bg-purple-500', description: 'Human approval' },
    { type: 'notification', label: 'Notification', icon: Bell, color: 'bg-orange-500', description: 'Send notification' },
    { type: 'integration', label: 'Integration', icon: Link, color: 'bg-cyan-500', description: 'External system' },
    { type: 'delay', label: 'Delay', icon: Clock, color: 'bg-gray-500', description: 'Wait period' },
    { type: 'end', label: 'End', icon: Square, color: 'bg-red-500', description: 'End of workflow' }
  ]

  useEffect(() => {
    fetchWorkflows()
    fetchTemplates()
    fetchExecutionHistory()
    calculatePerformanceMetrics()
  }, [])

  const fetchWorkflows = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from Supabase first
      const { data: supabaseWorkflows, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Supabase error, using mock data:', error)
        const mockWorkflows = generateMockWorkflows()
        setWorkflows(mockWorkflows)
      } else {
        const mockWorkflows = generateMockWorkflows()
        const allWorkflows = [...(supabaseWorkflows || []), ...mockWorkflows]
        setWorkflows(allWorkflows)
      }
    } catch (error) {
      console.error('Error fetching workflows:', error)
      const mockWorkflows = generateMockWorkflows()
      setWorkflows(mockWorkflows)
    } finally {
      setLoading(false)
    }
  }

  const generateMockWorkflows = () => {
    const mockWorkflows = []
    const statuses = ['active', 'draft', 'paused', 'archived']
    const categories = ['ticket', 'approval', 'notification', 'data', 'integration', 'scheduled', 'escalation']
    
    for (let i = 1; i <= 25; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const category = categories[Math.floor(Math.random() * categories.length)]
      const createdDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      const lastRun = status === 'active' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null
      
      mockWorkflows.push({
        id: `WF-${String(i).padStart(4, '0')}`,
        name: `Workflow ${i}: ${getWorkflowName(category)}`,
        description: `Automated workflow for ${category} processes`,
        category,
        status,
        created_at: createdDate.toISOString(),
        updated_at: new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        last_run: lastRun?.toISOString(),
        executions_count: Math.floor(Math.random() * 1000),
        success_rate: Math.floor(Math.random() * 20) + 80, // 80-100%
        avg_execution_time: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
        created_by: `User ${Math.floor(Math.random() * 10) + 1}`,
        tags: getRandomTags(),
        nodes: generateWorkflowNodes(),
        connections: generateWorkflowConnections(),
        triggers: getRandomTriggers(category),
        actions: getRandomActions(category),
        conditions: getRandomConditions(category),
        is_template: Math.random() > 0.8, // 20% are templates
        template_category: Math.random() > 0.8 ? getRandomTemplateCategory() : null,
        version: `1.${Math.floor(Math.random() * 10)}`,
        complexity: Math.floor(Math.random() * 3) + 1, // 1-3
        estimated_runtime: Math.floor(Math.random() * 600) + 60 // 1-10 minutes
      })
    }
    
    return mockWorkflows
  }

  const getWorkflowName = (category: string) => {
    const names = {
      'ticket': ['Auto-assign tickets', 'SLA escalation', 'Ticket routing', 'Priority adjustment'],
      'approval': ['Purchase approval', 'Leave request', 'Budget approval', 'Contract review'],
      'notification': ['Alert system', 'Status updates', 'Reminder system', 'Escalation alerts'],
      'data': ['Data sync', 'Report generation', 'Data validation', 'Backup process'],
      'integration': ['CRM sync', 'Email integration', 'API calls', 'Webhook processing'],
      'scheduled': ['Daily reports', 'Weekly cleanup', 'Monthly backup', 'Quarterly review'],
      'escalation': ['SLA breach', 'Critical issues', 'Manager escalation', 'Emergency response']
    }
    const categoryNames = names[category] || ['General workflow']
    return categoryNames[Math.floor(Math.random() * categoryNames.length)]
  }

  const getRandomTags = () => {
    const allTags = ['automation', 'critical', 'daily', 'weekly', 'monthly', 'integration', 'notification', 'approval', 'escalation', 'data']
    const numTags = Math.floor(Math.random() * 3) + 1
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags)
  }

  const generateWorkflowNodes = () => {
    const nodes = []
    const numNodes = Math.floor(Math.random() * 8) + 3 // 3-10 nodes
    
    for (let i = 0; i < numNodes; i++) {
      const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)]
      nodes.push({
        id: `node-${i}`,
        type: nodeType.type,
        label: `${nodeType.label} ${i + 1}`,
        position: { x: i * 200, y: Math.floor(Math.random() * 200) },
        data: {
          label: `${nodeType.label} ${i + 1}`,
          description: nodeType.description
        }
      })
    }
    
    return nodes
  }

  const generateWorkflowConnections = () => {
    const connections = []
    const numConnections = Math.floor(Math.random() * 5) + 2 // 2-6 connections
    
    for (let i = 0; i < numConnections; i++) {
      connections.push({
        id: `conn-${i}`,
        source: `node-${i}`,
        target: `node-${i + 1}`,
        type: 'default'
      })
    }
    
    return connections
  }

  const getRandomTriggers = (category: string) => {
    const triggers = {
      'ticket': ['New ticket created', 'Ticket status changed', 'SLA deadline approaching'],
      'approval': ['Approval request submitted', 'Document uploaded', 'Budget threshold exceeded'],
      'notification': ['System alert', 'User action required', 'Scheduled time reached'],
      'data': ['Data updated', 'File uploaded', 'Database change detected'],
      'integration': ['Webhook received', 'API call made', 'External system update'],
      'scheduled': ['Daily at 9 AM', 'Weekly on Monday', 'Monthly on 1st'],
      'escalation': ['SLA breached', 'Critical error', 'Manager notification']
    }
    return triggers[category] || ['Manual trigger']
  }

  const getRandomActions = (category: string) => {
    const actions = {
      'ticket': ['Assign to agent', 'Update priority', 'Send notification', 'Create follow-up'],
      'approval': ['Send approval request', 'Notify approver', 'Update status', 'Generate report'],
      'notification': ['Send email', 'Send SMS', 'Create alert', 'Update dashboard'],
      'data': ['Process data', 'Generate report', 'Update database', 'Export file'],
      'integration': ['Call API', 'Send webhook', 'Sync data', 'Update external system'],
      'scheduled': ['Generate report', 'Send summary', 'Clean up data', 'Backup files'],
      'escalation': ['Notify manager', 'Create urgent ticket', 'Send alert', 'Escalate to team']
    }
    return actions[category] || ['Perform action']
  }

  const getRandomConditions = (category: string) => {
    const conditions = {
      'ticket': ['Priority is high', 'Department is IT', 'Customer is VIP', 'SLA is breached'],
      'approval': ['Amount > $1000', 'Department approval required', 'Manager level needed', 'Budget available'],
      'notification': ['User is online', 'Time is business hours', 'Urgency is high', 'Channel is email'],
      'data': ['Data is valid', 'File size < 10MB', 'Format is correct', 'Permission granted'],
      'integration': ['API is available', 'Rate limit not exceeded', 'Authentication valid', 'Data format correct'],
      'scheduled': ['Business day', 'Working hours', 'System load < 80%', 'Backup completed'],
      'escalation': ['SLA < 2 hours', 'Priority is critical', 'Manager is available', 'Team is online']
    }
    return conditions[category] || ['Condition met']
  }

  const getRandomTemplateCategory = () => {
    const categories = ['IT Support', 'HR Processes', 'Finance', 'Customer Service', 'Sales', 'Marketing']
    return categories[Math.floor(Math.random() * categories.length)]
  }

  const fetchTemplates = () => {
    const templates = workflows.filter(w => w.is_template).map(workflow => ({
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      category: workflow.template_category,
      complexity: workflow.complexity,
      estimated_runtime: workflow.estimated_runtime,
      usage_count: Math.floor(Math.random() * 100),
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      tags: workflow.tags
    }))
    setWorkflowTemplates(templates)
  }

  const fetchExecutionHistory = () => {
    const executions = []
    for (let i = 1; i <= 50; i++) {
      const workflow = workflows[Math.floor(Math.random() * workflows.length)]
      const startTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      const duration = Math.floor(Math.random() * 600) + 30 // 30-630 seconds
      const endTime = new Date(startTime.getTime() + duration * 1000)
      
      executions.push({
        id: `EXE-${String(i).padStart(4, '0')}`,
        workflow_id: workflow?.id || `WF-${String(i).padStart(4, '0')}`,
        workflow_name: workflow?.name || `Workflow ${i}`,
        status: Math.random() > 0.1 ? 'success' : 'failed',
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: duration,
        triggered_by: Math.random() > 0.5 ? 'system' : 'user',
        triggered_by_user: Math.random() > 0.5 ? `User ${Math.floor(Math.random() * 10) + 1}` : null,
        error_message: Math.random() > 0.9 ? 'Connection timeout' : null,
        nodes_executed: Math.floor(Math.random() * 8) + 2,
        total_nodes: workflow?.nodes?.length || 5
      })
    }
    setExecutionHistory(executions)
  }

  const calculatePerformanceMetrics = () => {
    const metrics = {
      totalWorkflows: workflows.length,
      activeWorkflows: workflows.filter(w => w.status === 'active').length,
      totalExecutions: executionHistory.length,
      successRate: executionHistory.filter(e => e.status === 'success').length / executionHistory.length * 100,
      avgExecutionTime: executionHistory.reduce((sum, e) => sum + e.duration, 0) / executionHistory.length,
      templatesCount: workflowTemplates.length,
      categoriesCount: categories.length,
      complexityDistribution: {
        simple: workflows.filter(w => w.complexity === 1).length,
        medium: workflows.filter(w => w.complexity === 2).length,
        complex: workflows.filter(w => w.complexity === 3).length
      }
    }
    setPerformanceMetrics(metrics)
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || workflow.status === filterStatus
    const matchesCategory = filterCategory === 'all' || workflow.category === filterCategory
    
    // Handle special tabs
    let matchesTab = true
    if (activeTab === 'templates') {
      matchesTab = workflow.is_template
    } else if (activeTab === 'executions') {
      matchesTab = workflow.executions_count > 0
    } else if (activeTab === 'performance') {
      matchesTab = workflow.success_rate < 90 // Show workflows needing attention
    } else if (activeTab !== 'all') {
      matchesTab = workflow.status === activeTab
    }
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

  const getStatusIcon = (status: string) => {
    const statusMap = {
      'active': Play,
      'draft': Edit,
      'paused': Pause,
      'archived': Archive
    }
    return statusMap[status] || Play
  }

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.value === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find(c => c.value === category)
    return categoryObj?.icon || Zap
  }

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(c => c.value === category)
    return categoryObj?.color || 'bg-gray-100 text-gray-800'
  }

  // Update tab counts
  tabs.forEach(tab => {
    if (tab.id === 'all') {
      tab.count = workflows.length
    } else if (tab.id === 'templates') {
      tab.count = workflows.filter(w => w.is_template).length
    } else if (tab.id === 'executions') {
      tab.count = executionHistory.length
    } else if (tab.id === 'performance') {
      tab.count = workflows.filter(w => w.success_rate < 90).length
    } else {
      tab.count = workflows.filter(w => w.status === tab.id).length
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Engine</h1>
          <p className="text-gray-600">Design and manage automated workflows and business processes</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowBuilder(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.totalWorkflows || 0}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.activeWorkflows || 0}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.successRate?.toFixed(1) || 0}%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Execution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(performanceMetrics.avgExecutionTime || 0)}s</div>
            <p className="text-xs text-muted-foreground">-5s from last month</p>
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
                  placeholder="Search workflows..."
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
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
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

      {/* Workflows Table */}
      <Card>
        <CardHeader>
          <CardTitle>Workflows ({filteredWorkflows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Executions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Success Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Run</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkflows.map((workflow) => {
                    const StatusIcon = getStatusIcon(workflow.status)
                    const CategoryIcon = getCategoryIcon(workflow.category)
                    
                    return (
                      <tr key={workflow.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{workflow.name}</div>
                            <div className="text-sm text-gray-500">{workflow.description}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getCategoryColor(workflow.category)}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {workflow.category}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(workflow.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {workflow.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium">{workflow.executions_count}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              workflow.success_rate >= 95 ? 'bg-green-500' : 
                              workflow.success_rate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium">{workflow.success_rate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-500">
                            {workflow.last_run ? new Date(workflow.last_run).toLocaleDateString() : 'Never'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedWorkflow(workflow)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workflow Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Workflow Builder</h2>
              <Button variant="ghost" onClick={() => setShowBuilder(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Node Palette */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Node Palette</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {nodeTypes.map((nodeType) => (
                        <div
                          key={nodeType.type}
                          className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          draggable
                        >
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: nodeType.color }}
                            ></div>
                            <nodeType.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{nodeType.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{nodeType.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Canvas */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Drag nodes from the palette to start building your workflow</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => setShowBuilder(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowBuilder(false)}>
                Save Workflow
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Details Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Workflow Details - {selectedWorkflow.name}</h2>
              <Button variant="ghost" onClick={() => setSelectedWorkflow(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Name</Label>
                      <p className="text-sm font-medium">{selectedWorkflow.name}</p>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <p className="text-sm">{selectedWorkflow.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Status</Label>
                        <Badge className={getStatusColor(selectedWorkflow.status)}>
                          {selectedWorkflow.status}
                        </Badge>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Badge className={getCategoryColor(selectedWorkflow.category)}>
                          {selectedWorkflow.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Version</Label>
                        <p className="text-sm">{selectedWorkflow.version}</p>
                      </div>
                      <div>
                        <Label>Complexity</Label>
                        <p className="text-sm">{selectedWorkflow.complexity}/3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Executions</Label>
                      <span className="text-sm font-medium">{selectedWorkflow.executions_count}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Success Rate</Label>
                      <span className="text-sm font-medium">{selectedWorkflow.success_rate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Avg Execution Time</Label>
                      <span className="text-sm font-medium">{selectedWorkflow.avg_execution_time}s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Last Run</Label>
                      <span className="text-sm font-medium">
                        {selectedWorkflow.last_run ? new Date(selectedWorkflow.last_run).toLocaleString() : 'Never'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Triggers</Label>
                        <div className="mt-2 space-y-1">
                          {selectedWorkflow.triggers?.map((trigger: string, index: number) => (
                            <div key={index} className="flex items-center text-sm">
                              <Zap className="h-4 w-4 text-blue-500 mr-2" />
                              {trigger}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Actions</Label>
                        <div className="mt-2 space-y-1">
                          {selectedWorkflow.actions?.map((action: string, index: number) => (
                            <div key={index} className="flex items-center text-sm">
                              <Play className="h-4 w-4 text-green-500 mr-2" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Conditions</Label>
                        <div className="mt-2 space-y-1">
                          {selectedWorkflow.conditions?.map((condition: string, index: number) => (
                            <div key={index} className="flex items-center text-sm">
                              <Circle className="h-4 w-4 text-yellow-500 mr-2" />
                              {condition}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedWorkflow.tags?.map((tag: string) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
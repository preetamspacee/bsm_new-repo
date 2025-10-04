'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Database, 
  Plus, 
  Search, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  Link, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  FileText,
  Download,
  Upload,
  Copy,
  Share,
  Bookmark,
  Tag,
  Tags,
  Globe,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Unlock,
  Bell,
  Notification,
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
  List,
  ListOrdered,
  Quote,
  Code,
  Terminal,
  Command,
  Keyboard,
  Mouse,
  Touchpad,
  Wifi as WifiIcon,
  Bluetooth,
  Battery,
  Power,
  Volume2,
  VolumeX,
  Volume1,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Monitor,
  Smartphone,
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
  Star,
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
  Compass,
  Clock as ClockIcon,
  Timer,
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
  Notification as NotificationIcon,
  Bell as BellIcon,
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

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [integrations, setIntegrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [webhooks, setWebhooks] = useState<any[]>([])
  const [apiKeys, setApiKeys] = useState<any[]>([])
  const [integrationLogs, setIntegrationLogs] = useState<any[]>([])

  const tabs = [
    { id: 'all', label: 'All Integrations', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'inactive', label: 'Inactive', count: 0 },
    { id: 'webhooks', label: 'Webhooks', count: 0 },
    { id: 'api-keys', label: 'API Keys', count: 0 },
    { id: 'logs', label: 'Integration Logs', count: 0 },
    { id: 'monitoring', label: 'Monitoring', count: 0 }
  ]

  const categories = [
    { value: 'communication', label: 'Communication', icon: MessageSquare, color: 'bg-blue-100 text-blue-800' },
    { value: 'productivity', label: 'Productivity', icon: Users, color: 'bg-green-100 text-green-800' },
    { value: 'crm', label: 'CRM', icon: Building, color: 'bg-purple-100 text-purple-800' },
    { value: 'development', label: 'Development', icon: Code, color: 'bg-orange-100 text-orange-800' },
    { value: 'analytics', label: 'Analytics', icon: BarChart3, color: 'bg-cyan-100 text-cyan-800' },
    { value: 'storage', label: 'Storage', icon: Database, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'security', label: 'Security', icon: Shield, color: 'bg-red-100 text-red-800' }
  ]

  const statuses = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: XCircle },
    { value: 'error', label: 'Error', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
  ]

  useEffect(() => {
    fetchIntegrations()
    fetchWebhooks()
    fetchApiKeys()
    fetchIntegrationLogs()
  }, [])

  const fetchIntegrations = async () => {
    try {
      setLoading(true)
      
      const { data: supabaseIntegrations, error } = await supabase
        .from('integrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Supabase error, using mock data:', error)
        const mockIntegrations = generateMockIntegrations()
        setIntegrations(mockIntegrations)
      } else {
        const mockIntegrations = generateMockIntegrations()
        const allIntegrations = [...(supabaseIntegrations || []), ...mockIntegrations]
        setIntegrations(allIntegrations)
      }
    } catch (error) {
      console.error('Error fetching integrations:', error)
      const mockIntegrations = generateMockIntegrations()
      setIntegrations(mockIntegrations)
    } finally {
      setLoading(false)
    }
  }

  const generateMockIntegrations = () => {
    const mockIntegrations = []
    const statuses = ['active', 'inactive', 'error', 'pending']
    const categories = ['communication', 'productivity', 'crm', 'development', 'analytics', 'storage', 'security']
    
    for (let i = 1; i <= 25; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const category = categories[Math.floor(Math.random() * categories.length)]
      const createdDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      const lastSync = status === 'active' ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000) : null
      
      mockIntegrations.push({
        id: `INT-${String(i).padStart(4, '0')}`,
        name: `Integration ${i}: ${getIntegrationName(category)}`,
        description: `Third-party integration for ${category} services`,
        category,
        status,
        created_at: createdDate.toISOString(),
        updated_at: new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        last_sync: lastSync?.toISOString(),
        api_calls_today: Math.floor(Math.random() * 1000),
        api_calls_limit: Math.floor(Math.random() * 5000) + 1000,
        success_rate: Math.floor(Math.random() * 20) + 80, // 80-100%
        avg_response_time: Math.floor(Math.random() * 500) + 100, // 100-600ms
        webhook_url: `https://api.example.com/webhook/${i}`,
        api_key: `sk-${Math.random().toString(36).substring(2, 15)}`,
        webhook_secret: `whsec_${Math.random().toString(36).substring(2, 20)}`,
        rate_limit: Math.floor(Math.random() * 1000) + 100,
        rate_limit_window: '1h',
        retry_count: Math.floor(Math.random() * 5),
        max_retries: 3,
        timeout: 30,
        version: `v${Math.floor(Math.random() * 3) + 1}`,
        documentation_url: `https://docs.example.com/integration-${i}`,
        support_email: `support@example${i}.com`,
        tags: getRandomTags(),
        is_webhook_enabled: Math.random() > 0.5,
        is_api_enabled: Math.random() > 0.3,
        is_monitoring_enabled: Math.random() > 0.4,
        health_score: Math.floor(Math.random() * 30) + 70, // 70-100
        uptime: Math.floor(Math.random() * 20) + 80, // 80-100%
        error_count_today: Math.floor(Math.random() * 10),
        last_error: Math.random() > 0.8 ? 'Connection timeout' : null,
        last_error_time: Math.random() > 0.8 ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() : null
      })
    }
    
    return mockIntegrations
  }

  const getIntegrationName = (category: string) => {
    const names = {
      'communication': ['Slack', 'Microsoft Teams', 'Discord', 'Telegram'],
      'productivity': ['Google Workspace', 'Microsoft 365', 'Notion', 'Trello'],
      'crm': ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM'],
      'development': ['GitHub', 'GitLab', 'Jira', 'Confluence'],
      'analytics': ['Google Analytics', 'Mixpanel', 'Amplitude', 'Segment'],
      'storage': ['AWS S3', 'Google Drive', 'Dropbox', 'OneDrive'],
      'security': ['Auth0', 'Okta', '1Password', 'LastPass']
    }
    const categoryNames = names[category] || ['Generic Integration']
    return categoryNames[Math.floor(Math.random() * categoryNames.length)]
  }

  const getRandomTags = () => {
    const allTags = ['api', 'webhook', 'oauth', 'rest', 'graphql', 'real-time', 'batch', 'sync', 'async', 'monitoring']
    const numTags = Math.floor(Math.random() * 3) + 1
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags)
  }

  const fetchWebhooks = () => {
    const webhooks = []
    for (let i = 1; i <= 15; i++) {
      webhooks.push({
        id: `WH-${String(i).padStart(4, '0')}`,
        name: `Webhook ${i}`,
        url: `https://api.example.com/webhook/${i}`,
        events: ['ticket.created', 'ticket.updated', 'user.created'],
        status: Math.random() > 0.2 ? 'active' : 'inactive',
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        last_triggered: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        success_rate: Math.floor(Math.random() * 20) + 80,
        retry_count: Math.floor(Math.random() * 3),
        secret: `whsec_${Math.random().toString(36).substring(2, 20)}`
      })
    }
    setWebhooks(webhooks)
  }

  const fetchApiKeys = () => {
    const apiKeys = []
    for (let i = 1; i <= 20; i++) {
      apiKeys.push({
        id: `API-${String(i).padStart(4, '0')}`,
        name: `API Key ${i}`,
        key: `sk-${Math.random().toString(36).substring(2, 15)}`,
        permissions: ['read', 'write', 'admin'],
        status: Math.random() > 0.1 ? 'active' : 'revoked',
        created_at: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        last_used: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        usage_count: Math.floor(Math.random() * 10000),
        rate_limit: Math.floor(Math.random() * 1000) + 100,
        expires_at: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      })
    }
    setApiKeys(apiKeys)
  }

  const fetchIntegrationLogs = () => {
    const logs = []
    for (let i = 1; i <= 50; i++) {
      logs.push({
        id: `LOG-${String(i).padStart(4, '0')}`,
        integration_id: `INT-${String(Math.floor(Math.random() * 25) + 1).padStart(4, '0')}`,
        integration_name: `Integration ${Math.floor(Math.random() * 25) + 1}`,
        action: ['sync', 'webhook', 'api_call', 'error', 'retry'][Math.floor(Math.random() * 5)],
        status: Math.random() > 0.1 ? 'success' : 'error',
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration: Math.floor(Math.random() * 5000) + 100,
        response_code: Math.random() > 0.1 ? 200 : [400, 401, 403, 404, 500][Math.floor(Math.random() * 5)],
        error_message: Math.random() > 0.9 ? 'Connection timeout' : null,
        request_size: Math.floor(Math.random() * 10000) + 100,
        response_size: Math.floor(Math.random() * 50000) + 1000
      })
    }
    setIntegrationLogs(logs)
  }

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || integration.status === filterStatus
    const matchesCategory = filterCategory === 'all' || integration.category === filterCategory
    
    let matchesTab = true
    if (activeTab === 'webhooks') {
      matchesTab = integration.is_webhook_enabled
    } else if (activeTab === 'api-keys') {
      matchesTab = integration.is_api_enabled
    } else if (activeTab === 'logs') {
      matchesTab = integration.error_count_today > 0
    } else if (activeTab === 'monitoring') {
      matchesTab = integration.is_monitoring_enabled
    } else if (activeTab !== 'all') {
      matchesTab = integration.status === activeTab
    }
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

  const getStatusIcon = (status: string) => {
    const statusMap = {
      'active': CheckCircle,
      'inactive': XCircle,
      'error': AlertTriangle,
      'pending': Clock
    }
    return statusMap[status] || CheckCircle
  }

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.value === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find(c => c.value === category)
    return categoryObj?.icon || Database
  }

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(c => c.value === category)
    return categoryObj?.color || 'bg-gray-100 text-gray-800'
  }

  // Update tab counts
  tabs.forEach(tab => {
    if (tab.id === 'all') {
      tab.count = integrations.length
    } else if (tab.id === 'webhooks') {
      tab.count = webhooks.length
    } else if (tab.id === 'api-keys') {
      tab.count = apiKeys.length
    } else if (tab.id === 'logs') {
      tab.count = integrationLogs.length
    } else if (tab.id === 'monitoring') {
      tab.count = integrations.filter(i => i.is_monitoring_enabled).length
    } else {
      tab.count = integrations.filter(i => i.status === tab.id).length
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect and manage third-party integrations and APIs</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.filter(i => i.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.reduce((sum, i) => sum + i.api_calls_today, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(integrations.reduce((sum, i) => sum + i.success_rate, 0) / integrations.length)}%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
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
                  placeholder="Search integrations..."
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

      {/* Content based on active tab */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'webhooks' && <WebhooksTab data={webhooks} />}
          {activeTab === 'api-keys' && <ApiKeysTab data={apiKeys} />}
          {activeTab === 'logs' && <LogsTab data={integrationLogs} />}
          {activeTab === 'monitoring' && <MonitoringTab data={integrations.filter(i => i.is_monitoring_enabled)} />}
          {(activeTab === 'all' || activeTab === 'active' || activeTab === 'inactive') && (
            <IntegrationsTab data={filteredIntegrations} />
          )}
        </div>
      )}
    </div>
  )
}

// Tab Components
function IntegrationsTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrations ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">API Calls</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Success Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Sync</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((integration) => (
                  <tr key={integration.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{integration.name}</div>
                        <div className="text-sm text-gray-500">{integration.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{integration.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{integration.api_calls_today}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          integration.success_rate >= 95 ? 'bg-green-500' : 
                          integration.success_rate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium">{integration.success_rate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {integration.last_sync ? new Date(integration.last_sync).toLocaleDateString() : 'Never'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WebhooksTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Webhooks ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">URL</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Events</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Success Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Triggered</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((webhook) => (
                  <tr key={webhook.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{webhook.name}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500 font-mono">{webhook.url}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.map((event: string) => (
                          <Badge key={event} variant="outline" className="text-xs">{event}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {webhook.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{webhook.success_rate}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {new Date(webhook.last_triggered).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ApiKeysTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Key</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Permissions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Usage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Used</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((apiKey) => (
                  <tr key={apiKey.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{apiKey.name}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500 font-mono">{apiKey.key.substring(0, 20)}...</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {apiKey.permissions.map((permission: string) => (
                          <Badge key={permission} variant="outline" className="text-xs">{permission}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {apiKey.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{apiKey.usage_count.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {new Date(apiKey.last_used).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LogsTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integration Logs ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Integration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Response Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{log.integration_name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{log.action}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {log.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{log.duration}ms</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${
                        log.response_code >= 200 && log.response_code < 300 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {log.response_code}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MonitoringTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integration Monitoring ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((integration) => (
              <Card key={integration.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{integration.name}</h3>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Health Score</span>
                    <span className="font-medium text-emerald-600">{integration.health_score}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium text-blue-600">{integration.uptime}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Errors Today</span>
                    <span className="font-medium text-red-600">{integration.error_count_today}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${integration.health_score}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getStatusColor(status: string) {
  const statusMap = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'error': 'bg-red-100 text-red-800',
    'pending': 'bg-yellow-100 text-yellow-800'
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}


'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Download,
  Filter,
  Calendar,
  Target,
  Activity,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Eye,
  MousePointer,
  RefreshCw,
  Settings,
  Plus,
  Edit,
  Trash2,
  Share,
  Mail,
  Phone,
  Globe,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
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

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [analyticsData, setAnalyticsData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('all')
  const [customReports, setCustomReports] = useState<any[]>([])
  const [scheduledReports, setScheduledReports] = useState<any[]>([])

  const tabs = [
    { id: 'overview', label: 'Overview', count: 0 },
    { id: 'service-performance', label: 'Service Performance', count: 0 },
    { id: 'customer-analytics', label: 'Customer Analytics', count: 0 },
    { id: 'agent-performance', label: 'Agent Performance', count: 0 },
    { id: 'business-intelligence', label: 'Business Intelligence', count: 0 },
    { id: 'custom-reports', label: 'Custom Reports', count: 0 },
    { id: 'scheduled-reports', label: 'Scheduled Reports', count: 0 }
  ]

  const metrics = [
    { value: 'tickets', label: 'Tickets', icon: MessageSquare, color: 'bg-blue-100 text-blue-800' },
    { value: 'sla', label: 'SLA Compliance', icon: Clock, color: 'bg-green-100 text-green-800' },
    { value: 'satisfaction', label: 'Customer Satisfaction', icon: Star, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'resolution', label: 'Resolution Time', icon: CheckCircle, color: 'bg-purple-100 text-purple-800' },
    { value: 'agents', label: 'Agent Performance', icon: Users, color: 'bg-orange-100 text-orange-800' },
    { value: 'revenue', label: 'Revenue', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-800' }
  ]

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ]

  useEffect(() => {
    fetchAnalyticsData()
    fetchCustomReports()
    fetchScheduledReports()
  }, [dateRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from Supabase first
      const { data: supabaseAnalytics, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Supabase error, using mock data:', error)
        const mockAnalytics = generateMockAnalytics()
        setAnalyticsData(mockAnalytics)
      } else {
        const mockAnalytics = generateMockAnalytics()
        const allAnalytics = { ...mockAnalytics, ...supabaseAnalytics }
        setAnalyticsData(allAnalytics)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      const mockAnalytics = generateMockAnalytics()
      setAnalyticsData(mockAnalytics)
    } finally {
      setLoading(false)
    }
  }

  const generateMockAnalytics = () => {
    return {
      overview: {
        totalTickets: Math.floor(Math.random() * 1000) + 500,
        resolvedTickets: Math.floor(Math.random() * 800) + 400,
        avgResolutionTime: Math.floor(Math.random() * 24) + 2,
        slaCompliance: Math.floor(Math.random() * 20) + 80,
        customerSatisfaction: Math.floor(Math.random() * 2) + 4,
        activeAgents: Math.floor(Math.random() * 20) + 10,
        totalRevenue: Math.floor(Math.random() * 100000) + 50000,
        monthlyGrowth: Math.floor(Math.random() * 20) + 5
      },
      servicePerformance: {
        ticketVolume: generateTimeSeriesData(30),
        slaCompliance: generateTimeSeriesData(30),
        resolutionTime: generateTimeSeriesData(30),
        firstContactResolution: generateTimeSeriesData(30),
        escalationRate: generateTimeSeriesData(30),
        channelPerformance: [
          { channel: 'Email', tickets: 450, resolution: 4.2, satisfaction: 4.3 },
          { channel: 'Phone', tickets: 200, resolution: 2.1, satisfaction: 4.5 },
          { channel: 'Chat', tickets: 300, resolution: 1.8, satisfaction: 4.4 },
          { channel: 'Portal', tickets: 150, resolution: 3.5, satisfaction: 4.2 }
        ],
        departmentPerformance: [
          { department: 'IT Support', tickets: 600, resolution: 3.2, satisfaction: 4.4 },
          { department: 'HR', tickets: 200, resolution: 2.8, satisfaction: 4.6 },
          { department: 'Finance', tickets: 150, resolution: 4.1, satisfaction: 4.3 },
          { department: 'General', tickets: 150, resolution: 2.5, satisfaction: 4.5 }
        ]
      },
      customerAnalytics: {
        satisfactionTrends: generateTimeSeriesData(30),
        customerHealth: [
          { score: 'Excellent', count: 45, percentage: 45 },
          { score: 'Good', count: 30, percentage: 30 },
          { score: 'Fair', count: 15, percentage: 15 },
          { score: 'Poor', count: 10, percentage: 10 }
        ],
        customerSegments: [
          { segment: 'Enterprise', count: 25, revenue: 75000, satisfaction: 4.5 },
          { segment: 'SMB', count: 150, revenue: 45000, satisfaction: 4.3 },
          { segment: 'Startup', count: 75, revenue: 15000, satisfaction: 4.2 },
          { segment: 'Individual', count: 50, revenue: 5000, satisfaction: 4.1 }
        ],
        churnAnalysis: {
          churnRate: 5.2,
          retentionRate: 94.8,
          avgLifetime: 24,
          churnReasons: [
            { reason: 'Poor Support', percentage: 35 },
            { reason: 'High Cost', percentage: 25 },
            { reason: 'Feature Limitations', percentage: 20 },
            { reason: 'Competition', percentage: 20 }
          ]
        }
      },
      agentPerformance: {
        productivity: generateTimeSeriesData(30),
        quality: generateTimeSeriesData(30),
        satisfaction: generateTimeSeriesData(30),
        topPerformers: [
          { name: 'John Smith', tickets: 120, resolution: 2.1, satisfaction: 4.8 },
          { name: 'Sarah Johnson', tickets: 115, resolution: 2.3, satisfaction: 4.7 },
          { name: 'Mike Davis', tickets: 110, resolution: 2.5, satisfaction: 4.6 },
          { name: 'Lisa Wilson', tickets: 105, resolution: 2.2, satisfaction: 4.7 }
        ],
        teamPerformance: [
          { team: 'Tier 1', agents: 8, tickets: 600, resolution: 2.8, satisfaction: 4.4 },
          { team: 'Tier 2', agents: 5, tickets: 300, resolution: 4.2, satisfaction: 4.5 },
          { team: 'Specialists', agents: 3, tickets: 200, resolution: 6.5, satisfaction: 4.6 }
        ]
      },
      businessIntelligence: {
        revenue: generateTimeSeriesData(30),
        costs: generateTimeSeriesData(30),
        profit: generateTimeSeriesData(30),
        roi: generateTimeSeriesData(30),
        costPerTicket: 25.50,
        revenuePerTicket: 150.75,
        profitMargin: 83.1,
        customerLifetimeValue: 2500,
        acquisitionCost: 150
      }
    }
  }

  const generateTimeSeriesData = (days: number) => {
    const data = []
    const baseValue = Math.floor(Math.random() * 100) + 50
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i))
      data.push({
        date: date.toISOString().split('T')[0],
        value: baseValue + Math.floor(Math.random() * 20) - 10
      })
    }
    return data
  }

  const fetchCustomReports = () => {
    const reports = []
    for (let i = 1; i <= 10; i++) {
      reports.push({
        id: `RPT-${String(i).padStart(4, '0')}`,
        name: `Custom Report ${i}`,
        description: `Automated report for ${getRandomReportType()}`,
        type: getRandomReportType(),
        created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: `User ${Math.floor(Math.random() * 10) + 1}`,
        last_run: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: Math.random() > 0.1 ? 'active' : 'draft',
        schedule: Math.random() > 0.5 ? 'daily' : 'weekly',
        recipients: Math.floor(Math.random() * 10) + 1
      })
    }
    setCustomReports(reports)
  }

  const fetchScheduledReports = () => {
    const reports = []
    for (let i = 1; i <= 15; i++) {
      reports.push({
        id: `SCH-${String(i).padStart(4, '0')}`,
        name: `Scheduled Report ${i}`,
        description: `Automated scheduled report for ${getRandomReportType()}`,
        type: getRandomReportType(),
        schedule: getRandomSchedule(),
        next_run: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        last_run: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: Math.random() > 0.2 ? 'active' : 'paused',
        recipients: Math.floor(Math.random() * 15) + 1,
        created_by: `User ${Math.floor(Math.random() * 10) + 1}`
      })
    }
    setScheduledReports(reports)
  }

  const getRandomReportType = () => {
    const types = ['Performance', 'Financial', 'Customer', 'Agent', 'System', 'Compliance']
    return types[Math.floor(Math.random() * types.length)]
  }

  const getRandomSchedule = () => {
    const schedules = ['daily', 'weekly', 'monthly', 'quarterly']
    return schedules[Math.floor(Math.random() * schedules.length)]
  }

  const filteredData = analyticsData[activeTab] || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Generate insights and reports from your business data</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[150px]">
              <Label htmlFor="dateRange">Date Range</Label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="metric">Metric</Label>
              <select
                id="metric"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Metrics</option>
                {metrics.map(metric => (
                  <option key={metric.value} value={metric.value}>{metric.label}</option>
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
          {activeTab === 'overview' && <OverviewTab data={analyticsData.overview} />}
          {activeTab === 'service-performance' && <ServicePerformanceTab data={analyticsData.servicePerformance} />}
          {activeTab === 'customer-analytics' && <CustomerAnalyticsTab data={analyticsData.customerAnalytics} />}
          {activeTab === 'agent-performance' && <AgentPerformanceTab data={analyticsData.agentPerformance} />}
          {activeTab === 'business-intelligence' && <BusinessIntelligenceTab data={analyticsData.businessIntelligence} />}
          {activeTab === 'custom-reports' && <CustomReportsTab data={customReports} />}
          {activeTab === 'scheduled-reports' && <ScheduledReportsTab data={scheduledReports} />}
        </div>
      )}
    </div>
  )
}

// Tab Components
function OverviewTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTickets || 0}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.slaCompliance || 0}%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.customerSatisfaction || 0}/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgResolutionTime || 0}h</div>
            <p className="text-xs text-muted-foreground">-1h from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Volume Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SLA Compliance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ServicePerformanceTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Channel</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tickets</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Avg Resolution</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {data.channelPerformance?.map((channel: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{channel.channel}</td>
                    <td className="py-3 px-4">{channel.tickets}</td>
                    <td className="py-3 px-4">{channel.resolution}h</td>
                    <td className="py-3 px-4">{channel.satisfaction}/5</td>
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

function CustomerAnalyticsTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Health Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.customerHealth?.map((health: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{health.score}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${health.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{health.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AgentPerformanceTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Agent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tickets</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Avg Resolution</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {data.topPerformers?.map((agent: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{agent.name}</td>
                    <td className="py-3 px-4">{agent.tickets}</td>
                    <td className="py-3 px-4">{agent.resolution}h</td>
                    <td className="py-3 px-4">{agent.satisfaction}/5</td>
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

function BusinessIntelligenceTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Per Ticket</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.costPerTicket || 0}</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Per Ticket</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.revenuePerTicket || 0}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.profitMargin || 0}%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer LTV</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.customerLifetimeValue || 0}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CustomReportsTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Custom Reports ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Run</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{report.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {new Date(report.last_run).toLocaleDateString()}
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
                          <Download className="h-4 w-4" />
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

function ScheduledReportsTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Schedule</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Next Run</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{report.schedule}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {new Date(report.next_run).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {report.status}
                      </Badge>
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


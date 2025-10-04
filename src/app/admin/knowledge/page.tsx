'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Copy,
  Share,
  Bookmark,
  Tag,
  Tags,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
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
  Wifi,
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
  Globe,
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

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState('all')
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>({})
  const [popularArticles, setPopularArticles] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState<any[]>([])

  const tabs = [
    { id: 'all', label: 'All Articles', count: 0 },
    { id: 'published', label: 'Published', count: 0 },
    { id: 'draft', label: 'Draft', count: 0 },
    { id: 'archived', label: 'Archived', count: 0 },
    { id: 'categories', label: 'Categories', count: 0 },
    { id: 'analytics', label: 'Analytics', count: 0 },
    { id: 'search-insights', label: 'Search Insights', count: 0 }
  ]

  const articleTypes = [
    { value: 'article', label: 'Article', icon: FileText, color: 'bg-blue-100 text-blue-800' },
    { value: 'faq', label: 'FAQ', icon: HelpCircle, color: 'bg-green-100 text-green-800' },
    { value: 'tutorial', label: 'Tutorial', icon: Bookmark, color: 'bg-purple-100 text-purple-800' },
    { value: 'troubleshooting', label: 'Troubleshooting', icon: AlertCircle, color: 'bg-orange-100 text-orange-800' },
    { value: 'video', label: 'Video Guide', icon: Tv, color: 'bg-red-100 text-red-800' },
    { value: 'best-practice', label: 'Best Practice', icon: Star, color: 'bg-yellow-100 text-yellow-800' }
  ]

  const statuses = [
    { value: 'published', label: 'Published', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: Edit },
    { value: 'archived', label: 'Archived', color: 'bg-red-100 text-red-800', icon: Archive },
    { value: 'review', label: 'Under Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
  ]

  useEffect(() => {
    fetchArticles()
    fetchCategories()
    fetchAnalytics()
    fetchPopularArticles()
    fetchRecentSearches()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from Supabase first
      const { data: supabaseArticles, error } = await supabase
        .from('knowledge_articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Supabase error, using mock data:', error)
        const mockArticles = generateMockArticles()
        setArticles(mockArticles)
      } else {
        const mockArticles = generateMockArticles()
        const allArticles = [...(supabaseArticles || []), ...mockArticles]
        setArticles(allArticles)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      const mockArticles = generateMockArticles()
      setArticles(mockArticles)
    } finally {
      setLoading(false)
    }
  }

  const generateMockArticles = () => {
    const mockArticles = []
    const statuses = ['published', 'draft', 'archived', 'review']
    const types = ['article', 'faq', 'tutorial', 'troubleshooting', 'video', 'best-practice']
    const categories = ['Getting Started', 'Account Management', 'Technical Support', 'Billing', 'Security', 'Integrations']
    
    for (let i = 1; i <= 50; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const type = types[Math.floor(Math.random() * types.length)]
      const category = categories[Math.floor(Math.random() * categories.length)]
      const createdDate = new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
      const updatedDate = new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
      
      mockArticles.push({
        id: `KB-${String(i).padStart(4, '0')}`,
        title: `Knowledge Base Article ${i}: ${getArticleTitle(type)}`,
        content: `This is the content for ${type} article ${i}. It contains detailed information about ${getArticleTopic(type)}.`,
        excerpt: `Brief description of ${type} article ${i}`,
        type,
        status,
        category,
        tags: getRandomTags(),
        author: `Author ${Math.floor(Math.random() * 10) + 1}`,
        created_at: createdDate.toISOString(),
        updated_at: updatedDate.toISOString(),
        published_at: status === 'published' ? updatedDate.toISOString() : null,
        views: Math.floor(Math.random() * 1000) + 10,
        likes: Math.floor(Math.random() * 100),
        helpful_votes: Math.floor(Math.random() * 50),
        not_helpful_votes: Math.floor(Math.random() * 10),
        comments_count: Math.floor(Math.random() * 20),
        last_viewed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        featured: Math.random() > 0.8, // 20% are featured
        pinned: Math.random() > 0.9, // 10% are pinned
        version: `1.${Math.floor(Math.random() * 10)}`,
        word_count: Math.floor(Math.random() * 2000) + 200,
        reading_time: Math.floor(Math.random() * 15) + 2, // 2-17 minutes
        difficulty: Math.floor(Math.random() * 3) + 1, // 1-3
        language: 'en',
        seo_title: `SEO Title for ${type} article ${i}`,
        seo_description: `SEO description for ${type} article ${i}`,
        attachments: generateAttachments(),
        related_articles: generateRelatedArticles(i)
      })
    }
    
    return mockArticles
  }

  const getArticleTitle = (type: string) => {
    const titles = {
      'article': ['How to Get Started', 'Understanding Features', 'Complete Guide', 'Step-by-Step Instructions'],
      'faq': ['Frequently Asked Questions', 'Common Issues', 'Quick Answers', 'Troubleshooting FAQ'],
      'tutorial': ['Tutorial Guide', 'Learning Path', 'Hands-on Tutorial', 'Interactive Guide'],
      'troubleshooting': ['Problem Solving', 'Error Resolution', 'Fix Common Issues', 'Troubleshooting Steps'],
      'video': ['Video Walkthrough', 'Screen Recording', 'Visual Guide', 'Video Tutorial'],
      'best-practice': ['Best Practices', 'Recommended Approach', 'Pro Tips', 'Expert Advice']
    }
    const typeTitles = titles[type] || ['General Article']
    return typeTitles[Math.floor(Math.random() * typeTitles.length)]
  }

  const getArticleTopic = (type: string) => {
    const topics = {
      'article': ['platform features', 'user management', 'system configuration'],
      'faq': ['common questions', 'account issues', 'technical problems'],
      'tutorial': ['getting started', 'advanced features', 'integration setup'],
      'troubleshooting': ['error resolution', 'performance issues', 'connectivity problems'],
      'video': ['feature demonstrations', 'setup processes', 'configuration guides'],
      'best-practice': ['security practices', 'optimization tips', 'workflow improvements']
    }
    const typeTopics = topics[type] || ['general topics']
    return typeTopics[Math.floor(Math.random() * typeTopics.length)]
  }

  const getRandomTags = () => {
    const allTags = ['beginner', 'advanced', 'tutorial', 'faq', 'troubleshooting', 'security', 'integration', 'billing', 'account', 'technical']
    const numTags = Math.floor(Math.random() * 4) + 1
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags)
  }

  const generateAttachments = () => {
    const attachments = []
    const numAttachments = Math.floor(Math.random() * 3)
    for (let i = 0; i < numAttachments; i++) {
      attachments.push({
        id: `ATT-${Math.floor(Math.random() * 1000)}`,
        name: `attachment-${i + 1}.pdf`,
        type: 'pdf',
        size: Math.floor(Math.random() * 5000) + 100,
        url: `/attachments/attachment-${i + 1}.pdf`
      })
    }
    return attachments
  }

  const generateRelatedArticles = (currentId: number) => {
    const related = []
    const numRelated = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numRelated; i++) {
      const relatedId = Math.floor(Math.random() * 50) + 1
      if (relatedId !== currentId) {
        related.push(`KB-${String(relatedId).padStart(4, '0')}`)
      }
    }
    return related
  }

  const fetchCategories = () => {
    const categories = [
      { id: 'getting-started', name: 'Getting Started', description: 'Basic setup and configuration', article_count: 15, icon: Play },
      { id: 'account-management', name: 'Account Management', description: 'User accounts and permissions', article_count: 12, icon: Users },
      { id: 'technical-support', name: 'Technical Support', description: 'Technical issues and solutions', article_count: 20, icon: Settings },
      { id: 'billing', name: 'Billing', description: 'Payment and subscription management', article_count: 8, icon: CreditCard },
      { id: 'security', name: 'Security', description: 'Security best practices and policies', article_count: 10, icon: Shield },
      { id: 'integrations', name: 'Integrations', description: 'Third-party integrations and APIs', article_count: 18, icon: Link }
    ]
    setCategories(categories)
  }

  const fetchAnalytics = () => {
    const analytics = {
      totalArticles: articles.length,
      publishedArticles: articles.filter(a => a.status === 'published').length,
      totalViews: articles.reduce((sum, a) => sum + a.views, 0),
      totalLikes: articles.reduce((sum, a) => sum + a.likes, 0),
      avgRating: 4.2,
      topCategories: [
        { name: 'Technical Support', views: 2500, articles: 20 },
        { name: 'Getting Started', views: 1800, articles: 15 },
        { name: 'Integrations', views: 1600, articles: 18 },
        { name: 'Account Management', views: 1200, articles: 12 }
      ],
      monthlyViews: generateMonthlyViews(),
      searchAnalytics: {
        totalSearches: 1250,
        successfulSearches: 980,
        failedSearches: 270,
        topSearchTerms: [
          { term: 'password reset', count: 45 },
          { term: 'API integration', count: 38 },
          { term: 'billing issues', count: 32 },
          { term: 'account setup', count: 28 }
        ]
      }
    }
    setAnalytics(analytics)
  }

  const generateMonthlyViews = () => {
    const months = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        views: Math.floor(Math.random() * 2000) + 500
      })
    }
    return months
  }

  const fetchPopularArticles = () => {
    const popular = articles
      .filter(a => a.status === 'published')
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
    setPopularArticles(popular)
  }

  const fetchRecentSearches = () => {
    const searches = []
    for (let i = 1; i <= 20; i++) {
      searches.push({
        id: `SEARCH-${i}`,
        query: getRandomSearchQuery(),
        results_count: Math.floor(Math.random() * 20) + 1,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        user_type: Math.random() > 0.5 ? 'customer' : 'agent',
        success: Math.random() > 0.2
      })
    }
    setRecentSearches(searches)
  }

  const getRandomSearchQuery = () => {
    const queries = [
      'password reset', 'API integration', 'billing issues', 'account setup',
      'troubleshooting', 'security settings', 'user management', 'data export',
      'notification settings', 'mobile app', 'desktop client', 'web interface'
    ]
    return queries[Math.floor(Math.random() * queries.length)]
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory
    
    // Handle special tabs
    let matchesTab = true
    if (activeTab === 'categories') {
      matchesTab = article.category === filterCategory
    } else if (activeTab === 'analytics') {
      matchesTab = article.views > 100 // Show popular articles
    } else if (activeTab === 'search-insights') {
      matchesTab = article.tags.some(tag => recentSearches.some(search => search.query.includes(tag)))
    } else if (activeTab !== 'all') {
      matchesTab = article.status === activeTab
    }
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

  const getStatusIcon = (status: string) => {
    const statusMap = {
      'published': CheckCircle,
      'draft': Edit,
      'archived': Archive,
      'review': Clock
    }
    return statusMap[status] || CheckCircle
  }

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.value === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = (type: string) => {
    const typeObj = articleTypes.find(t => t.value === type)
    return typeObj?.icon || FileText
  }

  const getTypeColor = (type: string) => {
    const typeObj = articleTypes.find(t => t.value === type)
    return typeObj?.color || 'bg-gray-100 text-gray-800'
  }

  // Update tab counts
  tabs.forEach(tab => {
    if (tab.id === 'all') {
      tab.count = articles.length
    } else if (tab.id === 'categories') {
      tab.count = categories.length
    } else if (tab.id === 'analytics') {
      tab.count = articles.filter(a => a.views > 100).length
    } else if (tab.id === 'search-insights') {
      tab.count = recentSearches.length
    } else {
      tab.count = articles.filter(a => a.status === tab.id).length
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">Manage articles, documentation, and help content</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalArticles || 0}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews?.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgRating || 0}/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Success</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.searchAnalytics?.successfulSearches || 0}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
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
                  placeholder="Search articles..."
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
                  <option key={category.id} value={category.name}>{category.name}</option>
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
          {activeTab === 'categories' && <CategoriesTab data={categories} />}
          {activeTab === 'analytics' && <AnalyticsTab data={analytics} popularArticles={popularArticles} />}
          {activeTab === 'search-insights' && <SearchInsightsTab data={analytics.searchAnalytics} recentSearches={recentSearches} />}
          {(activeTab === 'all' || activeTab === 'published' || activeTab === 'draft' || activeTab === 'archived') && (
            <ArticlesTab data={filteredArticles} />
          )}
        </div>
      )}
    </div>
  )
}

// Tab Components
function ArticlesTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Articles ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((article) => (
                  <tr key={article.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500">{article.excerpt}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{article.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(article.status)}>
                        {article.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{article.views}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">4.2</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-500">
                        {new Date(article.updated_at).toLocaleDateString()}
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
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4" />
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

function CategoriesTab({ data }: { data: any[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Articles</span>
                  <span className="text-sm font-medium">{category.article_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AnalyticsTab({ data, popularArticles }: { data: any, popularArticles: any[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topCategories?.map((category: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(category.views / 2500) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{category.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularArticles.slice(0, 5).map((article, index) => (
                <div key={article.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{article.title}</div>
                    <div className="text-xs text-gray-500">{article.views} views</div>
                  </div>
                  <Badge variant="outline">{article.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SearchInsightsTab({ data, recentSearches }: { data: any, recentSearches: any[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Search Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topSearchTerms?.map((term: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{term.term}</span>
                  <Badge variant="outline">{term.count} searches</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSearches.slice(0, 10).map((search) => (
                <div key={search.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{search.query}</div>
                    <div className="text-xs text-gray-500">
                      {search.results_count} results • {new Date(search.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge className={search.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {search.success ? 'Success' : 'Failed'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getStatusColor(status: string) {
  const statusMap = {
    'published': 'bg-green-100 text-green-800',
    'draft': 'bg-gray-100 text-gray-800',
    'archived': 'bg-red-100 text-red-800',
    'review': 'bg-yellow-100 text-yellow-800'
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}


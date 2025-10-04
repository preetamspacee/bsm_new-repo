'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  User,
  Building2,
  FileText,
  Settings,
  Activity,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Award,
  Target,
  BarChart3,
  Monitor,
  Laptop,
  Smartphone,
  Server,
  HardDrive,
  Network,
  Package,
  Zap,
  RefreshCw,
  Bot,
  MessageSquare,
  Timer,
  TrendingDown,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  ArrowDown,
  Circle,
  Square,
  Triangle
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function AccountManagementPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTier, setFilterTier] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [accountAssets, setAccountAssets] = useState<any[]>([])
  const [slaPerformance, setSlaPerformance] = useState<any[]>([])
  const [accountHealth, setAccountHealth] = useState<any[]>([])
  const [renewalRisk, setRenewalRisk] = useState<any[]>([])
  const [upsellOpportunities, setUpsellOpportunities] = useState<any[]>([])

  const tabs = [
    { id: 'all', label: 'All Accounts', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'inactive', label: 'Inactive', count: 0 },
    { id: 'suspended', label: 'Suspended', count: 0 },
    { id: 'trial', label: 'Trial', count: 0 },
    { id: 'enterprise', label: 'Enterprise', count: 0 },
    { id: 'assets', label: 'Asset Management', count: 0 },
    { id: 'sla-performance', label: 'SLA Performance', count: 0 },
    { id: 'renewal-risk', label: 'Renewal Risk', count: 0 },
    { id: 'upsell', label: 'Upsell Opportunities', count: 0 }
  ]

  const tiers = [
    { value: 'basic', label: 'Basic', color: 'bg-gray-100 text-gray-800', price: '$29/month' },
    { value: 'professional', label: 'Professional', color: 'bg-blue-100 text-blue-800', price: '$79/month' },
    { value: 'enterprise', label: 'Enterprise', color: 'bg-purple-100 text-purple-800', price: '$199/month' },
    { value: 'custom', label: 'Custom', color: 'bg-gold-100 text-gold-800', price: 'Custom' }
  ]

  const statuses = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: XCircle },
    { value: 'suspended', label: 'Suspended', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
    { value: 'trial', label: 'Trial', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
  ]

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Real Estate',
    'Media',
    'Government',
    'Non-Profit',
    'Other'
  ]

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from Supabase first
      const { data: supabaseAccounts, error } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.log('Supabase error, using mock data:', error)
        const mockAccounts = generateMockAccounts()
        setAccounts(mockAccounts)
      } else {
        const mockAccounts = generateMockAccounts()
        const allAccounts = [...(supabaseAccounts || []), ...mockAccounts]
        setAccounts(allAccounts)
      }

      // Calculate additional data
      calculateAccountHealthScores()
      calculateRenewalRisks()
      calculateUpsellOpportunities()
      calculateSlaPerformance()
    } catch (error) {
      console.error('Error fetching accounts:', error)
      const mockAccounts = generateMockAccounts()
      setAccounts(mockAccounts)
    } finally {
      setLoading(false)
    }
  }

  const generateMockAccounts = () => {
    const mockAccounts = []
    const statuses = ['active', 'inactive', 'suspended', 'trial']
    const tiers: ('basic' | 'professional' | 'enterprise' | 'custom')[] = ['basic', 'professional', 'enterprise', 'custom']
    const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Consulting', 'Real Estate']
    
    for (let i = 1; i <= 30; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const tier = tiers[Math.floor(Math.random() * tiers.length)]
      const industry = industries[Math.floor(Math.random() * industries.length)]
      const createdDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      const lastLogin = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      
      mockAccounts.push({
        id: `ACC-${String(i).padStart(4, '0')}`,
        company_name: `Company ${i}`,
        contact_name: `Contact ${i}`,
        email: `contact${i}@company${i}.com`,
        phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        address: `${Math.floor(Math.random() * 9999) + 1} Main St, City ${i}, State`,
        website: `https://company${i}.com`,
        industry,
        tier,
        status,
        created_at: createdDate.toISOString(),
        last_login: lastLogin.toISOString(),
        monthly_revenue: Math.floor(Math.random() * 10000) + 1000,
        users_count: Math.floor(Math.random() * 50) + 1,
        tickets_count: Math.floor(Math.random() * 100),
        satisfaction_score: Math.floor(Math.random() * 2) + 3 + Math.random(),
        contract_start: createdDate.toISOString(),
        contract_end: new Date(createdDate.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        payment_method: 'Credit Card',
        billing_cycle: 'Monthly',
        notes: `Account notes for Company ${i}`,
        tags: getRandomTags(),
        features: getRandomFeatures(tier),
        // Asset Management Data
        assets: generateAccountAssets(i),
        // SLA Performance Data
        sla_compliance: Math.floor(Math.random() * 20) + 80, // 80-100%
        avg_response_time: Math.floor(Math.random() * 4) + 1, // 1-5 hours
        resolution_rate: Math.floor(Math.random() * 20) + 80, // 80-100%
        first_contact_resolution: Math.floor(Math.random() * 30) + 70, // 70-100%
        // Account Health Data
        health_score: Math.floor(Math.random() * 30) + 70, // 70-100
        usage_trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
        engagement_score: Math.floor(Math.random() * 30) + 70, // 70-100
        support_tickets_trend: Math.random() > 0.5 ? 'decreasing' : 'increasing',
        // Renewal Risk Data
        renewal_probability: Math.floor(Math.random() * 40) + 60, // 60-100%
        days_to_renewal: Math.floor(Math.random() * 365) + 1,
        churn_risk: Math.floor(Math.random() * 30) + 10, // 10-40%
        // Upsell Opportunities
        upsell_potential: Math.floor(Math.random() * 50) + 50, // 50-100%
        recommended_tier: tier === 'basic' ? 'professional' : tier === 'professional' ? 'enterprise' : 'custom',
        potential_revenue_increase: Math.floor(Math.random() * 5000) + 1000
      })
    }
    
    return mockAccounts
  }

  const getRandomTags = () => {
    const allTags = ['vip', 'high-value', 'new', 'renewal', 'upsell', 'support', 'enterprise', 'startup', 'government', 'education']
    const numTags = Math.floor(Math.random() * 3) + 1
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags)
  }

  const getRandomFeatures = (tier: 'basic' | 'professional' | 'enterprise' | 'custom') => {
    const features = {
      'basic': ['Basic Support', 'Email Support', 'Standard SLA'],
      'professional': ['Priority Support', 'Phone Support', 'Advanced SLA', 'Custom Integrations'],
      'enterprise': ['Dedicated Support', '24/7 Support', 'Premium SLA', 'Custom Integrations', 'API Access', 'White-label'],
      'custom': ['All Features', 'Custom Development', 'Dedicated Account Manager', 'On-site Support']
    }
    return features[tier] || features['basic']
  }

  const generateAccountAssets = (accountId: number) => {
    const assetTypes = ['server', 'workstation', 'laptop', 'mobile', 'network', 'storage']
    const statuses = ['active', 'maintenance', 'retired']
    const assets = []
    
    const numAssets = Math.floor(Math.random() * 20) + 5 // 5-25 assets per account
    
    for (let i = 1; i <= numAssets; i++) {
      const type = assetTypes[Math.floor(Math.random() * assetTypes.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      
      assets.push({
        id: `AST-${accountId}-${String(i).padStart(3, '0')}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
        type,
        status,
        assigned_to: `User ${Math.floor(Math.random() * 10) + 1}`,
        location: `Office ${Math.floor(Math.random() * 5) + 1}`,
        warranty_expiry: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        cost: Math.floor(Math.random() * 3000) + 500,
        last_maintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      })
    }
    
    return assets
  }

  const calculateAccountHealth = (account: any) => {
    const healthFactors = {
      sla_compliance: account.sla_compliance / 100,
      satisfaction_score: account.satisfaction_score / 5,
      engagement_score: account.engagement_score / 100,
      usage_trend: account.usage_trend === 'increasing' ? 1 : 0.5,
      support_tickets_trend: account.support_tickets_trend === 'decreasing' ? 1 : 0.7
    }
    
    const healthScore = Object.values(healthFactors).reduce((sum, factor) => sum + factor, 0) / Object.keys(healthFactors).length * 100
    
    return {
      score: Math.round(healthScore),
      status: healthScore >= 80 ? 'healthy' : healthScore >= 60 ? 'warning' : 'critical',
      factors: healthFactors
    }
  }

  const calculateRenewalRisk = (account: any) => {
    const riskFactors = {
      churn_risk: account.churn_risk / 100,
      satisfaction_score: (5 - account.satisfaction_score) / 5,
      days_to_renewal: account.days_to_renewal < 90 ? 0.8 : account.days_to_renewal < 180 ? 0.5 : 0.2,
      support_tickets_trend: account.support_tickets_trend === 'increasing' ? 0.7 : 0.3
    }
    
    const riskScore = Object.values(riskFactors).reduce((sum, factor) => sum + factor, 0) / Object.keys(riskFactors).length * 100
    
    return {
      score: Math.round(riskScore),
      level: riskScore >= 70 ? 'high' : riskScore >= 40 ? 'medium' : 'low',
      factors: riskFactors
    }
  }

  const calculateAccountHealthScores = () => {
    const healthData = accounts.map(account => ({
      accountId: account.id,
      companyName: account.company_name,
      healthScore: calculateAccountHealth(account),
      slaCompliance: account.sla_compliance,
      satisfactionScore: account.satisfaction_score,
      engagementScore: account.engagement_score
    }))
    setAccountHealth(healthData)
  }

  const calculateRenewalRisks = () => {
    const riskData = accounts.map(account => ({
      accountId: account.id,
      companyName: account.company_name,
      renewalRisk: calculateRenewalRisk(account),
      daysToRenewal: account.days_to_renewal,
      churnRisk: account.churn_risk,
      renewalProbability: account.renewal_probability
    }))
    setRenewalRisk(riskData)
  }

  const calculateUpsellOpportunities = () => {
    const upsellData = accounts
      .filter(account => account.upsell_potential > 60)
      .map(account => ({
        accountId: account.id,
        companyName: account.company_name,
        currentTier: account.tier,
        recommendedTier: account.recommended_tier,
        upsellPotential: account.upsell_potential,
        potentialRevenueIncrease: account.potential_revenue_increase,
        monthlyRevenue: account.monthly_revenue
      }))
    setUpsellOpportunities(upsellData)
  }

  const calculateSlaPerformance = () => {
    const slaData = accounts.map(account => ({
      accountId: account.id,
      companyName: account.company_name,
      slaCompliance: account.sla_compliance,
      avgResponseTime: account.avg_response_time,
      resolutionRate: account.resolution_rate,
      firstContactResolution: account.first_contact_resolution,
      ticketsCount: account.tickets_count
    }))
    setSlaPerformance(slaData)
  }

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus
    const matchesTier = filterTier === 'all' || account.tier === filterTier
    
    // Handle special tabs
    let matchesTab = true
    if (activeTab === 'assets') {
      matchesTab = account.assets && account.assets.length > 0
    } else if (activeTab === 'sla-performance') {
      matchesTab = account.sla_compliance < 90 // Show accounts with SLA issues
    } else if (activeTab === 'renewal-risk') {
      matchesTab = account.churn_risk > 30 // Show high-risk accounts
    } else if (activeTab === 'upsell') {
      matchesTab = account.upsell_potential > 60 // Show upsell opportunities
    } else if (activeTab === 'enterprise') {
      matchesTab = account.tier === 'enterprise'
    } else if (activeTab !== 'all') {
      matchesTab = account.status === activeTab
    }
    
    return matchesSearch && matchesStatus && matchesTier && matchesTab
  })

  const getStatusIcon = (status: 'active' | 'inactive' | 'suspended' | 'trial') => {
    const statusMap = {
      'active': CheckCircle,
      'inactive': XCircle,
      'suspended': AlertTriangle,
      'trial': Clock
    }
    return statusMap[status] || CheckCircle
  }

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.value === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getTierColor = (tier: string) => {
    const tierObj = tiers.find(t => t.value === tier)
    return tierObj?.color || 'bg-gray-100 text-gray-800'
  }

  // Update tab counts
  tabs.forEach(tab => {
    if (tab.id === 'all') {
      tab.count = accounts.length
    } else if (tab.id === 'enterprise') {
      tab.count = accounts.filter(account => account.tier === 'enterprise').length
    } else if (tab.id === 'assets') {
      tab.count = accounts.filter(account => account.assets && account.assets.length > 0).length
    } else if (tab.id === 'sla-performance') {
      tab.count = accounts.filter(account => account.sla_compliance < 90).length
    } else if (tab.id === 'renewal-risk') {
      tab.count = accounts.filter(account => account.churn_risk > 30).length
    } else if (tab.id === 'upsell') {
      tab.count = accounts.filter(account => account.upsell_potential > 60).length
    } else {
      tab.count = accounts.filter(account => account.status === tab.id).length
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
          <p className="text-gray-600">Manage client accounts and subscriptions</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.filter(a => a.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${accounts.reduce((sum, a) => sum + a.monthly_revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(accounts.reduce((sum, a) => sum + a.satisfaction_score, 0) / accounts.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
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
                  placeholder="Search accounts..."
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
              <Label htmlFor="tier">Tier</Label>
              <select
                id="tier"
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Tiers</option>
                {tiers.map(tier => (
                  <option key={tier.value} value={tier.value}>{tier.label}</option>
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

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts ({filteredAccounts.length})</CardTitle>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Tier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Health Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">SLA Compliance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => {
                    const StatusIcon = getStatusIcon(account.status)
                    
                    return (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{account.company_name}</div>
                            <div className="text-sm text-gray-500">{account.id}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{account.contact_name}</div>
                            <div className="text-sm text-gray-500">{account.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(account.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {account.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getTierColor(account.tier)}>
                            {account.tier}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              account.health_score >= 80 ? 'bg-green-500' : 
                              account.health_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium">{account.health_score}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              account.sla_compliance >= 95 ? 'bg-green-500' : 
                              account.sla_compliance >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium">{account.sla_compliance}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium">${account.monthly_revenue.toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{account.users_count}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedAccount(account)}>
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
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Account Details - {selectedAccount.company_name}</h2>
              <Button variant="ghost" onClick={() => setSelectedAccount(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Company Information */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Company Name</Label>
                      <p className="text-sm font-medium">{selectedAccount.company_name}</p>
                    </div>
                    <div>
                      <Label>Industry</Label>
                      <p className="text-sm">{selectedAccount.industry}</p>
                    </div>
                    <div>
                      <Label>Website</Label>
                      <a href={selectedAccount.website} className="text-sm text-blue-600 hover:underline">
                        {selectedAccount.website}
                      </a>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <p className="text-sm">{selectedAccount.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Contact Name</Label>
                      <p className="text-sm font-medium">{selectedAccount.contact_name}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm">{selectedAccount.email}</p>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="text-sm">{selectedAccount.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Account Status */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Status</Label>
                      <Badge className={getStatusColor(selectedAccount.status)}>
                        {selectedAccount.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Tier</Label>
                      <Badge className={getTierColor(selectedAccount.tier)}>
                        {selectedAccount.tier}
                      </Badge>
                    </div>
                    <div>
                      <Label>Created</Label>
                      <p className="text-sm">{new Date(selectedAccount.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label>Last Login</Label>
                      <p className="text-sm">{new Date(selectedAccount.last_login).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Monthly Revenue</Label>
                      <p className="text-sm font-medium">${selectedAccount.monthly_revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label>Payment Method</Label>
                      <p className="text-sm">{selectedAccount.payment_method}</p>
                    </div>
                    <div>
                      <Label>Billing Cycle</Label>
                      <p className="text-sm">{selectedAccount.billing_cycle}</p>
                    </div>
                    <div>
                      <Label>Contract End</Label>
                      <p className="text-sm">{new Date(selectedAccount.contract_end).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Metrics & Features */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Users</Label>
                      <span className="text-sm font-medium">{selectedAccount.users_count}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Tickets</Label>
                      <span className="text-sm font-medium">{selectedAccount.tickets_count}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Satisfaction</Label>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{selectedAccount.satisfaction_score.toFixed(1)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedAccount.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedAccount.tags.map((tag: string) => (
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


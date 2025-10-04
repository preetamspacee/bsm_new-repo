'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Server, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Monitor,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  TrendingUp,
  BarChart3,
  Settings,
  RefreshCw,
  Power,
  Wifi,
  HardDriveIcon,
  Smartphone,
  Laptop
} from 'lucide-react'

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Assets', count: 0 },
    { id: 'servers', label: 'Servers', count: 0 },
    { id: 'workstations', label: 'Workstations', count: 0 },
    { id: 'mobile', label: 'Mobile Devices', count: 0 },
    { id: 'network', label: 'Network Equipment', count: 0 },
    { id: 'storage', label: 'Storage', count: 0 }
  ]

  const assetTypes = [
    { value: 'server', label: 'Server', icon: Server, color: 'bg-blue-100 text-blue-800' },
    { value: 'workstation', label: 'Workstation', icon: Monitor, color: 'bg-green-100 text-green-800' },
    { value: 'laptop', label: 'Laptop', icon: Laptop, color: 'bg-purple-100 text-purple-800' },
    { value: 'mobile', label: 'Mobile Device', icon: Smartphone, color: 'bg-orange-100 text-orange-800' },
    { value: 'network', label: 'Network Equipment', icon: Network, color: 'bg-cyan-100 text-cyan-800' },
    { value: 'storage', label: 'Storage Device', icon: HardDrive, color: 'bg-pink-100 text-pink-800' }
  ]

  const statuses = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: 'offline', label: 'Offline', color: 'bg-red-100 text-red-800', icon: XCircle },
    { value: 'retired', label: 'Retired', color: 'bg-gray-100 text-gray-800', icon: AlertTriangle }
  ]

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockAssets = generateMockAssets()
      setAssets(mockAssets)
      setLoading(false)
    }, 1000)
  }

  const generateMockAssets = () => {
    const mockAssets = []
    const types = ['server', 'workstation', 'laptop', 'mobile', 'network', 'storage']
    const statuses = ['active', 'maintenance', 'offline', 'retired']
    const locations = ['Data Center A', 'Office Floor 1', 'Office Floor 2', 'Remote Office', 'Warehouse']
    
    for (let i = 1; i <= 40; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const createdDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      
      mockAssets.push({
        id: `AST-${String(i).padStart(4, '0')}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
        type,
        status,
        location,
        ip_address: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        mac_address: generateMacAddress(),
        serial_number: `SN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        model: `${type.charAt(0).toUpperCase() + type.slice(1)} Model ${Math.floor(Math.random() * 10) + 1}`,
        manufacturer: ['Dell', 'HP', 'Lenovo', 'Cisco', 'Apple', 'Samsung'][Math.floor(Math.random() * 6)],
        os: getRandomOS(type),
        cpu: getRandomCPU(type),
        memory: getRandomMemory(type),
        storage: getRandomStorage(type),
        created_at: createdDate.toISOString(),
        last_maintenance: new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        warranty_expiry: new Date(createdDate.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        assigned_to: status === 'active' ? `User ${Math.floor(Math.random() * 20) + 1}` : null,
        cost: Math.floor(Math.random() * 5000) + 500,
        tags: getRandomTags()
      })
    }
    
    return mockAssets
  }

  const generateMacAddress = () => {
    return Array.from({length: 6}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':')
  }

  const getRandomOS = (type: string) => {
    const osMap = {
      'server': ['Windows Server 2022', 'Ubuntu Server 22.04', 'CentOS 8', 'Red Hat Enterprise Linux'],
      'workstation': ['Windows 11', 'Windows 10', 'macOS Monterey', 'Ubuntu Desktop'],
      'laptop': ['Windows 11', 'macOS Monterey', 'Ubuntu Desktop', 'Chrome OS'],
      'mobile': ['iOS 16', 'Android 13', 'Android 12'],
      'network': ['Cisco IOS', 'Juniper OS', 'Aruba OS'],
      'storage': ['FreeNAS', 'TrueNAS', 'Synology DSM', 'QNAP QTS']
    }
    const osList = osMap[type] || ['Unknown']
    return osList[Math.floor(Math.random() * osList.length)]
  }

  const getRandomCPU = (type: string) => {
    const cpuMap = {
      'server': ['Intel Xeon E5-2680', 'AMD EPYC 7542', 'Intel Xeon Gold 6248'],
      'workstation': ['Intel Core i7-12700K', 'AMD Ryzen 7 5800X', 'Intel Core i9-12900K'],
      'laptop': ['Intel Core i5-1240P', 'AMD Ryzen 5 5600H', 'Apple M2'],
      'mobile': ['Apple A16 Bionic', 'Snapdragon 8 Gen 2', 'MediaTek Dimensity 9000'],
      'network': ['Cisco ASR 1000', 'Juniper MX Series', 'Aruba 6300'],
      'storage': ['Intel Atom C3000', 'AMD Ryzen Embedded', 'ARM Cortex-A72']
    }
    const cpuList = cpuMap[type] || ['Unknown']
    return cpuList[Math.floor(Math.random() * cpuList.length)]
  }

  const getRandomMemory = (type: string) => {
    const memoryMap = {
      'server': ['32GB', '64GB', '128GB', '256GB'],
      'workstation': ['16GB', '32GB', '64GB'],
      'laptop': ['8GB', '16GB', '32GB'],
      'mobile': ['6GB', '8GB', '12GB'],
      'network': ['4GB', '8GB', '16GB'],
      'storage': ['8GB', '16GB', '32GB']
    }
    const memoryList = memoryMap[type] || ['Unknown']
    return memoryList[Math.floor(Math.random() * memoryList.length)]
  }

  const getRandomStorage = (type: string) => {
    const storageMap = {
      'server': ['1TB SSD', '2TB SSD', '4TB SSD', '8TB HDD'],
      'workstation': ['512GB SSD', '1TB SSD', '2TB SSD'],
      'laptop': ['256GB SSD', '512GB SSD', '1TB SSD'],
      'mobile': ['128GB', '256GB', '512GB', '1TB'],
      'network': ['32GB', '64GB', '128GB'],
      'storage': ['1TB', '2TB', '4TB', '8TB', '16TB']
    }
    const storageList = storageMap[type] || ['Unknown']
    return storageList[Math.floor(Math.random() * storageList.length)]
  }

  const getRandomTags = () => {
    const allTags = ['production', 'development', 'test', 'backup', 'critical', 'redundant', 'monitored', 'secured']
    const numTags = Math.floor(Math.random() * 3) + 1
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags)
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.ip_address.includes(searchTerm) ||
                         asset.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus
    const matchesType = filterType === 'all' || asset.type === filterType
    const matchesTab = activeTab === 'all' || asset.type === activeTab
    
    return matchesSearch && matchesStatus && matchesType && matchesTab
  })

  const getTypeIcon = (type: string) => {
    const typeObj = assetTypes.find(t => t.value === type)
    return typeObj?.icon || Server
  }

  const getTypeColor = (type: string) => {
    const typeObj = assetTypes.find(t => t.value === type)
    return typeObj?.color || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    const statusObj = statuses.find(s => s.value === status)
    return statusObj?.icon || CheckCircle
  }

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.value === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  // Update tab counts
  tabs.forEach(tab => {
    if (tab.id === 'all') {
      tab.count = assets.length
    } else {
      tab.count = assets.filter(asset => asset.type === tab.id).length
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600">Manage IT assets and infrastructure</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assets.length}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assets.filter(a => a.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assets.filter(a => a.status === 'maintenance').length}</div>
            <p className="text-xs text-muted-foreground">-2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${assets.reduce((sum, a) => sum + a.cost, 0).toLocaleString()}
            </div>
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
                  placeholder="Search assets..."
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
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                {assetTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
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

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assets ({filteredAssets.length})</CardTitle>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Asset</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">IP Address</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Assigned To</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset) => {
                    const TypeIcon = getTypeIcon(asset.type)
                    const StatusIcon = getStatusIcon(asset.status)
                    
                    return (
                      <tr key={asset.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{asset.name}</div>
                            <div className="text-sm text-gray-500">{asset.serial_number}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getTypeColor(asset.type)}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {asset.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(asset.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {asset.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{asset.location}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono">{asset.ip_address}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{asset.assigned_to || 'Unassigned'}</span>
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
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


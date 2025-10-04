'use client'

import PlaceholderPage from '@/components/admin/placeholder-page'
import { Users } from 'lucide-react'

export default function UserManagementPage() {
  return (
    <PlaceholderPage
      title="User Management"
      description="Manage user accounts, roles, and permissions"
      icon={Users}
      sections={[
        'User Accounts',
        'Role Management',
        'Permission Sets',
        'Group Management',
        'Access Control',
        'User Profiles',
        'Authentication',
        'Audit Logs'
      ]}
      mockDataCount={40}
    />
  )
}


'use client'

import PlaceholderPage from '@/components/admin/placeholder-page'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Configure system settings and preferences"
      icon={Settings}
      sections={[
        'General Settings',
        'Security Settings',
        'Notification Settings',
        'System Configuration',
        'Backup Settings',
        'Integration Settings',
        'User Preferences',
        'System Maintenance'
      ]}
      mockDataCount={15}
    />
  )
}


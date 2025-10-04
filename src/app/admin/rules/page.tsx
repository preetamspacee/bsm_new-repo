'use client'

import PlaceholderPage from '@/components/admin/placeholder-page'
import { RefreshCw } from 'lucide-react'

export default function RulesEnginePage() {
  return (
    <PlaceholderPage
      title="Rules Engine"
      description="Configure and manage business rules and automation workflows"
      icon={RefreshCw}
      sections={[
        'Business Rules',
        'Automation Rules',
        'Validation Rules',
        'Approval Rules',
        'Notification Rules',
        'Escalation Rules',
        'Conditional Logic',
        'Rule Templates'
      ]}
      mockDataCount={25}
    />
  )
}


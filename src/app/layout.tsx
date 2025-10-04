import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/auth-provider'
import { LenisProvider } from '@/components/providers/lenis-provider'
import { ScrollProgressIndicator } from '@/components/ui/scroll-progress-indicator'
import { ScrollPerformanceMonitor } from '@/components/ui/scroll-performance-monitor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BSM Platform - Business Service Management',
  description: 'Comprehensive business service management solution with Admin & Customer portals',
  keywords: ['BSM', 'Business Service Management', 'ITSM', 'Customer Portal', 'Admin Dashboard'],
  authors: [{ name: 'BSM Platform Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <LenisProvider>
              <ScrollProgressIndicator />
              <ScrollPerformanceMonitor />
              {children}
            </LenisProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

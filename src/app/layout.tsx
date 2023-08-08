'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'

import { store } from '@/store/store'
import SessionProviders from './components/SessionProviders'

const inter = Inter({ subsets: ['latin'] })

export const revalidate = 0

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      
      <body className={inter.className}>
        <Provider store={store}>
          <SessionProviders>
            {children}
          </SessionProviders>
        </Provider>
        </body>
    </html>
  )
}

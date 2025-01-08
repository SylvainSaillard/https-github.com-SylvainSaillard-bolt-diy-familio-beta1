import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/layout/Navigation'
import { Header } from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8 pb-24">
            {children}
          </main>
          <Navigation />
        </div>
      </body>
    </html>
  )
}

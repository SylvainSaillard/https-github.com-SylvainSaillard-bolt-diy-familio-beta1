import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'

export function Navigation() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between py-3">
          <NavItem 
            to="/" 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            } 
            label="Home" 
            active={location.pathname === '/'} 
          />
          <NavItem 
            to="/calendar" 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            } 
            label="Calendar" 
            active={location.pathname === '/calendar'} 
          />
          <NavItem 
            to="/assistant" 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            } 
            label="Assistant" 
            active={location.pathname === '/assistant'} 
          />
          <NavItem 
            to="/docs" 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            } 
            label="Docs" 
            active={location.pathname === '/docs'} 
          />
          <NavItem 
            to="/profile" 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            } 
            label="Profile" 
            active={location.pathname === '/profile'} 
          />
        </div>
      </div>
    </nav>
  )
}

function NavItem({ 
  to, 
  icon, 
  label, 
  active 
}: { 
  to: string
  icon: React.ReactNode
  label: string
  active: boolean 
}) {
  return (
    <Link 
      to={to}
      className={clsx(
        'flex flex-col items-center space-y-1',
        active ? 'text-blue-600' : 'text-gray-600'
      )}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  )
}

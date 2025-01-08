import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Navigation } from '@/components/layout/Navigation'
import { Stats } from '@/components/dashboard/Stats'
import { Assistant } from '@/components/assistant/Assistant'
import { TaskList } from '@/components/tasks/TaskList'
import { FamilyList } from '@/components/family/FamilyList'
import { Calendar } from '@/components/calendar/Calendar'
import { Documents } from '@/components/documents/Documents'

function Home() {
  return (
    <div className="space-y-8">
      <Stats />
      <Assistant />
      <TaskList />
      <FamilyList />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/docs" element={<Documents />} />
            <Route path="/profile" element={<div>Profile Page</div>} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  )
}

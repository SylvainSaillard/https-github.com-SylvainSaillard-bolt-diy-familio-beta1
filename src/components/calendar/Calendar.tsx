import { useState } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

interface Event {
  id: string
  title: string
  time: string
  location: string
  participants: string[]
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Family Dinner',
      time: '19:00',
      location: 'Home',
      participants: ['Mom', 'Dad', 'Emily', 'Michael']
    },
    {
      id: '2',
      title: 'Soccer Practice',
      time: '16:00',
      location: 'Sports Center',
      participants: ['Michael', 'Dad']
    },
    {
      id: '3',
      title: 'Piano Lesson',
      time: '14:30',
      location: 'Music School',
      participants: ['Emily']
    }
  ])

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(new Date(2025, 0, 3), date))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center text-sm text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map(day => {
          const dayEvents = getEventsForDay(day)
          return (
            <div
              key={day.toString()}
              className={`p-2 border rounded-lg ${
                isSameDay(day, new Date(2025, 0, 3))
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="text-sm">{format(day, 'd')}</div>
              {dayEvents.length > 0 && (
                <div className="w-1 h-1 bg-blue-400 rounded-full mt-1 mx-auto"></div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Friday, January 3</h3>
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Event</span>
          </button>
        </div>
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="bg-white p-4 rounded-xl shadow-sm space-y-2">
              <div className="font-medium">{event.title}</div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {event.participants.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

interface FamilyMember {
  id: string
  name: string
  role: string
  status: string
  avatar: string
  isOnline: boolean
}

export function FamilyList() {
  const [members] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'John',
      role: 'Dad',
      status: 'Working',
      avatar: '',
      isOnline: true
    },
    {
      id: '2',
      name: 'Sarah',
      role: 'Mom',
      status: 'Shopping',
      avatar: '',
      isOnline: true
    },
    {
      id: '3',
      name: 'Emily',
      role: 'Daughter',
      status: 'At School',
      avatar: '',
      isOnline: true
    },
    {
      id: '4',
      name: 'Michael',
      role: 'Son',
      status: 'Playing',
      avatar: '',
      isOnline: true
    }
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Family</h2>
      <div className="space-y-3">
        {members.map(member => (
          <div 
            key={member.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                {member.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <div className="font-medium">{member.name} ({member.role})</div>
                <div className="text-sm text-gray-500">{member.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

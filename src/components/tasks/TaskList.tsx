export function TaskList() {
  const tasks = [
    {
      id: '1',
      title: 'Grocery Shopping',
      assignee: 'Mom',
      time: 'Today, 5:00 PM'
    },
    {
      id: '2',
      title: 'Homework Help',
      assignee: 'Dad',
      time: 'Today, 7:00 PM'
    },
    {
      id: '3',
      title: 'Family Movie Night',
      assignee: 'Everyone',
      time: 'Today, 8:30 PM'
    }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Today's Tasks</h2>
      <div className="space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500">{task.assignee}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">{task.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

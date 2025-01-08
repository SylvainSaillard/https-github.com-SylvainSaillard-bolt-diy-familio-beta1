import { TaskList } from '@/components/tasks/TaskList'
import { Stats } from '@/components/dashboard/Stats'
import { Assistant } from '@/components/assistant/Assistant'

export default function Home() {
  return (
    <div className="space-y-8">
      <Stats />
      <Assistant />
      <TaskList />
    </div>
  )
}

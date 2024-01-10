import './App.css'

import { StatusCard } from '@/components/StatusCard'
import { useHealthStatus } from '@/contexts/HealthStatusContext'

function App() {
  const { statuses } = useHealthStatus()

  const shouldRender = statuses.length > 0

  return (
    <div className="container">
      {shouldRender &&
        statuses.map((status) => (
          <div className="status-card-container" key={status.hostname}>
            <StatusCard status={status} />
          </div>
        ))}
    </div>
  )
}

export default App

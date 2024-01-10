import { useEffect } from 'react'

import { StatusCard } from '@/components/StatusCard'
import { useHealthStatus } from '@/contexts/HealthStatusContext'
import { startPolling } from '@/utils/polling'

import './App.css'
import { Header } from '@/components/Header/Header'

const DEFAULT_POLLING_INTERVAL_MS = 15_000

function App() {
  const { statuses, loadStatuses } = useHealthStatus()

  useEffect(() => {
    void loadStatuses()
    const polling = startPolling(loadStatuses, DEFAULT_POLLING_INTERVAL_MS)
    return () => clearInterval(polling)
  }, [loadStatuses])

  const shouldRender = statuses.length > 0

  return (
    <>
      <Header />
      <div className="container">
        <div className="grid-container">
          {shouldRender &&
            statuses.map((status) => (
              <div className="status-card-container" key={status.id}>
                <StatusCard status={status} />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App

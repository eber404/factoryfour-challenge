import { useEffect } from 'react'
import { SyncLoader } from 'react-spinners'

import { StatusCard } from '@/components/StatusCard'
import { useHealthStatus } from '@/contexts/HealthStatusContext'
import { startPolling } from '@/utils/polling'

import { Header } from '@/components/Header/Header'
import { If } from '@/components/If'

import './App.css'

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
        <If.Root condition={shouldRender}>
          <If.Render>
            <div className="grid-container">
              {statuses.map((status) => (
                <div className="status-card-container" key={status.id}>
                  <StatusCard status={status} />
                </div>
              ))}
            </div>
          </If.Render>
          <If.Else>
            <div className="loader-box">
              <SyncLoader color="#244374" size={12} />
            </div>
          </If.Else>
        </If.Root>
      </div>
    </>
  )
}

export default App

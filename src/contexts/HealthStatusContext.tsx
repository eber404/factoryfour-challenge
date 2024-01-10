import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { StatusService } from '@/core/services/health-status-service'
import { HealthStatus } from '@/core/entities/health-status'

type HealthStatusContext = {
  statuses: HealthStatus[]
  loadStatuses: () => void
}

type HealthStatusProps = PropsWithChildren<{
  healthStatusService: StatusService
}>

const resources = [
  'accounts',
  'assets',
  'customers',
  'datapoints',
  'devices',
  'documents',
  'forms',
  'invites',
  'media',
  'messages',
  'namespaces',
  'orders',
  'patients',
  'relationships',
  'rules',
  'templates',
  'users',
  'workflows',
]

const Context = createContext({} as HealthStatusContext)

export function HealthStatusProvider({
  children,
  healthStatusService,
}: HealthStatusProps) {
  const [statuses, setStatuses] = useState([] as HealthStatus[])

  const fetchStatuses = useCallback(async () => {
    const promises = resources.map(
      (resource) => () => healthStatusService.checkStatus(resource)
    )
    const statuses = await Promise.all(
      promises.map(async (promise) => await promise())
    )
    return statuses
  }, [healthStatusService])

  const loadStatuses = useCallback(async () => {
    const statuses = await fetchStatuses()
    setStatuses(statuses)
  }, [fetchStatuses])

  return (
    <Context.Provider value={{ statuses, loadStatuses }}>
      {children}
    </Context.Provider>
  )
}

export const useHealthStatus = () => useContext(Context)

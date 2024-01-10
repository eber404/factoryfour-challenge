import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  StatusOutput as Status,
  StatusService,
} from '@/core/services/health-status-service'

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

type ApiStatusContext = {
  statuses: Status[]
}

type ApiStatusProps = PropsWithChildren<{
  healthStatusService: StatusService
}>

const Context = createContext({} as ApiStatusContext)

const DEFAULT_POLLING_INTERVAL_MS = 15000

const startPolling = (callback: () => void | Promise<void>, interval: number) =>
  setInterval(callback, interval)

export function HealthStatusProvider({
  children,
  healthStatusService,
}: ApiStatusProps) {
  const [statuses, setStatuses] = useState([] as Status[])

  const updateStatuses = useCallback(
    (oldStatuses: Status[], newStatuses: Status[]) =>
      oldStatuses.map(
        (oldStatus) =>
          newStatuses.find(
            (newStatus) => newStatus.resource === oldStatus.resource
          ) || oldStatus
      ),
    []
  )

  const fetchStatuses = useCallback(async () => {
    const promises = resources.map(
      (resource) => () => healthStatusService.checkStatus(resource)
    )
    const newStatuses = await Promise.all(
      promises.map(async (promise) => await promise())
    )
    return newStatuses
  }, [healthStatusService])

  const loadStatuses = useCallback(async () => {
    const statuses = await fetchStatuses()
    setStatuses(statuses)
  }, [fetchStatuses])

  useEffect(() => {
    void loadStatuses()
    startPolling(loadStatuses, DEFAULT_POLLING_INTERVAL_MS)
  }, [fetchStatuses, loadStatuses, updateStatuses])

  return <Context.Provider value={{ statuses }}>{children}</Context.Provider>
}

export const useHealthStatus = () => useContext(Context)

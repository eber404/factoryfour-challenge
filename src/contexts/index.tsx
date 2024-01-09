import { PropsWithChildren } from 'react'
import { HealthStatusProvider } from './HealthStatusContext'
import { FactoryFourHealthStatusService } from '../services/impl/factoryfour-health-status-service'

const healthStatusService = new FactoryFourHealthStatusService()

export function Contexts({ children }: PropsWithChildren) {
  return (
    <HealthStatusProvider healthStatusService={healthStatusService}>
      {children}
    </HealthStatusProvider>
  )
}

import axios from 'axios'
import { PropsWithChildren } from 'react'

import { FactoryFourHealthStatusService } from '@/core/services/impl/factoryfour-health-status-service'

import { HealthStatusProvider } from './HealthStatusContext'

const httpClient = axios.create({
  baseURL: 'https://api.factoryfour.com',
  withCredentials: false,
})

const healthStatusService = new FactoryFourHealthStatusService(httpClient)

export function Contexts({ children }: PropsWithChildren) {
  return (
    <HealthStatusProvider healthStatusService={healthStatusService}>
      {children}
    </HealthStatusProvider>
  )
}

import axios from 'axios'
import { PropsWithChildren } from 'react'

import { FactoryFourHealthStatusService } from '@/core/services/impl/factoryfour-health-status-service'

import { HealthStatusProvider } from './HealthStatusContext'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://thingproxy.freeboard.io/fetch/https://api.factoryfour.com'
    : 'https://api.factoryfour.com'

const httpClient = axios.create({
  baseURL,
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

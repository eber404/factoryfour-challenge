import { HealthStatus } from '@/core/entities/health-status'

export type HealthStatusDTO = {
  success: boolean
  message: string
  hostname: string
  time: number
}

export interface StatusService {
  checkStatus(hostname: string): Promise<HealthStatus>
}

import { AxiosInstance } from 'axios'

import {
  HealthStatusDTO,
  StatusService,
} from '@/core/services/health-status-service'
import { HealthStatus } from '@/core/entities/health-status'

export class FactoryFourHealthStatusService implements StatusService {
  constructor(private readonly client: AxiosInstance) {}

  async checkStatus(hostname: string): Promise<HealthStatus> {
    try {
      const res = await this.client.get<HealthStatusDTO>(
        `/${hostname}/health/status`
      )

      return new HealthStatus({
        ...res.data,
        time: new Date(res.data.time),
        isHealthy: res.data.success,
        resource: hostname,
        statusCode: res.status,
        statusText: res.statusText,
      })
    } catch (error: any) {
      console.log(error)
      return new HealthStatus({
        resource: hostname,
        message: 'OUTAGE',
        isHealthy: false,
        time: new Date(),
        statusCode: error.response?.status,
        statusText: error.response?.statusText,
      })
    }
  }
}

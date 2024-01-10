import { AxiosInstance } from 'axios'

import {
  StatusOutput,
  StatusService,
} from '@/core/services/health-status-service'

export class FactoryFourHealthStatusService implements StatusService {
  constructor(private readonly client: AxiosInstance) {}

  async checkStatus(hostname: string): Promise<StatusOutput> {
    try {
      const res = await this.client.get<StatusOutput>(
        `/${hostname}/health/status`
      )

      return {
        ...res.data,
        resource: hostname,
        statusCode: res.status,
        status: res.statusText,
      }
    } catch (error: any) {
      return {
        resource: hostname,
        hostname,
        message: 'OUTAGE',
        success: false,
        time: Date.now(),
        statusCode: error.request.status,
        status: error.request.statusText,
      }
    }
  }
}

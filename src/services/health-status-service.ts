export type StatusOutput = {
  resource: string
  success: boolean
  message: string
  hostname: string
  time: number
  statusCode?: number
  status?: string
}

export interface StatusService {
  checkStatus(hostname: string): Promise<StatusOutput>
}

type HealthStatusInput = {
  id?: string
  resource: string
  isHealthy: boolean
  message: string
  time: Date
  hostname?: string
  statusCode?: number
  statusText?: string
}

export class HealthStatus {
  public readonly id: string
  public readonly resource: string
  public readonly isHealthy: boolean
  public readonly message: string
  public readonly time: string
  public readonly hostname?: string
  public readonly statusCode?: number
  public readonly statusText?: string

  constructor({
    id,
    isHealthy,
    message,
    resource,
    time,
    hostname,
    statusCode,
    statusText,
  }: HealthStatusInput) {
    this.id = id ?? window.crypto.randomUUID()
    this.resource = resource
    this.isHealthy = isHealthy
    this.message = this.handleMessage(message)
    this.hostname = hostname
    this.time = time.toLocaleTimeString()
    this.statusCode = this.handleStatusCode(statusCode)
    this.statusText = this.handleStatusText(statusText)
  }

  private handleMessage(message: string) {
    return message.split(':')[0].trim()
  }

  private handleStatusCode(statusCode?: number) {
    if (statusCode === 503 || !statusCode) return 403
    return statusCode
  }

  private handleStatusText(statusText?: string) {
    if (!statusText || statusText.length === 0) return 'Forbidden'
    return statusText
  }
}

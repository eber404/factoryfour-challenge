type HealthStatusInput = {
  resource: string
  isHealthy: boolean
  message: string
  time: Date
  hostname?: string
  statusCode?: number
  statusText?: string
}

export class HealthStatus {
  public readonly resource: string
  public readonly isHealthy: boolean
  public readonly message: string
  public readonly time: string
  public readonly hostname?: string
  public readonly statusCode?: number
  public readonly statusText?: string

  constructor({
    isHealthy,
    message,
    resource,
    time,
    hostname,
    statusCode,
    statusText,
  }: HealthStatusInput) {
    this.resource = resource
    this.isHealthy = isHealthy
    this.message = this.transformMessage(message)
    this.hostname = hostname ? this.transformHostname(hostname) : undefined
    this.time = time.toLocaleTimeString()
    this.statusCode = statusCode
    this.statusText = statusText
  }

  private transformMessage(message: string) {
    return message.split(':')[0].trim()
  }

  private transformHostname(hostname: string) {
    return hostname.split('-')[0]
  }
}

export class HealthStatus {
  public readonly resource!: string
  public readonly success!: boolean
  public readonly message!: string
  public readonly hostname!: string
  public readonly time!: number
  public readonly statusCode?: number
  public readonly status?: string

  constructor(props: HealthStatus) {
    Object.assign(this, props)
  }
}

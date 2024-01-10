import cn from 'classnames'

import styles from './StatusCard.module.css'

interface Props {
  status: {
    resource: string
    isHealthy: boolean
    message: string
    time: string
    hostname?: string
    statusCode?: number
    statusText?: string
  }
}

export function StatusCard({ status }: Props) {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles['header'])}>
        <p className={styles.title}>{status.resource}</p>
        <div
          className={cn(styles['status-dot'], {
            [styles['status-dot--online']]: status.isHealthy,
            [styles['status-dot--offline']]: !status.isHealthy,
          })}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.description}>{status.message}</p>
        <pre>
          {status.hostname || `${status.statusCode} - ${status.statusText}`}
        </pre>
        <span className={styles.time}>{status.time}</span>
      </div>
    </div>
  )
}

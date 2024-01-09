import cn from 'classnames'

import styles from './StatusCard.module.css'

interface Props {
  status: {
    success: boolean
    message: string
    hostname: string
    time: number
  }
}

export function StatusCard({ status }: Props) {
  const description = status.message.split(' ')[0]
  const title = status.hostname.split('-')[0]

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles['header'])}>
        <p className={styles.title}>{title}</p>
        <div
          className={cn(styles['status-dot'], {
            [styles['status-dot--online']]: status.success,
            [styles['status-dot--offline']]: !status.success,
          })}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.description}>{description}</p>
        <pre>{status.hostname}</pre>
        <span className={styles.time}>
          {new Date(status.time).toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}

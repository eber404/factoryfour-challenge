import cn from 'classnames'

import styles from './Header.module.css'

export function Header() {
  return (
    <div className={styles.header}>
      <div className={cn(styles['header-wapper'])}>
        <h1 className={styles.title}>API Health Checker</h1>
      </div>
    </div>
  )
}

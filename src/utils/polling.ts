export const startPolling = (
  callback: () => void | Promise<void>,
  interval: number
) => setInterval(callback, interval)

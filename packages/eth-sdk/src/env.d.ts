export {}

declare  global {
  interface Window {
    ethereum?: {
      isMetaMask?: true
      isImToken?: true
      request?: (...args: any[]) => boolean
      on?: (...args: any[]) => void
      removeListener?: (...args: any[]) => void
      autoRefreshOnNetworkChange?: boolean
    }
  }
}

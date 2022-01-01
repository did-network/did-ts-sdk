declare global {
  interface Window {
    gtag?: (key: string, action: string, config: IGaConfig) => void
  }
}

export interface IGaConfig {
  page_path?: string
  event_category?: string
  event_label?: string
  value?: number
}

export const sendGaEvent = (eventName: string, eventParams: IGaConfig = {}) => {
  try {
    window.gtag?.('event', eventName, eventParams)
  } catch (e) {
    console.error(e)
  }
}

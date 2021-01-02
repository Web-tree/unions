declare module 'awesome-notifications' {
  class AWN {
    tip(message?: string, options?: Options): any
    info(message?: string, options?: Options): any
    success(message?: string, options?: Options): any
    warning(message?: string, options?: Options): any
    alert(message?: string, options?: Options): any
  }

  export interface Options {
    position?: string
    maxNotifications?: number
    animationDuration?: number
    durations?: {
      global?: number
      tip?: number
      info?: number
      success?: number
      warning?: number
      alert?: number
    }
    labels?: {
      tip?: string
      info?: string
      success?: string
      warning?: string
      alert?: string
      async?: string
      confirm?: string
      confirmOk?: string
      confirmCancel?: string
    }
    icons?: {
      enabled?: boolean
      prefix?: string
      suffix?: string
      tip?: string
      info?: string
      success?: string
      warning?: string
      alert?: string
      async?: string
      confirm?: string
    }
    replacements?: {
      general?: object
      tip?: object
      info?: object
      success?: object
      warning?: object
      alert?: object
      async?: object
      modal?: object
      confirm?: object
      asyncBlock?: object
    }
  }

  export default AWN;
}

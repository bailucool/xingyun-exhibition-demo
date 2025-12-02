/**
 * 魔珐星云SDK配置文件
 * 包含SDK初始化所需的所有配置项和事件回调
 */

export const XINGYUN_CONFIG = {
  // 基础配置
  containerId: '#avatar-container',
  appId: import.meta.env.VITE_XINGYUN_APP_ID || '',
  appSecret: import.meta.env.VITE_XINGYUN_APP_SECRET || '',
  gatewayServer: 'https://nebula-agent.xingyun3d.com/user/v1/ttsa/session',
  
  // 事件监听配置
  onMessage: (message: string) => {
    console.log('SDK Message:', message)
  },
  
  onNetworkInfo: (networkInfo: any) => {
    console.log('Network Info:', networkInfo)
  },
  
  onStateChange: (state: string) => {
    console.log('SDK State Change:', state)
  },
  
  onStatusChange: (status: string) => {
    console.log('SDK Status Change:', status)
  },
  
  onStateRenderChange: (state: string, duration: number) => {
    console.log('SDK State Render Change:', state, duration)
  },
  
  onVoiceStateChange: (status: string) => {
    console.log('SDK Voice Status:', status)
  },
  
  // Widget事件处理
  onWidgetEvent: (data: any) => {
    console.log('Widget Event:', data)
  },
  
  // 代理Widget（如需要轮播图、视频等功能）
  proxyWidget: {
    widget_slideshow: (data: any) => {
      console.log('Slideshow Widget:', data)
    },
    widget_video: (data: any) => {
      console.log('Video Widget:', data)
    }
  },
  
  // 日志配置
  enableLogger: import.meta.env.DEV  // 开发环境开启，生产环境关闭
}

// 环境变量类型声明
declare global {
  interface ImportMetaEnv {
    readonly VITE_XINGYUN_APP_ID: string
    readonly VITE_XINGYUN_APP_SECRET: string
    readonly VITE_SENTRY_DSN?: string
    readonly VITE_TONGYI_API_KEY?: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}

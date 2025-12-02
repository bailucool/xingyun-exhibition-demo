/**
 * 监控服务
 * 负责错误监控、性能追踪、用户行为分析
 */

import * as Sentry from '@sentry/vue'
import { App } from 'vue'

export class MonitoringService {
  private static instance: MonitoringService
  private performanceMetrics: Map<string, number[]> = new Map()
  
  private constructor() {}
  
  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService()
    }
    return MonitoringService.instance
  }
  
  /**
   * 初始化Sentry
   */
  initSentry(app: App) {
    const dsn = import.meta.env.VITE_SENTRY_DSN
    if (!dsn) {
      console.warn('Sentry DSN未配置，跳过初始化')
      return
    }
    
    Sentry.init({
      app,
      dsn,
      integrations: [
        new Sentry.BrowserTracing({
          tracingOrigins: ['localhost', 'xingyun3d.com', /^\//],
        }),
        new Sentry.Replay({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.MODE,
    })
  }
  
  /**
   * 监控数字人事件
   */
  monitorAvatarEvents(avatarInstance: any) {
    // 加载开始
    avatarInstance.on('loadStart', () => {
      this.recordMetric('avatar_load_start', Date.now())
    })
    
    // 加载完成
    avatarInstance.on('loadComplete', () => {
      const startTime = this.getMetric('avatar_load_start')
      if (startTime) {
        const loadTime = Date.now() - startTime[0]
        this.recordMetric('avatar_load_time', loadTime)
        
        // 上报性能数据
        Sentry.addBreadcrumb({
          category: 'performance',
          message: `数字人加载耗时: ${loadTime}ms`,
          level: 'info',
        })
      }
    })
    
    // 加载失败
    avatarInstance.on('error', (error: Error) => {
      console.error('数字人错误:', error)
      
      Sentry.captureException(error, {
        tags: {
          component: 'avatar',
          action: 'load',
        },
        contexts: {
          avatar: {
            config: avatarInstance.getConfig(),
            state: avatarInstance.getState(),
          },
        },
      })
    })
    
    // 语音合成
    avatarInstance.on('speechStart', (text: string) => {
      this.recordMetric('speech_start', Date.now())
      
      Sentry.addBreadcrumb({
        category: 'interaction',
        message: `开始播报: ${text.substring(0, 50)}...`,
        level: 'info',
      })
    })
    
    // 用户交互
    avatarInstance.on('userInteraction', (action: string) => {
      this.recordMetric('user_interaction', Date.now())
      
      // 统计用户行为
      this.trackUserAction(action)
    })
  }
  
  /**
   * 记录性能指标
   */
  recordMetric(name: string, value: number) {
    if (!this.performanceMetrics.has(name)) {
      this.performanceMetrics.set(name, [])
    }
    this.performanceMetrics.get(name)!.push(value)
  }
  
  /**
   * 获取性能指标
   */
  getMetric(name: string): number[] | undefined {
    return this.performanceMetrics.get(name)
  }
  
  /**
   * 统计用户行为
   */
  trackUserAction(action: string) {
    // 可以接入Google Analytics或其他分析工具
    if ((window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: 'avatar_interaction',
        event_label: action,
      })
    }
  }
  
  /**
   * 生成性能报告
   */
  generatePerformanceReport() {
    const report: Record<string, any> = {}
    
    this.performanceMetrics.forEach((values, name) => {
      const avg = values.reduce((a, b) => a + b, 0) / values.length
      const min = Math.min(...values)
      const max = Math.max(...values)
      
      report[name] = {
        average: avg.toFixed(2),
        min: min.toFixed(2),
        max: max.toFixed(2),
        count: values.length,
      }
    })
    
    return report
  }
  
  /**
   * 上报自定义事件
   */
  trackCustomEvent(eventName: string, data?: Record<string, any>) {
    Sentry.addBreadcrumb({
      category: 'custom',
      message: eventName,
      level: 'info',
      data,
    })
  }
}

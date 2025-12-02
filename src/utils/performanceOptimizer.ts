/**
 * 性能优化工具类
 * 负责设备检测、配置推荐、资源预加载等
 */

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  gpuTier: 'high' | 'medium' | 'low'
  memory: number
  cores: number
  connection: string
}

export interface OptimalConfig {
  quality: 'low' | 'medium' | 'high'
  maxFPS: number
  enableShadow: boolean
  textureResolution: number
  renderScale: number
  enableCache: boolean
  preloadAssets: boolean
}

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer
  private deviceInfo: DeviceInfo
  
  private constructor() {
    this.deviceInfo = this.detectDevice()
  }
  
  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer()
    }
    return PerformanceOptimizer.instance
  }
  
  /**
   * 检测设备信息
   */
  detectDevice(): DeviceInfo {
    const ua = navigator.userAgent
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    
    let gpuTier: 'high' | 'medium' | 'low' = 'medium'
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        
        // 高端GPU
        if (/NVIDIA|AMD|Intel Iris|Apple M[0-9]|Apple GPU/.test(renderer)) {
          gpuTier = 'high'
        }
        // 低端GPU
        else if (/Mali-[4-5]|Adreno [3-5]|PowerVR/.test(renderer)) {
          gpuTier = 'low'
        }
      }
    }
    
    return {
      isMobile: /iPhone|iPad|Android/i.test(ua),
      isTablet: /iPad|Android.*Tablet/i.test(ua),
      gpuTier,
      memory: (navigator as any).deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      connection: this.getConnectionType()
    }
  }
  
  /**
   * 获取网络类型
   */
  getConnectionType(): string {
    const conn = (navigator as any).connection || 
                 (navigator as any).mozConnection || 
                 (navigator as any).webkitConnection
    return conn?.effectiveType || '4g'
  }
  
  /**
   * 获取推荐配置
   */
  getRecommendedConfig(): OptimalConfig {
    const { isMobile, gpuTier, memory, connection } = this.deviceInfo
    
    let quality: 'low' | 'medium' | 'high' = 'high'
    let maxFPS = 60
    let enableShadow = true
    let textureResolution = 1024
    
    // 移动设备降级
    if (isMobile) {
      quality = 'medium'
      maxFPS = 45
      enableShadow = false
      textureResolution = 512
    }
    
    // GPU性能调整
    if (gpuTier === 'low') {
      quality = 'low'
      maxFPS = 30
      enableShadow = false
      textureResolution = 256
    } else if (gpuTier === 'high') {
      quality = 'high'
      maxFPS = 60
      enableShadow = true
      textureResolution = 1024
    }
    
    // 内存限制
    if (memory < 4) {
      quality = 'low'
      textureResolution = Math.min(textureResolution, 512)
    }
    
    // 网络限制
    if (connection === '2g' || connection === 'slow-2g') {
      quality = 'low'
    }
    
    return {
      quality,
      maxFPS,
      enableShadow,
      textureResolution,
      renderScale: isMobile ? 0.8 : 1.0,
      enableCache: true,
      preloadAssets: connection !== '2g'
    }
  }
  
  /**
   * 监控性能
   */
  monitorPerformance(callback?: (fps: number) => void) {
    let frameCount = 0
    let lastTime = performance.now()
    let fps = 60
    
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime
        
        if (callback) {
          callback(fps)
        }
        
        // FPS过低时发出警告
        if (fps < 30) {
          console.warn(`FPS过低: ${fps}，建议降低画质`)
          this.suggestDowngrade()
        }
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    requestAnimationFrame(measureFPS)
    
    return () => fps
  }
  
  /**
   * 建议降级
   */
  suggestDowngrade() {
    const event = new CustomEvent('performance-downgrade', {
      detail: {
        currentConfig: this.getRecommendedConfig(),
        suggestion: '建议降低画质以提升流畅度'
      }
    })
    window.dispatchEvent(event)
  }
  
  /**
   * 获取设备信息
   */
  getDeviceInfo(): DeviceInfo {
    return this.deviceInfo
  }
}

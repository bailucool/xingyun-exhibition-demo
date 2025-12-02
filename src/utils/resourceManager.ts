/**
 * 资源管理器
 * 负责资源清理、内存管理、定时清理
 */

export class ResourceManager {
  private avatarInstance: any
  private cleanupTimer: number | null = null
  private memoryThreshold = 500 // MB
  
  constructor(instance: any) {
    this.avatarInstance = instance
    this.startMonitoring()
  }
  
  /**
   * 启动内存监控
   */
  startMonitoring() {
    this.cleanupTimer = window.setInterval(() => {
      this.checkMemoryUsage()
    }, 5 * 60 * 1000) // 每5分钟检查一次
  }
  
  /**
   * 检查内存使用
   */
  async checkMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      const usedMB = memory.usedJSHeapSize / 1024 / 1024
      
      console.log(`当前内存使用: ${usedMB.toFixed(2)}MB`)
      
      if (usedMB > this.memoryThreshold) {
        console.warn('内存使用过高，执行清理...')
        await this.cleanup()
      }
    }
  }
  
  /**
   * 清理资源
   */
  async cleanup() {
    try {
      // 清理缓存的动作数据
      if (this.avatarInstance && this.avatarInstance.clearAnimationCache) {
        await this.avatarInstance.clearAnimationCache()
      }
      
      // 清理未使用的纹理
      if (this.avatarInstance && this.avatarInstance.clearUnusedTextures) {
        await this.avatarInstance.clearUnusedTextures()
      }
      
      // 强制垃圾回收（仅在开发环境）
      if ((window as any).gc && import.meta.env.DEV) {
        (window as any).gc()
      }
      
      console.log('资源清理完成')
    } catch (error) {
      console.error('资源清理失败:', error)
    }
  }
  
  /**
   * 停止监控
   */
  stopMonitoring() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer)
      this.cleanupTimer = null
    }
  }
  
  /**
   * 销毁管理器
   */
  destroy() {
    this.stopMonitoring()
    this.cleanup()
  }
}

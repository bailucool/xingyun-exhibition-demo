/**
 * 错误处理工具类
 * 负责统一的错误处理和用户提示
 */

export class AvatarErrorHandler {
  private retryCount = 0
  private maxRetries = 3
  private retryDelay = 2000
  
  /**
   * 处理错误
   */
  async handleError(error: Error, context: string): Promise<void> {
    console.error(`[${context}] 错误:`, error)
    
    // 根据错误类型采取不同策略
    if (error.message.includes('network')) {
      await this.handleNetworkError(error)
    } else if (error.message.includes('timeout')) {
      await this.handleTimeoutError(error)
    } else if (error.message.includes('resource')) {
      await this.handleResourceError(error)
    } else {
      await this.handleUnknownError(error)
    }
  }
  
  /**
   * 处理网络错误
   */
  private async handleNetworkError(error: Error) {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      console.log(`网络错误，${this.retryDelay}ms后重试 (${this.retryCount}/${this.maxRetries})`)
      
      await this.delay(this.retryDelay)
      // 触发重新加载
      window.location.reload()
    } else {
      this.showErrorMessage('网络连接失败，请检查网络设置')
    }
  }
  
  /**
   * 处理超时错误
   */
  private async handleTimeoutError(error: Error) {
    this.showErrorMessage('加载超时，请刷新页面重试')
  }
  
  /**
   * 处理资源错误
   */
  private async handleResourceError(error: Error) {
    this.showErrorMessage('资源加载失败，请联系技术支持')
  }
  
  /**
   * 处理未知错误
   */
  private async handleUnknownError(error: Error) {
    this.showErrorMessage('系统错误，请刷新页面')
  }
  
  /**
   * 显示错误消息
   */
  private showErrorMessage(message: string) {
    // 显示用户友好的错误提示
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error-toast'
    errorDiv.textContent = message
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #f44336;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 16px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `
    
    document.body.appendChild(errorDiv)
    
    setTimeout(() => {
      errorDiv.remove()
    }, 5000)
  }
  
  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  /**
   * 重置重试计数
   */
  resetRetryCount() {
    this.retryCount = 0
  }
}

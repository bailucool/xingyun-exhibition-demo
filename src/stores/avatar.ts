/**
 * 数字人状态管理
 * 使用Pinia管理数字人的状态和交互逻辑
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAvatarStore = defineStore('avatar', () => {
  // 状态
  const instance = ref<any>(null)
  const isLoading = ref(false)
  const isReady = ref(false)
  const currentAction = ref<string>('')
  const isSpeaking = ref(false)
  const loadProgress = ref(0)
  
  // 计算属性
  const canInteract = computed(() => isReady.value && !isSpeaking.value)
  
  /**
   * 初始化数字人
   * @param config SDK配置对象
   */
  async function initialize(config: any) {
    isLoading.value = true
    
    try {
      // 注意：这里使用的是示例代码，实际需要根据魔珐星云SDK的真实API调整
      // 由于SDK可能通过script标签引入，这里使用window对象访问
      const XingyunSDK = (window as any).XmovAvatar
      
      if (!XingyunSDK) {
        throw new Error('魔珐星云SDK未加载，请检查script标签')
      }
      
      instance.value = new XingyunSDK({
        ...config,
        onProgress: (progress: number) => {
          loadProgress.value = progress
        },
        onReady: () => {
          isReady.value = true
          isLoading.value = false
          console.log('数字人初始化完成')
        },
        onError: (error: Error) => {
          console.error('数字人初始化失败:', error)
          isLoading.value = false
          throw error
        }
      })
      
      await instance.value.init()
    } catch (error) {
      console.error('初始化异常:', error)
      isLoading.value = false
      throw error
    }
  }
  
  /**
   * 播报文本
   * @param text 要播报的文本
   * @param options 播报选项
   */
  async function speak(text: string, options?: any) {
    if (!canInteract.value) {
      console.warn('数字人未就绪或正在播报')
      return
    }
    
    isSpeaking.value = true
    
    try {
      await instance.value.speak(text, {
        voice: 'female-01',
        speed: 1.0,
        emotion: 'friendly',
        ...options
      })
    } finally {
      isSpeaking.value = false
    }
  }
  
  /**
   * 播放动作
   * @param action 动作名称
   * @param duration 持续时间（毫秒）
   */
  async function playAction(action: string, duration?: number) {
    if (!isReady.value) return
    
    currentAction.value = action
    await instance.value.playAnimation(action, duration)
    currentAction.value = ''
  }
  
  /**
   * 停止播报
   */
  function stopSpeaking() {
    if (instance.value && isSpeaking.value) {
      instance.value.stopSpeaking()
      isSpeaking.value = false
    }
  }
  
  /**
   * 销毁实例
   */
  function destroy() {
    if (instance.value) {
      instance.value.destroy()
      instance.value = null
      isReady.value = false
    }
  }
  
  return {
    // 状态
    instance,
    isLoading,
    isReady,
    currentAction,
    isSpeaking,
    loadProgress,
    canInteract,
    
    // 方法
    initialize,
    speak,
    playAction,
    stopSpeaking,
    destroy
  }
})

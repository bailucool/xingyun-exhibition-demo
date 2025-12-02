<template>
  <button 
    class="touch-button"
    :class="{ 'is-active': isActive, 'is-disabled': disabled }"
    :disabled="disabled"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isActive = ref(false)

const handleTouchStart = () => {
  if (props.disabled) return
  isActive.value = true
  
  // 触觉反馈（如果设备支持）
  if ('vibrate' in navigator) {
    navigator.vibrate(10)
  }
}

const handleTouchEnd = () => {
  setTimeout(() => {
    isActive.value = false
  }, 100)
}

const handleClick = () => {
  if (props.disabled) return
  emit('click')
}
</script>

<style scoped>
.touch-button {
  /* 增大点击区域 */
  padding: 12px 24px;
  min-width: 120px;
  min-height: 48px;
  
  /* 视觉设计 */
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  
  /* 动画效果 */
  transition: all 0.2s ease;
  cursor: pointer;
  
  /* 防止文字选中 */
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.touch-button:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
}

.touch-button.is-active {
  transform: scale(0.95);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.touch-button:active:not(.is-disabled) {
  transform: scale(0.95);
}

.touch-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(135deg, #ccc 0%, #999 100%);
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .touch-button {
    padding: 14px 28px;
    min-height: 52px;
    font-size: 18px;
  }
}
</style>

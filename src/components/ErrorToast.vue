<template>
  <div class="error-toast" @click="handleClose">
    <div class="toast-content">
      <div class="toast-icon">⚠️</div>
      <div class="toast-message">{{ message }}</div>
      <button class="toast-close" @click.stop="handleClose">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}

// 5秒后自动关闭
setTimeout(() => {
  handleClose()
}, 5000)
</script>

<style scoped>
.error-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  animation: slideDown 0.3s ease-out;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #ff4d4f;
  min-width: 300px;
  max-width: 500px;
}

.toast-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.toast-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.toast-close:hover {
  background: #f5f5f5;
  color: #666;
}

@keyframes slideDown {
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .error-toast {
    left: 10px;
    right: 10px;
    transform: none;
  }
  
  .toast-content {
    min-width: auto;
    max-width: none;
  }
}
</style>

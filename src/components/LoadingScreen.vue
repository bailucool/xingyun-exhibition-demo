<template>
  <div class="loading-screen">
    <div class="loading-content">
      <!-- Logo或图标 -->
      <div class="loading-icon">
        <div class="spinner"></div>
      </div>
      
      <!-- 加载文字 -->
      <h2 class="loading-title">数字人加载中...</h2>
      
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      
      <!-- 进度百分比 -->
      <p class="progress-text">{{ progress }}%</p>
      
      <!-- 提示文字 -->
      <p class="loading-tip">{{ currentTip }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  progress: number
}>()

const tips = [
  '正在加载数字人模型...',
  '正在初始化渲染引擎...',
  '正在加载动作库...',
  '正在准备语音系统...',
  '即将完成...'
]

const currentTip = ref(tips[0])

watch(() => props.progress, (newProgress) => {
  if (newProgress < 20) {
    currentTip.value = tips[0]
  } else if (newProgress < 40) {
    currentTip.value = tips[1]
  } else if (newProgress < 60) {
    currentTip.value = tips[2]
  } else if (newProgress < 80) {
    currentTip.value = tips[3]
  } else {
    currentTip.value = tips[4]
  }
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-icon {
  margin-bottom: 24px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
}

.progress-bar {
  width: 300px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto 12px;
}

.progress-fill {
  height: 100%;
  background: white;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.loading-tip {
  font-size: 14px;
  opacity: 0.9;
  animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .loading-title {
    font-size: 20px;
  }
  
  .progress-bar {
    width: 250px;
  }
}
</style>

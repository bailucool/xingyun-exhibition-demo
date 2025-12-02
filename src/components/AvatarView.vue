<template>
  <div class="avatar-view">
    <!-- 数字人渲染容器 -->
    <div id="avatar-container" ref="avatarRef"></div>
    
    <!-- 数字人信息显示 -->
    <div class="avatar-info" v-if="showInfo">
      <div class="info-item">
        <span class="label">状态:</span>
        <span class="value">{{ avatarStore.isReady ? '就绪' : '加载中' }}</span>
      </div>
      <div class="info-item" v-if="avatarStore.isSpeaking">
        <span class="label">正在播报</span>
        <div class="speaking-indicator"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAvatarStore } from '../stores/avatar'

const avatarRef = ref<HTMLElement>()
const avatarStore = useAvatarStore()
const showInfo = ref(true)

onMounted(() => {
  // 组件挂载后，数字人容器已准备好
  console.log('AvatarView mounted')
  
  // 5秒后隐藏信息显示
  setTimeout(() => {
    showInfo.value = false
  }, 5000)
})
</script>

<style scoped>
.avatar-view {
  width: 100%;
  height: 100%;
  position: relative;
}

#avatar-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #f0f2f5 0%, #ffffff 100%);
}

.avatar-info {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s ease-out;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.value {
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

.speaking-indicator {
  width: 8px;
  height: 8px;
  background: #52c41a;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

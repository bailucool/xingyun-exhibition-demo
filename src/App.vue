<template>
  <div class="app-container">
    <!-- 加载状态 -->
    <LoadingScreen 
      v-if="avatarStore.isLoading" 
      :progress="avatarStore.loadProgress" 
    />
    
    <!-- 数字人容器 -->
    <AvatarView v-show="avatarStore.isReady" />
    
    <!-- 控制面板 -->
    <ControlPanel v-if="avatarStore.isReady" />
    
    <!-- 错误提示 -->
    <ErrorToast v-if="error" :message="error" @close="error = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAvatarStore } from './stores/avatar'
import { XINGYUN_CONFIG } from './config/xingyun.config'
import AvatarView from './components/AvatarView.vue'
import ControlPanel from './components/ControlPanel.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import ErrorToast from './components/ErrorToast.vue'

const avatarStore = useAvatarStore()
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    await avatarStore.initialize(XINGYUN_CONFIG)
  } catch (err) {
    error.value = '数字人初始化失败，请刷新页面重试'
    console.error(err)
  }
})

onUnmounted(() => {
  avatarStore.destroy()
})
</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f0f2f5 0%, #ffffff 100%);
}
</style>

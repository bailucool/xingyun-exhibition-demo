<template>
  <div class="control-panel">
    <div class="panel-content">
      <!-- 快捷操作按钮 -->
      <div class="quick-actions">
        <TouchButton @click="handleGreeting">
          👋 打招呼
        </TouchButton>
        <TouchButton @click="handleIntroduce">
          📢 展厅介绍
        </TouchButton>
        <TouchButton @click="handleGuide">
          🗺️ 路线指引
        </TouchButton>
        <TouchButton @click="handleStop" :disabled="!avatarStore.isSpeaking">
          ⏹️ 停止
        </TouchButton>
      </div>
      
      <!-- 自定义输入 -->
      <div class="custom-input">
        <input 
          v-model="customText" 
          type="text" 
          placeholder="输入要播报的内容..."
          @keyup.enter="handleCustomSpeak"
        />
        <TouchButton @click="handleCustomSpeak" :disabled="!customText.trim()">
          发送
        </TouchButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAvatarStore } from '../stores/avatar'
import TouchButton from './TouchButton.vue'

const avatarStore = useAvatarStore()
const customText = ref('')

// 预设话术
const GREETINGS = [
  '您好！欢迎来到我们的展厅，我是您的智能导览助手。',
  '很高兴为您服务，请问有什么可以帮助您的吗？'
]

const INTRODUCTION = `
  欢迎来到我们的企业展厅。这里展示了公司的发展历程、核心产品和创新技术。
  展厅分为四个主要区域：企业文化区、产品展示区、技术创新区和未来展望区。
  您可以随时向我提问，我会为您详细介绍。
`

const GUIDE = `
  展厅参观路线建议：首先参观左侧的企业文化区，了解公司发展历程；
  然后前往中央的产品展示区，体验我们的核心产品；
  接着参观右侧的技术创新区，了解最新技术成果；
  最后在未来展望区，感受公司的发展愿景。
`

const handleGreeting = async () => {
  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
  await avatarStore.speak(greeting)
  await avatarStore.playAction('wave', 2000)
}

const handleIntroduce = async () => {
  await avatarStore.speak(INTRODUCTION)
  await avatarStore.playAction('explain', 3000)
}

const handleGuide = async () => {
  await avatarStore.speak(GUIDE)
  await avatarStore.playAction('point-right', 2000)
}

const handleStop = () => {
  avatarStore.stopSpeaking()
}

const handleCustomSpeak = async () => {
  if (!customText.value.trim()) return
  
  await avatarStore.speak(customText.value)
  customText.value = ''
}
</script>

<style scoped>
.control-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  animation: slideUp 0.3s ease-out;
}

.panel-content {
  max-width: 1200px;
  margin: 0 auto;
}

.quick-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.custom-input {
  display: flex;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.custom-input input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.custom-input input:focus {
  border-color: #667eea;
}

.custom-input input::placeholder {
  color: #999;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .control-panel {
    padding: 16px;
  }
  
  .quick-actions {
    gap: 8px;
  }
  
  .custom-input {
    flex-direction: column;
  }
  
  .custom-input input {
    width: 100%;
  }
}
</style>

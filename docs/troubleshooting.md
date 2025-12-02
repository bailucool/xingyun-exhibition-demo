# 常见问题解决方案

本文档收集了开发和使用过程中的常见问题及解决方案。

## 🔧 安装和配置问题

### Q1: npm install 失败

**问题描述：** 安装依赖时报错或速度很慢

**解决方案：**
```bash
# 切换到淘宝镜像
npm config set registry https://registry.npmmirror.com

# 清除缓存后重试
npm cache clean --force
npm install
```

### Q2: TypeScript类型错误

**问题描述：** 编译时出现类型错误

**解决方案：**
```bash
# 重新生成类型声明
npm run build

# 如果问题持续，尝试删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

## 🎭 数字人相关问题

### Q3: 数字人加载失败

**问题描述：** 页面白屏或数字人无法显示

**可能原因和解决方案：**

1. **AppID或AppSecret配置错误**
   ```bash
   # 检查.env.development文件
   VITE_XINGYUN_APP_ID=your_app_id
   VITE_XINGYUN_APP_SECRET=your_app_secret
   ```

2. **域名未在白名单中**
   - 登录魔珐星云控制台
   - 进入应用设置 → 安全配置
   - 添加当前域名到白名单

3. **网络连接问题**
   - 检查浏览器控制台的网络请求
   - 确认能访问魔珐星云API

### Q4: 数字人显示模糊

**问题描述：** 数字人画质不清晰

**解决方案：**
```typescript
// 在配置中提高渲染质量
const config = {
  quality: 'high',
  textureResolution: 1024,
  renderScale: 1.0
}
```

### Q5: 语音播报无声音

**问题描述：** 数字人嘴型动但没有声音

**解决方案：**
1. 检查浏览器是否允许自动播放音频
2. 确认设备音量未静音
3. 尝试用户交互后再播放（浏览器限制）

## 📱 移动端问题

### Q6: 移动端性能卡顿

**问题描述：** 在手机或平板上运行不流畅

**解决方案：**
```typescript
// 系统会自动检测设备性能并降级
// 也可以手动设置
const optimizer = PerformanceOptimizer.getInstance()
const config = optimizer.getRecommendedConfig()
```

### Q7: 触摸交互无响应

**问题描述：** 按钮点击没有反应

**解决方案：**
- 使用TouchButton组件（已优化触摸）
- 增大按钮热区
- 检查是否有其他元素遮挡

## 🌐 网络和部署问题

### Q8: 跨域错误（CORS）

**问题描述：** 控制台显示CORS错误

**解决方案：**
1. 开发环境：在vite.config.ts中配置代理
2. 生产环境：在魔珐星云控制台配置域名白名单

### Q9: 生产环境白屏

**问题描述：** 部署后页面无法访问

**解决方案：**
1. 检查Nginx配置的try_files
2. 确认资源路径正确
3. 查看浏览器控制台错误

### Q10: 资源加载慢

**问题描述：** 首次加载时间过长

**解决方案：**
- 启用CDN加速
- 开启gzip压缩
- 使用资源预加载

## 💻 开发问题

### Q11: 热更新不生效

**问题描述：** 修改代码后页面不自动刷新

**解决方案：**
```bash
# 重启开发服务器
npm run dev

# 清除缓存
rm -rf node_modules/.vite
```

### Q12: 环境变量不生效

**问题描述：** import.meta.env读取不到值

**解决方案：**
1. 确认变量名以VITE_开头
2. 重启开发服务器
3. 检查.env文件是否在项目根目录

## 🐛 运行时错误

### Q13: 内存泄漏

**问题描述：** 长时间运行后内存占用过高

**解决方案：**
- 确保组件卸载时调用destroy()
- 使用ResourceManager定期清理
- 检查是否有未清除的定时器

### Q14: 状态管理错误

**问题描述：** Pinia store状态异常

**解决方案：**
```typescript
// 重置store
const avatarStore = useAvatarStore()
avatarStore.$reset()
```

## 📞 获取帮助

如果以上方案都无法解决问题：

1. **查看完整日志**
   - 打开浏览器开发者工具
   - 查看Console和Network标签
   - 截图错误信息

2. **提交Issue**
   - 访问GitHub仓库
   - 创建新Issue
   - 提供详细的错误信息和复现步骤

3. **联系作者**
   - CSDN博客留言
   - 邮件联系

4. **社区求助**
   - 魔珐星云开发者社区
   - Vue.js中文社区

---

**持续更新中...** 如果你遇到了新问题并找到了解决方案，欢迎提交PR补充本文档！

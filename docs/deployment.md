# 部署指南

本文档介绍如何将项目部署到生产环境。

## 📋 部署前准备

### 1. 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- 服务器或云平台账号

### 2. 获取魔珐星云凭证

1. 访问 [魔珐星云官网](https://xingyun3d.com)
2. 注册并登录开发者中心
3. 创建生产环境应用
4. 获取 AppID 和 AppSecret
5. 配置允许的域名（重要！）

## 🚀 构建生产版本

### 1. 配置环境变量

创建 `.env.production` 文件：

```env
VITE_XINGYUN_APP_ID=your_production_app_id
VITE_XINGYUN_APP_SECRET=your_production_app_secret
VITE_SENTRY_DSN=your_sentry_dsn
```

### 2. 执行构建

```bash
npm run build
```

构建完成后，会在 `dist` 目录生成生产文件。

## 🌐 部署方式

### 方式一：静态网站托管

#### Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

#### Netlify部署

1. 将代码推送到GitHub
2. 在Netlify中连接仓库
3. 配置构建命令：`npm run build`
4. 配置发布目录：`dist`
5. 添加环境变量
6. 点击部署

### 方式二：传统服务器部署

#### 使用Nginx

1. 上传 `dist` 目录到服务器

```bash
scp -r dist/* user@server:/var/www/xingyun-demo
```

2. 配置Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/xingyun-demo;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 启用gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. 重启Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 方式三：Docker部署

1. 创建 `Dockerfile`

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. 构建镜像

```bash
docker build -t xingyun-demo .
```

3. 运行容器

```bash
docker run -d -p 80:80 xingyun-demo
```

## 🔒 安全配置

### 1. HTTPS配置

强烈建议使用HTTPS，可以使用Let's Encrypt免费证书：

```bash
sudo certbot --nginx -d your-domain.com
```

### 2. 环境变量保护

- 不要将 `.env.production` 提交到Git
- 使用CI/CD平台的环境变量功能
- 定期更换密钥

### 3. 域名白名单

在魔珐星云控制台配置允许的域名，防止盗用。

## 📊 性能优化

### 1. CDN加速

将静态资源上传到CDN：

```bash
# 修改vite.config.ts
export default defineConfig({
  base: 'https://cdn.your-domain.com/',
  // ...
})
```

### 2. 资源压缩

确保启用了gzip或brotli压缩。

### 3. 缓存策略

- HTML文件：no-cache
- JS/CSS文件：长期缓存（文件名带hash）
- 图片资源：长期缓存

## 🔍 监控和日志

### 1. 集成Sentry

已在代码中预留Sentry集成，配置DSN即可使用。

### 2. 访问日志

配置Nginx访问日志：

```nginx
access_log /var/log/nginx/xingyun-demo-access.log;
error_log /var/log/nginx/xingyun-demo-error.log;
```

### 3. 性能监控

使用浏览器开发者工具或第三方服务监控性能指标。

## 🐛 故障排查

### 常见问题

1. **白屏问题**
   - 检查控制台错误
   - 确认资源路径正确
   - 检查环境变量配置

2. **数字人加载失败**
   - 确认AppID和AppSecret正确
   - 检查域名是否在白名单中
   - 查看网络请求是否成功

3. **性能问题**
   - 检查服务器带宽
   - 启用CDN加速
   - 优化资源大小

## 📞 技术支持

如遇到部署问题，可以：

1. 查看项目文档
2. 提交GitHub Issue
3. 联系作者获取帮助

---

**祝部署顺利！** 🎉

# 🎨 个人作品集网站

一个现代化的全栈个人作品集网站，支持深色模式、响应式设计和联系表单功能。

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动服务器
```bash
npm start
```

或者使用热重载（开发模式）：
```bash
npm run dev
```

### 3. 访问网站
打开浏览器访问：**http://localhost:3000**

---

## 📁 项目结构

```
portfolio-website/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 前端交互
├── server.js           # Express 后端服务器
├── package.json        # 项目配置
├── .vscode/            # VS Code 配置
│   ├── launch.json     # 调试配置
│   └── extensions.json # 推荐插件
└── README.md           # 说明文档
```

---

## 🔧 VS Code 运行方式

### 方式 1：使用调试（推荐）
1. 按 `F5` 或点击左侧调试图标
2. 选择 **"全栈开发"** 配置
3. 自动启动服务器并打开浏览器

### 方式 2：使用终端
1. 打开终端 (`Ctrl + ``)
2. 运行 `npm start`
3. 在浏览器打开 http://localhost:3000

### 方式 3：使用 Live Server 插件
1. 安装 Live Server 插件
2. 右键 `index.html`
3. 选择 **"Open with Live Server"**

---

## 🌐 API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/contact` | POST | 提交联系表单 |
| `/api/messages` | GET | 获取所有消息 |
| `/api/resume` | GET | 下载简历 |

### 示例：提交联系表单
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '张三',
    email: 'test@example.com',
    message: '你好！'
  })
})
```

---

## 🎨 功能特性

- ✅ 响应式设计（支持手机/平板/电脑）
- ✅ 深色/浅色主题切换
- ✅ 平滑滚动导航
- ✅ 技能条动画效果
- ✅ 作品集卡片展示
- ✅ 联系表单（后端支持）
- ✅ API 数据持久化（内存）

---

## 🛠️ 技术栈

**前端**
- HTML5
- CSS3（自定义变量、动画）
- JavaScript（ES6+）

**后端**
- Node.js
- Express.js
- CORS
- Nodemailer（可选，用于邮件发送）

---

## 📝 自定义内容

### 修改个人信息
编辑 `index.html`：
- 第 23 行：修改姓名
- 第 24 行：修改职业描述
- 第 32-56 行：修改技能列表
- 第 66-126 行：修改作品集项目

### 修改配色
编辑 `style.css` 第 8-16 行：
```css
:root {
  --primary-color: #4f46e5;  /* 主色调 */
  --primary-hover: #4338ca;  /* 悬停色 */
}
```

---

## 🚀 部署

### 部署到 Vercel
```bash
npm install -g vercel
vercel deploy --prod
```

### 部署到 Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

---

## 📄 许可证

MIT License

---

## 👤 作者

Curry - 全栈开发者

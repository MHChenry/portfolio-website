const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// 存储联系消息（内存存储，重启后清空）
const messages = [];

// API 路由

// 获取所有联系消息
app.get('/api/messages', (req, res) => {
  res.json({ success: true, data: messages });
});

// 提交联系表单
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // 验证必填字段
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: '请填写所有必填字段' 
    });
  }
  
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: '请输入有效的邮箱地址' 
    });
  }
  
  // 保存消息
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };
  
  messages.push(newMessage);
  
  console.log('📩 新消息:', newMessage);
  
  res.json({ 
    success: true, 
    message: '消息已发送成功！',
    data: newMessage
  });
});

// 下载简历（模拟）
app.get('/api/resume', (req, res) => {
  res.json({
    success: true,
    message: '简历下载功能',
    downloadUrl: '/resume.pdf'
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('❌ 服务器错误:', err);
  res.status(500).json({ 
    success: false, 
    error: '服务器内部错误' 
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║           🚀 作品集网站服务器已启动                     ║
╠════════════════════════════════════════════════════════╣
║  本地访问：http://localhost:${PORT}                      ║
║  网络访问：http://${getLocalIP()}:${PORT}                ║
║  API 端点：http://localhost:${PORT}/api/health           ║
║  按 Ctrl+C 停止服务器                                   ║
╚════════════════════════════════════════════════════════╝
  `);
});

// 获取本地 IP
function getLocalIP() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

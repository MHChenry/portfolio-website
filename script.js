// 深色模式切换
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// 检查本地存储的主题偏好
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 移动端菜单切换
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// 滚动时导航栏效果
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// 技能条动画
const skillProgressBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
  threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const width = progressBar.getAttribute('data-width');
      progressBar.style.width = width + '%';
      skillObserver.unobserve(progressBar);
    }
  });
}, observerOptions);

skillProgressBars.forEach(bar => {
  skillObserver.observe(bar);
});

// 联系表单处理
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // 这里可以添加实际的表单提交逻辑
  // 目前只是显示成功消息
  alert(`感谢您的留言，${name}！我会尽快通过 ${email} 与您联系。`);
  
  // 重置表单
  contactForm.reset();
});

// 下载简历按钮
const downloadResume = document.getElementById('downloadResume');

downloadResume.addEventListener('click', function(e) {
  e.preventDefault();
  alert('简历下载功能：您可以将简历 PDF 文件放在同一目录下，然后修改此链接指向该文件。');
  // 实际使用时，可以改为：
  // window.location.href = 'resume.pdf';
});

// 添加页面加载动画
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// 滚动动画 - 元素淡入
const fadeElements = document.querySelectorAll('.portfolio-card, .skill-item');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s, transform 0.5s';
  fadeObserver.observe(el);
});

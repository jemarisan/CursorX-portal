// CursorX 官网交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initDownloadButton();
    initAnimations();
    initAccessibility();
});

// 导航功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    
    // 滚动时导航栏效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景模糊效果
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // 考虑固定导航栏高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 移动端菜单切换
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// 滚动效果
function initScrollEffects() {
    // 创建 Intersection Observer 用于滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .support-card, .hero-content, .hero-visual');
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
    
    // 添加滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 下载按钮功能
function initDownloadButton() {
    const downloadBtn = document.querySelector('.download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadMacOS();
        });
    }
}

// macOS 下载功能
function downloadMacOS() {
    // 检测操作系统
    const userAgent = navigator.userAgent.toLowerCase();
    const isMac = userAgent.indexOf('mac') > -1;
    
    if (isMac) {
        // 如果是 Mac，直接下载
        showDownloadModal();
    } else {
        // 如果不是 Mac，显示提示
        showPlatformNotice();
    }
}

// 显示下载模态框
function showDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>下载 CursorX</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>感谢您选择 CursorX！</p>
                    <p>点击下方按钮开始下载：</p>
                    <div class="download-options">
                        <a href="#" class="download-option" data-arch="universal">
                            <div class="option-icon">🍎</div>
                            <div class="option-info">
                                <div class="option-title">通用版本</div>
                                <div class="option-desc">Apple Silicon + Intel</div>
                            </div>
                        </a>
                        <a href="#" class="download-option" data-arch="apple-silicon">
                            <div class="option-icon">⚡</div>
                            <div class="option-info">
                                <div class="option-title">Apple Silicon</div>
                                <div class="option-desc">M1/M2/M3 芯片优化</div>
                            </div>
                        </a>
                        <a href="#" class="download-option" data-arch="intel">
                            <div class="option-icon">💻</div>
                            <div class="option-info">
                                <div class="option-title">Intel</div>
                                <div class="option-desc">Intel 芯片版本</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 24px 0;
            margin-bottom: 16px;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
            color: #1D1D1F;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #8E8E93;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .modal-close:hover {
            background: #F2F2F7;
            color: #1D1D1F;
        }
        
        .modal-body {
            padding: 0 24px 24px;
        }
        
        .modal-body p {
            margin: 0 0 16px;
            color: #6E6E73;
            line-height: 1.5;
        }
        
        .download-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 20px;
        }
        
        .download-option {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border: 2px solid #E5E5EA;
            border-radius: 12px;
            text-decoration: none;
            color: #1D1D1F;
            transition: all 0.2s ease;
        }
        
        .download-option:hover {
            border-color: #007AFF;
            background: #F8F9FF;
        }
        
        .option-icon {
            font-size: 24px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F2F2F7;
            border-radius: 8px;
        }
        
        .option-title {
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .option-desc {
            font-size: 0.875rem;
            color: #6E6E73;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 关闭模态框
    const closeModal = () => {
        modal.style.animation = 'modalSlideOut 0.2s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 200);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // 下载选项点击事件
    modal.querySelectorAll('.download-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const arch = this.dataset.arch;
            startDownload(arch);
            closeModal();
        });
    });
    
    // 添加关闭动画
    const closeStyle = document.createElement('style');
    closeStyle.textContent = `
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            to {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(closeStyle);
}

// 开始下载
function startDownload(arch) {
    // 这里应该是实际的下载链接
    const downloadUrls = {
        'universal': '#',
        'apple-silicon': '#',
        'intel': '#'
    };
    
    // 模拟下载过程
    showDownloadProgress(arch);
    
    // 实际下载
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = downloadUrls[arch] || '#';
        link.download = `CursorX-${arch}.dmg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 1000);
}

// 显示下载进度
function startDownload(arch) {
    showDownloadProgress(arch);
    
    // 模拟下载过程
    setTimeout(() => {
        // 这里应该调用实际的下载 API
        console.log(`开始下载 ${arch} 版本`);
        showDownloadSuccess();
    }, 2000);
}

// 显示下载进度
function showDownloadProgress(arch) {
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">📥</div>
            <div class="toast-text">
                <div class="toast-title">正在下载 CursorX</div>
                <div class="toast-desc">${arch} 版本</div>
            </div>
            <div class="toast-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .download-toast {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10001;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            border: 1px solid #E5E5EA;
            animation: toastSlideIn 0.3s ease;
            max-width: 300px;
        }
        
        @keyframes toastSlideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .toast-content {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .toast-icon {
            font-size: 20px;
        }
        
        .toast-text {
            flex: 1;
        }
        
        .toast-title {
            font-weight: 600;
            color: #1D1D1F;
            margin-bottom: 2px;
        }
        
        .toast-desc {
            font-size: 0.875rem;
            color: #6E6E73;
        }
        
        .progress-bar {
            width: 100%;
            height: 4px;
            background: #E5E5EA;
            border-radius: 2px;
            overflow: hidden;
            margin-top: 8px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #007AFF, #5856D6);
            border-radius: 2px;
            animation: progressAnimation 2s ease;
        }
        
        @keyframes progressAnimation {
            from { width: 0%; }
            to { width: 100%; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    // 2秒后移除
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 2000);
    
    // 添加滑出动画
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes toastSlideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(slideOutStyle);
}

// 显示下载成功
function showDownloadSuccess() {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">✅</div>
            <div class="toast-text">
                <div class="toast-title">下载完成</div>
                <div class="toast-desc">CursorX 已保存到下载文件夹</div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .success-toast {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10001;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            border: 1px solid #34C759;
            animation: toastSlideIn 0.3s ease;
            max-width: 280px;
        }
        
        .toast-content {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .toast-icon {
            font-size: 20px;
        }
        
        .toast-title {
            font-weight: 600;
            color: #1D1D1F;
            margin-bottom: 2px;
        }
        
        .toast-desc {
            font-size: 0.875rem;
            color: #6E6E73;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// 显示平台提示
function showPlatformNotice() {
    const toast = document.createElement('div');
    toast.className = 'notice-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">💻</div>
            <div class="toast-text">
                <div class="toast-title">CursorX 仅支持 macOS</div>
                <div class="toast-desc">请在 Mac 设备上访问此页面</div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .notice-toast {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10001;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            border: 1px solid #FF9500;
            animation: toastSlideIn 0.3s ease;
            max-width: 280px;
        }
        
        .toast-content {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .toast-icon {
            font-size: 20px;
        }
        
        .toast-title {
            font-weight: 600;
            color: #1D1D1F;
            margin-bottom: 2px;
        }
        
        .toast-desc {
            font-size: 0.875rem;
            color: #6E6E73;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        }, 300);
    }, 4000);
}

// 动画效果
function initAnimations() {
    // 为滚动动画添加 CSS
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-ready.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* 光标闪烁动画增强 */
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .custom-cursor {
            animation: blink 1s infinite;
        }
        
        /* HUD 气泡动画 */
        .hud-bubble {
            animation: hudFloat 3s ease-in-out infinite;
        }
        
        @keyframes hudFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        /* 按钮悬停效果增强 */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .btn:hover::before {
            width: 300px;
            height: 300px;
        }
        
        /* 特性卡片悬停效果 */
        .feature-card {
            position: relative;
            overflow: hidden;
        }
        
        .feature-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s;
        }
        
        .feature-card:hover::after {
            left: 100%;
        }
    `;
    document.head.appendChild(style);
}

// 可访问性增强
function initAccessibility() {
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC 键关闭模态框
        if (e.key === 'Escape') {
            const modal = document.querySelector('.download-modal');
            if (modal) {
                const closeBtn = modal.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
            }
        }
        
        // Enter 和 Space 键激活按钮
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('btn')) {
            e.preventDefault();
            e.target.click();
        }
    });
    
    // 焦点管理
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = document.querySelectorAll(focusableElements);
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    // 减少动画偏好
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-normal', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }
    
    // 高对比度模式支持
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.classList.add('high-contrast');
    }
}

// 性能优化
function optimizePerformance() {
    // 图片懒加载
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 防抖滚动事件
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // 滚动处理逻辑
        }, 16); // 60fps
    });
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 这里可以添加错误报告逻辑
});

// 导出函数供全局使用
window.downloadMacOS = downloadMacOS;


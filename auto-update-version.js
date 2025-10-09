/**
 * 自动从 appcast.xml 读取最新版本信息并更新页面
 * 这样只需要维护 appcast.xml 一个地方
 */

(function() {
    'use strict';
    
    // 配置
    const APPCAST_URL = 'https://raw.githubusercontent.com/jemarisan/CursorX-portal/main/appcast.xml';
    
    /**
     * 从 appcast.xml 获取最新版本信息
     */
    async function getLatestVersion() {
        try {
            // 添加时间戳防止缓存
            const timestamp = Date.now();
            const urlWithCacheBust = `${APPCAST_URL}?t=${timestamp}&v=${Math.random()}`;
            
            const response = await fetch(urlWithCacheBust, {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // 检查解析错误
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('XML 解析错误');
            }
            
            // 获取第一个 item（最新版本）
            const firstItem = xmlDoc.querySelector('item');
            if (!firstItem) {
                throw new Error('未找到版本信息');
            }
            
            // 提取版本信息
            const enclosure = firstItem.querySelector('enclosure');
            const version = enclosure.getAttribute('sparkle:shortVersionString') || 
                          enclosure.getAttribute('sparkle:version');
            const url = enclosure.getAttribute('url');
            const length = parseInt(enclosure.getAttribute('length'), 10);
            
            // 将字节转换为 MB
            const sizeInMB = (length / (1024 * 1024)).toFixed(2);
            
            const versionInfo = {
                version: version,
                url: url,
                size: sizeInMB,
                sizeBytes: length,
                timestamp: timestamp
            };
            
            // 缓存版本信息（5分钟有效期）
            const versionCacheKey = 'cursorx_version_cache';
            const cacheData = {
                data: versionInfo,
                timestamp: timestamp,
                expires: timestamp + (5 * 60 * 1000) // 5分钟后过期
            };
            localStorage.setItem(versionCacheKey, JSON.stringify(cacheData));
            
            return versionInfo;
        } catch (error) {
            console.error('获取版本信息失败:', error);
            
            // 尝试从缓存获取
            const versionCacheKey = 'cursorx_version_cache';
            const cached = localStorage.getItem(versionCacheKey);
            if (cached) {
                try {
                    const cacheData = JSON.parse(cached);
                    if (cacheData.expires > Date.now()) {
                        console.log('📦 使用缓存的版本信息');
                        return cacheData.data;
                    }
                } catch (e) {
                    console.warn('缓存数据损坏');
                }
            }
            
            return null;
        }
    }
    
    /**
     * 格式化文件名
     */
    function getFileName(url) {
        const parts = url.split('/');
        return parts[parts.length - 1];
    }
    
    /**
     * 为 URL 添加缓存破坏参数
     */
    function addCacheBustToUrl(url) {
        if (!url) return url;
        
        const separator = url.includes('?') ? '&' : '?';
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        
        return `${url}${separator}cb=${timestamp}&r=${random}`;
    }
    
    /**
     * 强制刷新页面缓存
     */
    function forceRefreshCache() {
        // 清除所有可能的缓存
        if ('caches' in window) {
            caches.keys().then(function(names) {
                names.forEach(function(name) {
                    caches.delete(name);
                });
            });
        }
        
        // 清除 localStorage 中的版本缓存
        const versionCacheKey = 'cursorx_version_cache';
        localStorage.removeItem(versionCacheKey);
        
        console.log('🔄 已清除所有缓存');
    }
    
    /**
     * 更新页面上的版本信息
     */
    function updateVersionInfo(versionInfo) {
        if (!versionInfo) {
            console.warn('版本信息无效，使用默认值');
            return;
        }
        
        const { version, url, size } = versionInfo;
        const fileName = getFileName(url);
        
        console.log('✅ 获取到最新版本信息:', versionInfo);
        
        // 更新主下载按钮
        const downloadBtn = document.querySelector('.download-btn.macos');
        if (downloadBtn) {
            // 添加缓存破坏参数到下载链接
            const cacheBustUrl = addCacheBustToUrl(url);
            downloadBtn.href = cacheBustUrl;
            downloadBtn.setAttribute('download', fileName);
            
            // 更新版本号显示
            const versionEl = downloadBtn.querySelector('.download-btn-version');
            if (versionEl) {
                versionEl.textContent = `v${version} • ${size} MB`;
            }
            
            console.log('✅ 已更新下载按钮');
        } else {
            console.warn('⚠️ 未找到下载按钮元素');
        }
        
        // 更新 Hero 区域的下载按钮（如果有）
        const heroDownloadBtn = document.querySelector('.hero .btn-primary');
        if (heroDownloadBtn && !heroDownloadBtn.classList.contains('updated')) {
            // 如果 Hero 按钮是直接下载链接，也更新它
            if (heroDownloadBtn.href && heroDownloadBtn.href.includes('.dmg')) {
                const cacheBustUrl = addCacheBustToUrl(url);
                heroDownloadBtn.href = cacheBustUrl;
                heroDownloadBtn.setAttribute('download', fileName);
                heroDownloadBtn.classList.add('updated');
                console.log('✅ 已更新 Hero 下载按钮');
            }
        }
        
        // 在控制台显示完整信息
        console.log(`
╔════════════════════════════════════════════╗
║        📦 CursorX 最新版本信息             ║
╚════════════════════════════════════════════╝

版本号:   v${version}
文件大小: ${size} MB
下载链接: ${url}
文件名:   ${fileName}

✨ 页面已自动更新为最新版本
        `);
    }
    
    /**
     * 初始化
     */
    async function init() {
        // 等待 DOM 加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', async () => {
                const versionInfo = await getLatestVersion();
                updateVersionInfo(versionInfo);
            });
        } else {
            const versionInfo = await getLatestVersion();
            updateVersionInfo(versionInfo);
        }
    }
    
    // 启动
    init();
    
    // 导出到全局，方便调试
    window.CursorXVersion = {
        refresh: async function() {
            forceRefreshCache();
            const versionInfo = await getLatestVersion();
            updateVersionInfo(versionInfo);
            return versionInfo;
        },
        getInfo: getLatestVersion,
        clearCache: forceRefreshCache,
        addCacheBust: addCacheBustToUrl
    };
    
    // 添加键盘快捷键 Ctrl+F5 强制刷新
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'F5') {
            e.preventDefault();
            console.log('🔄 用户强制刷新版本信息');
            window.CursorXVersion.refresh();
        }
    });
    
    // 定期检查版本更新（每5分钟）
    setInterval(async function() {
        console.log('🔄 定期检查版本更新...');
        const versionInfo = await getLatestVersion();
        if (versionInfo) {
            updateVersionInfo(versionInfo);
        }
    }, 5 * 60 * 1000); // 5分钟
    
})();


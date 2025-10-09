/**
 * 自动从 appcast.xml 读取最新版本信息并更新页面
 * 这样只需要维护 appcast.xml 一个地方
 */

(function() {
    'use strict';
    
    // 配置
    const APPCAST_URL = './appcast.xml';
    
    /**
     * 从 appcast.xml 获取最新版本信息
     */
    async function getLatestVersion() {
        try {
            const response = await fetch(APPCAST_URL);
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
            
            return {
                version: version,
                url: url,
                size: sizeInMB,
                sizeBytes: length
            };
        } catch (error) {
            console.error('获取版本信息失败:', error);
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
            downloadBtn.href = url;
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
                heroDownloadBtn.href = url;
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
            const versionInfo = await getLatestVersion();
            updateVersionInfo(versionInfo);
            return versionInfo;
        },
        getInfo: getLatestVersion
    };
    
})();


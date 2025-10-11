/**
 * CursorX 官网配置文件
 * 
 * 注意：此文件中的内容不会影响 SEO，因为所有 SEO 关键信息
 * 都直接写在 HTML 中。此文件仅用于管理动态内容和交互功能。
 * 
 * SEO 友好设计：
 * - 所有 Meta 标签都在 HTML 中静态定义
 * - 结构化数据独立于配置文件
 * - 配置文件仅用于下载链接、统计数据等非 SEO 关键信息
 */

const CONFIG = {
    // 基本信息
    app: {
        name: 'CursorX',
        version: 'v1.2.4',
        description: '让你工作更舒服的温柔贴心光标小工具',
        tagline: '像不存在一样完美的光标伴侣',
        logo: {
            jpg: 'static/logo.jpg',
            svg: 'static/logo.svg'
        }
    },
    
    // 开发者信息
    developer: {
        name: 'CursorX Team',
        email: '15019280942@163.com',
        github: 'https://github.com/jemarisan/CursorX-portal',
        wechat: '添加微信反馈',
        twitter: 'https://twitter.com/cursorx_app'
    },
    
    // 下载信息
    download: {
        fileSize: '2.4M',
        systemRequirements: 'macOS 12.0 或更高版本 • 支持 Apple Silicon 和 Intel 芯片',
        downloadUrls: {
            universal: 'https://raw.githubusercontent.com/jemarisan/CursorX-portal/main/downloads/CursorX-v1.2.4.dmg',
            'apple-silicon': 'https://raw.githubusercontent.com/jemarisan/CursorX-portal/main/downloads/CursorX-v1.2.4.dmg',
            intel: 'https://raw.githubusercontent.com/jemarisan/CursorX-portal/main/downloads/CursorX-v1.2.4.dmg'
        }
    },
    
    // 统计数据
    stats: {
        downloads: '10K+',
        rating: '4.9',
        satisfaction: '99%'
    },
    
    // 联系信息
    support: {
        guide: '#',
        contact: '15019280942@163.com',
        community: 'https://github.com/jemarisan/CursorX-portal',
        wechat: '添加微信反馈',
        githubIssues: 'https://github.com/jemarisan/CursorX-portal/issues'
    },
    
    // 社交媒体
    social: {
        twitter: 'https://twitter.com/cursorx_app',
        github: 'https://github.com/jemarisan/CursorX-portal'
    },
    
    // 网站信息
    site: {
        url: 'https://cursorx.app',
        title: 'CursorX - 让你工作更舒服的温柔贴心光标小工具',
        description: 'CursorX 是一个温柔的 macOS 光标小工具，默默跟随你的输入节奏，在需要时提供贴心提示，让工作更轻松。',
        keywords: 'CursorX,macOS,光标,文本插入点,输入法,HUD,苹果,温柔,贴心,办公工具'
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

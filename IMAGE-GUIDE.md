# CursorX 官网图片替换指南

## 🖼️ 当前使用的占位图片

### **1. Logo 图标**
- **位置**: 导航栏和页脚
- **当前图片**: [Unsplash - 简洁的几何图形](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=32&h=32&fit=crop&crop=center)
- **尺寸**: 32x32px (导航栏), 24x24px (页脚)
- **建议**: 替换为 CursorX 的官方 Logo

### **2. Hero 演示图**
- **位置**: 首页主要展示区域
- **当前图片**: [Unsplash - MacBook 工作环境](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&crop=center)
- **尺寸**: 600x400px
- **建议**: 替换为 CursorX 实际运行截图，展示光标跟随和 HUD 功能

### **3. 功能特性图标**

#### **像素级温柔跟随**
- **当前图片**: [Unsplash - 精确测量工具](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=48&h=48&fit=crop&crop=center)
- **建议**: 替换为光标跟随的动画 GIF 或截图

#### **三种风格，随心切换**
- **当前图片**: [Unsplash - 多彩设计元素](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=48&h=48&fit=crop&crop=center)
- **建议**: 替换为三种风格对比图

#### **恰到好处的信息**
- **当前图片**: [Unsplash - 信息展示界面](https://images.unsplash.com/photo-1551434678-e076c223a692?w=48&h=48&fit=crop&crop=center)
- **建议**: 替换为 HUD 显示效果图

#### **和谐舒服的样式**
- **当前图片**: [Unsplash - 液态玻璃效果](https://images.unsplash.com/photo-1557683316-973673baf926?w=48&h=48&fit=crop&crop=center)
- **建议**: 替换为液态玻璃风格展示图

#### **超低资源消耗**
- **当前图片**: [Unsplash - 数据分析图表](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=48&h=48&fit=crop&crop=center)
- **建议**: 替换为系统资源监控截图

#### **隐形替代技术**
- **当前图片**: [Unsplash - 隐形技术概念](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=48&h=48&fit=crop&crop=center)
- **建议**: 替换为技术架构图或对比图

### **4. 支持区域图标**

#### **温柔开始**
- **当前图片**: [Unsplash - 友好的指导](https://images.unsplash.com/photo-1552664730-d307ca884978?w=32&h=32&fit=crop&crop=center)
- **建议**: 替换为使用指南截图

#### **贴心帮助**
- **当前图片**: [Unsplash - 客户服务](https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=center)
- **建议**: 替换为技术支持界面截图

#### **社区交流**
- **当前图片**: [Unsplash - 团队协作](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=32&h=32&fit=crop&crop=center)
- **建议**: 替换为社区界面截图

## 📝 替换步骤

### **方法一：直接替换链接**
1. 准备新的图片文件
2. 上传到图片托管服务（如 Cloudinary、Imgur 等）
3. 替换 HTML 中的图片链接

### **方法二：本地文件替换**
1. 在项目根目录创建 `images` 文件夹
2. 将图片文件放入对应文件夹
3. 修改 HTML 中的图片路径

## 🎨 图片要求

### **技术规格**
- **格式**: PNG (透明背景) 或 JPG (不透明背景)
- **质量**: 高分辨率，支持 Retina 显示
- **优化**: 使用工具压缩图片，减少文件大小

### **设计风格**
- **色调**: 温暖、柔和，符合"温柔贴心"的定位
- **风格**: 简约、现代，符合苹果用户审美
- **一致性**: 保持整体视觉风格统一

### **尺寸建议**
- **Logo**: 64x64px (2x), 32x32px (1x)
- **Hero 图**: 1200x800px (2x), 600x400px (1x)
- **功能图标**: 96x96px (2x), 48x48px (1x)
- **支持图标**: 64x64px (2x), 32x32px (1x)

## 🔄 批量替换示例

```html
<!-- 替换前 -->
<img src="https://images.unsplash.com/photo-xxx" alt="描述">

<!-- 替换后 -->
<img src="images/cursorx-logo.png" alt="CursorX Logo">
```

## 📱 响应式考虑

确保图片在不同设备上都能正常显示：
- 使用 `object-fit: cover` 保持比例
- 设置合适的 `border-radius` 保持圆角效果
- 考虑移动端的加载速度

## 🚀 性能优化

1. **懒加载**: 为图片添加 `loading="lazy"` 属性
2. **WebP 格式**: 现代浏览器支持，文件更小
3. **CDN**: 使用 CDN 加速图片加载
4. **压缩**: 使用工具压缩图片文件

## 📋 检查清单

- [ ] Logo 图片已替换
- [ ] Hero 演示图已替换
- [ ] 所有功能图标已替换
- [ ] 支持区域图标已替换
- [ ] 图片尺寸符合要求
- [ ] 图片质量良好
- [ ] 移动端显示正常
- [ ] 加载速度满意

替换完成后，记得测试网站在不同设备和浏览器上的显示效果！

# 网页倒计时应用

一个基于 Next.js 15 构建的精美倒计时网页应用，支持自定义目标日期、标题和必应每日壁纸背景。

## ✨ 功能特性

### 🎯 核心功能
- **精准倒计时** - 显示距离目标日期的天、时、分、秒
- **多维度展示** - 同时显示月+天、周数等多种时间维度
- **环境变量配置** - 通过 Vercel 环境变量灵活配置，无需修改代码

### 🎨 视觉效果
- **Glassmorphism 玻璃态设计** - 现代化的毛玻璃效果卡片
- **数字翻转动画** - 秒数变化时的流畅翻转效果
- **脉冲光晕** - 数字持续的柔和光晕动画
- **悬浮交互** - 卡片悬浮时的提升效果
- **深色模式** - 自动适配系统深色/浅色主题

### 🎉 倒计时结束庆祝
- **彩带动画** - 倒计时归零时自动触发五彩缤纷的彩带效果
- **彩虹文字** - 庆祝标题的彩虹渐变动画
- **弹跳效果** - 活泼的文字弹跳动画

### 🖼️ 壁纸功能
- **必应每日壁纸** - 可选启用必应精选壁纸作为背景
- **智能遮罩** - 自动添加半透明遮罩确保文字可读性
- **平滑过渡** - 壁纸加载时的淡入动画

### 📱 用户体验
- **加载骨架屏** - 优雅的加载占位效果
- **全屏模式** - 一键切换全屏显示
- **响应式布局** - 完美适配桌面和移动设备
- **错误提示** - 友好的配置错误提示

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 创建 .env.local 文件并设置环境变量
echo "NEXT_PUBLIC_TARGET_DATE=2025-01-01" > .env.local
echo "NEXT_PUBLIC_TITLE=春节倒计时" >> .env.local
echo "NEXT_PUBLIC_SUBTITLE=距离春节还有" >> .env.local
echo "NEXT_PUBLIC_WALLPAPER_ENABLED=0" >> .env.local

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 生产部署

```bash
npm run build
npm run start
```

## ⚙️ 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 说明 | 示例值 |
|-------|------|-------|
| `NEXT_PUBLIC_TARGET_DATE` | 目标日期（格式：YYYY-MM-DD） | `2025-01-01` |
| `NEXT_PUBLIC_TITLE` | 倒计时标题 | `春节倒计时` |
| `NEXT_PUBLIC_SUBTITLE` | 倒计时副标题 | `距离春节还有` |
| `NEXT_PUBLIC_WALLPAPER_ENABLED` | 壁纸开关（0关闭/1开启） | `0` |

> **注意**：环境变量更改后需要重新部署项目才能生效。

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router + Turbopack)
- **UI**: React 19 + Tailwind CSS 4
- **状态管理**: Zustand
- **图标**: React Icons
- **语言**: TypeScript

## 📁 项目结构

```
src/
├── app/
│   ├── globals.css      # 全局样式和动画定义
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 首页入口
├── components/
│   ├── ClientPage.tsx       # 客户端页面容器
│   ├── CountdownTimer.tsx   # 倒计时主组件
│   ├── FullscreenButton.tsx # 全屏切换按钮
│   └── Wallpaper.tsx        # 壁纸背景组件
├── store/
│   └── useCountdownStore.ts # Zustand 状态管理
└── utils/
    └── countdownUtils.ts    # 倒计时计算工具
```

## 📝 更新日志

### v0.2.0 (2024-12)
- 🎨 新增 Glassmorphism 玻璃态设计
- ✨ 新增数字翻转动画效果
- 🎉 新增倒计时结束庆祝效果（彩带动画）
- ⏳ 新增加载骨架屏
- 🖼️ 优化壁纸模式可读性（添加遮罩层）
- 📊 优化月份计算精度（使用真实日历计算）
- 🏗️ 重构状态管理（合并 store）
- 🌐 修复 HTML lang 属性为中文

### v0.1.0
- 初始版本发布
- 基础倒计时功能
- 必应壁纸支持

## 📄 License

MIT License

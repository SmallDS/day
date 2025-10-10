This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 配置倒计时信息

本项目使用Vercel环境变量来配置倒计时信息，无需通过前端管理界面。请按照以下步骤在Vercel添加环境变量：

1. 登录您的Vercel账户并进入项目仪表板
2. 点击"Settings"选项卡
3. 在左侧菜单中选择"Environment Variables"
4. 添加以下环境变量：

| 变量名 | 说明 | 示例值 |
|-------|------|-------|
| `NEXT_PUBLIC_TARGET_DATE` | 目标日期（格式：YYYY-MM-DD） | `2025-01-01` |
| `NEXT_PUBLIC_TITLE` | 倒计时标题 | `春节倒计时` |
| `NEXT_PUBLIC_SUBTITLE` | 倒计时副标题 | `距离春节还有` |
| `NEXT_PUBLIC_WALLPAPER_INTERVAL` | 壁纸切换间隔（小时）<br>-1: 禁用壁纸<br>0: 每天12点更新<br>正整数: 每隔指定小时数更新 | `0` |

5. 点击"Save"保存环境变量
6. 重新部署您的项目以应用新的环境变量

注意：环境变量更改后需要重新部署项目才能生效。

## 壁纸功能说明

本项目支持自动切换壁纸背景，使用必应每日壁纸API：

- 壁纸数据来源：`https://uapis.cn/api/v1/image/bing-daily`
- 壁纸切换频率通过`NEXT_PUBLIC_WALLPAPER_INTERVAL`环境变量控制
- 设置为`-1`可完全禁用壁纸功能，保留默认渐变背景
- 设置为`0`则每天12点自动更新壁纸
- 设置为正整数（如`6`）则每隔指定小时数更新壁纸

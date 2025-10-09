'use client';

import dynamic from 'next/dynamic';

// 动态导入客户端组件，确保在生产环境中正确加载
const CountdownTimer = dynamic(() => import('@/components/CountdownTimer'), {
  loading: () => <div className="text-center p-4">加载倒计时...</div>
});
const FullscreenButton = dynamic(() => import('@/components/FullscreenButton'), {
  loading: () => <div className="hidden">加载全屏按钮...</div>
});
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <div className="hidden">加载管理面板...</div>
});

export default function ClientPage() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center">
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl">
        <CountdownTimer />
      </main>
      
      <FullscreenButton />
      <AdminPanel />
      
      <footer className="w-full py-4 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} 重要日期倒计时 | 基于 Next.js 构建</p>
      </footer>
    </div>
  );
}
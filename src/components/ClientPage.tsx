'use client';

import dynamic from 'next/dynamic';

// 动态导入客户端组件，确保在生产环境中正确加载
const CountdownTimer = dynamic(() => import('@/components/CountdownTimer'), {
  loading: () => <div className="text-center p-4">加载倒计时...</div>
});
const FullscreenButton = dynamic(() => import('@/components/FullscreenButton'), {
  loading: () => <div className="hidden">加载全屏按钮...</div>
});
const Wallpaper = dynamic(() => import('@/components/Wallpaper'), {
  ssr: false
});

export default function ClientPage() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center">
      {/* 壁纸组件 */}
      <Wallpaper />
      
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl">
        <CountdownTimer />
      </main>
      
      <FullscreenButton />
      
      <footer className="w-full py-4 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} 重要日期倒计时 | 由小沙漠构建</p>
      </footer>
    </div>
  );
}
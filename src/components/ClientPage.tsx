'use client';

import CountdownTimer from '@/components/CountdownTimer';
import FullscreenButton from '@/components/FullscreenButton';
import Wallpaper from '@/components/Wallpaper';

export default function ClientPage() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 text-center">
      {/* 壁纸组件 */}
      <Wallpaper />

      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl z-10">
        <CountdownTimer />
      </main>

      <FullscreenButton />

      <footer className="w-full py-4 text-sm text-gray-500 dark:text-gray-400 z-10">
        <p className="glass-card inline-block px-4 py-2 rounded-lg">
          © {new Date().getFullYear()} 重要日期倒计时 | 由小沙漠构建
        </p>
      </footer>
    </div>
  );
}
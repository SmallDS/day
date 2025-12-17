import { create } from 'zustand';

interface AppState {
  // 倒计时配置
  targetDate: string;
  title: string;
  subtitle: string;
  // 壁纸配置
  isWallpaperEnabled: boolean;
}

export const useAppStore = create<AppState>()(() => ({
  // 倒计时配置 - 从环境变量读取
  targetDate: process.env.NEXT_PUBLIC_TARGET_DATE || '',
  title: process.env.NEXT_PUBLIC_TITLE || '',
  subtitle: process.env.NEXT_PUBLIC_SUBTITLE || '',
  // 壁纸开关 - 0关闭，1开启
  isWallpaperEnabled: process.env.NEXT_PUBLIC_WALLPAPER_ENABLED === '1',
}));

// 保持向后兼容的别名
export const useCountdownStore = useAppStore;
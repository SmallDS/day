import { create } from 'zustand';

interface WallpaperState {
  wallpaperUrl: string;
  isWallpaperEnabled: boolean;
  changeInterval: number; // 以小时为单位，-1表示禁用，0表示每天12点
  lastChangeTime: number;
}

export const useWallpaperStore = create<WallpaperState>()(() => ({
  wallpaperUrl: '',
  isWallpaperEnabled: true,
  // 从环境变量读取壁纸切换间隔
  changeInterval: parseInt(process.env.NEXT_PUBLIC_WALLPAPER_INTERVAL || '0'),
  lastChangeTime: 0
}));
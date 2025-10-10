import { create } from 'zustand';

interface WallpaperState {
  wallpaperUrl: string;
  isWallpaperEnabled: boolean;
}

export const useWallpaperStore = create<WallpaperState>()(() => ({
  wallpaperUrl: '',
  // 从环境变量读取壁纸开关状态，0表示关闭，1表示开启
  isWallpaperEnabled: parseInt(process.env.NEXT_PUBLIC_WALLPAPER_ENABLED || '0') === 1
}));
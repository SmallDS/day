'use client';

import { useEffect, useState } from 'react';
import { useWallpaperStore } from '@/store/useWallpaperStore';

export default function Wallpaper() {
  const { isWallpaperEnabled } = useWallpaperStore();
  const [wallpaperUrl, setWallpaperUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 如果壁纸功能关闭，则不加载壁纸
    if (!isWallpaperEnabled) {
      setLoading(false);
      return;
    }

    const fetchWallpaper = async () => {
      try {
        setLoading(true);
        // 使用必应壁纸API
        const response = await fetch('https://uapis.cn/api/v1/image/bing-daily', {
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch wallpaper');
        }
        
        // 获取图片blob
        const blob = await response.blob();
        // 如果有旧的URL，先释放它
        if (wallpaperUrl) {
          URL.revokeObjectURL(wallpaperUrl);
        }
        const url = URL.createObjectURL(blob);
        setWallpaperUrl(url);
      } catch (error) {
        console.error('Error fetching wallpaper:', error);
      } finally {
        setLoading(false);
      }
    };

    // 加载壁纸
    fetchWallpaper();

    // 清理函数
    return () => {
      if (wallpaperUrl) URL.revokeObjectURL(wallpaperUrl);
    };
  }, [isWallpaperEnabled]);

  if (!isWallpaperEnabled || !wallpaperUrl) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
      style={{ 
        backgroundImage: `url(${wallpaperUrl})`,
        opacity: loading ? 0 : 1
      }}
    />
  );
}
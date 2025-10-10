'use client';

import { useEffect, useState } from 'react';
import { useWallpaperStore } from '@/store/useWallpaperStore';

export default function Wallpaper() {
  const { changeInterval } = useWallpaperStore();
  const [wallpaperUrl, setWallpaperUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 如果changeInterval为-1，则禁用壁纸
    if (changeInterval === -1) {
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

    // 初始加载壁纸
    fetchWallpaper();

    // 根据changeInterval设置定时器
    let intervalId: NodeJS.Timeout | null = null;
    
    if (changeInterval > 0) {
      // 按小时间隔更新壁纸
      intervalId = setInterval(fetchWallpaper, changeInterval * 60 * 60 * 1000);
    } else if (changeInterval === 0) {
      // 每天12点更新壁纸
      const now = new Date();
      const nextNoon = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        12, 0, 0
      );
      
      if (now.getHours() >= 12) {
        nextNoon.setDate(nextNoon.getDate() + 1);
      }
      
      const timeUntilNextNoon = nextNoon.getTime() - now.getTime();
      
      // 设置定时器在下一个12点触发
      const timeoutId = setTimeout(() => {
        fetchWallpaper();
        // 之后每24小时触发一次
        intervalId = setInterval(fetchWallpaper, 24 * 60 * 60 * 1000);
      }, timeUntilNextNoon);
      
      return () => {
        clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (wallpaperUrl) URL.revokeObjectURL(wallpaperUrl);
    };
  }, [changeInterval]);

  if (changeInterval === -1 || !wallpaperUrl) {
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
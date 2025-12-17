'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/useCountdownStore';

const CACHE_KEY = 'wallpaper_cache';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6小时缓存

interface WallpaperCache {
  url: string;
  timestamp: number;
  date: string;
}

export default function Wallpaper() {
  const { isWallpaperEnabled } = useAppStore();
  const [wallpaperUrl, setWallpaperUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const blobUrlRef = useRef<string>('');

  const fetchWallpaper = useCallback(async () => {
    try {
      setLoading(true);
      const today = new Date().toDateString();

      // 检查缓存
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cacheData: WallpaperCache = JSON.parse(cached);
        const isValid = Date.now() - cacheData.timestamp < CACHE_DURATION && cacheData.date === today;
        if (isValid && cacheData.url) {
          setWallpaperUrl(cacheData.url);
          setLoading(false);
          return;
        }
      }

      // 获取新壁纸
      const response = await fetch('https://uapis.cn/api/v1/image/bing-daily', {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wallpaper');
      }

      const blob = await response.blob();

      // 释放旧的 blob URL
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }

      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      setWallpaperUrl(url);

      // 注意：blob URL 无法缓存到 localStorage，只缓存元数据表示已加载
      // 实际上每次刷新仍需请求，但可在同一会话中复用
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        url: '', // blob URL 无法持久化
        timestamp: Date.now(),
        date: today
      }));
    } catch (error) {
      console.error('Error fetching wallpaper:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isWallpaperEnabled) {
      setLoading(false);
      return;
    }

    fetchWallpaper();

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, [isWallpaperEnabled, fetchWallpaper]);

  if (!isWallpaperEnabled || !wallpaperUrl) {
    return null;
  }

  return (
    <>
      {/* 壁纸背景 */}
      <div
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${wallpaperUrl})`,
          opacity: loading ? 0 : 1
        }}
      />
      {/* 半透明遮罩层提升文字可读性 */}
      <div
        className="fixed inset-0 z-[-1] bg-black/30 backdrop-blur-[1px] transition-opacity duration-1000"
        style={{ opacity: loading ? 0 : 1 }}
      />
    </>
  );
}
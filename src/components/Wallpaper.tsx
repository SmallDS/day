'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/useCountdownStore';

export default function Wallpaper() {
  const { isWallpaperEnabled } = useAppStore();
  const [wallpaperUrl, setWallpaperUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const blobUrlRef = useRef<string>('');

  const fetchWallpaper = useCallback(async () => {
    if (!isWallpaperEnabled) return;

    setLoading(true);
    setError(false);

    try {
      // 使用本地 API 代理获取壁纸
      const response = await fetch('/api/wallpaper');

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
      setLoading(false);
    } catch (err) {
      console.error('Wallpaper fetch failed:', err);
      setError(true);
      setLoading(false);
    }
  }, [isWallpaperEnabled]);

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

  // 壁纸关闭或加载失败时不渲染
  if (!isWallpaperEnabled || error || !wallpaperUrl) {
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
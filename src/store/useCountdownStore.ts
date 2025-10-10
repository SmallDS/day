import { create } from 'zustand';

interface CountdownState {
  targetDate: string;
  title: string;
  subtitle: string;
}

export const useCountdownStore = create<CountdownState>()(() => ({
  // 直接使用process.env访问环境变量，Next.js会自动处理
  targetDate: process.env.NEXT_PUBLIC_TARGET_DATE || '',
  title: process.env.NEXT_PUBLIC_TITLE || '',
  subtitle: process.env.NEXT_PUBLIC_SUBTITLE || '',
}));
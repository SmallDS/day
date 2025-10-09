import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CountdownState {
  targetDate: string;
  title: string;
  subtitle: string;
  setTargetDate: (date: string) => void;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
}

// 默认目标日期为当前日期加一年
const defaultTargetDate = new Date();
defaultTargetDate.setFullYear(defaultTargetDate.getFullYear() + 1);

export const useCountdownStore = create<CountdownState>()(
  persist(
    (set) => ({
      targetDate: defaultTargetDate.toISOString().split('T')[0],
      title: '重要日期倒计时',
      subtitle: '距离目标日期还有',
      setTargetDate: (date) => set({ targetDate: date }),
      setTitle: (title) => set({ title }),
      setSubtitle: (subtitle) => set({ subtitle }),
    }),
    {
      name: 'countdown-storage',
    }
  )
);
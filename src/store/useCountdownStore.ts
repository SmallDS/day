import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CountdownState {
  targetDate: string;
  title: string;
  subtitle: string;
}

// 默认目标日期为当前日期加一年
const defaultTargetDate = new Date();
defaultTargetDate.setFullYear(defaultTargetDate.getFullYear() + 1);

// 从环境变量读取配置，如果不存在则使用默认值
const getEnvValue = (key: string, defaultValue: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`NEXT_PUBLIC_${key}`] || defaultValue;
  }
  return defaultValue;
};

export const useCountdownStore = create<CountdownState>()(
  persist(
    () => ({
      targetDate: getEnvValue('TARGET_DATE', defaultTargetDate.toISOString().split('T')[0]),
      title: getEnvValue('TITLE', '重要日期倒计时'),
      subtitle: getEnvValue('SUBTITLE', '距离目标日期还有'),
    }),
    {
      name: 'countdown-storage',
    }
  )
);
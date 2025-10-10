import { create } from 'zustand';

interface CountdownState {
  targetDate: string;
  title: string;
  subtitle: string;
}

// 直接从环境变量读取配置，不使用默认值
const getEnvValue = (key: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`NEXT_PUBLIC_${key}`] || '';
  }
  return '';
};

export const useCountdownStore = create<CountdownState>()(() => ({
  targetDate: getEnvValue('TARGET_DATE'),
  title: getEnvValue('TITLE'),
  subtitle: getEnvValue('SUBTITLE'),
}));
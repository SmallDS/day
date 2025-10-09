'use client';

import { useEffect, useState } from 'react';
import { calculateTimeRemaining, TimeRemaining } from '@/utils/countdownUtils';
import { useCountdownStore } from '@/store/useCountdownStore';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function CountdownTimer() {
  const { targetDate, title, subtitle } = useCountdownStore();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    months: 0,
    remainingDays: 0,
    weeks: 0
  });

  useEffect(() => {
    // 初始计算
    setTimeRemaining(calculateTimeRemaining(targetDate));

    // 每秒更新一次
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // 格式化数字为两位数
  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // 检查目标日期是否有效
  const isValidDate = !isNaN(new Date(targetDate).getTime());

  // 如果日期无效，显示错误信息
  if (!isValidDate) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">日期无效</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">请在管理面板中设置有效的目标日期</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl md:text-5xl font-bold mb-2 transition-colors">{title || '重要日期倒计时'}</h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">{subtitle || '距离目标日期还有'}</p>
      
      {/* 天时分秒 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8 w-full max-w-2xl">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="text-4xl md:text-7xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(timeRemaining.days)}</div>
          <div className="text-sm md:text-base mt-2 font-medium">天</div>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="text-4xl md:text-7xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(timeRemaining.hours)}</div>
          <div className="text-sm md:text-base mt-2 font-medium">时</div>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="text-4xl md:text-7xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(timeRemaining.minutes)}</div>
          <div className="text-sm md:text-base mt-2 font-medium">分</div>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="text-4xl md:text-7xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(timeRemaining.seconds)}</div>
          <div className="text-sm md:text-base mt-2 font-medium">秒</div>
        </div>
      </div>
      
      {/* 月和天 */}
      <div className="text-xl md:text-3xl mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{timeRemaining.months}</span> 个月 
        <span className="font-semibold text-indigo-600 dark:text-indigo-400 ml-2">{timeRemaining.remainingDays}</span> 天
      </div>
      
      {/* 周 */}
      <div className="text-xl md:text-3xl mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{timeRemaining.weeks}</span> 周
      </div>
      
      {/* 目标日期 */}
      <div className="text-sm md:text-base mt-8 text-gray-500 dark:text-gray-400">
        目标日期: {new Date(targetDate).toLocaleDateString()}
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState, useMemo } from 'react';
import { calculateTimeRemaining, TimeRemaining } from '@/utils/countdownUtils';
import { useAppStore } from '@/store/useCountdownStore';
import { FaExclamationTriangle } from 'react-icons/fa';

// 骨架屏组件
function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ''}`} />;
}

// 庆祝彩带组件
function Confetti() {
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd', '#ff9ff3'];
  const confettiPieces = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '0'
          }}
        />
      ))}
    </div>
  );
}

// 数字卡片组件
function NumberCard({ value, label, prevValue }: { value: string; label: string; prevValue: string }) {
  const hasChanged = value !== prevValue;

  return (
    <div className="flex flex-col items-center glass-card p-4 md:p-6 rounded-2xl hover-lift">
      <div
        key={value}
        className={`text-4xl md:text-7xl font-bold text-blue-600 dark:text-blue-400 number-glow ${hasChanged ? 'flip-animation' : ''}`}
      >
        {value}
      </div>
      <div className="text-sm md:text-base mt-2 font-medium text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
}

export default function CountdownTimer() {
  const { targetDate, title, subtitle } = useAppStore();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [prevTime, setPrevTime] = useState<TimeRemaining | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // 初始计算
    const initial = calculateTimeRemaining(targetDate);
    setTimeRemaining(initial);
    setPrevTime(initial);
    setIsLoading(false);

    // 检查是否倒计时结束
    if (initial.isExpired) {
      setShowCelebration(true);
    }

    // 每秒更新一次
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        setPrevTime(prev);
        const newTime = calculateTimeRemaining(targetDate);

        // 检测倒计时刚结束
        if (newTime.isExpired && prev && !prev.isExpired) {
          setShowCelebration(true);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // 格式化数字为两位数
  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // 检查环境变量是否设置
  if (!targetDate) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-6 glass-card rounded-2xl fade-in">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">未设置目标日期</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">请在Vercel环境变量中设置NEXT_PUBLIC_TARGET_DATE</p>
      </div>
    );
  }

  // 检查目标日期是否有效
  const isValidDate = !isNaN(new Date(targetDate).getTime());

  if (!isValidDate) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-6 glass-card rounded-2xl fade-in">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">日期格式无效</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">请确保NEXT_PUBLIC_TARGET_DATE格式为YYYY-MM-DD</p>
      </div>
    );
  }

  // 加载骨架屏
  if (isLoading || !timeRemaining || !prevTime) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <Skeleton className="h-12 w-64 mb-2" />
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8 w-full max-w-2xl">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 md:h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // 倒计时结束庆祝界面
  if (timeRemaining.isExpired) {
    return (
      <div className="flex flex-col items-center justify-center w-full fade-in">
        {showCelebration && <Confetti />}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 celebrate-text">🎉 {title} 🎉</h1>
        <p className="text-2xl md:text-3xl mb-8 text-gray-600 dark:text-gray-300">已经到来！</p>

        <div className="glass-card-strong p-8 rounded-3xl text-center">
          <p className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200">
            目标日期: {new Date(targetDate).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full fade-in">
      <h1 className="text-3xl md:text-5xl font-bold mb-2 transition-colors">{title}</h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">{subtitle}</p>

      {/* 天时分秒 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8 w-full max-w-2xl">
        <NumberCard
          value={formatNumber(timeRemaining.days)}
          label="天"
          prevValue={formatNumber(prevTime.days)}
        />
        <NumberCard
          value={formatNumber(timeRemaining.hours)}
          label="时"
          prevValue={formatNumber(prevTime.hours)}
        />
        <NumberCard
          value={formatNumber(timeRemaining.minutes)}
          label="分"
          prevValue={formatNumber(prevTime.minutes)}
        />
        <NumberCard
          value={formatNumber(timeRemaining.seconds)}
          label="秒"
          prevValue={formatNumber(prevTime.seconds)}
        />
      </div>

      {/* 月和天 */}
      <div className="text-xl md:text-3xl mb-4 p-4 glass-card rounded-xl hover-lift">
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{timeRemaining.months}</span> 个月
        <span className="font-semibold text-indigo-600 dark:text-indigo-400 ml-2">{timeRemaining.remainingDays}</span> 天
      </div>

      {/* 周 */}
      <div className="text-xl md:text-3xl mb-4 p-4 glass-card rounded-xl hover-lift">
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{timeRemaining.weeks}</span> 周
      </div>

      {/* 目标日期 */}
      <div className="text-sm md:text-base mt-8 text-gray-500 dark:text-gray-400 glass-card px-4 py-2 rounded-lg">
        目标日期: {new Date(targetDate).toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}
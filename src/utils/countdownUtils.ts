export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  months: number;
  remainingDays: number;
  weeks: number;
}

export function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const now = new Date();
  const target = new Date(targetDate);
  
  // 计算总毫秒差
  const difference = target.getTime() - now.getTime();
  
  // 如果目标日期已过，返回全零
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      months: 0,
      remainingDays: 0,
      weeks: 0
    };
  }
  
  // 计算天时分秒
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  // 计算月和剩余天数
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  
  // 计算周数
  const weeks = Math.floor(days / 7);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays: days,
    months,
    remainingDays,
    weeks
  };
}
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  months: number;
  remainingDays: number;
  weeks: number;
  isExpired: boolean;
}

/**
 * 计算两个日期之间的精确月份差
 */
function getMonthDifference(startDate: Date, endDate: Date): { months: number; remainingDays: number } {
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months += endDate.getMonth() - startDate.getMonth();

  // 计算日期差来确定是否需要减去一个月
  const tempDate = new Date(startDate);
  tempDate.setMonth(tempDate.getMonth() + months);

  if (tempDate > endDate) {
    months--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  // 计算剩余天数
  const remainingDays = Math.floor((endDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));

  return { months: Math.max(0, months), remainingDays: Math.max(0, remainingDays) };
}

export function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const now = new Date();
  const target = new Date(targetDate);

  // 计算总毫秒差
  const difference = target.getTime() - now.getTime();

  // 如果目标日期已过
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      months: 0,
      remainingDays: 0,
      weeks: 0,
      isExpired: true
    };
  }

  // 计算天时分秒
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // 使用精确的月份计算
  const { months, remainingDays } = getMonthDifference(now, target);

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
    weeks,
    isExpired: false
  };
}
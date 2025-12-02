export function formatCurrency(value: number): string {
  return `₦${value.toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function daysFromToday(date: Date): number {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getMonthsBetween(date: Date): number {
  const today = new Date();
  const months = (date.getFullYear() - today.getFullYear()) * 12 +
    (date.getMonth() - today.getMonth());
  return Math.max(0, months);
}

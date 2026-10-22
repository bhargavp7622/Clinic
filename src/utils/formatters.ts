export const formatCurrencyInr = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatDateDisplay = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      return dateString;
    }
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const getNextDays = (count: number = 7): Array<{ dateStr: string; dayName: string; dayNumber: number; isToday: boolean }> => {
  const days: Array<{ dateStr: string; dayName: string; dayNumber: number; isToday: boolean }> = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const dayName = i === 0 ? 'Today' : d.toLocaleDateString('en-IN', { weekday: 'short' });
    const dayNumber = d.getDate();

    days.push({
      dateStr,
      dayName,
      dayNumber,
      isToday: i === 0,
    });
  }

  return days;
};

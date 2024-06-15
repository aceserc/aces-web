type Return = {
  mm: string;
  dd: string;
  yyyy: string;
  isOldDate: boolean;
  isToday: boolean;
  isUpcoming: boolean;
  isOneYearPassed: boolean;
  isTomorrow: boolean;
};

export const resolveDate = (startDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to the start of the day
  const eventDate = new Date(startDate);
  const isOldDate = eventDate < today;
  const isToday =
    eventDate.getDate() === today.getDate() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear();
  const isUpcoming = eventDate > today;
  const isOneYearPassed = eventDate.getFullYear() < today.getFullYear();
  const isTomorrow =
    eventDate.getDate() === today.getDate() + 1 &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear();

  return {
    mm: eventDate.toLocaleString("default", { month: "short" }),
    dd: eventDate.getDate().toString(),
    yyyy: eventDate.getFullYear().toString(),
    isOldDate,
    isToday,
    isUpcoming,
    isOneYearPassed,
    isTomorrow,
  } as Return;
};

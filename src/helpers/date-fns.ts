type Return = {
  mm: string;
  dd: string;
  yyyy: string;
  isOldDate: boolean;
  isToday: boolean;
  isUpcoming: boolean;
  isOneYearPassed: boolean;
  isTomorrow: boolean;
  isOngoing: boolean;
};

export const resolveDate = (startDate: string, endDate?: string) => {
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

  const isOngoing = endDate ? today < new Date(endDate) : false;

  return {
    mm: eventDate.toLocaleString("default", { month: "short" }),
    dd: eventDate.getDate().toString(),
    yyyy: eventDate.getFullYear().toString(),
    isOldDate,
    isToday,
    isUpcoming,
    isOneYearPassed,
    isTomorrow,
    isOngoing,
  } as Return;
};

// <24hrs - in hours
// <7days - in days
// <30days - in weeks and days
// <365days - in months and days
// >1year - in years and months

export const resolveDuration = (
  startDate: string,
  startTime?: string,
  endDate?: string,
  endTime?: string
) => {
  if (!startTime) return null;

  const eventStartDate = new Date(
    `${startDate?.split("T")[0]}T${startTime}:00.000Z`
  );
  const eventEndDate = new Date(
    `${endDate ? endDate?.split("T")[0] : startDate?.split("T")[0]}T${
      endTime ?? startTime
    }:00.000Z`
  );

  const duration = eventEndDate.getTime() - eventStartDate.getTime(); // in milliseconds
  const durationInHours = duration / 1000 / 60 / 60;
  const durationInDays = Math.ceil(durationInHours / 24); // Round up to the nearest day
  const durationInWeeks = Math.floor(durationInDays / 7);
  const durationInMonths = Math.floor(durationInDays / 30);
  const durationInYears = Math.floor(durationInDays / 365);

  if (durationInHours < 1) {
    return null;
  }

  if (durationInHours < 24) {
    return `${Math.floor(durationInHours)} hrs`;
  } else if (durationInDays < 7) {
    return `${durationInDays} days`;
  } else if (durationInDays < 30) {
    const weeks = Math.floor(durationInDays / 7);
    const days = durationInDays % 7;
    return `${weeks} weeks ${days} days`;
  } else if (durationInDays < 365) {
    const months = Math.floor(durationInDays / 30);
    const days = durationInDays % 30;
    return `${months} months ${days} days`;
  } else {
    const years = Math.floor(durationInDays / 365);
    const months = Math.floor((durationInDays % 365) / 30);
    return `${years} years ${months} months`;
  }
};

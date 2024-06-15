const getEventStatus = (startDate: string, startTime?: string) => {
  // Convert date strings to Date objects
  const currentDate = new Date();
  const eventDate = new Date(startDate);

  // Set the time of both dates to 0:00:00
  currentDate.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  // Calculate the number of days left until the event
  const timeDiff = eventDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysLeft === 0) {
    return {
      status: "today",
      daysLeft: null,
    };
  } else if (currentDate > eventDate) {
    return {
      status: "completed",
      daysLeft: null,
    };
  }

  return {
    status: "upcoming",
    daysLeft: daysLeft,
  };
};

export default getEventStatus;

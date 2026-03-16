export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getActualDate = (offset = 0) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
};

export const findDate = (selectedDate) => {
  const activeDate = {
    today: 0,
    yesterday: -1,
    tomorrow: 1,
  };

  return getActualDate(activeDate[selectedDate] ?? 0);
};

export const isPastDate = (date) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const checkDate = findDate(date).setHours(0, 0, 0, 0);
  return checkDate < today;
};

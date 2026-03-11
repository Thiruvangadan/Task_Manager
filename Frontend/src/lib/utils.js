export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function findDate(selectedDate) {
  const activeDate = new Date();

  if (selectedDate === "yesterday") {
    activeDate.setDate(activeDate.getDate() - 1);
  }

  if (selectedDate === "tomorrow") {
    activeDate.setDate(activeDate.getDate() + 1);
  }

  return activeDate;
}

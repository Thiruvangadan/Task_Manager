export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatGroupDate = (dateString) => {
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const date = new Date(dateString);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
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

export const checkDate = (selectDate) => {
  if (/^[a-z]+$/.test(selectDate)) {
    return findDate(selectDate);
  }
  return selectDate;
};

export const isPastDate = (date) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const convertDate =
    typeof date === "object"
      ? date.setHours(0, 0, 0, 0)
      : new Date(checkDate(date)).setHours(0, 0, 0, 0);
  return convertDate < today;
};

export const filterNotes = (notes, search, selectDate) => {
  if (search?.trim()) {
    const query = search.toLowerCase();

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query),
    );
  }

  if (selectDate === "all") {
    return notes;
  }

  if (!/^[a-z]+$/.test(selectDate)) {
    return notes.filter(
      (note) =>
        new Date(note.noteDate).toDateString() ===
        new Date(selectDate).toDateString(),
    );
  }

  return notes.filter(
    (note) =>
      new Date(note.noteDate).toDateString() ===
      findDate(selectDate).toDateString(),
  );
};

export const groupNotesByDate = (notes) => {
  return notes.reduce((acc, note) => {
    const date = new Date(note.noteDate).toDateString();

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(note);

    return acc;
  }, {});
};

export const sortGroupedDates = (grouped) => {
  return Object.entries(grouped).sort(
    ([dateA], [dateB]) => new Date(dateB) - new Date(dateA),
  );
};

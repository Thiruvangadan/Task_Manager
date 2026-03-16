import React from "react";
import { DATE_FILTERS } from "../constants/dates";

const DateNavbar = ({ selectDate, setSelectDate, searchNote }) => {
  const isSearching = searchNote.length > 0;
  return (
    <div className="mt-6 bg-slate-800/60  shadow-sm max-w-xl mx-auto rounded-full p-2 flex gap-3 justify-center w-full">
      {DATE_FILTERS.map((date) => (
        <button
          key={date.value}
          className={`px-4 py-2 rounded-full transition-all duration-500  ${
            !isSearching && selectDate === date.value
              ? "bg-white text-black "
              : "hover:bg-white/10 cursor-pointer"
          }`}
          onClick={() => setSelectDate(date.value)}
        >
          {date.label}
        </button>
      ))}
    </div>
  );
};

export default DateNavbar;

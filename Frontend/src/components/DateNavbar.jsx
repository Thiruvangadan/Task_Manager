import React from "react";

const DateNavbar = ({ selectDate, setSelectDate }) => {
  return (
    <div className="mt-6 navbar bg-slate-800/60  shadow-sm max-w-xl mx-auto rounded-full">
      <ul className="menu menu-horizontal p-1 gap-3 justify-center w-full">
        <li>
          <button
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectDate === "yesterday" ? "bg-white text-black" : ""
            }`}
            onClick={() => setSelectDate("yesterday")}
          >
            Yesterday
          </button>
        </li>
        <li>
          <button
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectDate === "today" ? "bg-white text-black" : ""
            }`}
            onClick={() => setSelectDate("today")}
          >
            Today
          </button>
        </li>
        <li>
          <button
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectDate === "tomorrow" ? "bg-white text-black" : ""
            }`}
            onClick={() => setSelectDate("tomorrow")}
          >
            Tomorrow
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DateNavbar;

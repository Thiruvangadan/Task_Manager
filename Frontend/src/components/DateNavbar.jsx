import React from "react";

const DateNavbar = ({ selectDate, setSelectDate }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <ul className="menu menu-horizontal px-1">
        {console.log(selectDate)}
        <li>
          <button
            className={selectDate === "yesterday" ? "bg-white text-black" : ""}
            onClick={() => setSelectDate("yesterday")}
          >
            Yesterday
          </button>
        </li>
        <li>
          <button
            className={selectDate === "today" ? "bg-white text-black" : ""}
            onClick={() => setSelectDate("today")}
          >
            Today
          </button>
        </li>
        <li>
          <button
            className={selectDate === "tomorrow" ? "bg-white text-black" : ""}
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

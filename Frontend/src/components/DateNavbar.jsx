import { DATE_FILTERS } from "../constants/dates";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkDate } from "../lib/utils";
import { useState } from "react";

const DateNavbar = ({ selectDate, setSelectDate, searchNote }) => {
  const [open, setOpen] = useState(false);
  const isSearching = searchNote.length > 0;
  return (
    <div className="mt-6 bg-slate-800/60  shadow-sm max-w-xl mx-auto rounded-full p-2 flex gap-3 justify-center w-full">
      {DATE_FILTERS.map((date) => (
        <button
          key={date.value}
          className={`px-4 py-2 rounded-full transition-all duration-500  ${
            (isSearching && date.value === "all") ||
            (!isSearching && selectDate === date.value)
              ? "bg-white text-black "
              : "hover:bg-white/10 cursor-pointer"
          }`}
          onClick={() => setSelectDate(date.value)}
        >
          {date.label}
        </button>
      ))}
      <DatePicker
        selected={selectDate === "all" ? null : checkDate(selectDate)}
        placeholderText={selectDate === "all" ? "Choose a Date" : ""}
        onChange={(date) => {
          setSelectDate(date);
          setOpen(false);
        }}
        open={open}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        onInputClick={() => setOpen(true)}
        onClickOutside={() => setOpen(false)}
        className={`input input-bordered rounded-full bg-slate-800/60 shadow-sm ${
          /^[a-z]+$/.test(selectDate)
            ? "hover:bg-white/10 cursor-pointer"
            : "bg-white text-black"
        }`}
      />
    </div>
  );
};

export default DateNavbar;

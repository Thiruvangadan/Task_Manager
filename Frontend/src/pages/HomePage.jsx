import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import { useState } from "react";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import DateNavbar from "../components/DateNavbar";
import { filterNotes } from "../lib/utils";
import NoteSearch from "../components/NoteSearch";
import useDebounce from "../hooks/useDebounce";
import SearchNotFound from "../components/SearchNotFound";
import useNotes from "../hooks/useNotes";

const HomePage = () => {
  const { notes, setNotes, loading, isRateLimited } = useNotes();
  const [selectDate, setSelectDate] = useState("today");
  const [searchNote, setSearchNote] = useState("");
  const debouncedSearch = useDebounce(searchNote, 500);

  const filteredNotes = filterNotes(notes, debouncedSearch, selectDate);

  return (
    <div className="min-h-screen">
      <Navbar selectDate={selectDate} />
      <NoteSearch searchNote={searchNote} setSearchNote={setSearchNote} />
      <DateNavbar
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        searchNote={searchNote}
      />
      {isRateLimited && <RateLimited />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {!searchNote && filteredNotes.length === 0 && !isRateLimited && (
          <NotesNotFound selectDate={selectDate} />
        )}

        {searchNote && filteredNotes.length === 0 && <SearchNotFound />}

        {filteredNotes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
                selectDate={selectDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

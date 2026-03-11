import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import DateNavbar from "../components/DateNavbar";
import { findDate } from "../lib/utils";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectDate, setSelectDate] = useState("today");
  const activeDate = findDate(selectDate);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);

        setIsRateLimited(false);
      } catch (error) {
        console.log("Error while fetching notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setloading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    return new Date(note.noteDate).toDateString() === activeDate.toDateString();
  });

  return (
    <div className="min-h-screen">
      <Navbar selectDate={selectDate} />
      <DateNavbar selectDate={selectDate} setSelectDate={setSelectDate} />
      {isRateLimited && <RateLimited />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {filteredNotes.length === 0 && !isRateLimited && (
          <NotesNotFound selectDate={selectDate} />
        )}

        {filteredNotes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

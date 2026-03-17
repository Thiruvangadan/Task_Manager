import { useEffect, useState } from "react";
import { getAllNotes } from "../services/noteServices";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        setNotes(data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error while fetching notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return { notes, setNotes, loading, isRateLimited };
};

export default useNotes;

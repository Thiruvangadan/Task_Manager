import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import useNotePermissions from "../hooks/useNotePermissions";
import { deleteNote } from "../services/noteServices";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();
  const { canEdit } = useNotePermissions();
  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);
  const noteDate = new Date(note.noteDate);
  const [searchParams] = useSearchParams();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleNoteClick = () => {
    if (canEdit(noteDate)) {
      navigate(`/note/${note._id}?${searchParams.toString()}`);
    }
    return;
  };

  return (
    <div
      onClick={handleNoteClick}
      className="card bg-base-100 border-t-4 border-[#00FF9D] cursor-pointer transition-all duration-200 ease-out hover:scale-102 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base text-base-content/70 line-clamp-3">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xs text-base-content/40">
            Created • {formatDate(created)}
          </span>
          {created.getTime() !== updated.getTime() && (
            <p className="text-xs text-base-content/40">
              Edited • {formatDate(updated)}
            </p>
          )}
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

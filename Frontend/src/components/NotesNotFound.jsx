import { NotebookIcon } from "lucide-react";
import useNotePermissions from "../hooks/useNotePermissions";
import { useNavigate } from "react-router";

const NotesNotFound = ({ selectDate }) => {
  const { canCreate } = useNotePermissions();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>

      <button
        className="btn btn-primary"
        onClick={() => {
          if (canCreate(selectDate)) {
            navigate("/create", { state: { selectDate } });
          }
        }}
      >
        Create Your First Note
      </button>
    </div>
  );
};
export default NotesNotFound;

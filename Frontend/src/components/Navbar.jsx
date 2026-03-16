import { useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";
import useNotePermissions from "../hooks/useNotePermissions";

const Navbar = ({ selectDate }) => {
  const { canCreate } = useNotePermissions();
  const navigate = useNavigate();
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            MindNote
          </h1>
          <div className="flex items-center gap-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (canCreate(selectDate)) {
                  navigate("/create", { state: { selectDate } });
                }
              }}
            >
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

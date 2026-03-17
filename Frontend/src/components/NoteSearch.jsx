import { Search } from "lucide-react";

const NoteSearch = ({ searchNote, setSearchNote }) => {
  return (
    <div className="mt-4 flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchNote}
          className="pl-10 w-full input input-bordered rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setSearchNote(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />

        {searchNote && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            onClick={() => setSearchNote("")}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteSearch;

import { NotebookIcon } from "lucide-react";

const SearchNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>

      <h3 className="text-2xl font-bold">No notes found</h3>

      <p className="text-base-content/70">
        Try searching with a different keyword.
      </p>
    </div>
  );
};

export default SearchNotFound;

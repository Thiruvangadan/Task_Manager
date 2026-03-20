import { useRef, useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { checkDate } from "../lib/utils";
import { createNote } from "../services/noteServices";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectDate = searchParams.get("date") || "today";
  const noteDate = checkDate(selectDate);
  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await createNote(title, content, noteDate);
      toast.success("Note created successfully");
      navigate(`/?${searchParams.toString()}`);
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to={`/?${searchParams.toString()}`}
            className="btn btn-ghost mb-6"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              >
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mb-0.5">Date</span>
                  </label>
                  <input
                    disabled
                    className="input input-bordered w-full rounded-2xl "
                    value={new Date(noteDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mb-0.5">Title</span>
                  </label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Note Title"
                    className="input input-bordered w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && title.trim()) {
                        e.preventDefault();
                        contentRef.current?.focus();
                      }
                    }}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mb-0.5">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    ref={contentRef}
                    className="textarea textarea-bordered h-32 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <span className="text-xs text-base-content/50 hover:text-base-content transition">
                    <kbd className="kbd kbd-xs">Ctrl</kbd>
                    <span className="mx-1">/</span>
                    <kbd className="kbd kbd-xs">⌘</kbd> +{" "}
                    <kbd className="kbd kbd-xs">Enter</kbd> to save
                  </span>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import RateLimited from "../components/RateLimited";
import {
  deleteNote,
  getNoteById,
  updateNoteById,
} from "../services/noteServices";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(id);
        setNote(data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching the note", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch the note");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this note?")) return;

      await deleteNote(id);
      toast.success("Note deleted successfully");
      navigate(`/?${searchParams.toString()}`);
    } catch (error) {
      console.log("Failed to delete the note", error);
      toast.error("Failed to delete");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await updateNoteById(id, note);
      toast.success("Note updated successfully");
      navigate(`/?${searchParams.toString()}`);
    } catch (error) {
      console.log("Error to save the note ", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {isRateLimited && <RateLimited />}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={`/?${searchParams.toString()}`} className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text mb-0.5">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text mb-0.5">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;

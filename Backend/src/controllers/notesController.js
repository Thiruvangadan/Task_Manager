import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllnotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNotesById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!!" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNotesById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content, noteDate } = req.body;
    const note = new Note({ title, content, noteDate });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { returnDocument: "after" },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!!" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found!!" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

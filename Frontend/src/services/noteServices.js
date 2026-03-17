import api from "../lib/axios";

export const getAllNotes = async () => {
  const res = await api.get("/notes");
  return res.data;
};

export const getNoteById = async (id) => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (title, content, noteDate) => {
  await api.post("/notes", {
    title,
    content,
    noteDate,
  });
  return;
};

export const updateNoteById = async (id, note) => {
  await api.put(`/notes/${id}`, note);
  return;
};

export const deleteNote = async (id) => {
  await api.delete(`notes/${id}`);
  return;
};

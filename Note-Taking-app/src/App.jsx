import React, { useState } from "react";

const App = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [editableNote, setEditableNote] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const noteCreateHandeler = (event) => {
    event.preventDefault();
    if (noteTitle.trim()) {
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        isComplete: false,
      };
      setNotes([...notes, newNote]);
      setNoteTitle("");
    } else {
      alert("Please enter a valid note title.");
    }
  };

  const editHandeler = (noteId) => {
    const toBeEditedNote = notes.find((item) => item.id === noteId);
    setEditMode(true);
    setEditableNote(toBeEditedNote);
    setNoteTitle(toBeEditedNote.title);
  };

  const updateHandeler = (event) => {
    event.preventDefault();
    setNotes(
      notes.map((item) => {
        if (item.id === editableNote.id) {
          return { ...item, title: noteTitle };
        }
        return item;
      })
    );
    setEditMode(false);
    setEditableNote(null);
    setNoteTitle("");
  };

  const deleteHandeler = (noteId) => {
    const newNotes = notes.filter((item) => item.id !== noteId);
    setNotes(newNotes);
  };

  return (
    <div className="min-h-screen bg-[#0c1421] flex flex-col items-center justify-start p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#ffffff]">
          Note Taking Application
        </h1>
        <form
          className="flex mb-4 gap-2"
          onSubmit={(event) => {
            editMode ? updateHandeler(event) : noteCreateHandeler(event);
          }}>
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded text-white focus:outline-none "
            placeholder="Please enter a valid title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <button
            type="submit"
            className="w-[110px] bg-[#236a9e] hover:bg-[#234c9e] text-white font-semibold h-[40px] rounded transition">
            {editMode ? "Update Note" : "Add Note"}
          </button>
        </form>
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-center justify-between text-white bg-[#171e30] px-4 py-2 shadow-sm hover:shadow-md transition">
              <span className=" hover:text-[#6e7d7a] font-medium break-all">
                {note.title}
              </span>
              <div className="flex gap-2">
                <button
                  className=" text-white px-3 py-1 rounded-md transition"
                  onClick={() => editHandeler(note.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => deleteHandeler(note.id)}
                  className=" text-white px-3 py-1 rounded-md transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
          {notes.length === 0 && (
            <li className="text-gray-400 text-center mt-6">
              No notes yet. Add your first note!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;

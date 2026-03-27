import { createContext, useContext, useState, useCallback } from "react";
import baseNotes from "../data/notes";

const NotesContext = createContext(null);

const STORAGE_KEY = "sovan_notes_overrides";

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveOverrides(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function NotesProvider({ children }) {
  const [overrides, setOverrides] = useState(loadOverrides);

  // Returns notes for a specific class+board, merging overrides on top
  const getNotes = useCallback(
    (classId, board) => {
      const key = `class${classId}`;
      const base = baseNotes?.[key]?.[board] ?? [];
      const boardOverrides = overrides?.[key]?.[board] ?? {};
      return base.map((note) => ({
        ...note,
        url: boardOverrides[note.id] ?? note.url,
      }));
    },
    [overrides]
  );

  // Update a single subject's PDF URL
  const updateNote = useCallback((classId, board, subjectId, url) => {
    setOverrides((prev) => {
      const key = `class${classId}`;
      const next = {
        ...prev,
        [key]: {
          ...(prev[key] ?? {}),
          [board]: {
            ...(prev[key]?.[board] ?? {}),
            [subjectId]: url,
          },
        },
      };
      saveOverrides(next);
      return next;
    });
  }, []);

  // Clear a single subject's override (revert to placeholder)
  const clearNote = useCallback((classId, board, subjectId) => {
    setOverrides((prev) => {
      const key = `class${classId}`;
      const boardData = { ...(prev[key]?.[board] ?? {}) };
      delete boardData[subjectId];
      const next = {
        ...prev,
        [key]: {
          ...(prev[key] ?? {}),
          [board]: boardData,
        },
      };
      saveOverrides(next);
      return next;
    });
  }, []);

  return (
    <NotesContext.Provider value={{ getNotes, updateNote, clearNote, overrides }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}

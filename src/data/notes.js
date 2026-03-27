// ──────────────────────────────────────────────────────────────────
// NOTES DATA — replace the `url` values with your real Google Drive
// share links or local PDF paths (e.g. /pdfs/class1/cbse/math.pdf)
// ──────────────────────────────────────────────────────────────────

const placeholderPDF = ""; // empty so we can show "Coming Soon"

function buildSubjects(subjects) {
  return subjects.map((s, i) => ({
    id: i + 1,
    title: s,
    description: `Complete notes for ${s}`,
    url: placeholderPDF,
    pages: Math.floor(Math.random() * 60) + 20,
    updatedOn: "Coming Soon",
  }));
}

const CLASS_SUBJECTS = {
  primary: ["Mathematics", "English", "Science", "Social Studies", "Hindi"],
  middle: ["Mathematics", "English", "Science", "Social Studies", "Hindi", "Sanskrit"],
  secondary: [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "History & Civics",
    "Geography",
  ],
};

function getSubjects(cls) {
  if (cls <= 5) return [...CLASS_SUBJECTS.primary];
  if (cls <= 8) return [...CLASS_SUBJECTS.middle];
  return [...CLASS_SUBJECTS.secondary];
}

const BOARDS = ["CBSE", "ICSE", "CHSE"];

const notes = {};
for (let cls = 1; cls <= 10; cls++) {
  notes[`class${cls}`] = {};
  BOARDS.forEach((board) => {
    notes[`class${cls}`][board] = buildSubjects(getSubjects(cls));
  });
}

export default notes;

export function generateId() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
}

export function createNewSideNote(note) {
  const { id, heading, content } = note
  const sideNote = document.createElement("div")
  sideNote.classList.add("sidebar-note")
  sideNote.id = id
  const sideNoteHeading = document.createElement("h3")
  sideNoteHeading.classList.add("sidebar-note-heading")
  sideNoteHeading.innerText = heading
  const sideNoteContent = document.createElement("p")
  sideNoteContent.innerText = content
  sideNote.appendChild(sideNoteHeading)
  sideNote.appendChild(sideNoteContent)
  return sideNote
}

export function getItem(key) {
  if (!window.localStorage) {
    throw new Error("no localStorage support");
  }
  const value = JSON.parse(window.localStorage.getItem(key))
  if (!value || !value.length) {
    const notes = [
      {
        id: generateId(),
        heading: 'Untitled',
        content: "",
      }
    ]
    window.localStorage.setItem(key, JSON.stringify(notes))
    return notes
  }
  return value
};

export function setItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
};
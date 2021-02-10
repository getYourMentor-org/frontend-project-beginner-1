import { darkTheme, lightTheme } from "./theme.js"
import { createNewSideNote, generateId, getItem, setItem } from "./utils.js"

let storedNotes = getItem("notes")
let activeId = ""

const toggle = document.querySelector('input[type="checkbox"]')
const sidebar = document.querySelector(".sidebar")
const newButton = document.querySelector("#btn-new")
const headingDiv = document.querySelector("#heading")
const contentDiv = document.querySelector("#content")
const sidebarNotes = init()

makeNoteActive(storedNotes[0].id)

// set active class to new note and remove from prev note in sidebar
function makeNoteActive(id) {
  if (activeId !== id) {
    const sidebarNote = document.querySelector(`#${id}`)
    const sidebarHeading = document.querySelector(`#${id} > h3`)
    sidebarNote.classList.add("sidebar-note-active")
    sidebarHeading.classList.add("sidebar-note-heading-active")
    if (activeId) {
      const oldNote = document.querySelector(`#${activeId}`)
      const oldHeading = document.querySelector(`#${activeId} > h3`)
      if (oldNote && oldHeading) {
        oldNote.classList.remove("sidebar-note-active")
        oldHeading.classList.remove("sidebar-note-heading-active")
      }
    }
    activeId = id
    const activeNote = storedNotes.find(note => note.id === activeId)
    if (activeNote) {
      const { heading, content } = activeNote
      headingDiv.value = heading
      contentDiv.innerText = content
    }
  }
}


// initialize sidebar and set first note as active
function init() {
  const fragment = new DocumentFragment()
  storedNotes.forEach((note) => {
    fragment.appendChild(createNewSideNote(note))
  })
  sidebar.insertBefore(fragment, newButton)
  return document.querySelectorAll(".sidebar-note")
}

// change theme on toggle 
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    darkTheme()
  } else {
    lightTheme()
  }
})

// set note clicked on sidebar as active
for (const sidebarNote of sidebarNotes) {
  sidebarNote.addEventListener("click", () => {
    const { id } = sidebarNote
    makeNoteActive(id)
  })
}

// add a new note to localStorage, storedNotes and sidebarNotes
// Also add a event listener (click) which will make it active
newButton.addEventListener("click", () => {
  const newNote = {
    id: generateId(),
    heading: "Untitled",
    content: "", // TODO: add placeholder text 
  }
  storedNotes = [...storedNotes, newNote];
  const newSideNote = createNewSideNote(newNote)
  sidebar.insertBefore(newSideNote, newButton)
  newSideNote.addEventListener('click', () => {
    const { id } = newSideNote
    makeNoteActive(id)
  })
  newSideNote.click()
  setItem("notes", storedNotes)
})

// delete note from localStorage, sidebarNotes and storedNotes
const deleteButton = document.querySelector("#btn-delete")
deleteButton.addEventListener("click", () => {
  const note = storedNotes.find(note => note.id === activeId)
  const nextId = storedNotes[(storedNotes.indexOf(note) + 1) % (storedNotes.length)].id
  const currNote = document.querySelector(`#${activeId}`)
  storedNotes = storedNotes.filter(note => note.id != activeId)
  headingDiv.value = ""
  contentDiv.innerText = ""
  activeId = ""
  makeNoteActive(nextId)
  currNote.remove()
  setItem("notes", storedNotes)
})

// save changes in current note to localStorage and sidebar note
const saveButton = document.querySelector("#btn-save")
saveButton.addEventListener("click", () => {
  const heading = headingDiv.value;
  const content = contentDiv.innerText
  storedNotes = storedNotes.map(note => (
    note.id === activeId ?
      ({
        id: activeId,
        heading,
        content,
      }) : note
  ))
  const sideNoteHeading = document.querySelector(`#${activeId} > h3`)
  const sideNoteContent = document.querySelector(`#${activeId} > p`)
  sideNoteHeading.innerText = heading
  sideNoteContent.innerText = content
  setItem("notes", storedNotes)
})

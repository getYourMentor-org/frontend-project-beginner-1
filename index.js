import { darkTheme, lightTheme } from "./theme.js"

// fetch from local storage and display
// set first as active
let storedNotes = JSON.parse(localStorage.getItem("notes"))
let activeId = ""
const sidebar = document.querySelector(".sidebar")
const fragment = new DocumentFragment()
storedNotes.forEach((note, i) => {
  const { heading, content, id } = note
  const sideNote = document.createElement("div")
  sideNote.classList.add("sidebar-note")
  sideNote.id = id
  const sideNoteHeading = document.createElement("h3")
  sideNoteHeading.classList.add("sidebar-note-heading")
  sideNoteHeading.innerText = heading
  if (i === 0) {
    activeId = id
    sideNote.classList.add("sidebar-note-active")
    sideNoteHeading.classList.add("sidebar-note-heading-active")
  }
  const sideNoteContent = document.createElement("p")
  sideNoteContent.innerText = content.slice(0, 50) + "..."
  sideNote.appendChild(sideNoteHeading)
  sideNote.appendChild(sideNoteContent)
  fragment.appendChild(sideNote)
})
const newButton = document.querySelector(".btn-new")
sidebar.insertBefore(fragment, newButton)
const headingDiv = document.querySelector("#heading")
const contentDiv = document.querySelector("#content")
heading.value = storedNotes[0].heading
content.innerText = storedNotes[0].content

// set Theme
const toggle = document.querySelector('input[type="checkbox"]')
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    darkTheme()
  } else {
    lightTheme()
  }
})

//set active note
const sidebarNotes = document.querySelectorAll(".sidebar-note")
for (const sidebarNote of sidebarNotes) {
  sidebarNote.addEventListener("click", () => {
    const { id } = sidebarNote
    if (activeId !== id) {
      const sidebarHeading = document.querySelector(`#${id} > h3`)
      const oldNote = document.querySelector(`#${activeId}`)
      const oldHeaading = document.querySelector(`#${activeId} > h3`)
      sidebarNote.classList.add("sidebar-note-active")
      sidebarHeading.classList.add("sidebar-note-heading-active")
      oldNote.classList.remove("sidebar-note-active")
      oldHeaading.classList.remove("sidebar-note-heading-active")
      activeId = id
      const { heading, content } = storedNotes.find(note => note.id === activeId)
      headingDiv.value = heading
      contentDiv.innerText = content
    }
  })
}

// new Note
newButton.addEventListener("click", () => {
  // add to array and local storage
  // make the note active
  // localStorage.setItem("notes", notes)
})

// delete Note
const deleteButton = document.querySelector(".btn-delete")
deleteButton.addEventListener("click", () => {
  // delete from array and local storage
  // localStorage.setItem("notes", notes)
  const note = storedNotes.find(note => note.id === activeId)
  const id = storedNotes[(storedNotes.indexOf(note) + 1) % (storedNotes.length)].id
  const currNote = document.querySelector(`#${activeId}`)
  currNote.remove()
  storedNotes = storedNotes.filter(note => note.id != activeId)
  const newActiveNote = document.querySelector(`#${id}`)
  const newActiveHeading = document.querySelector(`#${id} > h3`)
  newActiveNote.classList.add("sidebar-note-active")
  newActiveHeading.classList.add("sidebar-note-heading-active")
  activeId = id
  const { heading, content } = storedNotes.find(note => note.id === activeId)
  headingDiv.value = heading
  contentDiv.innerText = content
  localStorage.setItem("notes", JSON.stringify(storedNotes))
})

//save Note
// update local storage and storedNotes for titlw and content

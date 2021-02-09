export function generateId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
}

export function shortenContent(content) {
    return content.length > 53 ?
        content.slice(0, 50) + "..." :
        content
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
    sideNoteContent.innerText = shortenContent(content)
    sideNote.appendChild(sideNoteHeading)
    sideNote.appendChild(sideNoteContent)
    return sideNote
}
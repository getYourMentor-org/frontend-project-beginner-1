# GetYourMentor Frontend project - Beginner/1

## DEMO LINK
https://noteshd.netlify.app/

## Target

Build a note taking app.

## Design
https://collectui.com/designers/adriengervaix/notes-widget

## Specifications
- As show in the design, the app should provide support for creating multiple notes.
- Within a note, you can write any text.
- Each note should have a "title" and the actual "note".
- You should be able to save any note.
- Notes get saved in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- Left sidebar lists all saved notes...showing their title and first few characters.
- Clicking on any note in the left sidebar shows the note in the right side area.
- Left sidebar also has a "New note" button which creates a new note with title as "Untitled Note".

## Added Specifications
- Delete Button to delete currently open note
- Auto delete notes with empty title and content
- Not to allow creation of new note if last added note is empty
- Designed empty state to display when all notes are deleted
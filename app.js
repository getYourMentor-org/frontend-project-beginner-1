var notesList = document.querySelector(".notes-list");
var noteTitle = document.querySelector(".note-title");
var notenote = document.querySelector(".note-note");
var noteItem = document.querySelector(".note-item");
var notenote = document.querySelector(".note-note");

var selectedNote = 0;
var notes = [
  {
    title: `Read EJS`,
    note: `Process to follow: Process to follow: Process to follow:`,
  },
  {
    title: `Learn Kalank on Keyboard`,
    note: `Practice the last part to perfection and then it'll be good to record`,
  },
];

function getNotesCount() {
  return Number(notes.length);
}

function isLastEmpty() {
  if (
    notes[getNotesCount() - 1].title === "" &&
    notes[getNotesCount() - 1].note === ""
  ) {
    return true;
  }
  return false;
}

function titleChangeHandler(idx) {
  var noteTitle = document.querySelector(".note-title");
  idx = Number(idx);
  notes[idx].title = noteTitle.value;
  renderNotesList(false);
}

function noteChangeHandler(idx) {
  var notenote = document.querySelector(".note-note");
  idx = Number(idx);
  notes[idx].note = notenote.value;
  renderNotesList(false);
}

function addNote() {
  var noOfNotes = notes.length;
  if (!isLastEmpty()) {
    notes.push({
      title: "",
      note: "",
    });
  } else {
    alert("You already have an empty note!");
  }
  renderSelectedNote(noOfNotes, false);
}

function deleteEmpty() {
  notes.map((item, idx) => {
    if (item.title === "" && item.note === "") {
      notes.splice(idx, 1);
    }
  });
}

function renderNotesList(clearEmpty = true) {
  clearEmpty && deleteEmpty();
  if (notes.length != 0) {
    var notesListInner = "";
    notes.map((item, idx) => {
      notesListInner += `
      <div id=${idx} class="note-list-item${
        selectedNote === idx ? "-selected" : ""
      }" onClick="renderSelectedNote(this.id)">
          <h3 class="note-list-item-title">${
            item.title === "" ? "Untitled" : item.title
          }</h3>
          <p class="note-list-item-note">${
            item.note === "" ? "Note" : item.note
          }</p>
      </div>
      `;
    });
  } else {
    var notesListInner = `No notes to display`;
  }
  notesList.innerHTML = notesListInner;
}

function renderSelectedNote(idx, clearEmpty = true) {
  idx = Number(idx);
  selectedNote = idx;

  if (idx !== notes.length - 1 && isLastEmpty()) {
    notes.splice(-1, 1);
  }
  var noteItemInner = `
  <input
    id=${idx}
    type="text"
    placeholder="Untitled"
    value="${notes[idx].title}"
    class="note-title"
    onInput="titleChangeHandler(this.id)"/>
  <textarea
    id=${idx}
    type="text"
    placeholder="Note"
    class="note-note"
    onInput="noteChangeHandler(this.id)"
  >${notes[idx].note}</textarea>
  `;

  noteItem.innerHTML = noteItemInner;

  // noteTitle.value = notes[idx].title;
  // notenote.innerHTML = notes[idx].note;
  renderNotesList(clearEmpty);
}

renderSelectedNote(0);

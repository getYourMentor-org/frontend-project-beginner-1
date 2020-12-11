var notesList = document.querySelector(".notes-list");
var noteTitle = document.querySelector(".note-title");
var noteDescription = document.querySelector(".note-description");
var noteItem = document.querySelector(".note-item");
var noteDescription = document.querySelector(".note-description");

var selectedNote = 0;
var notes = [
  {
    title: `Read EJS`,
    description: `Process to follow: Process to follow: Process to follow:`,
  },
  {
    title: `Learn Kalank on Keyboard`,
    description: `Practice the last part to perfection and then it'll be good to record`,
  },
];

function getNotesCount() {
  return Number(notes.length);
}

function isLastEmpty() {
  if (
    notes[getNotesCount() - 1].title === "" &&
    notes[getNotesCount() - 1].description === ""
  ) {
    return true;
  }
  return false;
}

function titleChangeHandler(idx) {
  var noteTitle = document.querySelector(".note-title");
  idx = Number(idx);
  notes[idx].title = noteTitle.value;
  renderNotesList();
}

function descriptionChangeHandler(idx) {
  var noteDescription = document.querySelector(".note-description");
  idx = Number(idx);
  notes[idx].description = noteDescription.value;
  renderNotesList();
}

function addNote() {
  var noOfNotes = notes.length;
  if (!isLastEmpty()) {
    notes.push({
      title: "",
      description: "",
    });
  } else {
    alert("You already have an empty note!");
  }
  renderSelectedNote(noOfNotes);
}

function renderNotesList() {
  if (notes.length != 0) {
    var notesListInner = "";
    notes.map((item, idx) => {
      notesListInner += `
      <div id=${idx} class="note-list-item${
        selectedNote === idx ? "-selected" : ""
      }" onClick="renderSelectedNote(this.id)">
          <h3 class="note-list-item-title">${
            item.title === "" ? "Title" : item.title
          }</h3>
          <p class="note-list-item-description">${
            item.description === "" ? "Description" : item.description
          }</p>
      </div>
      `;
    });
  } else {
    var notesListInner = `No notes to display`;
  }
  notesList.innerHTML = notesListInner;
}

function renderSelectedNote(idx) {
  idx = Number(idx);
  selectedNote = idx;

  if (idx !== notes.length - 1 && isLastEmpty()) {
    notes.splice(-1, 1);
  }
  var noteItemInner = `
  <input
    id=${idx}
    type="text"
    placeholder="Title"
    value="${notes[idx].title}"
    class="note-title"
    onInput="titleChangeHandler(this.id)"/>
  <textarea
    id=${idx}
    type="text"
    placeholder="Note Description"
    class="note-description"
    onInput="descriptionChangeHandler(this.id)"
  >${notes[idx].description}</textarea>
  `;

  noteItem.innerHTML = noteItemInner;

  // noteTitle.value = notes[idx].title;
  // noteDescription.innerHTML = notes[idx].description;
  renderNotesList();
}

renderSelectedNote(0);

var notesList = document.querySelector(".notes-list");
var noteTitle = document.querySelector(".note-title");
var notenote = document.querySelector(".note-note");
var noteItem = document.querySelector(".note-item");
var notenote = document.querySelector(".note-note");
var emptyState = document.querySelector(".empty-state");

var selectedNote = 0;
var notes = [];

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

function initializeNotes() {
  var notesArr = localStorage.getItem(["notes"]);
  if (JSON.parse(notesArr) == null || JSON.parse(notesArr).length === 0) {
    notes = [
      {
        title: "Welcome to NotesHD!",
        note: `This is a sample note, please feel free to edit or delete this note and get started with creating your own notes!`,
      },
    ];
  } else {
    notes = JSON.parse(notesArr);
  }
}

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
  if (noOfNotes != 0) {
    if (!isLastEmpty()) {
      notes.push({
        title: "",
        note: "",
      });
    } else {
      alert("You already have an empty note!");
    }
  } else {
    notes.push({
      title: "",
      note: "",
    });
  }
  renderSelectedNote(noOfNotes, false);
}

function deleteNote(idx) {
  idx = Number(idx);
  notes.splice(idx, 1);
  renderSelectedNote(0);
}

function deleteEmpty() {
  notes.map((item, idx) => {
    if (item.title === "" && item.note === "") {
      notes.splice(idx, 1);
    }
  });
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
  localStorage.setItem(["notes"], JSON.stringify(notes));
}

function renderSelectedNote(idx, clearEmpty = true) {
  idx = Number(idx);
  selectedNote = idx;

  clearEmpty && deleteEmpty();

  var noteItemInner;
  if (notes.length != 0) {
    noteItemInner = `
  <button id=${idx} class="btn delete" onclick="deleteNote(this.id)">
          <img src="/images/trash.svg" class="btn-icon" />
          <p>Delete</p>
        </button>
  <textarea
    id=${idx}
    type="text"
    placeholder="Untitled"
    class="note-title"
    onInput="titleChangeHandler(this.id)">${notes[idx].title}</textarea>
  <textarea
    id=${idx}
    type="text"
    placeholder="Note"
    class="note-note"
    onInput="noteChangeHandler(this.id)"
  >${notes[idx].note}</textarea>
  `;
  } else {
    noteItemInner = `
    <div class="empty-state">
              <img src="images/file.svg" class="image" />
              <h2>No Notes Created</h2>
              <p>Quickly jot that thought down, before it's gone!</p>
            </div>
    `;
  }
  noteItem.innerHTML = noteItemInner;

  renderNotesList();
}

initializeNotes();
renderSelectedNote(0);

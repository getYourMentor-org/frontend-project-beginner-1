var notesList = document.querySelector(".js-notes-list");
var noteItem = document.querySelector(".js-note-item");
var emptyState = document.querySelector(".js-empty-state");

var selectedNoteIndex = 0;
var notes = [];

toggleSwitch = document.querySelector(".theme-switch .toggle-theme-checkbox");

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

if (currentTheme) {
  toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", switchTheme, false);

function initializeNotes() {
  var notesArr = localStorage.getItem("notes");
  notes = JSON.parse(notesArr);
  if (notes === null || notes.length === 0) {
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
  return notes.length;
}

function isLastNoteEmpty() {
  if (
    notes[getNotesCount() - 1].title === "" &&
    notes[getNotesCount() - 1].note === ""
  ) {
    return true;
  }
  return false;
}

function titleChangeHandler(currentIndex) {
  var noteTitle = document.querySelector(".note-title");
  currentIndex = Number(currentIndex);
  notes[currentIndex].title = noteTitle.innerHTML;

  renderNotesList(false);
}

function noteChangeHandler(currentIndex) {
  var notenote = document.querySelector(".js-note-note");
  currentIndex = Number(currentIndex);
  notes[currentIndex].note = notenote.value;
  renderNotesList(false);
}

function addNote() {
  var noOfNotes = notes.length;
  if (noOfNotes) {
    if (!isLastNoteEmpty()) {
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
  renderNoteWithIndex(noOfNotes, false);
}

function deleteNote(currentIndex) {
  currentIndex = Number(currentIndex);
  notes.splice(currentIndex, 1);
  renderNoteWithIndex(0);
}

function deleteEmpty() {
  notes.map((item, currentIndex) => {
    if (item.title === "" && item.note === "") {
      notes.splice(currentIndex, 1);
    }
  });
}

function renderNotesList() {
  if (notes.length != 0) {
    var notesListInner = "";
    notes.map((item, currentIndex) => {
      notesListInner += `
      <div id=${currentIndex} class="note-list-item${
        selectedNoteIndex === currentIndex ? "-selected" : ""
      }" onClick="renderNoteWithIndex(this.id)">
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
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNoteWithIndex(currentIndex, shouldClearEmpty = true) {
  currentIndex = Number(currentIndex);
  selectedNoteIndex = currentIndex;

  shouldClearEmpty && deleteEmpty();

  var noteItemInner;
  if (notes.length != 0) {
    noteItemInner = `
  <button id=${currentIndex} class="btn delete-btn" onclick="deleteNote(this.id)">
          <img src="/images/trash.svg" class="btn-icon" alt="delete current note"/>
          <span>Delete</span>
        </button>
  <div contenteditable="true"
    id=${currentIndex}
    type="text"
    placeholder="Untitled"
    class="note-title div-edit"
    onInput="titleChangeHandler(this.id)">${notes[currentIndex].title}</div>
  <textarea
    id=${currentIndex}
    type="text"
    placeholder="Note"
    class="note-note js-note-note"
    onInput="noteChangeHandler(this.id)"
  >${notes[currentIndex].note}</textarea>
  `;
  } else {
    noteItemInner = `
    <div class="empty-state js-empty-state">
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
renderNoteWithIndex(0);

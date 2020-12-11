var notesList = document.querySelector(".notes-list");
var noteTitle = document.querySelector(".note-title");
var noteDescription = document.querySelector(".note-description");
var noteItem = document.querySelector(".note-item");

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

function renderNotesList() {
  if (notes.length != 0) {
    var notesListInner = "";
    notes.map((item, idx) => {
      notesListInner += `
      <div id=${idx} class="note-list-item${
        selectedNote === idx ? "-selected" : ""
      }" onClick="renderSelectedNote(this.id)">
          <h3 class="note-list-item-title">${item.title}</h3>
          <p class="note-list-item-description">${item.description}</p>
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

  var noteItemInner = `
  <input
    id=${idx}
    type="text"
    placeholder="Title"
    value="${notes[idx].title}"
    class="note-title"/>
  <textarea
    id=${idx}
    type="text"
    placeholder="Note Description"
    class="note-description"
  >${notes[idx].description}</textarea>
  `;

  noteItem.innerHTML = noteItemInner;

  // noteTitle.value = notes[idx].title;
  // noteDescription.innerHTML = notes[idx].description;
  renderNotesList();
}
renderSelectedNote(0);

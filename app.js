var notesList = document.querySelector(".notes-list");

var notes = [
  {
    title: "Read EJS",
    description: `Process to follow:<br/> Process to follow: Process to follow:`,
  },
  {
    title: "Learn Kalank on Keyboard",
    description: `Practice the last part to perfection and then it'll be good to record`,
  },
];

function renderNotesList() {
  if (notes.length != 0) {
    var notesListInner = "";
    notes.map((item, idx) => {
      notesListInner += `
      <div class="note-list-item">
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

renderNotesList();

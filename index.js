import { darkTheme, lightTheme } from "./theme.js";

// fetch from local storage and display
// set first as active
const notes = JSON.stringify([
  {
    heading: "Title1",
    content:
      "Some characters of the note which has a lot. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod.",
  },
  {
    heading: "Title3",
    content:
      "Some characters of the note which has a lot. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod.",
  },
  {
    heading: "Title4",
    content:
      "Some characters of the note which has a lot. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod.",
  },
  {
    heading: "Title5",
    content:
      "Some characters of the note which has a lot. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod.",
  },
  {
    heading: "Title6",
    content:
      "Some characters of the note which has a lot. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod.",
  },
  {
    heading: "Title7",
    content:
      "Some characters of the note which has a lot. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod.",
  },
  {
    heading: "Title8",
    content:
      "Some characters of the note which has a lot. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus optio, quod nihil repellendus iste\n        maiores repellat laudantium? Doloribus maxime odio saepe nam quasi delectus sapiente voluptate, amet,\n        ipsam consectetur quod.",
  },
]);
localStorage.setItem("notes", notes);
const storedNotes = JSON.parse(localStorage.getItem("notes"));
let activeId = "note0";
const sidebar = document.querySelector(".sidebar");
const fragment = new DocumentFragment();
storedNotes.forEach((note, i) => {
  const { heading, content } = note;
  const sideNote = document.createElement("div");
  sideNote.classList.add("sidebar-note");
  sideNote.id = `note${i}`;
  const sideNoteHeading = document.createElement("h3");
  sideNoteHeading.classList.add("sidebar-note-heading");
  sideNoteHeading.innerText = heading;
  if (i === 0) {
    sideNote.classList.add("sidebar-note-active");
    sideNoteHeading.classList.add("sidebar-note-heading-active");
  }
  const sideNoteContent = document.createElement("p");
  sideNoteContent.innerText = content.slice(0, 50) + "...";
  sideNote.appendChild(sideNoteHeading);
  sideNote.appendChild(sideNoteContent);
  fragment.appendChild(sideNote);
});
const newButton = document.querySelector(".btn-new");
sidebar.insertBefore(fragment, newButton);
const heading = document.querySelector("#heading");
const content = document.querySelector("#content");
heading.value = storedNotes[0].heading;
content.innerText = storedNotes[0].content;

// set Theme
const toggle = document.querySelector('input[type="checkbox"]');
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    darkTheme();
  } else {
    lightTheme();
  }
});

//set active note
const sidebarNotes = document.querySelectorAll(".sidebar-note");
for (const sidebarNote of sidebarNotes) {
  sidebarNote.addEventListener("click", () => {
    const { id } = sidebarNote;
    if (activeId !== id) {
      const sidebarHeading = document.querySelector(`#${id} > h3`);
      const oldNote = document.querySelector(`#${activeId}`);
      const oldHeaading = document.querySelector(`#${activeId} > h3`);
      sidebarNote.classList.add("sidebar-note-active");
      sidebarHeading.classList.add("sidebar-note-heading-active");
      oldNote.classList.remove("sidebar-note-active");
      oldHeaading.classList.remove("sidebar-note-heading-active");
      activeId = id;
      heading.value = storedNotes[+activeId.slice(4)].heading;
      content.innerText = storedNotes[+activeId.slice(4)].content;
    }
  });
}

// new Note
newButton.addEventListener("click", () => {
  // add to array and local storage
  // make the note active
});

// delete Note
const deleteButton = document.querySelector(".btn-delete");
deleteButton.addEventListener("click", () => {
  // delete from array and local storage
});

//save Note
// update local storage and storedNotes for titlw and content

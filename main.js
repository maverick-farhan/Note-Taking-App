const addBtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

function updateLCStorage() {
  const textAreaData = document.querySelectorAll("textarea");
  const notesArray = [];
  textAreaData.forEach((data) => {
    return notesArray.push(data.value);
  });

  localStorage.setItem("notesArray", JSON.stringify(notesArray));
}

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note-wrapper");
  const htmlData = `
<div class="operation">
        <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button id="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <br />
        <div class="main-notes ${text ? "" : "hidden"}"></div>
        <textarea class="${
          text ? "hidden" : ""
        }" cols="25" rows="10" wrap="hard"></textarea>

	`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  const editBtn = note.querySelector("#edit");
  const deleteBtn = note.querySelector("#delete");
  const divText = note.querySelector(".main-notes");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  divText.innerHTML = text;

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLCStorage();
  });

  editBtn.addEventListener("click", () => {
    divText.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    divText.innerHTML = value;

    updateLCStorage();
  });

  main.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem("notesArray"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

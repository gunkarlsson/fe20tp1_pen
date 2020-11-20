// VARIABLES
const textarea = document.querySelector("#textarea");
const newDoc = document.querySelector("#new-doc");
const deleteDocButton = document.querySelector("#delete-doc");
const noteTitle = document.querySelector("#note-title");
const favorite = document.querySelector("#favorite-tag");
const tagName = document.querySelector("#tag-name");
const tagButton = document.querySelector("#tag-button");

// OBJECTS
const docDataSkeleton = {
  id: "",
  title: "",
  content: "",
  favorite: false,
  creationDate: "",
  lastSavedDate: "",
  tags: [],
};

// EVENTLISTENERS
newDoc.addEventListener("click", () => {
  // console.log("click");

  createNewDoc();
});

deleteDocButton.addEventListener("click", () => {
  textarea.value = "";

  deleteDoc();
});

// Input event
textarea.addEventListener("input", (e) => {
  // input value in textarea,
  saveDoc();
  // koden som ska sparas till local storage
});

noteTitle.addEventListener("input", (e) => {
  saveDoc();
});

favorite.addEventListener("click", () => {
  saveDoc();
});

tagButton.addEventListener("click", () => {
  saveDoc();
  tagName.value = "";
});

// FUNCTIONS
function saveDoc() {
  // börja fylla docDataSkeleton med textarea & note value
  docDataSkeleton.content = textarea.value;
  docDataSkeleton.title = noteTitle.value;
  docDataSkeleton.favorite = favorite.checked;
  docDataSkeleton.tags.push(tagName.value);

  // kollar om det finns ett creation date, om inte så skapar den datum)
  // genererar även ID genom date object
  // ! gör att tom stärng = false
  if (!docDataSkeleton.creationDate) {
    docDataSkeleton.creationDate = new Date();

    // unique ID generated by timestamp
    docDataSkeleton.id = Date.now();
  }
  docDataSkeleton.lastSavedDate = new Date();
  window.localStorage.setItem(
    docDataSkeleton.id,
    JSON.stringify(docDataSkeleton)
  );
}

function deleteDoc() {
  // remove ID and remove the item
  window.localStorage.removeItem(docDataSkeleton.id);
}

function createNewDoc() {
  // töm textarea för ny yta
  textarea.value = "";
  noteTitle.value = "";
  tagName.value = "";

  // console.log(typeof element);
  for (element in docDataSkeleton) {
    // console.log(element.toString());
    if (element === "tags") {
      // töm tags array
      docDataSkeleton[element] = [];
    } else {
      // övriga blir tom sträng
      docDataSkeleton[element] = "";
    }
  }
  console.log(docDataSkeleton);
}

const noteList = document.querySelector("#note-menu");
let storage = window.localStorage;

for (key in storage) {
  if (window.localStorage.getItem(key) !== null) {
    const docData = JSON.parse(window.localStorage.getItem(key));
    console.log(docData.content);

    createNewMenuItem(docData);
  }
}

function createNewMenuItem(docData) {
  const paragraph = document.createElement("p");
  paragraph.innerHTML = `${docData.content}`;
  noteList.appendChild(paragraph);
}

function tagFavorite(favoriteTag) {}

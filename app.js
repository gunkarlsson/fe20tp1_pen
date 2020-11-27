// VARIABLES
const textarea = document.querySelector("#textarea");
const newDoc = document.querySelector("#new-doc");
const deleteDocButton = document.querySelector("#delete-doc");
const noteTitle = document.querySelector("#note-title");
const favorite = document.querySelector("#favorite-tag");
const tagName = document.querySelector("#tag-name");
const tagButton = document.querySelector("#tag-button");
const noteList = document.querySelector(".note-list");
const newDocButton = document.querySelector(".new-doc");
const editor = document.querySelector(".editor");
const editorBackButton = document.querySelector(".editor-back-button");

//LEFT SIDEBAR
const leftSidebarButton = document.querySelector(".left-sidebar-button");
const leftSidebar = document.querySelector(".left-sidebar");
const leftSidebarCloseButton = document.querySelector(
  ".left-sidebar-close-button"
);

//RIGHT SIDEBAR
const rightSidebarButton = document.querySelector(".right-sidebar-button");
const rightSidebar = document.querySelector(".right-sidebar");
const rightSidebarCloseButton = document.querySelector(
  ".right-sidebar-close-button"
);

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
});

noteTitle.addEventListener("input", (e) => {
  saveDoc();
});
let f = false;
favorite.addEventListener("click", () => {
f= !docDataSkeleton.favorite;
  if( docDataSkeleton.favorite === false){
   favorite.setAttribute ('src','./icons/star.svg')
  } else {
    favorite.setAttribute('src','./icons/star-clicked.svg')
  }
  saveDoc();
});

tagButton.addEventListener("click", () => {
  saveDoc();
  tagName.value = "";
});

// FUNCTIONS

// om ID = 1 finns, visa inget nytt welcome mssg
// om inte ID = 1, kör welcomeMssg

// console.log(localStorage.getItem(1));

// kolla om local storage redan har introtext
// om tomt --> generate welcome mssg
// om redan i local storage --> return false
if(localStorage.getItem(1) !== null ) {
  // kolla om LS tomt
  console.log('försök inte....');
} else {
  generateWelcomeMssg()
}

function saveDoc() {
  console.log(f)
  // automatiskt uppdatera anteckning
  
  // börja fylla docDataSkeleton med textarea & note value
  docDataSkeleton.content = textarea.value;
  docDataSkeleton.title = noteTitle.value;
  docDataSkeleton.tags.push(tagName.value);
docDataSkeleton.favorite = f;
  // kollar om det finns ett creation date, om inte så skapar den datum)
  // genererar även ID genom date object
  // ! gör att tom stärng = false
  if (!docDataSkeleton.id) {
    docDataSkeleton.creationDate = new Date();

    // unique ID generated by timestamp
    docDataSkeleton.id = Date.now();
  }
  docDataSkeleton.lastSavedDate = Date.now();
  window.localStorage.setItem(
    docDataSkeleton.id,
    JSON.stringify(docDataSkeleton)
  );
  
  sortAfterEdited()
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

  for (element in docDataSkeleton) {
    if (element === "tags") {
      // töm tags array
      docDataSkeleton[element] = [];
    } else {
      // övriga blir tom sträng
      docDataSkeleton[element] = "";
    }
  }
}

function loadDoc(docData) {
  textarea.value = docData.content;
  noteTitle.value = docData.title;
  tagName.value = docData.tags;
  favorite.value = docData.favorite;
  docDataSkeleton.id = docData.id;
}

function sortAfterEdited() {
  
  noteList.innerHTML = '';
  const newList = [];
  
  let notes = [];
  for (key in localStorage) {
    if (JSON.parse(localStorage.getItem(key)) !== null) {
      if(JSON.parse(localStorage.getItem(key)).favorite){
        newList.push(JSON.parse(localStorage.getItem(key)));
        

      }else{
        notes.push(JSON.parse(localStorage.getItem(key)));
      }
    }
  }
  notes.sort(function (a, b) {
    return b.lastSavedDate - a.lastSavedDate;
  });
  newList.sort(function (a, b) {
    return b.lastSavedDate - a.lastSavedDate;
  });
  newList.concat(notes);
  notes.forEach(note=>createNewMenuItem(note))
}


sortAfterEdited();

function generateWelcomeMssg () {
    // börja fylla docDataSkeleton med textarea & note value
    docDataSkeleton.content = 'Quire är en multifunktionell anteckningsbok som fungerar direkt i webbläsaren. Den första versionen av tjänsten sparar alla anteckningar lokalt i datorn/webbläsaren och har alltså ingen server eller backend';
    docDataSkeleton.title = 'Welcome to Quire, almost as good as Bear';
    docDataSkeleton.favorite = favorite.checked;
    docDataSkeleton.tags.push(tagName.value);
  
     if (!docDataSkeleton.id) {
      docDataSkeleton.creationDate = new Date();
  
      // unique ID generated by timestamp
      docDataSkeleton.id = 1;
    }
    docDataSkeleton.lastSavedDate = Date.now();
    window.localStorage.setItem(
      docDataSkeleton.id,
      JSON.stringify(docDataSkeleton)
    );
  }

function createNewMenuItem(docData) {
  const noteContainer = document.createElement("li");
  noteContainer.classList.add("note-container");

  noteContainer.addEventListener("click", function () {
    const openItem = JSON.parse(localStorage.getItem(docData.id));
    // console.log(openItem.content);
    editor.style.width = "100%";
    loadDoc(docData);
  });

  //SIDE
  const sideContent = document.createElement("div");
  const sinceEdited = document.createElement("p");
  const starIcon = document.createElement("img");

  sideContent.classList.add("side");
  sinceEdited.classList.add("since-edited");
  starIcon.classList.add("star-icon");
  
//TODO: Fixa if statements som räknar på timmar.
  sinceEdited.innerHTML = Math.floor((Date.now() - docData.lastSavedDate)/ 60000) + 'm';
if(docData.favorite === true) {
  starIcon.setAttribute("src", "icons/star-clicked.svg");
console.log('funkar')
} else {
  starIcon.setAttribute("src", "icons/star.svg");
  console.log('funkar ej')

}


  sideContent.appendChild(sinceEdited);
  sideContent.appendChild(starIcon);

  //MAIN
  const mainContent = document.createElement("div");
  const noteTitle = document.createElement("h2");
  const noteContent = document.createElement("p");

  mainContent.classList.add("main");
  noteTitle.classList.add("note-title");
  noteContent.classList.add("note-content");

  noteTitle.innerHTML = docData.title;
  noteContent.innerHTML = docData.content;

  mainContent.appendChild(noteTitle);
  mainContent.appendChild(noteContent);

  //container för notes och info på vänstra sidan
  //side + main = alla
  noteContainer.appendChild(sideContent);
  noteContainer.appendChild(mainContent);

  noteList.appendChild(noteContainer);
}

leftSidebarButton.addEventListener("click", (event) => {
  leftSidebar.style.width = "100%";
});

leftSidebarCloseButton.addEventListener("click", (event) => {
  leftSidebar.style.width = "0%";
});

newDocButton.addEventListener("click", (event) => {
  editor.style.width = "100%";
});

editorBackButton.addEventListener("click", (event) => {
  editor.style.width = "0%";
});

rightSidebarButton.addEventListener("click", (event) => {
  rightSidebar.style.width = "100%";
});

rightSidebarCloseButton.addEventListener("click", (event) => {
  rightSidebar.style.width = "0%";
});

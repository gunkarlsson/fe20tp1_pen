// VARIABLES
window.localStorage.clear()
const textarea = document.querySelector("#textarea");
const newDoc = document.querySelector("#new-doc");
const deleteDocButton = document.querySelector('#delete-doc');

// OBJECTS
const docData = { id:'',title:'', content:'', favorite: true, creationDate:'', lastSavedDate:'', tags:[],};

// EVENTLISTENERS
newDoc.addEventListener("click", () => {
  console.log("click");
});

deleteDocButton.addEventListener('click', () => {
  textarea.value = '';

  deleteDoc()
});

// Input event
textarea.addEventListener("input", (e) => {
  // input value in textarea,
  saveDoc()
  // koden som ska sparas till local storage
});

// FUNCTIONS
function saveDoc () {
  console.log(textarea.value);
  docData.content = textarea.value;
window.localStorage.setItem('key', JSON.stringify(docData))
}

function deleteDoc () {
  window.localStorage.removeItem('key')
} 
// VARIABLES
const textarea = document.querySelector("#textarea");
const newDoc = document.querySelector("#new-doc");

// EVENTLISTENERS
newDoc.addEventListener("click", () => {
  console.log("click");
});

// Input event
textarea.addEventListener("input", (e) => {
  // input value in textarea,
  // koden som ska sparas till local storage
  console.log(textarea.value);
});

// FUNCTIONS

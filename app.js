// Clean approve comments

// Custom event for triggering the page logic
// const event = new Event('input', {
//   bubbles: true,
//   cancelable: true,
// });

// Cleaning function
function cleanInput(textarea) {
  // Use regex to remove symbols except letters, numbers, spaces, and dashes
  // Update the textarea with the cleaned value
  const regex = /[^a-z0-9\s-]/gmi
  const inputValue = textarea.value;
  textarea.value = inputValue.replace(regex, " ");
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

function watchTextarea() {
  const textarea = document.getElementById("approvalCommentInput");
  if (!textarea) {
    // The textarea element with the ID "approvalCommentInput" doesn't exist yet, wait and try again
    setTimeout(watchTextarea, 500);
    return;
  }
  textarea.addEventListener("input", (e) => {cleanInput(e.target)});
}

// Call the function to start watching the page for the textarea
watchTextarea();
// Clean approve comments

const text =
  "Approved. The number of code or files has changed due to the merge - ";

// Cleaning function
function cleanInput({ target }) {
  // Use regex to remove symbols except letters, numbers, spaces, and dashes
  // Update the textarea with the cleaned value
  const regex = /[^a-z0-9\s-]/gim;
  target.value =
    text +
    target.value
      .replace(regex, " ")
      .replace(/ +(?= )/g, "")
      .trim();
  target.removeEventListener("input", cleanInput);
  target.dispatchEvent(new Event("input", { bubbles: true }));
}

function waitForTextArea() {
  // Wait for the target text area become in place and return it
  const selector = "approvalCommentInput";
  return new Promise((resolve) => {
    const el = document.getElementById(selector);
    if (el != null) {
      return resolve(el);
    }
    const observer = new MutationObserver(() => {
      const el = document.getElementById(selector);
      if (el != null) {
        observer.disconnect();
        resolve(el);
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}

function handleTextArea(textArea) {
  textArea.placeholder = text;
  textArea.addEventListener("input", cleanInput);
}

waitForTextArea().then((res) => handleTextArea(res));

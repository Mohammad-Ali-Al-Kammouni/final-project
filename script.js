const bookmarkForm = document.getElementById("bookmarkForm");
const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const errorMessage = document.getElementById("errorMessage");

const bookmarksContainer = document.getElementById("bookmarksContainer");
const emptyState = document.getElementById("emptyState");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const cardsViewBtn = document.getElementById("cardsViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

let currentTheme = "light";

function validateInputs(title, url) {
  if (!title.trim()) {
    return "Title cannot be empty.";
  }

  const urlPattern = /^https?:\/\/.+/i;
  if (!urlPattern.test(url.trim())) {
    return "URL must start with http:// or https://";
  }

  return null; // valid
}

function updateEmptyState() {
  if (bookmarksContainer.children.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

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

  return null; 
}

function updateEmptyState() {
  if (bookmarksContainer.children.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

function createBookmarkElement(title, url) {
  const item = document.createElement("div");
  item.className = "bookmark-item";

  
  const favIndicator = document.createElement("span");
  favIndicator.className = "favorite-indicator";
  favIndicator.textContent = "";
  item.appendChild(favIndicator);

  
  const header = document.createElement("div");
  header.className = "bookmark-header";

  const titleLink = document.createElement("a");
  titleLink.className = "bookmark-title";
  titleLink.textContent = title;
  titleLink.href = url;
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";

  header.appendChild(titleLink);
  item.appendChild(header);

  
  const urlText = document.createElement("div");
  urlText.className = "bookmark-url";
  urlText.textContent = url;
  item.appendChild(urlText);

  
  const actions = document.createElement("div");
  actions.className = "bookmark-actions";

  const favoriteBtn = document.createElement("button");
  favoriteBtn.type = "button";
  favoriteBtn.className = "action-btn favorite-btn";
  favoriteBtn.innerHTML = "☆ Favorite";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "action-btn delete-btn";
  deleteBtn.textContent = "Delete";

  actions.appendChild(favoriteBtn);
  actions.appendChild(deleteBtn);
  item.appendChild(actions);

  
  let isFavorite = false;
  favoriteBtn.addEventListener("click", () => {
    isFavorite = !isFavorite;
    if (isFavorite) {
      favoriteBtn.classList.add("favorite");
      favoriteBtn.innerHTML = "★ Favorited";
      favIndicator.textContent = "★";
    } else {
      favoriteBtn.classList.remove("favorite");
      favoriteBtn.innerHTML = "☆ Favorite";
      favIndicator.textContent = "";
    }
  });

  
  deleteBtn.addEventListener("click", () => {
    item.remove();
    updateEmptyState();
  });

  return item;
}

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleValue = titleInput.value;
  const urlValue = urlInput.value;

  const error = validateInputs(titleValue, urlValue);
  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = "";
  const bookmarkElement = createBookmarkElement(titleValue.trim(), urlValue.trim());
  bookmarksContainer.prepend(bookmarkElement); 

  
  titleInput.value = "";
  urlInput.value = "";
  titleInput.focus();

  updateEmptyState();
});


themeToggleBtn.addEventListener("click", () => {
  const body = document.body;
  if (currentTheme === "light") {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    currentTheme = "dark";
    themeToggleBtn.textContent = "Light Mode";
  } else {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    currentTheme = "light";
    themeToggleBtn.textContent = "Dark Mode";
  }
});


cardsViewBtn.addEventListener("click", () => {
  bookmarksContainer.classList.remove("list-view");
  bookmarksContainer.classList.add("cards-view");
  cardsViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
});

listViewBtn.addEventListener("click", () => {
  bookmarksContainer.classList.remove("cards-view");
  bookmarksContainer.classList.add("list-view");
  listViewBtn.classList.add("active");
  cardsViewBtn.classList.remove("active");
});


updateEmptyState();

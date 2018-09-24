const API_KEY = "898d3609";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 19;

const searchForm = document.querySelector("#search-form");
const searchField = document.querySelector("#search-field");
const suggestions = document.querySelector("#suggestions");
const content = document.querySelector("#content");
const pagination = document.querySelector("#pagination");
const details = document.querySelector("#details");

const getSearchUrl = (s, page = 1) => {
  return `${API_URL}&s=${s}&page=${page}`;
};

const getInfoUrl = i => `${API_URL}&i=${i}`;

const onSearchReset = () => {
  suggestions.innerHTML = "";
  searchField.focus();
};

function resetUI() {
  content.innerHTML = "";
  pagination.innerHTML = "&nbsp;";
  suggestions.innerHTML = "";
  searchField.focus();
}

function resetDetails() {
  document.removeEventListener("keyup", onEscapeDetails);
  details.classList.remove("is-displayed");
  details.innerHTML = "";
}

// Search form is submitted
//--------------------------------------
function onSearchSubmit(e) {
  e.preventDefault();

  resetUI();
  fetchSearchResults(1);
}

function fetchSearchResults(pageNum) {
  const searchTerm = searchField.value;

  if (searchTerm.length === 0) return;

  suggestions.innerHTML = "";
  content.innerHTML = "";
  content.classList.add("loading");
  updatePagination(pageNum);

  fetch(getSearchUrl(searchTerm, pageNum))
    .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then(data => displaySearchResults(data, searchTerm, pageNum))
    .catch(err => displayError(err));
}

const displaySearchResults = (data, searchTerm, pageNum) => {
  content.classList.remove("loading");

  if (data.Error) {
    return displayError(data.Error);
  }

  const pageCount = Math.ceil(data.totalResults / ITEMS_PER_PAGE);
  suggestions.innerHTML = "";
  content.innerHTML = getMovieHTML(data.Search);
  pagination.innerHTML = getPaginationHTML(searchTerm, pageCount);
  updatePagination(pageNum);
};

function getMovieHTML(movies) {
  if (!movies) return "";

  function makePoster({ Poster, Title, Year, imdbID }) {
    return `
      <a class="movie" href="${getInfoUrl(imdbID)}">
        <img class="movie__poster" src="${Poster}" alt="Movie Poster">
        <p class="movie__title">${Title} (${Year})</p>
      </a>
    `;
  }

  const html = movies.map(makePoster).join("");
  return `<div class="movies">${html}</div>`;
}

function getPaginationHTML(searchTerm, pageCount) {
  function makePageBtn(_, i) {
    const n = i + 1;
    const url = getSearchUrl(searchTerm, n);

    return `
      <a class="pagination__link" href="${url}" data-page=${n}>${n}</button>
    `;
  }

  const more = pageCount > MAX_PAGES
  const pageNum = more ? MAX_PAGES : pageCount;
  const links = Array.from({ length: pageNum }, makePageBtn);

  if(more) links.push(`<a class="pagination__link pagination__link--more" href="#">MORE</button>`)

  return links.join("");
}

// Display additional movie info
//--------------------------------------
function onMovieClick(e) {
  e.preventDefault();

  if (e.target.matches("a.movie")) {
    fetchMovieInfo(e.target.href);
  }
}

function fetchMovieInfo(url) {
  fetch(url)
    .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then(data => displayMovieInfo(data))
    .catch(err => displayError(err));
}

function displayMovieInfo(data) {
  // console.log("onMovieInfo:", data);
  function makeInfo(m) {
    return `
      <div class="details__bg">
        <img src="${m.Poster}">
      </div>
      <div class="details__content">
        <button class="closebtn details__closebtn">
          <span class="visuallyhidden">close</span>
        </button>
        <img class="details__poster" src="${m.Poster}">
        <div class="details__info">
          <h1 class="details__title">${m.Title}</h1>
          <p>${m.Plot}</p>
          <a class="details__imdb" href="https://www.imdb.com/title/${m.imdbID}/">
            <span>IMDB:</span>
            <div class="imdb__stars">
              <span style="width: ${m.imdbRating}em">&nbsp;</span>
            </div>
          </a>
        </div>
      </div>
    `;
  }

  document.addEventListener("keyup", onEscapeDetails);
  details.innerHTML = makeInfo(data);
  details.classList.add("is-displayed");
}

function onEscapeDetails(e) {
  if (e.keyCode === 27) resetDetails();
}

function onCloseDetailsClick(e) {
  if (e.target.matches("button.details__closebtn")) {
    resetDetails();
  }
}

// Typeahead support
//--------------------------------------
function onSearchInput(e) {
  const key = String.fromCharCode(e.keyCode);
  const term = searchField.value;

  // Return if key pressed was no alphanumeric or term is too short
  if (!/[a-zA-Z0-9-_ ]/.test(key)) return;
  if (term.length < 3) return;

  fetch(getSearchUrl(term + "*"))
    .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then(data => displaySuggestions(data.Search))
    .catch(err => displayError(err));
}

function displaySuggestions(data = []) {
  const cb = m => `<a class="suggestions__link" href="#">${m.Title}</a>`;
  const html = data.map(cb).join("");
  suggestions.innerHTML = html;
}

function onSuggestionClick(e) {
  e.preventDefault();

  searchField.value = e.target.textContent;
  fetchSearchResults();
}

// Pagination click handler
//--------------------------------------
function onPageClick(e) {
  e.preventDefault();

  if (e.target.matches("a.pagination__link")) {
    fetchSearchResults(e.target.dataset.page);
  }
}

function updatePagination(pageNum) {
  console.log("updatePagination", pageNum);
  [...pagination.children].forEach(el => {
    +el.dataset.page === pageNum
      ? el.classList.add("pagination__link--current")
      : el.classList.remove("pagination__link--current");
  });
}

//  Handle errors gracefully
//--------------------------------------
function displayError(err) {
  const html = `<div class="error"><p class="error__msg">${err}</p></div>`;
  content.innerHTML = html;
}

//  Bind event handlers
//------------------------------------------------------------------------------
searchForm.addEventListener("reset", onSearchReset);
searchForm.addEventListener("submit", onSearchSubmit);
searchField.addEventListener("keyup", debounce(onSearchInput));
content.addEventListener("click", onMovieClick);
pagination.addEventListener("click", onPageClick);
suggestions.addEventListener("click", onSuggestionClick);
details.addEventListener("click", onCloseDetailsClick);

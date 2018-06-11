const OMBbAPIKey = "aba7af8e";
const form = document.querySelector("#movie-request__form");
const searchInput = form.querySelector("#movie-request__input");
const resultsPlaceholder = document.querySelector("#search-results");
const pagination = document.querySelector("#pagination");
const paginationIndex = pagination.querySelector("#pagination-index");
const nextPage = pagination.querySelector("#next-page");
const prevPage = pagination.querySelector("#prev-page");
const autocompleteList = document.querySelector("#autocomplete");
let page = 1;

// Results pagination
// @param {number} Next page to go
// @parem {number} Total search results
function paginate(page, totalResults) {
  const totalPages = Math.ceil(totalResults / 10);
  if (totalResults > 10) {
    pagination.setAttribute("style", "visibility:visible");
    paginationIndex.innerHTML = ` ${page}/${totalPages}  `;
    if (page <= 1) {
      prevPage.setAttribute("style", "visibility:hidden");
      nextPage.setAttribute("style", "visibility:visible");
    } else if (page > 1 && page !== totalPages) {
      prevPage.setAttribute("style", "visibility:visible");
      nextPage.setAttribute("style", "visibility:visible");
    } else if (page === totalPages) {
      prevPage.setAttribute("style", "visibility:visible");
      nextPage.setAttribute("style", "visibility:hidden");
    }
  } else {
    prevPage.setAttribute("style", "visibility:hidden");
  }
}

// Movie list fetch
// @param {string} Terms to search
// @parem {number} Next page to go
function movieListFetch(searchInput, pageToGo, type = "", year = "") {
  fetch(
    `http://www.omdbapi.com/?s=${searchInput}&apikey=${OMBbAPIKey}&y=${year}&t=${type}&page=${pageToGo}`
  )
    .then(response => response.json())
    .then(data => {
      // Pagination
      paginate(pageToGo, data.totalResults);
      page = page + 1;

      // Movie markup for every search result
      const movieData = data.Search;
      const movieMarkup = `
      ${movieData
        .map(
          movie =>
            `
          <div class="movie-list-wrapper">
            <div class="movie-poster">
              <img src="${
                movie.Poster === "N/A"
                  ? (movie.Poster =
                      "http://via.placeholder.com/150x220?text=image")
                  : movie.Poster
              }" alt="" class="movie-poster__image">
            </div>
            <div class="movie-info">
              <h2 class="movie-info__title">${movie.Title}</h2>
              <div class="movie-info__year"><strong>Year:</strong> ${
                movie.Year
              }</div>
              <a class="movie-info__imdb-link" target="_blank" href="https://www.imdb.com/title/${
                movie.imdbID
              }">IMDb &#8599;</a>
              <button id="movie-info__moreinfo" class="movie-info__moreinfo" data-title="${
                movie.Title
              }">More Info</button>
            </div>
          </div>
          `
        )
        .join("")}
      `;
      resultsPlaceholder.innerHTML = movieMarkup;
    })
    .catch(error => {
      errorDisplay("Nothing found.");
      // console.error(error);
    });
}

// Title details fetch
// @param {string} Movie title
// @param {Object} event object
function movieFetch(title, e) {
  const movieParentNode = e.target.parentNode;
  const movieInfoWrapper = document.querySelector("movie-info");
  fetch(`http://www.omdbapi.com/?t=${title}&apikey=${OMBbAPIKey}`)
    .then(response => {
      // console.warn(response);
      return response.json();
    })
    .then(data => {
      // Show/hide the list
      if (movieParentNode.querySelector(".movie-info__moreinfo-details")) {
        // Remove list
        movieParentNode.querySelector(".movie-info__moreinfo-details").remove();
        // Update button text
        e.target.textContent = "More Info";
      } else {
        // Create list with movie details
        const infoToDisplay = [
          "Genre",
          "Plot",
          "Runtime",
          "Awards",
          "Language"
        ];
        const html = Object.keys(data)
          .map(function(key) {
            if (infoToDisplay.indexOf(key) !== -1) {
              return `<li><strong>${key}</strong>: ${data[key]}</li>`;
            }
          })
          .join("");

        // Update button text
        e.target.textContent = "Close";

        // Append list
        const moreInfoList = document.createElement("ul");
        moreInfoList.setAttribute("class", "movie-info__moreinfo-details");
        moreInfoList.innerHTML = html;
        movieParentNode.append(moreInfoList);
      }
    })
    .catch(error => {
      console.error(error);
      // debugger;
    });
}

// Autocomplete fetch
// @param {string} Movie title
// @param {Object} event object
function searchAutocomplete(title, e) {
  const autocompleteList = document.querySelector("#autocomplete");
  fetch(`http://www.omdbapi.com/?s=${title}&apikey=${OMBbAPIKey}`)
    .then(response => {
      // console.warn(response);
      return response.json();
    })
    .then(data => {
      const html = data.Search.map(movie => {
        return `<li class="autocomplete-item">${movie.Title}</li>`;
      }).join("");

      // Append list
      autocompleteList.innerHTML = html;
    })
    .catch(error => {
      autocompleteList.innerHTML = "<li>No matches found</li>";
      // console.error(error);
      // debugger;
    });
}

// Error display box
// @param {string} Error message to display
function errorDisplay(msg) {
  const errorBox = document.querySelector("#error-box");
  errorBox.textContent = msg;
  errorBox.setAttribute("style", "display:block");
  setTimeout(function() {
    errorBox.setAttribute("style", "display:none");
  }, 5000);
}

// Generate year filter select options
function yearsDropdown() {
  let yearsHTML = ['<option value="">All</option>'];
  for (let i = new Date().getFullYear(); i > 1900; i -= 1) {
    yearsHTML.push(`<option value="${i}">${i}</option>`);
  }
  document.querySelector(
    "#movie-request__filters-year"
  ).innerHTML = yearsHTML.join("");
}

// Form submit event handler
form.addEventListener("submit", function(e) {
  const type = document.querySelector("#movie-request__filters-type").value;
  const year = document.querySelector("#movie-request__filters-year").value;

  e.preventDefault();
  // Reset pagination
  page = 1;
  pagination.setAttribute("style", "visibility:hidden");

  // Fetch results
  movieListFetch(searchInput.value, page, type, year);
});

// Form input/change event handler
form.addEventListener("input", function(e) {
  const autocomplete = document.querySelector("#autocomplete");
  if (e.target.id == "movie-request__input") {
    page = 1;
    pagination.setAttribute("style", "visibility:hidden");
    if (searchInput.value.length > 3) {
      // Fetch results
      searchAutocomplete(searchInput.value, page);
    }
  }
});
// form.addEventListener("change", function(e) {
//   autocompleteList.innerHTML = "";
// });

form.addEventListener("click", function(e) {
  // console.log(e.target.className);
  if (e.target.className == "autocomplete-item") {
    // console.log(e.target.innerText);
    searchInput.value = e.target.innerText;
    // Reset pagination
    page = 1;
    pagination.setAttribute("style", "visibility:hidden");

    autocompleteList.innerHTML = "";

    // Fetch results
    movieListFetch(e.target.innerText, page);
  }
});

// Form filters toggle event handler
form.addEventListener("click", function(e) {
  if (e.target.id == "movie-request__filters-toggle") {
    const filters = document.querySelector("#movie-request__filters-list");
    filters.classList.toggle("hidden");
    yearsDropdown();
  }
});

// More info button event handler
resultsPlaceholder.addEventListener("click", function(e) {
  if (e.target.id == "movie-info__moreinfo") {
    movieFetch(e.target.attributes["data-title"].value, e);
  }
});

// Pagination event handlers
nextPage.addEventListener("click", function() {
  movieListFetch(searchInput.value, page);
});
prevPage.addEventListener("click", function() {
  movieListFetch(searchInput.value, page - 2);
  page = page - 2;
});

function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  return parent.appendChild(element);
}

const body = document.querySelector("body");
const results = document.querySelector(".results");
const submit = document.querySelector(".submit-button");
const searchValue = document.querySelector(".search-input");
const form = document.querySelector(".search-form");

function searchMovie(searchWord) {
  fetch(`http://www.omdbapi.com/?s=${searchWord}&apikey=dd68f9f`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let searchResults = data.Search;
      console.log(searchResults);
      return searchResults.map(function(movie) {
        let movieDiv = createNode("div");
        let movieTitle = createNode("h1");
        let movieYear = createNode("h3");
        let moviePoster = createNode("img");

        movieTitle.textContent = `${movie.Title}`;
        movieYear.textContent = movie.Year;
        moviePoster.src = movie.Poster;
        moviePoster.className = "movie-images";

        append(results, movieDiv);
        append(movieDiv, movieTitle);
        append(movieDiv, movieYear);
        append(movieDiv, moviePoster);
      });
    });
}

searchMovie("");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (searchValue.value !== "") {
    console.log(searchValue.value);

    results.innerHTML = "";

    let showSearch = createNode("h2");
    showSearch.textContent = `Showing results for ${searchValue.value}`;
    append(results, showSearch);

    searchMovie(searchValue.value);
    searchValue.value = "";
  }
});

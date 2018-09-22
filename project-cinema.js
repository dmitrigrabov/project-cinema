function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  return parent.appendChild(element);
}

let page = 1;
const body = document.querySelector("body");
const results = document.querySelector(".results");
const submit = document.querySelector(".submit-button");
const searchValue = document.querySelector(".search-input");
let searchString = "";
const form = document.querySelector(".search-form");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");

function searchMovie(searchWord, page) {
  fetch(`http://www.omdbapi.com/?s=${searchWord}&apikey=dd68f9f&page=${page}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let searchResults = data.Search;
      console.log(searchResults);
      results.innerHTML = "";
      return searchResults.map(function(movie) {
        let movieDiv = createNode("div");
        let movieTitle = createNode("h1");
        let movieYear = createNode("h3");
        let moviePoster = createNode("img");
        // let movieDetails = createNode("p");

        movieTitle.textContent = `${movie.Title}`;

        movieYear.textContent = movie.Year;

        moviePoster.src = movie.Poster;
        moviePoster.className = "movie-images";

        // movieDetails.className = "movie-details--off";
        // movieDetails.textContent = ;

        append(results, movieDiv);
        append(movieDiv, movieTitle);
        append(movieDiv, movieYear);
        append(movieDiv, moviePoster);
      });
    });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (searchValue.value !== "") {
    console.log(searchValue.value);

    results.innerHTML = "";

    let showSearch = createNode("h2");
    showSearch.textContent = `Showing results for ${searchValue.value}`;
    append(results, showSearch);

    searchMovie(searchValue.value);
    searchString = searchValue.value;
    console.log(searchString);
    searchValue.value = "";
    console.log(searchString);
  }
});

next.addEventListener("click", function(event) {
  event.preventDefault();
  page++;
  searchMovie(searchString, page);
});

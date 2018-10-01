// shortcut functions
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
const pageSelectForm = document.querySelector(".pagination-form");
const pageSelect = document.querySelector(".page-select");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const moreDiv = document.querySelector(".more");

//Main fetch function. Gets data, creates Movie tags and adds event listeners.
function searchMovie(searchWord, page) {
  fetch(
    `http://www.omdbapi.com/?s=${searchWord}&apikey=dd68f9f&page=${page}&plot=short`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let searchResults = data.Search;
      results.innerHTML = "";
      return searchResults.map(function(movie) {
        let movieDiv = createNode("div");
        let movieTitle = createNode("h1");
        let moviePoster = createNode("img");
        let more = createNode("div");
        let movieDetails = createNode("p");
        let movieID = movie.imdbID;
        let movieActors = createNode("p");
        let movieDirector = createNode("p");
        let movieRating = createNode("p");

        movieDiv.className = "movie-div";

        movieTitle.textContent = `${movie.Title} (${movie.Year})`;
        movieTitle.className = "movie-title";

        moviePoster.src = movie.Poster;
        moviePoster.className = "movie-images";

        more.textContent = "More...";
        more.className = "more";

        movieDetails.className = "movie-details--off";

        append(results, movieDiv);
        append(movieDiv, movieTitle);
        append(movieDiv, moviePoster);
        append(movieDiv, more);
        append(more, movieActors);
        append(more, movieDirector);
        append(more, movieRating);
        append(more, movieDetails);

        more.addEventListener("click", function(event) {
          event.preventDefault();
          if (movieDetails.className == "movie-details--off") {
            fetch(
              `http://www.omdbapi.com/?i=${movieID}&apikey=dd68f9f&plot=full`
            )
              .then(function(response) {
                return response.json();
              })
              .then(function(data) {
                console.log(data);
                movieActors.textContent = `Cast: ${data.Actors}`;
                if (movie.Director !== "N/A") {
                  movieDirector.textContent = `Directed by: ${data.Director}`;
                }
                movieRating.textContent = `${data.Ratings[0].Source}: ${
                  data.Ratings[0].Value
                }
              ${data.Ratings[1].Source}: ${data.Ratings[1].Value}
              ${data.Ratings[2].Source}: ${data.Ratings[2].Value}`;

                movieDetails.className = "movie-plot";
                movieDetails.textContent = `Plot: ${data.Plot}`;
              });

            movieDetails.classList.toggle("movie-details--on");
          } else if (movieDetails.className == "movie-details--on") {
            movieDetails.classList.toggle("movie-details--off");
          }
        });
      });
    });
}

//Runs specific search.
form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (searchValue.value !== "") {
    // console.log(searchValue.value);

    results.textContent = "";
    results.textContent = `Results for ${searchValue.value}:`;
    let showSearch = createNode("h2");
    showSearch.textContent = `Showing results for ${searchValue.value}`;
    append(results, showSearch);

    searchMovie(searchValue.value);
    searchString = searchValue.value;
    console.log(searchString);
    searchValue.value = "";
  }
});

//pagination
next.addEventListener("click", function(event) {
  event.preventDefault();
  page++;
  searchMovie(searchString, page);
});

previous.addEventListener("click", function(event) {
  event.preventDefault();
  page--;
  searchMovie(searchString, page);
});

// pageSelectForm.addEventListener("submit", function(event) {
//   event.preventDefault();
//   page = page + pageSelect.value;
//   searchMovie(searchString, page);
// });

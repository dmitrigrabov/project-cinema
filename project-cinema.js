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
const moreDiv = document.querySelector(".more");

function searchMovie(searchWord, page) {
  fetch(
    `http://www.omdbapi.com/?s=${searchWord}&apikey=dd68f9f&page=${page}&plot=full`
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
        let movieYear = createNode("h3");
        let moviePoster = createNode("img");
        let more = createNode("div");
        let movieDetails = createNode("p");
        let movieID = movie.imdbID;
        let movieActors = createNode("p");
        let movieDirector = createNode("p");
        let movieRating = createNode("p");

        movieTitle.textContent = `${movie.Title}`;

        movieYear.textContent = movie.Year;

        moviePoster.src = movie.Poster;
        moviePoster.className = "movie-images";

        more.textContent = "More...";
        more.className = "more";

        movieDetails.className = "movie-details--off";

        append(results, movieDiv);
        append(movieDiv, movieTitle);
        append(movieDiv, movieYear);
        append(movieDiv, moviePoster);
        append(movieDiv, more);
        append(more, movieActors);
        append(more, movieDirector);
        append(more, movieRating);
        append(more, movieDetails);

        console.log(movieID);

        more.addEventListener("click", function(event) {
          event.preventDefault();
          fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=dd68f9f&plot=full`)
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              console.log(data);
              movieActors.textContent = `Cast: ${data.Actors}`;
              movieDirector.textContent = `Directed by: ${data.Director}`;
              movieRating.textContent = `${data.Ratings[0].Source}: ${
                data.Ratings[0].Value
              }
              ${data.Ratings[1].Source}: ${data.Ratings[1].Value}
              ${data.Ratings[2].Source}: ${data.Ratings[2].Value}`;
              movieDetails.textContent = `Plot: ${data.Plot}`;
            });
          movieDetails.classList.toggle("movie-details--on");
        });
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

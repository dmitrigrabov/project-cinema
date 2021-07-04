//this are my handles-variables to access html
const form = document.querySelector(".form");
const text = document.querySelector(".userInput");
const submit = document.querySelector(".submitButton");
const movieDiv = document.querySelector("#results");

function parseMovies(movies) {
  return movies
    .map(function(movie) {
      return `
      <div class="latestMovies">
        <a href="https://www.imdb.com/title/${movie.imdbID}">
          <h2 class="Title">${movie.Title}</h2>
          <p class="Year">Release year: ${movie.Year}</p>
        </a>
        <img src="${movie.Poster}">
      </div>
    `;
    })
    .join("");
}

function getMovies(movie) {
  text.value = "";
  movieDiv.innerHTML = "";

  fetch(`http://www.omdbapi.com/?s=${movie}&apikey=b91b4611`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      movieDiv.innerHTML = parseMovies(data.Search);
    })
    .catch(console.log);
}

// adds a listener to the submit button
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const searchQueryValue = text.value;
  getMovies(searchQueryValue);
});

/*
fetch('http movie DataBase').
then (response  convert to response.json))
then (getData and display in HTML)
*/

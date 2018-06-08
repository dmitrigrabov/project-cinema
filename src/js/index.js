const omdbAPIKey = "aba7af8e";
const form = document.querySelector("#movie-request__form");
const movieRequest = form.querySelector("#movie-request__input");
const resultsPlaceholder = document.querySelector("#search-results");

// Movie fetch
function movieFetch(movieRequest) {
  fetch(`http://www.omdbapi.com/?s=${movieRequest}&apikey=${omdbAPIKey}`)
    .then(response => {
      // console.warn(response);
      return response.json();
    })
    .then(data => {
      // Create array from data results
      const movieData = [...data.Search];
      const movieMarkup = `
      ${movieData
        .map(
          movie =>
            // console.log(movie.Title);
            `
          <div class="movie-wrapper">
            <div class="movie-poster">
              <img src="${movie.Poster}" alt="" class="movie-poster__image">
            </div>
            <div class="movie-info">
              <h2 class="movie-info__title">${movie.Title}</h2>
              <span class="movie-info__year">${movie.Year}</span>
              <a target="_blank" href="https://www.imdb.com/title/${
                movie.imdbID
              }">See on IMBD</a>
            </div>
          </div>
          `
        )
        .join("")}
      `;
      resultsPlaceholder.innerHTML = movieMarkup;
      // console.log(movieData);
    })
    .catch(error => {
      console.error(error);
      // debugger;
    });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  movieFetch(movieRequest.value);
});

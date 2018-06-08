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
      const movieData = data.Search;

      const movieMarkup = `
      ${movieData
        .map(
          movie =>
            `
          <div class="movie-wrapper">
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
              <div class="movie-info__year">Year: ${movie.Year}</div>
              <button class="movie-info__moreinfo">More Info</button>
              <a class="movie-info__imdb-link" target="_blank" href="https://www.imdb.com/title/${
                movie.imdbID
              }">See it on Internet Movie Database</a>
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

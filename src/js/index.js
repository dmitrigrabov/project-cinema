const omdbAPIKey = "aba7af8e";
const form = document.querySelector("#movie-request__form");
const movieRequest = form.querySelector("#movie-request__input");
const resultsPlaceholder = document.querySelector("#search-results");

// Movie fetch
function movieListFetch(movieRequest) {
  fetch(`http://www.omdbapi.com/?s=${movieRequest}&apikey=${omdbAPIKey}`)
    .then(response => response.json())
    .then(data => {
      // data results array
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
              }">IMDB</a>
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
      // console.log(movieData);
    })
    .catch(error => {
      console.error(error);
      // debugger;
    });
}

// Form event handler
form.addEventListener("submit", function(e) {
  e.preventDefault();
  movieListFetch(movieRequest.value);
});

// More info button event handler
resultsPlaceholder.addEventListener("click", function(e) {
  if (e.target.id == "movie-info__moreinfo") {
    const movieParentNode = e.target.parentNode;
    const movieInfoWrapper = document.querySelector("movie-info");
    const title = e.target.attributes["data-title"].value;
    fetch(`http://www.omdbapi.com/?t=${title}&apikey=${omdbAPIKey}`)
      .then(response => {
        // console.warn(response);
        return response.json();
      })
      .then(data => {
        // const movieMarkup = `
        //       <div class="movie-wrapper">
        //         <p>${data.Plot}</p>
        //       </div>
        //   `;
        // movieParentNode.append(movieMarkup);
        // console.log(data.Plot);

        // Show/hide the list
        if (movieParentNode.querySelector(".movie-info__moreinfo-details")) {
          // Remove list
          movieParentNode
            .querySelector(".movie-info__moreinfo-details")
            .remove();

          // Update button text
          e.target.textContent = "More Info";
        } else {
          // Create list with movie details
          const infoToDisplay = ["Genre", "Plot", "Runtime", "Awards"];
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
});

const omdbAPIKey = "aba7af8e";
const form = document.querySelector("#movie-request__form");
const movieRequest = form.querySelector("#movie-request__input");

// Movie fetch
function movieFetch(movieRequest) {
  fetch(`http://www.omdbapi.com/?s=${movieRequest}&apikey=${omdbAPIKey}`)
    .then(response => {
      console.warn(response);
      return response.json();
      // debugger;
    })
    .then(data => {
      console.log(data);
      // debugger;
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

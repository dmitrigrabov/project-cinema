const getSubmit = document.querySelector("#form");

function submitHandler(event){
  event.preventDefault();

  // Capture search term
  const getMovie = document.querySelector(".searchTerm");
  const movieToSearch = getMovie.value;

  // Search the api using movieToSearch
  const url = `http://www.omdbapi.com/?s=${movieToSearch}&apikey=a46e4310`;
  fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(data){

      // Add that information to the web page.
      const results = data.Search.map(movie =>
          `<div class="movieCard">
              <h2>
                ${movie.Title}
              </h2>
              <p>
                ${movie.Year}
              </p>
              <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank"><img src=${movie.Poster}></a>
          </div>`
      ).join('')

      const el = document.querySelector(".results");

      return el.innerHTML = results;

    }).catch(function(error){
      // Do something if the search fails.
    });
}

getSubmit.addEventListener("submit", submitHandler);

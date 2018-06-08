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
              <button class="titleButton">${movie.Title}</button>
              <p>
                ${movie.Year}
              </p>
              <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank"><img src=${movie.Poster}></a>
          </div>`
      ).join('');
      getMovie.value = "";

      const el = document.querySelector(".results");

      el.innerHTML = results;

    }).catch(function(error){
      const failState = `
        <div class="noResult">
          <h2>Sorry, that's not in the database.</h2>
          <img src="assets/brokencinema.jpg">
        </div>
      `;

      const el = document.querySelector(".results");
      return el.innerHTML = failState;
    });
}

const getSubmit = document.querySelector("#form");

getSubmit.addEventListener("submit", submitHandler);

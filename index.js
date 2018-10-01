const film = document.querySelector('#find-movie');
const input = document.querySelector("#name");
const results = document.querySelector("#results");

function getMovies(movieName){
  console.log(movieName);
  fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=40ce55c`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      const html = data.Search.map(function(movie){
        return `
          <li>
            <a target="_blank" href="https://www.imdb.com/title/${movie.imdbID}">
              ${movie.Title}
              ,Release Year:${movie.Year}
              <img src="${movie.Poster}">
            </a>
            <button type="button" class="btn-more" data-imdbID=${movie.imdbID}> More details </button>
            <div id="placeholderForMoreDetails"> </div>
          </li>
        `
      }).join('');
      results.innerHTML = html;
    })
    .catch(function(error){
      console.log(error);
    });
}

function addMoreDetails(id, button){
  console.log(id);
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=40ce55c`)
  .then(function(response){
    return response.json();
  })
  .then(function(movieInfo){
    // const details = data.Search.map(function(movieInfo){
      button.nextSibling.nextSibling.innerHTML = `
        <li>
          Director:${movieInfo.Director},
          Actors: ${movieInfo.Actors},
          Country: ${movieInfo.Country},
          Runtimr:${movieInfo.Runtime},
          Awards: ${movieInfo.Awards}
        </li>
      `
  })
  .catch(function(error){
    console.log(error);
  });
}

// Bind event handlers
film.addEventListener('submit', function(event){
  event.preventDefault();
  getMovies(input.value);
});

results.addEventListener('click', function(event){
  if(event.target.matches('[data-imdbID]')){
    addMoreDetails(event.target.dataset.imdbid, event.target)
  }
})

// Debugging
// addMoreDetails("tt0372784")// test call÷

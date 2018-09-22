const baseUrlSearch = "http://www.omdbapi.com/?apikey=305417ec&s=";
const baseUrlSpecific = "http://www.omdbapi.com/?apikey=305417ec&t=";
const filmContainer = document.querySelector(".films");

const formInput = document.querySelector("form");
formInput.addEventListener("submit", function(searchEvent) {
  filmContainer.innerHTML = "";
  searchEvent.preventDefault();
  let searchInput = document.querySelector(".search__input");
  refineUrl(searchInput.value);
});

const refineUrl = search => fetchRefined(`${baseUrlSearch}${search}`);

function fetchRefined(url) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(body => bottleneckFetchedData(body));
}
//prettier-ignore
const bottleneckFetchedData = films => films.Search.forEach(film => createFilmElement(film));

function createFilmElement(singleFilmObject) {
  const movieListElement = document.createElement("li");
  movieListElement.className = "movie__element";

  //prettier-ignore
  movieListElement.innerHTML = `<img class="movie__img" src='${singleFilmObject.Poster}'>
  <h2 class="movie__title">${singleFilmObject.Title}</h2><h2 class="movie__date">(${singleFilmObject.Year})</h2>
  <div class="image__interior">
    <img src="images/question.png" class="more__info">
  </div>`;
  appendIntoDocument(movieListElement);
}

const appendIntoDocument = movie => {
  filmContainer.appendChild(movie);
};

///////////////////////////////////////////////////////

filmContainer.addEventListener("click", function(event) {
  if (event.target.className === "more__info") {
    /*We need the parent node to (more readably) access
        the H2 tag.                                     */
    const superParent = event.target.parentNode.parentNode;
    const filmName = pullFilmName(superParent.childNodes);
    typeSearchFilm(filmName);
  }
});

const pullFilmName = childElementArray => {
  return childElementArray[2].textContent;
};

function typeSearchFilm(filmName) {
  console.log(filmName);
  const url = `${baseUrlSpecific}${filmName}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(body => createInfoPanel(body));
}

async function createInfoPanel(typeSearchedObject) {
  const movieID = await getMovieIDForReview(typeSearchedObject);
  const review = await getReview(movieID);
  const infoPanel = document.createElement("div");
  infoPanel.className = "info__panel";
  infoPanel.innerHTML =
    //prettier-ignore
    `<div class= "close">
    <button class="info__panel__close" onclick ="closeInfoPanel(this)">x</button>
    </div>
    <div class="img__title__date__genre">
      <img src="${typeSearchedObject.Poster}">
      <h1 class="info__panel__title">${typeSearchedObject.Title}</h1>
      <h1 class="info__panel__date">${typeSearchedObject.Year}</h1>
      <p class="genre">${typeSearchedObject.Genre}</p>
    </div>
    <div class="desc">
      <p class="info__panel__description">${typeSearchedObject.Plot}</p>
      <h2>Top Review:</h2>
      <p class="info__panel__review">${await review.content}</p>
      <p class="reviewer">${await review.author}</p>
    </div>
    <div class="director__starring">
      <p class="info__panel__director">Directed by: ${typeSearchedObject.Director}</p>
      <p class="info__panel__starring">Starring: ${typeSearchedObject.Actors}</p>
    </div>
    
    <div class="rating">
        <span class="stars">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </span>
    </div>`;
  //Will need to append it into view.
  const filmContainer = document.querySelector(".display__film");
  filmContainer.appendChild(infoPanel);
}

const closeInfoPanel = closeButton =>
  (closeButton.parentNode.parentNode.innerHTML = "");

async function getMovieIDForReview(filmObject) {
  let movieDBBaseURI = `https://api.themoviedb.org/3/search/movie?api_key=c1eda2d27f7a73d8ca633b6936e5b012&query=`;

  const response = await fetch(`${movieDBBaseURI}${filmObject.Title}`);
  const movieData = await response.json();

  const movie = movieData.results.reduce((acc, current) => {
    if (current.title === filmObject.Title) {
      acc = current.id;
    } else {
      acc = "Review not found...";
    }
    return acc;
  });
  return movie;
}
async function getReview(id) {
  const fullReview = {};
  //prettier-ignore
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=c1eda2d27f7a73d8ca633b6936e5b012`)
  const reviews = await response.json();
  const firstReview = await reviews.results[0];
  await Object.assign(fullReview, firstReview);

  return await fullReview;
}

// function youMayAlsoLike(genre, actors, director, writer){
//     //search for films/tv with the same genre, actors and director
//     //fail? search for films/tv with same genre and actors
//     //fail? search for films with same genre and writer
//     fetch(`${baseUrlSearch`){

//     }
// }

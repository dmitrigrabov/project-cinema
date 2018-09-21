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

function createInfoPanel(typeSearchedObject) {
  const infoPanel = document.createElement("div");
  infoPanel.className = "info__panel";
  infoPanel.innerHTML =
    //prettier-ignore
    `<button class="info__panel__close" onclick ="closeInfoPanel(this)">x</button>
    <img src="${typeSearchedObject.Poster}">
    <h1 class="info__panel__title">${typeSearchedObject.Title}</h1>
    <h1 class="info__panel__date">${typeSearchedObject.Year}</h1>
    <p class="info__panel__description">${typeSearchedObject.Plot}</p>
    <p class="info__panel__director">${typeSearchedObject.Director}</p>
    <p class="info__panel__starring">${typeSearchedObject.Actors}</p>
    <p class="genre">${typeSearchedObject.Genre}</p>
    <div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
    </div>`;

  const filmContainer = document.querySelector(".display__film");
  filmContainer.appendChild(infoPanel);
}

const closeInfoPanel = closeButton => (closeButton.parentNode.innerHTML = "");

const paramsInit = {
  base: 'http://www.omdbapi.com/?apikey=507b4100'
};

const setUrl = (paramsInit, query = '', id = '') => {
  return `${paramsInit.base}&s=${query}&i=${id}`;
};

const initUrl = setUrl(paramsInit, 'Titanic');

const searchFilmBytitle = title => {
  console.log(setUrl(paramsInit, title));
  fetch(setUrl(paramsInit, title))
    .then(response => response.json())
    .then(body => console.log(body) || displaySearchResults(body.Search))
    .catch(error => console.log(error));
};

/*  Search resutls */

const displaySearchResults = films => {
  const searchResults = createElement('div');
  console.log(films);
  films.forEach(film => {
    const filmListing = createFilmSearchListing(
      film.imdbID,
      film.Title,
      film.Year,
      film.Poster
    );
    addElementToParent(searchResults, filmListing);
  });
  const searchResultsWrapper = document.querySelector('#search-results');
  searchResultsWrapper.innerHTML = '';

  addElementToParent(searchResultsWrapper, searchResults);
};

const createFilmSearchListing = (id, title, year, poster) => {
  const filmListing = createArticle('film');
  const filmTitle = createElement('h2', title);
  const releaseYear = createElement('p', year);
  const filmPoster = createImageElement(poster);
  addElementToParent(filmListing, filmTitle);
  console.log(filmListing);
  addElementToParent(filmListing, releaseYear);
  addElementToParent(filmListing, filmPoster);
  console.log(filmListing);
  filmListing.setAttribute('data-ID', id);

  return filmListing;
};

const createArticle = (articleClass = '') => {
  const article = document.createElement('article');
  article.classList.add(articleClass);

  return article;
};

/* film details */

const displayFilmDetails = film => {
  const filmDetails = `<h2>Deets</h2>
<h3 class='film-details__title'>${film.Title}</h3>
<img src="${film.Poster}" alt="poster">
<h4 class="film-details__director">${film.Director}</h4>
<p class="film-details__release-date">${film.Released}</p>
<p class="film-details__rated">${film.Rated}</p>
<p class="film-details__runtime">${film.Runtime}</p>
<p class="film-details__ratings__imdb">${film.imdbRating}</p>
<p class="film-details__plot">${film.Plot}</p>
<ul class="film-details__actors">
    <li class="film-details__actors__actor">Kate Winslet</li>
    <li class="film-details__actors__actor">Leonardo DiCaprio</li>
    <li class="film-details__actors__actor">Billy Zane</li>
</ul>

<ul class="film-details__genres">
    <li class="film-details__genres_genre">Drama</li>
    <li class="film-details__genres_genre">Romance</li>
</ul>`;
  const filmDetailsWrapper = document.querySelector('#film-details');
  filmDetailsWrapper.innerHTML = filmDetails;
};

const getFilmByID = id => {
  console.log(setUrl(paramsInit, '', id));
  fetch(setUrl(paramsInit, '', id))
    .then(response => response.json())
    .then(body => displayFilmDetails(body))
    .catch(error => console.log(error));
};

/* event listeners */

document.querySelector('#search').addEventListener('submit', e => {
  e.preventDefault();
  const query = e.currentTarget.query.value;
  searchFilmBytitle(query);
});

document.querySelector('#search-results').addEventListener('click', e => {
  console.log(e.target.parentNode.attributes);
  const id = e.target.parentNode.attributes[1].nodeValue;
  console.log(id);
  getFilmByID(id);
});

/* utility functions */

const createElement = (type, title = '') => {
  const element = document.createElement(type);
  element.innerHTML = title;

  return element;
};

const createImageElement = url => {
  const image = document.createElement('img');
  image.src = url;

  return image;
};

const addElementToParent = (parent, element) => {
  return parent.appendChild(element);
};

/* init  */

searchFilmBytitle('Titanic');

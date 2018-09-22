import * as storage from './localStorage.js';

const myStorage = window.localStorage;

if (storage.storageAvailable('localStorage')) {
  // localStorage.clear();
  for (let key in myStorage) {
    console.log(key);
  }
  console.log(myStorage);
} else {
  console.log('Please enable local storage to save your favourites.');
}

const paramsInit = {
  base: 'http://www.omdbapi.com/?apikey=507b4100&type=movie'
};

const setUrl = (paramsInit, query = '', id = '') => {
  return `${paramsInit.base}&s=${query}&i=${id}`;
};

const searchFilmBytitle = title => {
  // console.log(setUrl(paramsInit, title));
  fetch(setUrl(paramsInit, title))
    .then(response => response.json())
    .then(body => displaySearchResults(body.Search))
    .catch(error => {
      if (films === undefined) {
        alert('No films match your query, please search again');
      } else {
        alert(error);
      }
    });
};

const getFilmByID = id => {
  // console.log(setUrl(paramsInit, '', id));
  fetch(setUrl(paramsInit, '', id))
    .then(response => response.json())
    .then(body => writeFilmDetails('#film-details', body))
    .catch(error => console.log(error));
};

/*  Search resutls */

const displaySearchResults = films => {
  const searchResults = createElement('div');
  // console.log(films);
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
  // console.log(filmListing);
  addElementToParent(filmListing, releaseYear);
  addElementToParent(filmListing, filmPoster);
  // console.log(filmListing);
  filmListing.setAttribute('data-ID', id);

  return filmListing;
};

const createArticle = (articleClass = '') => {
  const article = document.createElement('article');
  article.classList.add(articleClass);

  return article;
};

/* film details */

const createFilmDetails = film => {
  console.log(film);
  return `<h2>Details</h2>
<h3 class="film-details__title">${film.Title}</h3>
<button id="fav" class="fav" data-id="${film.imdbID}">Like</button>
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
};

const writeFilmDetails = (parent, film) => {
  document.querySelector(parent).innerHTML = createFilmDetails(film);
  setFavButton(film);
};

/* favourites list */
const makeFavourite = id => {
  const favFilm = JSON.parse(myStorage[id]);
  const favourite = document.createElement('li');
  favourite.classList.add('fav-list__film');
  favourite.setAttribute('data-id', id);
  favourite.innerHTML = `
            <span class='fav-list__film__title'>${favFilm['title']}</span>
            <span class='fav-list__film__faved'>${favFilm['favDate']}</span>
            <button class='fav-list__film__remove'>Remove</button>`;
  return favourite;
};

const addToFavourites = (id, e) => {
  const favouriteFilm = makeFavourite(id, e);
  const parent = document.querySelector('#fav-list');
  addElementToParent(parent, favouriteFilm);
};

const getFavourites = data => {
  for (let i = 0; i < data.length; i++) {
    const film = JSON.parse(data.getItem(data.key(i)));
    const favouriteFilm = makeFavourite(film.id);
    const parent = document.querySelector('#fav-list');
    addElementToParent(parent, favouriteFilm);
  }
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

const setFavButton = film => {
  document.querySelector('#fav').addEventListener('click', e => {
    // e.target.classList.toggle('fav--active');
    const date = new Date(Date.now())
      .toDateString()
      .slice(4)
      .split(' ');
    const favData = Object.assign(
      {},
      {
        id: e.target.attributes[2].value,
        title: film.Title,
        isFav: true,
        favDate: `${date[1]} ${date[0]}, ${date[2]}`
      }
    );
    const id = favData.id;
    const details = JSON.stringify(favData);

    myStorage.setItem(id, `${details}`);
    addToFavourites(id, e);
  });
};

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
console.log(myStorage);
getFavourites(myStorage);

// searchFilmBytitle('Kidulthood');

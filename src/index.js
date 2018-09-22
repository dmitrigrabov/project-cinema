import * as storage from './localStorage.js';

const myStorage = window.localStorage;

if (storage.storageAvailable('localStorage')) {
  // localStorage.clear();
  console.log(`You’re all set to save your favourite films`);
} else {
  console.log('Please enable local storage to save your favourites.');
}

const params = {
  base: 'http://www.omdbapi.com/?apikey=507b4100&type=movie',
  pageNum: 1
};

const setUrl = (paramsInit, query = '', id = '') => {
  // console.log(`${paramsInit.base}&page=${params.pageNum}&s=${query}&i=${id}`);
  return `${paramsInit.base}&page=${params.pageNum}&s=${query}&i=${id}`;
};

const searchFilmBytitle = title => {
  fetch(setUrl(params, title))
    .then(response => response.json())
    .then(body => displaySearchResults(body))
    .catch(error => {
      if (films === undefined) {
        alert('No films match your query, please search again');
      } else {
        alert(error);
      }
    });
};

const getFilmByID = id => {
  fetch(setUrl(params, '', id))
    .then(response => response.json())
    .then(body => writeFilmDetails('#film-details', body))
    .catch(error => console.log(error));
};

/*  Search resutls */

const displaySearchResults = films => {
  console.log(films);
  const searchResults = createElement('div');
  films.Search.forEach(film => {
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
  createPagination(films);
};

const createFilmSearchListing = (id, title, year, poster) => {
  const filmListing = createArticle('film');
  const filmTitle = createElement('h2', title);
  const releaseYear = createElement('p', year);
  const filmPoster = createImageElement(poster);
  addElementToParent(filmListing, filmTitle);
  addElementToParent(filmListing, releaseYear);
  addElementToParent(filmListing, filmPoster);
  filmListing.setAttribute('data-ID', id);

  return filmListing;
};

const createArticle = (articleClass = '') => {
  const article = document.createElement('article');
  article.classList.add(articleClass);

  return article;
};

const createPagination = data => {
  const numPages = Math.ceil(Number(data.totalResults) / 10);
  document.querySelector('.page-total').textContent = numPages;
};

const nextPage = document.querySelector('#page-nav .next');
console.log(nextPage);
nextPage.addEventListener('click', e => {
  const currentPageNum = document.querySelector('.page-current');
  const totalPageNum = document.querySelector('.page-total');
  e.preventDefault();
  +currentPageNum.textContent < +totalPageNum.textContent // Prevent next page advancing beyond total no. of pages
    ? params.pageNum++
    : false;

  searchFilmBytitle(params.query);
  currentPageNum.textContent = params.pageNum;
});

const prevPage = document.querySelector('#page-nav .prev');
prevPage.addEventListener('click', e => {
  e.preventDefault();
  params.pageNum > 1 ? params.pageNum-- : false; // Prevent previous page returning negative page number

  searchFilmBytitle(params.query);
  document.querySelector('.page-current').textContent = params.pageNum;
});

/* film details */

const createFilmDetails = film => {
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
  favourite.classList.add('favourites__list__film');
  favourite.setAttribute('data-id', id);
  favourite.innerHTML = `
            <span class='favourites__list__film__title'>${
              favFilm['title']
            }</span>
            <span class='favourites__list__film__faved'>${
              favFilm['favDate']
            }</span>
            <button class='favourites__list__film__remove'>Delete</button>`;
  return favourite;
};

// const addToFavourites = (id, e) => {
//   const favouriteFilm = makeFavourite(id, e);
//   const parent = document.querySelector('#fav-list');
//   addElementToParent(parent, favouriteFilm);
// };

const setFavButton = film => {
  document.querySelector('#fav').addEventListener('click', e => {
    // TODO: highlight favourited film when display details
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
    // addToFavourites(id, e);
    getFavourites(myStorage);
  });
};

const getFavourites = data => {
  const parent = document.querySelector('#favourites__list');
  parent.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    const film = JSON.parse(data.getItem(data.key(i)));
    const favouriteFilm = makeFavourite(film.id);
    addElementToParent(parent, favouriteFilm);
  }
  document.querySelector('#favourites__count').textContent = myStorage.length;
};

/* event listeners */

/* Search */

document.querySelector('#search').addEventListener('submit', e => {
  e.preventDefault();
  const query = e.currentTarget.query.value;
  params.query = query;
  searchFilmBytitle(query);
});

/* Film details */

document.querySelector('#search-results').addEventListener('click', e => {
  const id = e.target.parentNode.dataset.id;
  getFilmByID(id);
});

/* Favourites */

document.querySelector('#favourites').addEventListener('click', e => {
  if (e.target.innerText === 'Delete') {
    const id = e.target.parentNode.dataset.id;
    e.target.parentNode.classList.add('hidden');

    myStorage.removeItem(id);
    document.querySelector('#favourites__count').textContent = myStorage.length;
  } else if (e.target.innerText === 'Delete all') {
    myStorage.clear();
    getFavourites(myStorage);
  }
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
getFavourites(myStorage);

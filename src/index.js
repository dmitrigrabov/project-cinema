import * as storage from './localStorage.js';

const myStorage = window.localStorage;

console.log(window.innerWidth);

window.scrollBy(0, -20);

if (storage.storageAvailable('localStorage')) {
  // localStorage.clear();
  console.log(`You’re all set to save your favourite films`);
  console.log(myStorage);
  console.log(window.innerHeight);
} else {
  console.log('Please enable local storage to save your favourites.');
}

const params = {
  base: 'http://www.omdbapi.com/?apikey=507b4100&type=movie',
  pageNum: 1
};

const setUrl = (paramsInit, query = '', id = '') => {
  console.log(`${paramsInit.base}&page=${params.pageNum}&s=${query}&i=${id}`);
  return `${paramsInit.base}&page=${
    params.pageNum
  }&s=${query}&i=${id}&plot=full`;
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
  searchResults.classList.add('search-results__page');
  searchResults.setAttribute('id', `page-${params.pageNum}`);
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
  const paginationButtons = createPagination(films);
  console.log(paginationButtons);
  addElementToParent(searchResultsWrapper, paginationButtons);
  addPaginationControls();
  if (window.innerWidth > 1064) {
    window.scrollBy({ top: window.innerHeight - 100, behaviour: 'smooth' });
  } else if (window.innerWidth > 767) {
    window.scrollBy({ top: window.innerHeight, behaviour: 'smooth' });
  } else {
    window.scrollBy({ top: window.innerHeight - 60, behaviour: 'smooth' });
  }
};

const createFilmSearchListing = (id, title, year, poster) => {
  const filmListing = createArticle('film');
  // poster === 'N/A' ? (poster = './img/placeholder.jpg') : poster;
  poster === 'N/A'
    ? (poster =
        'https://dummyimage.com/300x400/8a8a8a/ffd900.jpg&text=Sorry,+no+poster+available')
    : poster;
  filmListing.innerHTML = `
  <h2 class="film__title">${title} <span class="film__year">(${year})</span></h2><img class="film__poster" src="${poster}"></img>`;
  filmListing.setAttribute('data-ID', id);

  return filmListing;
};

const createArticle = (articleClass = '') => {
  const article = document.createElement('article');
  article.classList.add(articleClass);

  return article;
};

const createPagination = data => {
  const pagination = createElement('nav');
  const numPages = Math.ceil(Number(data.totalResults) / 10);
  // document.querySelector('.page-total').textContent = numPages;
  pagination.innerHTML = `<nav id="page-nav">
  <button class="btn prev">&larr;</button>
  <p class="page-num">Page <span class="page-current">${
    params.pageNum
  }</span> of <span class="page-total">${numPages}</span></p>
  <button class="btn next">&rarr;</button>`;

  return pagination;
};

const addPaginationControls = () => {
  const nextPage = document.querySelector('#page-nav .next');
  nextPage.addEventListener('click', e => {
    const currentPageNum = document.querySelector('.page-current');
    const totalPageNum = document.querySelector('.page-total');
    e.preventDefault();
    +currentPageNum.textContent < +totalPageNum.textContent // Prevent next page advancing beyond total no. of pages
      ? params.pageNum++
      : false;

    searchFilmBytitle(params.query);
    currentPageNum.textContent = params.pageNum;
    document.querySelector('#film-details').innerHTML = '';
    e.stopPropagation();
  });

  const prevPage = document.querySelector('#page-nav .prev');
  prevPage.addEventListener('click', e => {
    e.preventDefault();
    params.pageNum > 1 ? params.pageNum-- : false; // Prevent previous page returning negative page number

    searchFilmBytitle(params.query);
    document.querySelector('.page-current').textContent = params.pageNum;
    document.querySelector('#film-details').innerHTML = '';
    e.stopPropagation();
  });
};

/* infinite scroll */
const infiniteScroll = () => {
  const trigger = document.querySelector('#');
};

/* film details */

const createFilmDetails = film => {
  return `
  <div class="film-details__wrapper">
<h3 class="film-details__title">${film.Title}</h3>
<button id="fav" class="btn btn__fav" data-id="${
    film.imdbID
  }"><i class="fas fa-heart"></i></button>
<img class="film-details__poster" src="${film.Poster}" alt="poster">
<h4 class="film-details__director">Dir. ${film.Director}</h4>
<p class="film-details__meta">(Released ${film.Year}, dur. ${film.Runtime}, ${
    film.Rated
  })</p>
<p class="film-details__ratings__imdb"><strong>Rating:</strong> ${
    film.imdbRating
  } out of 10</p>
  <h4>Starring</h4>
<p class="film-details__actors">
   ${film.Actors} </p>
<h4>Plot summary</h4>
<p class="film-details__plot">${film.Plot}</p>
</div>`;
};

const writeFilmDetails = (parent, film) => {
  document.querySelector(parent).innerHTML = createFilmDetails(film);
  setFavButton(film);
  if (window.innerWidth > 1068) {
    window.scrollBy({ top: window.innerHeight - 100, behaviour: 'smooth' });
  } else {
    window.scrollBy({ top: window.innerHeight - 70, behaviour: 'smooth' });
  }
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

const setFavButton = film => {
  document.querySelector('#fav').addEventListener('click', e => {
    // TODO: highlight favourited film when display details
    e.currentTarget.classList.add('fav--active');
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

    myStorage.setItem(`${myStorage.length}`, `${details}`);
    // addToFavourites(id, e);
    getFavourites(myStorage);
  });
};

const getFavourites = data => {
  const parent = document.querySelector('#favourites__list');
  parent.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    // if isFav = true
    console.log(data[i]);
    if (data[i].includes('"isFav":true')) {
      const favouriteFilm = makeFavourite(`${i}`);
      parent.insertBefore(favouriteFilm, parent.firstChild);
    }
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
    console.log(e.target);
    const id = e.target.parentNode.dataset.id;
    e.target.parentNode.classList.add('hidden');
    console.log(typeof myStorage);
    console.log(typeof myStorage[id]);
    // const myFilm = JSON.parse(myStorage[id]);
    // myFilm.isFav = false;
    // console.log(myFilm);
    const updatedFav = myStorage[id].replace('isFav":true', 'isFav":false');
    myStorage.setItem(id, updatedFav);
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

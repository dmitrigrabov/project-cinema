import * as storage from './localStorage.js';

const myStorage = window.localStorage;

if (storage.storageAvailable('localStorage')) {
  // localStorage.clear();
  console.log(`You’re all set to save your favourite films`);
  console.log(myStorage);
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
  createPagination(films);
};

const createFilmSearchListing = (id, title, year, poster) => {
  const filmListing = createArticle('film');
  filmListing.innerHTML = `
  <h2 class="film__title">${title}</h2><p class="film__year">${year}</p><img class="film__poster" src="${poster}"></img>`;
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
  // document.querySelector('#page-nav').classList.toggle('hidden');
};

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
});

const prevPage = document.querySelector('#page-nav .prev');
prevPage.addEventListener('click', e => {
  e.preventDefault();
  params.pageNum > 1 ? params.pageNum-- : false; // Prevent previous page returning negative page number

  searchFilmBytitle(params.query);
  document.querySelector('.page-current').textContent = params.pageNum;
});

/* infinite scroll */
const infiniteScroll = () => {
  const trigger = document.querySelector('#');
};

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

const mockResults = {
  Search: [
    {
      Title: 'Titanic',
      Year: '1997',
      imdbID: 'tt0120338',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg'
    },
    {
      Title: 'Titanic II',
      Year: '2010',
      imdbID: 'tt1640571',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTMxMjQ1MjA5Ml5BMl5BanBnXkFtZTcwNjIzNjg1Mw@@._V1_SX300.jpg'
    },
    {
      Title: 'Titanic: The Legend Goes On...',
      Year: '2000',
      imdbID: 'tt0330994',
      Type: 'movie',
      Poster:
        'https://ia.media-imdb.com/images/M/MV5BMTg5MjcxODAwMV5BMl5BanBnXkFtZTcwMTk4OTMwMg@@._V1_SX300.jpg'
    },
    {
      Title: 'Titanic',
      Year: '1953',
      imdbID: 'tt0046435',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SX300.jpg'
    },
    {
      Title: 'Titanic',
      Year: '1996',
      imdbID: 'tt0115392',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTIyNjc0NjgyMl5BMl5BanBnXkFtZTcwMDAzMTAzMQ@@._V1_SX300.jpg'
    },
    {
      Title: 'Raise the Titanic',
      Year: '1980',
      imdbID: 'tt0081400',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BM2MyZWYzOTQtMTYzNC00OWIyLWE2NWItMzMwODA0OGQ2ZTRkXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SX300.jpg'
    },
    {
      Title: 'The Legend of the Titanic',
      Year: '1999',
      imdbID: 'tt1623780',
      Type: 'movie',
      Poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNDU5MTk1MV5BMl5BanBnXkFtZTgwMDk5NDUyMTE@._V1_SX300.jpg'
    },
    {
      Title: 'Titanic',
      Year: '2012–',
      imdbID: 'tt1869152',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTcxNzYxOTAwMF5BMl5BanBnXkFtZTcwNzU3Mjc2Nw@@._V1_SX300.jpg'
    },
    {
      Title: 'Titanic: Blood and Steel',
      Year: '2012–',
      imdbID: 'tt1695366',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjI2MzU2NzEzN15BMl5BanBnXkFtZTcwMzI5NTU3Nw@@._V1_SX300.jpg'
    },
    {
      Title: 'In Search of the Titanic',
      Year: '2004',
      imdbID: 'tt1719665',
      Type: 'movie',
      Poster:
        'https://ia.media-imdb.com/images/M/MV5BMTAzNjY0NDA2NzdeQTJeQWpwZ15BbWU4MDIwMzc1MzEx._V1_SX300.jpg'
    }
  ],
  totalResults: '190',
  Response: 'True'
};

// searchFilmBytitle(mockResults);

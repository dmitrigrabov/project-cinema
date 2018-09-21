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

const displaySearchResults = films => {
  const searchResults = createElement('div');
  console.log(films);
  films.forEach(film => {
    const filmListing = createFilmSearchListing(
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

const createFilmSearchListing = (title, year, poster) => {
  const filmListing = createArticle('film');
  const filmTitle = createElement('h2', title);
  const releaseYear = createElement('p', year);
  const filmPoster = createImageElement(poster);
  addElementToParent(filmListing, filmTitle);
  console.log(filmListing);
  addElementToParent(filmListing, releaseYear);
  addElementToParent(filmListing, filmPoster);

  return filmListing;
};

const createArticle = (articleClass = '') => {
  const article = document.createElement('article');
  article.classList.add(articleClass);

  return article;
};

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

const createFilmDetails = (title, year, poster) => {
  document.create;
};

searchFilmBytitle('Titanic');

// const cleanSearchResults = array => {
//   console.log(array.map(film => dataFilterFilm(film)));
// };

// const dataFilterFilm = data => {
//   const filteredData = Object.assign(
//     {},
//     { title: data.Title, year: data.Year, poster: data.Poster }
//   );
//   return filteredData;
// };

/* event listeners */

const searchForm = document.querySelector('#search');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = e.currentTarget.query.value;
  searchFilmBytitle(query);
});

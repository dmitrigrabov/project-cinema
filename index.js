//Initialize: global variables
let page = 1;

//Initialize: HTML element references
const formRef = document.querySelector('.search__form');
const resultsRef = document.querySelector('.results');
const favouritesRef = document.querySelector('.favs');

//Initialize: local storage
const myStorage = window.localStorage;

//Initialize: populate favourites
refreshFavourites();

//Event listeners: click on document
document.addEventListener('click', event => {
    if (event.target.matches('.result')) fetchDetails(event.target.getAttribute('data-id'));
    if (event.target.matches('.nav__prev')) prevButtonPressed(event);
    if (event.target.matches('.nav__next')) nextButtonPressed(event);
    if (event.target.matches('.fav__up')) moveFavouriteUp(event.target.getAttribute('data-id'));
    if (event.target.matches('.fav__down')) moveFavouriteDown(event.target.getAttribute('data-id'));
    if (event.target.matches('.fav__delete')) removeFromFavourites(event.target.parentNode.getAttribute('data-id'));
});

//Event listeners: submit on form
formRef.addEventListener('submit', submitSearch);

//Event listeners: favourite checkboxes
document.addEventListener('change', event => {
    if (event.target.matches('.result__checkbox')) {
        if (event.target.checked) addToFavourites(event.target.getAttribute('data-id'));
        else removeFromFavourites(event.target.getAttribute('data-id'));
    }
});

function moveFavouriteUp(imdbID) {
    let currentFavs = JSON.parse(myStorage.favourites);
}

function moveFavouriteDown(imdbID) {
    let currentFavs = JSON.parse(myStorage.favourites);
}

//Functions: reload favourites HTML elements from local storage
function refreshFavourites() {
    if (JSON.parse(myStorage.favourites) !== null) {
        favouritesRef.innerHTML = '';
        JSON.parse(myStorage.favourites).forEach(fav => {
            favouritesRef.appendChild(generateFavourite(fav.imdbID, fav.Title));
            const checkbox = document.querySelector(`[data-id=${fav.imdbID}] .result__checkbox`);
            if (checkbox !== null ) checkbox.checked = true;
        });
    }
}

//Functions: generate HTML element for favourite
function generateFavourite(imdbID,title) {
    const favourite = document.createElement('div');
    favourite.setAttribute('class','fav');
    favourite.setAttribute('data-id',imdbID);
    favourite.innerHTML =  `<i>${title}</i>
                            <i class="fav__up">Up</i>
                            <i class="fav__down">Down</i> 
                            <i class="fav__delete">Delete</i>`;
    return favourite;
}

//Functions: Add to favourites
function addToFavourites(imdbID) {
    const body = JSON.parse(myStorage.getItem('body'));
    const movieData = body.Search.filter(item => item.imdbID === imdbID)[0];
    let currentFavs = JSON.parse(myStorage.favourites);
    if (currentFavs === null) currentFavs = [movieData];
    else currentFavs.push(movieData);
    myStorage.favourites = JSON.stringify(currentFavs);
    refreshFavourites();
}

//Functions: Remove from favourites
function removeFromFavourites(imdbID) {
    let currentFavs = JSON.parse(myStorage.favourites);
    currentFavs = currentFavs.filter(item => (item.imdbID !== imdbID));
    myStorage.favourites = JSON.stringify(currentFavs);
    const favToUncheck = document.querySelector(`[data-id=${imdbID}] .result__checkbox`);
    if (favToUncheck !== null) favToUncheck.checked = false;
    refreshFavourites();
}

//Functions: search submit
function submitSearch(event) {
    event.preventDefault();
    const searchQuery = formRef.search.value;
    const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&s=${searchQuery}&type=movie`;
    fetchResults(APIQuery);
}

//Functions: next page
function nextButtonPressed(event) {
    event.preventDefault();
    page++;
    const searchQuery = formRef.search.value;
    const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&s=${searchQuery}&page=${page}&type=movie`;
    fetchResults(APIQuery);
}

//Functions: previous page
function prevButtonPressed(event) {
    event.preventDefault();
    if (page > 1) {
        page--;
        const searchQuery = formRef.search.value;
        const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&s=${searchQuery}&page=${page}&type=movie`;
    fetchResults(APIQuery);
    } 
}

//Functions: fetch detailed movie information
function fetchDetails(imdbID) {
    const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&i=${imdbID}`;
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderDetails(body))
    .catch(error => console.log(error));
}

//Functions: render detailed movie information
function renderDetails(body) {
    const detailRef = document.querySelector(`[data-id=${body.imdbID}] .detail`);
    detailRef.innerHTML = `<p class='detail-rated'>${body.Rated}</p>
                        <p class='detail-runtime'>${body.Runtime}</p>
                        <p class='detail-genre'>${body.Genre}</p>
                        <p class='detail-director'>${body.Director}</p>
                        <p class='detail-actors'>${body.Actors}</p>
                        <p class='detail-awards'>${body.Awards}</p>
                        <p class='detail-plot'>${body.Plot}</p>
                        <p class='detail-imdbRating'>${body.imdbRating}</p>`;
}

//Functions: fetch top level movie information
function fetchResults(APIQuery) {
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderResults(body))
    .catch(error => console.log(error));
}

//Functions: render search results
function renderResults(body) {
    myStorage.setItem('body',JSON.stringify(body));
    resultsRef.innerHTML = '';
    body.Search.forEach(item => {
        const result = document.createElement('article');
        result.setAttribute('class','result');
        result.setAttribute('data-id',item.imdbID);
        result.innerHTML = `<h1 data-id=${item.imdbID} class='result result__title'>${item.Title}</h1>
                            <input data-id=${item.imdbID} class='result result__checkbox' type='checkbox'>
                            <h2 data-id=${item.imdbID} class='result result__year'>${item.Year}</h2>
                            <img data-id=${item.imdbID} class='result result__poster' src=${item.Poster}>
                            <div class='detail'></div>`;
        resultsRef.appendChild(result);
    });
    refreshFavourites();
}
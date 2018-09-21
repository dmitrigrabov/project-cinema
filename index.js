//Initialize: global variables
let page = 1;

//Initialize: HTML element references
const formRef = document.querySelector('.search__form');
const resultsRef = document.querySelector('.results');
const favouritesRef = document.querySelector('.favourites');

//Initialize: local storage
const myStorage = window.localStorage;

//Initialize: populate favourites
favouritesRef.innerHTML = myStorage.getItem('favourites');

//Initialize: tick checkboxes of favourites

//Event listeners: click on document
document.addEventListener('click', event => {
    if (event.target.matches('.result')) fetchDetails(event.target.getAttribute('data-id'));
    if (event.target.matches('.nav__prev')) prevButtonPressed(event);
    if (event.target.matches('.nav__next')) nextButtonPressed(event);
});

//Event listeners: submit on form
formRef.addEventListener('submit', submitSearch);

//Event listeners: change on document for checkboxes
document.addEventListener('change', event => {
    if (event.target.matches('.result__checkbox')) {
        if (event.target.checked) addToFavourites(event.target.getAttribute('data-id'));
        else removeFromFavourites(event.target.getAttribute('data-id'));
    }
});

//Functions: Add to favourites
function addToFavourites(imdbID) {
    const body = JSON.parse(myStorage.getItem('body'));
    movieData = body.Search.filter(item => item.imdbID === imdbID)[0];
    console.log(movieData);
    const favourite = document.createElement('li');
    favourite.setAttribute('class','favourite');
    favourite.setAttribute('id',imdbID);
    favourite.innerHTML = movieData.Title;
    favouritesRef.appendChild(favourite);
    myStorage.setItem('favourites',favouritesRef.innerHTML);
}

//Functions: Remove from favourites
function removeFromFavourites(imdbID) {
    console.log(`removed ${imdbID} from favourites`);
    const favouriteToRemove = document.querySelector(`.favourites #${imdbID}`);
    favouritesRef.removeChild(favouriteToRemove);
    myStorage.setItem('favourites',favouritesRef.innerHTML);
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
    console.log(body);
    const detailRef = document.querySelector(`#${body.imdbID} .detail`);
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
    console.log(APIQuery);
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderResults(body))
    .catch(error => console.log(error));
}

//Functions: render search results
function renderResults(body) {
    console.log(body);
    myStorage.setItem('body',JSON.stringify(body));
    resultsRef.innerHTML = '';
    body.Search.forEach(item => {
        const result = document.createElement('article');
        result.setAttribute('class','result');
        result.setAttribute('id',item.imdbID);
        result.setAttribute('data-id',item.imdbID);
        result.innerHTML = `<h1 data-id=${item.imdbID} class='result result__title'>${item.Title}</h1>
                            <h2 data-id=${item.imdbID} class='result result__year'>${item.Year}</h2>
                            <img data-id=${item.imdbID} class='result result__poster' src=${item.Poster}>
                            <div class='detail'></div>`;
        resultsRef.appendChild(result);
        const favCheckbox = document.createElement('input');
        favCheckbox.setAttribute('data-id',item.imdbID);
        favCheckbox.setAttribute('class', 'result result__checkbox');
        favCheckbox.setAttribute('type', 'checkbox');
        const favouriteRef = document.querySelectorAll('.favourite');
        favouriteRef.forEach(fav => {
            if (fav.getAttribute('id') === item.imdbID) favCheckbox.checked = true;
        });
        resultsRef.appendChild(favCheckbox);
    });
}
// variable declaration
const movieSearchForm = document.querySelector('#movieSearchForm');
const movieSearchInput = document.querySelector('#movieSearchInput');
const movieSearchButton = document.querySelector('#moveSearchButton');

const returnedMovies = document.querySelector('#returnedMovies');

const returnedItems = document.querySelectorAll('#returnedMovies > li');

// event listeners
movieSearchForm.addEventListener('submit', submitForm);
returnedItems.addEventListener('click', moreInfo);

// form submission
function createUrl(input) {
    const search = movieSearchInput.value.trim();
    return `http://www.omdbapi.com/?s=${search}&apikey=564a6b07`;
}


// functions
function createNode(element) {
    return document.createElement(element);
}

function resetForm(movieSearchInput) {
    movieSearchInput.value = '';
    movieSearchInput.focus();
}

function display(myJsonData) {
    let movieArray = myJsonData.Search.map(function (movie) {
        return `
            <li>
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">
                    <img src=${movie.Poster}>
                </a>
            </li>
        `;
    }).join('');
    returnedMovies.innerHTML = movieArray;
}

function submitForm(event) {
    event.preventDefault();

    // fetch API call
    fetch(createUrl())
        .then(function (response) {
            return response.json()
        }).then(function (myJsonData) {
            return display(myJsonData);
        }).catch(function (error) {
            console.log('unsuccessful' + error);
        })
    resetForm(movieSearchInput);
}

function moreInfo(event) {
    console.log(event);
}
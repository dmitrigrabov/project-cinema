//e2c4cd31 API Key
const apiKey = "e2c4cd31";

//Global HTML references
const resultsContainer = document.querySelector(".results__container")
const searchForm = document.querySelector(".search__form");
const searchBox = document.querySelector(".search__box");
const pageButtonContainer = document.querySelector(".page__container");
const pageButtons = document.querySelectorAll(".page__button");

//Global variables
let currentSearch = "";

const firstSearch = `http://www.omdbapi.com/?s=star+wars&y=2018&page=1&type=movie&apikey=${apiKey}`

fetchResults(firstSearch);


                                    // INITIAL FETCH AND PAGINATION


//Fetch results function
function fetchResults(url) {
    fetch(url)
    .then(response => response.json())
    .then(function(body){
        resultTemplate(body.Search);
        pagination(body, body.Search);
    })
};

//Automatically paginates per amount of returns
function pagination(totalReturn, returnArr){
    const pagesRequired = Math.ceil(totalReturn.totalResults / returnArr.length);
    for (let i = 1; i <= pagesRequired; i++){
        const button = document.createElement("button");
        button.className = "page__button";
        button.textContent = i;
        pageButtonContainer.appendChild(button);
    }
};




                                        // PAGE POPULATION


//Creates result template
function resultTemplate(arr) {
    let results = arr.map(function(film){
        let poster = (film.Poster === "N/A") ? "images/noimage.png" : film.Poster;
        let movieItem = 
        `<div class="search__result" id="${film.imdbID}">
        <h2>${film.Title}</h2> 
        <button class="fav__button">+</button>
        <p class="movie_date">(${film.Year})</p>
        <img src="${poster}">
        <button class="more__info__button">More details</button>
        </div>
        `;
        return movieItem;
    })
    populateResults(results);
};

//Populates results container
function populateResults(arr) {
    resultsContainer.innerHTML = arr.join().replace(/,/g, " ");
    addFavouriteListener();
    addInfoListener();
};




                                        // SEARCH FUNCTION


//Event listener for search feature
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    currentSearch = searchBox.value;
    updatePage(searchBox.value, 1);
});

//Formats search values for url
function formatSearchTerm(term) {
    return term.split(" ").join("+");
};

                                        // CONTENT CLEARING FUNCTIONS




//Clears page of current results when updated
function clearResults() {
    const previousItems = document.querySelectorAll(".search__result");
    previousItems.forEach(node => {
        node.parentNode.removeChild(node);
    })
};

//Clears current page buttons when updated
function clearPages() {
    const previousPages = document.querySelectorAll(".page__button");
    previousPages.forEach(node => {
        node.parentNode.removeChild(node);
    })
}





                                        // GENERATING NEW URLS



//Event listener for page numbers
pageButtonContainer.addEventListener("click", function(event){
    updatePage(null, event.target.textContent);
});


//Accepts new search term and/or page number and submits new url to fetch function
function updatePage(term, page){
    clearPages();
    clearResults();
    const formattedTerm = (term === null) ? currentSearch : formatSearchTerm(term)
    const searchUrl = `http://www.omdbapi.com/?s=${formattedTerm}&page=${page}&type=movie&apikey=${apiKey}`;
    fetchResults(searchUrl);
};



                                        // MOVIE INFO GENERATOR



//Listener for clicks on movie coontainers to either fetch information or trigger class toggles to hide previously displayed information from view (Only working in part, works the first time and then generates another lot of information, before then triggering toggle again)
function addInfoListener() {
    const moreInfo = document.querySelectorAll(".more__info__button");
    moreInfo.forEach(button => {
        button.addEventListener("click", function(event) {
            if ((Array.from(event.target.parentNode.childNodes).some(node => node.className === "movie__info--closed") === false)) {
                fetchMovieInfo(event.target.parentNode.id);
            } else if ((Array.from(event.target.parentNode.childNodes).some(node => node.className === "movie__info") === false)) {
                fetchMovieInfo(event.target.parentNode.id);
            } else if ((Array.from(event.target.parentNode.childNodes).some(node => node.className === "movie__info--closed") === true)) {
                let infoToggle = document.getElementById(`info${event.target.parentNode.id}`);
                infoToggle.classList.toggle("movie__info");
            } else if ((Array.from(event.target.parentNode.childNodes).some(node => node.className === "movie__info--closed") === true)) {
                let infoToggle = document.getElementById(`info${event.target.parentNode.id}`);
                infoToggle.classList.toggle("movie__info");
            }
        })
    })
}

//Fetches movie information when even is triggered
function fetchMovieInfo(id) {
    const movieUrl = `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    fetch(movieUrl)
    .then(response => response.json())
    .then(body => movieInfoTempate(body));
}

//Creates template for additional infomormation
function movieInfoTempate(movie) {
    const ratings =  movie.Ratings.map(rating => {
        return `<li>${rating.Source}: ${rating.Value}</li>`
    })
    const movieInfo = 
    `
    <div class="movie__info" id="info${movie.imdbID}">
    <p><i>${movie.Genre}</i></p>
    <h3>Director</h3>
    <p>${movie.Director}</p>
    <h3>Written by</h3>
    <p>${movie.Writer}</p>
    <h3>Cast</h3>
    <p>${movie.Actors}</p>
    <h3>Synopsis</h3>
    <p>${movie.Plot}</p>
    <h3>Accolades</h3>
    <p>${movie.Awards}</p>
    <h3>Ratings</h3>
    <ul>${ratings.join().replace(/,/g, " ")}</ul>
    <h3>Run Time</h3>
    <p>${movie.Runtime}</p>
    </div>
    `;
    appendMovieInfo(movieInfo, movie);

}

//Adds movie information to html of target movie's container
function appendMovieInfo(info, movie) {
    const targetMovie = document.getElementById(movie.imdbID);
    targetMovie.innerHTML = targetMovie.innerHTML + info;
}




                                    // FAVOURITE FEATURE



//Event listener for favourite buttons 
function addFavouriteListener() {
    const favButton = document.querySelectorAll(".fav__button");
    favButton.forEach(button => {
        button.addEventListener("click", function(event) {
            const favourite = document.createElement("li");
            favourite.className = "favourite__item"
            favourite.textContent = Array.from(event.target.parentNode.childNodes)[1].textContent;
            appendFavouriteItem(favourite);
        })
    })
}


//Add's favourite item to list
function appendFavouriteItem(item) {
    const favouriteContainer = document.querySelector(".favourites__list");
    favouriteContainer.appendChild(item);
}
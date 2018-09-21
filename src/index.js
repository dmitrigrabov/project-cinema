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
        <h2>${film.Title}</h2> <p>(${film.Year})</p>
        <img src="${poster}">
        </div>
        `;
        return movieItem;
    })
    populateResults(results);
};

//Populates results container
function populateResults(arr) {
    resultsContainer.innerHTML = arr.join().replace(/,/g, " ");
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

resultsContainer.addEventListener("click", function(event) {
    if (event.target.closest(".search__result").classList.contains(".movie__info") === false) {
        fetchMovieInfo(event.target.closest(".search__result").id); 
    } else if (event.target.closest(".search__result").classList.contains(".movie__info") === true){
        console.log("Hello")
    }
})

function fetchMovieInfo(id) {
    const movieUrl = `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    fetch(movieUrl)
    .then(response => response.json())
    .then(body => movieInfoTempate(body));
}

function movieInfoTempate(movie) {
    const ratings =  movie.Ratings.map(rating => {
        return `<li>${rating.Source}: ${rating.Value}</li>`
    })
    const movieInfo = 
    `
    <div class="movie__info".
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


function appendMovieInfo(info, movie) {
    const targetMovie = document.getElementById(movie.imdbID);
    targetMovie.innerHTML = targetMovie.innerHTML + info;
}


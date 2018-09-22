//API RESULTS
// apikey=eabbbb71
// http://www.omdbapi.com/?s=Jaws&apikey=eabbbb71

//initialize values
let searchText = "";
let form = document.querySelector("form");
const initialFetch = `http://www.omdbapi.com/?s=Jaws&apikey=eabbbb71`

//querySelectors
const searchBox = document.querySelector(".search__input");
const moviesParentNode = document.querySelector(".moviesfeed");
const movieDetails = document.querySelector(".moviesfeed__details");

//Initial Fetch
fetchContent(initialFetch);

//Listeners
form.addEventListener("submit", goSearch);

document.addEventListener("click", event => {
    if (event.target.matches(".moviesfeed__btn")) fetchFullArticle(event);
});

// Main search query
function goSearch(event) {
    event.preventDefault();
    searchText = searchBox.value;
    const APIQuery = `http://www.omdbapi.com/?s=${searchText}&apikey=eabbbb71`;
    fetchContent(APIQuery)
}

// Full article query
function fetchFullArticle(event) {
    event.preventDefault();

    let filmID = event.target.dataset.id;
    const APIQuery = `http://www.omdbapi.com/?i=${filmID}&apikey=eabbbb71`;

    document.querySelectorAll('.moviesfeed__btn').forEach(item => {
    let parentSection = item.closest(".moviesfeed__details").getAttribute("id");
        
        if (filmID === parentSection) {
            /// THIS IS WHERE I AM HAVING TROUBLE
            console.log(`This ID`)
            fetchFullContent(APIQuery);
            console.log(`${APIQuery}`);
        }
    });
}

/*
-----------------
DISPLAY TEMPLATES
-----------------
*/
function filmsLayoutSearchResult(item) {
    // fallbacks or empty if data is null TODO
    const title = `${item.Title}`;
    const year = `${item.Year}`;
    const id = `${item.imdbID}`;
    
    const posterurl = `${item.Poster}`
    return `
    <section class="moviesfeed__details" id="${id}">
        <figure class="moviesfeed__poster"><img src="${posterurl}"></figure>
        <header>
            <h2 class="movie__title">${title}</h2>
            <p>${year}</p>
        </header>
        <button class="btn moviesfeed__btn" data-id="${id}">More details<button>
    </section>`;
  };  
function displaySearchList(filmArticles) {
    moviesParentNode.innerHTML = "";
    filmArticles.Search.map(function(item) {
        const article = document.createElement("article");
        article.innerHTML = filmsLayoutSearchResult(item);
        return moviesParentNode.appendChild(article);
    });
}  
function filmsLayoutFilm(item)  {
    // fallbacks or empty if data is null TODO
    const director = `${item.Director}`;
    const plot = `<p>${item.Plot}</p>`;
    const actors = `<p>${item.Actors}</p>`;
    return `<h3>${director}</h3>${plot}${actors}`;
    }
function displayFullFilm(item) {
    console.log(filmsLayoutFilm(item));
    movieDetails.innerHTML = filmsLayoutFilm(item);

    /// THIS IS WHERE I AM HAVING TROUBLE
    return moviesParentNode.appendChild(movieDetails);
}  


/* 
--------------
FETCH REQUESTS
--------------
*/
function fetchContent(APIQuery) {
    fetch(APIQuery)
        .then(function(response) {
        return response.json();
        })
        .then(function(body) {
        displaySearchList(body);
        })
        .catch(function(error) {
        displayErrorToUser("Server failed to return data");
        });
    }

function fetchFullContent(APIQuery) {
    fetch(APIQuery)
        .then(function(response) {
        return response.json();
        })
        .then(function(body) {
        displayFullFilm(body);
        })
        .catch(function(error) {
        displayErrorToUser("Server failed to return data");
        });
    }    

function displayErrorToUser() {};
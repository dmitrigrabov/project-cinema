//API RESULTS
// apikey=eabbbb71
// http://www.omdbapi.com/?s=Jaws&apikey=eabbbb71

//initialize values
let searchText = "";
let form = document.querySelector("form");
const initialFetch = `http://www.omdbapi.com/?s=Lemons&apikey=eabbbb71`

//querySelectors
const searchBox = document.querySelector(".search__input");
const moviesParentNode = document.querySelector(".moviesfeed");

//Initial Fetch
fetchContent(initialFetch);

//Submit Search
form.addEventListener("submit", event => {
    event.preventDefault();
    searchText = searchBox.value;
    const APIQuery = `http://www.omdbapi.com/?s=${searchText}&apikey=eabbbb71`;
    fetchContent(APIQuery)
});

//Event Listeners
document.addEventListener("click", event => {
    if (event.target.matches(".moviesfeed__btn")) {
        fetchFullArticle(event);
    }
});

// Load Full Query
function fetchFullArticle(event) {
    event.preventDefault();
    let filmID = event.target.dataset.id;
    const APIQuery = `http://www.omdbapi.com/?i=${filmID}&apikey=eabbbb71`;
    const moviesButtons = document.querySelectorAll('.moviesfeed__btn');
    const movieDetails = document.querySelectorAll(".moviesfeed__details");
    
    moviesButtons.forEach(item => {
    const parentSection = item.closest(".moviesfeed__full").getAttribute("id"); 
    const parentClass = item.closest(".moviesfeed__full").classList;
    const moviesButton = item.closest(".moviesfeed__btn");
    
        if (filmID === parentSection) {
            
            // FETCHING TOFIX would like to contain as functions but issue with scope
            // fetchFullContent(APIQuery);
            // displayFullFilm(body)

            fetch(APIQuery)
            .then(function(response) {
            return response.json();
            })
            .then(function(body) {
                movieDetails.forEach(movie => {
                 let movieID = movie.dataset.id;
                    if (movieID === parentSection) {
                    movie.innerHTML = filmsLayoutFilm(body);
                    }
                })
            // toggle details NOTE within .then to change when details loaded
            parentClass.toggle('details--open');
            parentClass.contains("details--open") ? moviesButton.textContent = "Hide details" : moviesButton.textContent = "Show details";

            })
            .catch(function(error) {
            displayErrorToUser("Server failed to return data");
            });
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
    // const posterurl = `${item.Poster}`
    // <figure class="moviesfeed__poster"><img src="${posterurl}"></figure>
    return `
        <section class="moviesfeed__full" id="${id}">
        
            <div class="moviesfeed__content">
                <header><h3 class="movie__title">${title} <em>${year}</em></h3></header>
                <button class="btn moviesfeed__btn" data-id="${id}">Show details</button>
            </div>
            <div class="moviesfeed__details" data-id="${id}"></div>
        </section>`;
  };  

function displaySearchList(filmArticles) {
    moviesParentNode.innerHTML = "";
    filmArticles.Search.map(item => {
        const article = document.createElement("article");
        article.innerHTML = filmsLayoutSearchResult(item);
        return moviesParentNode.appendChild(article);
    });
}  
function filmsLayoutFilm(body)  {
    // fallbacks or empty if data is null TODO
    const title = `${body.Title}`;
    const director = `Directed by ${body.Director}`;
    const plot = `<h3>Plot summary</h3><p>${body.Plot}</p>`;
    const actors = `<p><strong>Starring:</strong> ${body.Actors}</p>`;
    return `<h3>${director}</h3>${plot}${actors}`;
}


// function displayFullFilm(body) {
//     const movieDetails = document.querySelectorAll(".moviesfeed__details");
//     movieDetails.forEach(movie => {
        
//         let movieID = movie.dataset.id;
//          if (movieID === parentSection) {
//             movieDetails.innerHTML = filmsLayoutFilm(body);
//          }
//     })
// }  


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

// function fetchFullContent(APIQuery) {
//     fetch(APIQuery)
//         .then(function(response) {
//         return response.json();
//         })
//         .then(function(body) {
//         displayFullFilm(body);
//         })
//         .catch(function(error) {
//         displayErrorToUser("Server failed to return data");
//         });
//     }    

function displayErrorToUser() {};
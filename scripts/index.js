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
    const articleClass = item.closest("article").classList;
    const moviesButton = item.closest(".moviesfeed__btn");
    
        if (filmID === parentSection) {
            
            // FETCHING TOFIX as function calls but scope issue
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
            // toggle details 
            // NOTE inside .then to toggle when details loaded
            parentClass.toggle('details--open');
            articleClass.toggle('active');
            
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
    const posterurl = item.Poster !== "N/A" ? `${item.Poster}` : "";
    return `
        <section class="moviesfeed__full" id="${id}" style="background-image: url(${posterurl});">
            <div class="moviesfeed__content">
                <header class="movie__header"><h3 class="movie__title"><span>${title} <em>${year}</em></span></h3></header>
                <a href="#" class="btn moviesfeed__btn" data-id="${id}">Show details</a>
            </div>
            <div class="moviesfeed__details" data-id="${id}"><a class="closeBtn">X</a></div>
        </section>`;
  };  

function displaySearchList(filmArticles) {
    
    moviesParentNode.innerHTML = "";
    // filter out films without posters
    let searchArray = filmArticles.Search.filter(item => {
        return item.Poster !== "N/A"
        });

    searchArray.map(item => {
        const article = document.createElement("article");
        article.innerHTML = filmsLayoutSearchResult(item);
        return moviesParentNode.appendChild(article);
    });


}  
function filmsLayoutFilm(body)  {
    // fallbacks or empty if data is null TODO
    
    const director = body.Director !== "N/A" ? `<h3>Directed by ${body.Director}</h3>` : "";
    const plot = body.Plot !== "N/A" ? `<p>${body.Plot}</p>` : "";
    const actors = body.Actors !== "N/A" ? `<li><strong>Starring: </strong>${body.Actors}</li>` : "";
    const language = body.Language !== "N/A" ? `<li><strong>Language: </strong>${body.Language}</li>` : "";
    const genre = body.Genre !== "N/A" ? `<li><strong>Genre: </strong>${body.Genre}</li>` : "";
    const guidance = body.Rated !== "N/A" ? `<li><strong>Movie Guidance: </strong>${body.Rated}</li>` : "";
    const rating = body.imdbRating !== "N/A" ? `<p><strong>Cool lemons? </strong>${body.imdbRating}</p>` : "";

    return `<div class="moviesfeed__details--wrap">${director}${plot}<ul class="moviesfeed__details-list">${actors}${language}${genre}${guidance}</ul>${rating}</div>`;
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
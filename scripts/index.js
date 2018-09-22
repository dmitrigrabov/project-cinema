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

//Initial Fetch
fetchContent(initialFetch);

//Submit Search
form.addEventListener("submit", event => {
    event.preventDefault();
    searchText = searchBox.value;
    const APIQuery = `http://www.omdbapi.com/?s=${searchText}&apikey=eabbbb71`;
    fetchContent(APIQuery)
});

//Load Full Content
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
    const movieDetails = document.querySelectorAll(".moviesdetails");
    
    moviesButtons.forEach(item => {
    let parentSection = item.closest(".moviesfeed__full").getAttribute("id"); 
    let buttonClasses = item.classList;
        if (filmID === parentSection) {
            // TOFIX scope of these functions - not sure how to approach
            // fetchFullContent(APIQuery);
            // displayFullFilm(body)

            fetch(APIQuery)
            .then(function(response) {
            return response.json();
            })
            .then(function(body) {
                movieDetails.forEach(movie => {
                console.log(buttonClasses); 
                console.log(movie.classList);  
                movie.classList.add('active');

                let movieID = movie.dataset.id;
                    if (movieID === parentSection) {
                    movie.innerHTML = filmsLayoutFilm(body);
                    }
                })
            })
            .catch(function(error) {
            displayErrorToUser("Server failed to return data");
            });
        }

        // let activeElement =  document.querySelector(".active")
        // if (activeElement !== null) {
        //     activeElement.classList.toggle("active")
        //     }
        //    item.classList.toggle("active")

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
                <header><h2 class="movie__title">${title}</h2><p>${year}</p></header>
                <button class="btn moviesfeed__btn" data-id="${id}">More details</button>
            </div>
            <div class="moviesdetails" data-id="${id}"></div>
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

function filmsLayoutFilm(body)  {
    // fallbacks or empty if data is null TODO
    const title = `${body.Title}`;
    const director = `Director: ${body.Director}`;
    const plot = `<h3>Plot summary</h3><p>${body.Plot}</p>`;
    const actors = `<p><strong>Actors:</strong> ${body.Actors}</p>`;
    return `<h3>${title} : ${director}</h3>${plot}${actors}`;
}


// function displayFullFilm(body) {
//     const movieDetails = document.querySelectorAll(".moviesdetails");
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
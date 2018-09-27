//HTML Element Targets
const parentSearchResult = document.querySelector(".results");
const searchResultNode = document.createElement("li"); 
const searchFunc = document.querySelector(".search__form");

const parentMoreInfoSlider = document.querySelector(".more__info__slider");
const moreInfoNodeAside = document.createElement("li");
const moreInfoNodeSlider = document.createElement("li");
let trailerClip = '';


//I could hardcode this in the html - leaving in for now.
// Default 'Search' view
searchResultNode.innerHTML = `<a href="#">
<img class="default" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" alt="news image"></a>`;
parentSearchResult.appendChild(searchResultNode);


//Search Function

//DMITRI
//const searchFunc = document.querySelector(".search__form")
// const query = searchFunc.value;
//fetchIMDB(url);

searchFunc.addEventListener("submit", event => {
    event.preventDefault();
    
    console.log(event.target['0'].value);
    let url = `https://www.omdbapi.com/?s=${event.target['0'].value}&apikey=73071eff`;
    fetchIMDB(url);
})


//Search result function / index of links/li's

function IMDBData(search) {
    // console.log(search.Search[4].Poster);
    
    search.Search.map((movies) => {
    const searchResultNode = document.createElement("li"); 
    searchResultNode.innerHTML = 
        `<div data-imdb=${movies.imdbID} id="${movies.imdbID}" class="results__wrapper">
        <span class="titles"><h2>${movies.Title}, ${movies.Year}</h2></span>
        <img src="${movies.Poster}" alt="news image"></div><div class="more__info"></div>`;
        console.log(movies.imdbID);
    parentSearchResult.appendChild(searchResultNode);    

//DMITRI

// should go in more info section
// const moviesList = search.Search.map(movieItem => {
//     const isFavourite = favourites.indexOf(movieItem.imdbId) !== -1;

// let button;
//  if (isFavourite){
//     button = //addtofavourites
// } else {
//     button = //removefromfavourites
// }

// return `
//     <div id=""</div>
/* <button class"add-to-favs" data-movie-id="${movieItem.imdbID}">Add to favs</button> */
//     etc
//     `
// });
// joins the string results (below)
// const moviesContainer = document.querySelector(".movies")
// moviesContainer.innerHTML = moviesList.join('');

// const favourites = !favouritesString ? JSON.parse(favouritesString); //global var array - add to top of page. //converts to string
// const favouritesString = localstorage.getItem('favourites'); 

// event listener for favourites
// moviesContainer.addEventlistener('click', event => {
// if(event.target.matches('.add-to-favs')){
//     const movieId = event.target.dataset.movieId; //dataset - grabs any data attribute (classish) on page, plus the text after, removing the kebabcase.
//     addToFavourites(movieID);
// }
// });
//function to store favs
// function addToFavourites(movieId){
//     favourites.push(movieId); //creating favourites array
//     localStorage.setItem('favourites', JSON.stringify(favourites)); //moving favourite array in to local storage. JSON stringify???
// }

// function updateButton((button, movieId){
    button.outerHTML = 
})
//END DMITRI

    //Event listener of individual listed movies - sends URL to fetch for more info

    const filmSelector = document.querySelector(`[data-imdb=${movies.imdbID}]`);
        filmSelector.addEventListener("click", event => {
                let movieURL = `https://www.omdbapi.com/?i=${movies.imdbID}&apikey=73071eff`;
                fetchMoreInfo(movieURL);
                let trailerURL = `https://api.themoviedb.org/3/movie/${movies.imdbID}/videos?api_key=8aed3c92a5c6ef5e792ffaf51ac22616&language=en-US`
                fetchTrailer(trailerURL);  
                let imdbID = movies.imdbID;
                // defunct function to push more info next to relevant film
                // imdbInfo(imdbID)
                // console.log(imdbID);
                toggleSliderOpen();
            });
            });
           }


//Not found movie text display

function notFound(){
    const searchResultNodes = document.createElement("li")
    searchResultNodes.innerHTML = 
        `<div class="oops">Oh dear we cant find that film
        <img class="crying" src="oops.gif">
        </div>`;
    parentSearchResult.appendChild(searchResultNodes);    
};


function notFoundTrailer() {
//TO DO
};


//toggles

function toggleSliderOpen() {
    
    document.querySelector(".more__info__slider").classList.toggle("expanded", true);
   };

function toggleSliderClose() {


   document.querySelector(".more__info__slider").classList.toggle("expanded", false);
   };

 

// Initial Search Fetch
function fetchIMDB(url){
    
    fetch(url) 
    .then(function(response) {
        
        return response.json();
    })
    .then(function(search){
     
        // If unknown result
        if (search.Response === 'False') {
            parentSearchResult.innerHTML = "";
            console.log(search)
            notFound(); 
        }
        else
        {   parentSearchResult.innerHTML = "";
            IMDBData(search);
    
        }
    });

}

//Trailer fetch

function fetchTrailer(trailerURL){
    
    fetch(trailerURL) 
    .then(function(response) {
        
        return response.json();
    })
    .then(function(result){
     
        // If unknown result
        if (result.Response === 'False') {
            // parentSearchResult.innerHTML = "";
            console.log(result)
            notFoundTrailer(); 
        }
        else
        {   
            // parentSearchResult.innerHTML = "";
            trailerVideo(result);
            console.log(result)
        }
    });

}

// fetchTrailer();
function trailerVideo(result){
trailerClip = `https://www.youtube.com/watch?v=${result.results[0].key}`;
};
console.log(trailerClip);
// console.log(fetchTrailer());



//MORE INFO APPEARS UPON CLICK - FETCH

function fetchMoreInfo(movieURL){ //default for now
    
    fetch(movieURL) 
    .then(function(response) {
        
        return response.json();
    })
    .then(function(finder){
     
        // parentMoreInfo.innerHTML = "";

        movieMore(finder);
        // console.log(find);
    });
    // .catch(function(error) {
    //     displayErrorToUser3(`${error} ahhhh server problem`);
    // });
}

// 'More info - detail displayed on page

function movieMore(finder){

//defunct attempt at inserting more info to right of relevant film div

    // function imdbInfo(data){
    //     console.log(data);
    // const parentMoreInfo = document.querySelector(`#${data}`);
    
    // moreInfoNodeAside.innerHTML =
    // `<div data-imdb=${finder.imdbID} class="more__info__aside">
    // <img src="${finder.Poster}" alt="news image">
    // <h3>${finder.Title}</h3>
    // <h2>${finder.Year}</h2>
    // <h2>${finder.Actors}</h2>
    // <h2>${finder.Director}</h2>
    // <h2>${finder.Plot}</h2>
    // <h2>${trailerClip}</h2>
    // </div>`;

    // parentMoreInfo.appendChild(moreInfoNodeAside);

    // }

    moreInfoNodeSlider.innerHTML =
    `<div data-imdb=${finder.imdbID} class="more__info__slider__data">
    <div class="mini__header">
        <img src="${finder.Poster}" alt="news image">
        <ul class="more__info__list">
            <li>${finder.Title}</li>
            <li>${finder.Year}</li>
            <li>${finder.imdbRating}</li>
            <li>${finder.Director}</li>
        </ul>
        <div class="close">X</div>
    </div>
    <div class="plot">${finder.Plot}</div>

    <iframe width="560" height="315" class="trailer" src=${trailerClip} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

    parentMoreInfoSlider.appendChild(moreInfoNodeSlider);

    // X to close slider

 const closeButton = document.querySelector(".close");
 closeButton.addEventListener("click", event => {
     toggleSliderClose();
     });

}





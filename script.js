//HTML Element Targets
const parentSearchResult = document.querySelector(".results");
const searchResultNode = document.createElement("li"); 
const searchFunc = document.querySelector(".search__form");
const parentMoreInfo = document.querySelector(".more__info");
const moreInfoNode = document.createElement("li");
let trailerClip = '';


//I could hardcode this in the html - leaving in for now.
// Default 'Search' view
searchResultNode.innerHTML = `<a href="#">
<img src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" alt="news image"></a>`;
parentSearchResult.appendChild(searchResultNode);


//Search Function

searchFunc.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(event.target['0'].value);
    let url = `http://www.omdbapi.com/?s=${event.target['0'].value}&apikey=73071eff`;
    fetchIMDB(url);
})


//Search result function / index of links/li's

function IMDBData(search) {
    // console.log(search.Search[4].Poster);
    
    search.Search.map((movies) => {
    const searchResultNode = document.createElement("li"); 
    searchResultNode.innerHTML = 
        `<div data-imdb=${movies.imdbID} value="${movies.imdbID}" value="${movies.imdbID}" class="results__wrapper">
        <h3>${movies.Title}</h3>
        <h2>${movies.Year}</h2>
        <img src="${movies.Poster}" alt="news image"></div>`;
        console.log(movies.imdbID);
    parentSearchResult.appendChild(searchResultNode);    

    //Event listener of individual listed movies - sends URL to fetch for more info

    const filmSelector = document.querySelector(`[data-imdb=${movies.imdbID}]`);
        filmSelector.addEventListener("click", event => {
                let movieURL = `http://www.omdbapi.com/?i=${movies.imdbID}&apikey=73071eff`;
                fetchMoreInfo(movieURL);
                let trailerURL = `https://api.themoviedb.org/3/movie/${movies.imdbID}/videos?api_key=8aed3c92a5c6ef5e792ffaf51ac22616&language=en-US`
                fetchTrailer(trailerURL);  
            });
            });
           }


//Not found movie text display

function notFound(){
    const searchResultNodes = document.createElement("li")
    searchResultNodes.innerHTML = 
        `<div>help me</div>`;
    parentSearchResult.appendChild(searchResultNodes);    
};


function notFoundTrailer() {
//TO DO
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
     
        parentMoreInfo.innerHTML = "";

        movieMore(finder);
        // console.log(find);
    });
    // .catch(function(error) {
    //     displayErrorToUser3(`${error} ahhhh server problem`);
    // });
}

// 'More info - detail displayed on page

function movieMore(finder){

    
    moreInfoNode.innerHTML =
    `<div data-imdb=${finder.imdbID} value="${finder.imdbID}" class="results__wrapper">
    <img src="${finder.Poster}" alt="news image">
    <h3>${finder.Title}</h3>
    <h2>${finder.Year}</h2>
    <h2>${finder.Actors}</h2>
    <h2>${finder.Director}</h2>
    <h2>${finder.Plot}</h2>
    <h2>${trailerClip}</h2>
    </div>`;

    parentMoreInfo.appendChild(moreInfoNode);

}

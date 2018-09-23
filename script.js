//HTML Element Targets
const parentSearchResult = document.querySelector(".hi");
const searchResultNode = document.createElement("li"); 
const extraInfo =[];

//I could hardcode this in the html - leaving in for now.
// Default 'Search' view
searchResultNode.innerHTML = `<a href="#">
<img src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" alt="news image"></a>`;
parentSearchResult.appendChild(searchResultNode);


//Search Function

const searchFunc = document.querySelector(".search__form");
searchFunc.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(event.target['0'].value);
    let url = `http://www.omdbapi.com/?s=${event.target['0'].value}&apikey=73071eff`;
    fetchIMDB(url);
})




//Search result function / index of links/li's


function IMDBData(search) {
    console.log(search.Search[4].Poster);
    
    search.Search.map((movies) => {
    const searchResultNode = document.createElement("li"); // make fresh <li>
    searchResultNode.innerHTML = 
        `<div data-imdb=${movies.imdbID} value="${movies.imdbID}" class="indiv"><a class="indiv"  href="#">
        <h3>${movies.Title}</h3>
        <h2>${movies.Year}</h2></a>
        <img src="${movies.Poster}" alt="news image"></div>`;
    parentSearchResult.appendChild(searchResultNode);    
    // here


    // document.querySelector("[data-imdb")

    // Event Listener to fetch more info on Movie - BROKEN

const clickFilm = document.querySelector(".indiv");
clickFilm.addEventListener("click", function(event) {

// console.log(event.target['0'].value);
console.log(event.target);

let URL2 = `http://www.omdbapi.com/?s=${event.target.value}&apikey=73071eff`;
console.log(URL2);
});

    });
}



//More Film info

//insert here from below when done



//NOt found movie text display

function notFound(){
    const searchResultNodes = document.createElement("li")
    searchResultNodes.innerHTML = 
        `<div>help me</div>`;
    parentSearchResult.appendChild(searchResultNodes);    
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
    // .catch(function(error) {
    //     displayErrorToUser3(`${error} ahhhh server problem`);
    // });
}

//MORE INFO APPEARS UPON CLICK - FETCH

function fetchMoreInfo(movieURL){ //default for now
    
    fetch(`http://www.omdbapi.com/?i=tt0816692&apikey=73071eff`) 
    .then(function(response) {
        
        return response.json();
    })
    .then(function(find){
     
    //   parentSearchResult.innerHTML = "";

        movieMore(find);
        console.log(find);
    });
    // .catch(function(error) {
    //     displayErrorToUser3(`${error} ahhhh server problem`);
    // });
}

// FETCH RESULT MORE WHAT TO DO WITH IT
function movieMore(find){
    const parentSearchResult = "";
    
    find.Map(moreMovies => {



    // extraInfo[index] = image.urls.regular;

    })
    
    


   console.log(find);

};


fetchMoreInfo();

// function IMDBData(search) {
//     console.log(search.Search[4].Poster);
    
//     search.Search.map(movies => {
//     const searchResultNode = document.createElement("li"); // make fresh <li>
//     searchResultNode.innerHTML = 
//         `<a href="#">
//         <h3>${movies.Title}</h3>
//         <h2>${movies.Year}</h2></a>
//         <img src="${movies.Poster}" alt="news image">`;
//     parentSearchResult.appendChild(searchResultNode);    
//     });
// }

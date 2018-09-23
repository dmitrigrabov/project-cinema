
const urlBase =`https://www.omdbapi.com/?apikey=b749b385&`
const outputNode = document.querySelector(".films");
let searchTarget = '';
let previousSearchTarget = '';
let addInfoNode = '';
let pageCounter = 1;
let movieName = 'Batman';
let posterNode = document.querySelector('.favourites__divs');
// let posterNode = document.createElement("div");
// posterNode.className="favourites__divs";



//fetches movies from API - search by names
function getMoviesByName(movieName){
 return fetch(`${urlBase}s=${movieName}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(body) {
        displayFilms(body.Search);
    })
}

//default search for when the page loads
getMoviesByName(movieName);

//creates a list of films by name
function displayFilms(filmResults) {
    // let searchDiv = filmResults.map(film => {
    //    return `
    //    <div data-imdbid=${film.imdbID} class='main__film'>
    //         <img class='poster' src='${film.Poster}'/>
    //         <h3 class='title'>${film.Title}</h3>
    //         <h4 class='year'>(${film.Year})</h4>
    //         <p class='type'><b>type:</b> ${film.Type}</p>
    //     </div>`;
    // }).join('');
    // outputNode.innerHTML = searchDiv;
    filmResults.forEach(film =>{
        let filmNode = document.createElement('div');
        filmNode.className = 'main__film';
        filmNode.dataset.imdbid = `${film.imdbID}`;
        filmNode.innerHTML = `<img class='poster' src='${film.Poster}'/>
                            <h3 class='title'>${film.Title}</h3>
                            <h4 class='year'>(${film.Year})</h4>
                            <p class='type'><b>type:</b> ${film.Type}</p>
                            <i class="fav-button fas fa-heart">`
        outputNode.appendChild(filmNode);                    
    })
    let img = filmResults[0].Poster;
    setBackgroundImgForDesktop(img);
}

//creates background img using the poster of the first film on the search result list
function setBackgroundImgForDesktop(img){
    document.body.style.backgroundImage=`url("${img}")`;
    ;
}

//event listener on the search form and button
document.querySelector('form').addEventListener('submit', e =>{
    e.preventDefault();
    movieName = document.querySelector('#search').value;
    document.querySelector('.films').innerHTML = '';
    getMoviesByName(movieName);
    document.querySelector('#search').value = '';

    //event listener for fetching more results for the searched term;
    document.querySelector('.load-next-page').addEventListener('click', e=>{
        getMoreMoviesByName(movieName);
        setBackgroundImgForDesktop(img);
})
})

//fetches movie infomation by ID
function getMovieByID(movieID){
    return fetch(`${urlBase}i=${movieID}`)
        .then(function(response){
            return response.json();
        })
        .then(function(body){
            displayFilmDetails(body)
        })
}


//creates and appends a div with additional informaion
function displayFilmDetails(film){
    const parentNode = searchTarget;
    parentNode.className += ' active';
    addInfoNode = document.createElement('div');
    addInfoNode.className = "add-info";
    addInfoNode.innerHTML = `
        <p><b>imdb rating:</b> ${film.imdbRating}</p>
        <p><b>cast:</b> ${film.Actors}</p>
        <p><b>awards:</b> ${film.Awards}</p>
        <p><b>director:</b> ${film.Director}</p>
        <p><b>genre:</b> ${film.Genre}</p>
        <p><b>plot:</b> ${film.Plot}</p>`;
    parentNode.appendChild(addInfoNode);    
}


//event listener on each film div
outputNode.addEventListener('click', e=>{
 
    //This bit of code does not work
    if(event.target.closest('.fav-button')){
      
       
        let favourite = event.target.closest(`.main__film`);
        
       
        // let secondFavourite = favourite;
        // secondFavourite=secondFavourite.firstChild;
     
        let secondFavourite = favourite.cloneNode(true);
    
        secondFavourite = secondFavourite.firstChild;
        posterNode.appendChild(secondFavourite);
 
        // document.querySelector('.favourites__divs').appendChild(posterNode);
        event.target.closest('.fav-button').style.color="red";
        
    }
  
    else if (event.target.closest('.main__film')){
        removeAdditionalInfo();
        const film = event.target.closest('.main__film').dataset.imdbid;
        searchTarget = event.target.closest('.main__film');
        getMovieByID(film);
    }
})


//removes additional info from the film div
function removeAdditionalInfo(){
    const filmDivs = document.querySelectorAll('.active');
    filmDivs.forEach(filmDiv => {
        let addInfoDiv = document.querySelectorAll('.add-info');
        addInfoDiv.forEach(addInfo => {
        let parentDiv = addInfo.parentNode;
        parentDiv.removeChild(addInfo);
        })
    })

}



//Pagination - fetches the next page of movies from the API - search by names
function getMoreMoviesByName(movieName){
    pageCounter ++;
    return fetch(`${urlBase}s=${movieName}&page=${pageCounter}`)
       .then(function(response) {
        return response.json();
       })
       .then(function(body) {
           displayFilms(body.Search);
       })
   }


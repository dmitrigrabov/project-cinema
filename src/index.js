
const urlBase =`http://www.omdbapi.com/?apikey=b749b385&`
const outputNode = document.querySelector(".films");
let searchTarget = '';
let previousSearchTarget = '';
let addInfoNode = '';

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
getMoviesByName('batman');

//creates a list of films by name
function displayFilms(filmResults) {
    let searchDiv = filmResults.map(film => {
       return `
       <div data-imdbid=${film.imdbID} class='main__film'>
            <img class='poster' src='${film.Poster}'/>
            <h3 class='title'>${film.Title}</h3>
            <h4 class='year'>(${film.Year})</h4>
            <p class='type'><b>type:</b> ${film.Type}</p>
        </div>`;
    }).join('');
    outputNode.innerHTML = searchDiv;
    let img = filmResults[0].Poster;
    console.log(img);
    setBackgroundImgForDesktop(img);
}


function setBackgroundImgForDesktop(img){
    console.log(img);
    document.body.style.backgroundImage=`url("${img}")`;
    document.querySelector('body').className = "opacityClass";
}

//event listener on the search form and button
document.querySelector('form').addEventListener('submit', e =>{
    e.preventDefault();
    const movieName = document.querySelector('#search').value;
    getMoviesByName(movieName);
    document.querySelector('#search').value = '';
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
    removeAdditionalInfo();
    if (event.target.closest('.main__film')){
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





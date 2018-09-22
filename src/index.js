
const urlBase =`http://www.omdbapi.com/?apikey=b749b385&`
const outputNode = document.querySelector(".films");
let searchTarget = '';
let previousSearchTarget = '';
let addInfoNode = '';

function getMoviesByName(movieName){
 return fetch(`${urlBase}s=${movieName}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(body) {
        displayFilms(body.Search);
    })
}

getMoviesByName('cars');

function displayFilms(filmResults) {
    let searchDiv = filmResults.map(film => {
       return `
       <div data-imdbid=${film.imdbID} class='main__film'>
            <img src='${film.Poster}'/>
            <h3>${film.Title}</h3>
            <h4>${film.Year}</h4>
            <p>${film.Type}</p>
        </div>`;
    }).join('');
    outputNode.innerHTML = searchDiv;
}

document.querySelector('form').addEventListener('submit', e =>{
    e.preventDefault();
    const movieName = document.querySelector('#search').value;
    getMoviesByName(movieName);
    document.querySelector('#search').value = '';
})

function getMovieByID(movieID){
    return fetch(`${urlBase}i=${movieID}`)
        .then(function(response){
            return response.json();
        })
        .then(function(body){
            displayFilmDetails(body)
        })
}

function displayFilmDetails(film){
    const parentNode = searchTarget;
    parentNode.className += ' active';
    addInfoNode = document.createElement('div');
    addInfoNode.className = "add-info";
    addInfoNode.innerHTML = `
        <p>${film.imdbRating}</p>
        <p>${film.Actors}</p>
        <p>${film.Awards}</p>
        <p>${film.Director}</p>
        <p>${film.Genre}</p>
        <p>${film.Plot}</p>`;
    parentNode.appendChild(addInfoNode);
    
}



outputNode.addEventListener('click', e=>{
    removeAdditionalInfo();
    if (event.target.closest('.main__film')){
        const film = event.target.closest('.main__film').dataset.imdbid;
        searchTarget = event.target.closest('.main__film');
        getMovieByID(film);
    }
})

function removeAdditionalInfo(){
    const filmDivs = document.querySelectorAll('.active');
    console.log(filmDivs);
    filmDivs.forEach(filmDiv => {
        let addInfoDiv = document.querySelectorAll('.add-info');
        addInfoDiv.forEach(addInfo => {
        let parentDiv = addInfo.parentNode;
        parentDiv.removeChild(addInfo);
        })
    })

}





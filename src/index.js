
const urlBase =`http://www.omdbapi.com/?apikey=b749b385&`
const outputNode = document.querySelector(".films");

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
            <p>${film.imdbID}</p>
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
    // console.log(movieID);
    return fetch(`${urlBase}i=${movieID}`)
        .then(function(response){
            return response.json();
        })
        .then(function(body){
            displayFilmDetails(body)
            console.log(body);
        })
}

function displayFilmDetails(film){
    // console.log({film});
    
    outputNode.innerHTML = `
    <div data-imdbid = ${film.imdbID} class='main__film'>
        <img src='${film.Poster}'/>
        <h3>${film.Title}</h3>
        <h4>${film.Released}</h4>
        <p>${film.imdbRating}</p>
        <p>${film.Actors}</p>
        <p>${film.Awards}</p>
        <p>${film.Director}</p>
        <p>${film.Genre}</p>
        <p>${film.Plot}</p>
    </div>`;
}

outputNode.addEventListener('click', e=>{
    if (event.target.closest('.main__film')){
        const film = event.target.closest('.main__film').dataset.imdbid;
        console.log(event.target);
        // console.log(film)
        // outputNode.innerHTML = '';
        getMovieByID(film);
    }
})

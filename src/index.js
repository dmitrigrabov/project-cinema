const baseUrl = "http://www.omdbapi.com/?apikey=edd66bb"; //"apiKey=2454706d";
const contentNode = document.querySelector(".content");
const resultsHeaderNode = document.querySelector(".results-header");
const resultsListNode = document.querySelector(".results-list");
const resultsPagesNode = document.querySelector(".results-pages");
const resultsShowingNode = document.querySelector(".results-showing");
const filmContainer = document.querySelector(".film-content");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
let currentPage = 1;
let loaded = 0;

function getMoviesFromSearch (url){
    if (searchInput.value === "") return;
    resultsListNode.innerHTML = `<div class="padding">Loading...</div>`;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        console.log("loaded from search ======= " + loaded);
        if (loaded === 0) { 
            searchHeaderMessage(body);
            pageNumbers(body);
            loaded = 1;
        }
        return body.Search;
    }).catch(error => console.log(error));
}

function getMoviesFromPagination (url){
    resultsListNode.innerHTML = `<div class="padding">Loading...</div>`;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        console.log("loaded from pag ======= " + loaded);
        if (loaded === 0) { 
            searchHeaderMessage(body);
            pageNumbers(body);
            loaded = 1;
        }
        return body.Search
    })
    .catch(error => console.log(error))
}

// render film list
function renderFilmList(filmList) {
    if (filmList === undefined) {
        clearNodes();
        return;
    }
    return filmList.map(film => {
        return `<div class="result-link"><a href="#films" id="${film.imdbID}">${film.Title}, ${film.Year}</a></div>`;
    }).join('');
}

function searchHeaderMessage (body) {
    const totalResults = body.totalResults ? body.totalResults : "No";
    let html = `<div><b><i>${totalResults} results for "${searchInput.value}"</i></b></div>`;
    resultsHeaderNode.innerHTML = '';
    resultsHeaderNode.innerHTML = html;
}

const pageNumbers = function (body) {
    const n = body.totalResults ? body.totalResults : 1;
    const totalPageLinks = Math.floor(n / 10) + 1;
    let html = ``;
    if (totalPageLinks <= 1) {
        resultsShowingNode.innerHTML = "";
        return;
    } else {
        resultsShowingNode.innerHTML = `<div><i>, page ${currentPage} of ${totalPageLinks}</i></div><div>`;
        for (let i=1; i<=totalPageLinks; i++) {
            const active = i === 1 ? " active" : "";
            // shadow-light
            html += `<a class="page-number-link${active}" href="#" onClick="fetchFromButton(${i},${totalPageLinks});">&nbsp;${i}&nbsp;</a>`
        }
    }
    resultsPagesNode.innerHTML = "";
    resultsPagesNode.innerHTML = html;

    const pageButtonList = document.querySelectorAll(".page-number-link");
    pageButtonList.forEach(pageButton => {
        pageButton.addEventListener("click", event => {
            const prevThumb = document.querySelector(".active");
            if (prevThumb !== null) {
                prevThumb.classList.remove("active");
                event.target.classList.add("active");
            }
        })
    });
}

form.addEventListener('submit', event => {	
    currentPage = 1;   
    event.preventDefault();
    if (event.target.value.length >= 3) {
        renderResultsFromSearch(currentPage);
    }
});

function renderResultsFromSearch(page, mode) {
    resultsListNode.classList.add("open");
    const url = `${baseUrl}&s=${searchInput.value}&page=${page}`;
    getMoviesFromSearch(url, mode).then(filmList => {
        resultsListNode.innerHTML = renderFilmList(filmList);
    });
}

function fetchFromButton(page, totalPageLinks) {
    resultsShowingNode.innerHTML = `<div><i>, page ${page} of ${totalPageLinks}</i></div>`;
    resultsListNode.classList.add("open");
    const url = `${baseUrl}&s=${searchInput.value}&page=${page}`;
    getMoviesFromPagination(url).then(filmList => {
        resultsListNode.innerHTML = renderFilmList(filmList);
        currentPage = page;    
    });
}  

searchInput.addEventListener('input', event => {
    // currentPage = 1;
    const input = event.target.value;
    if (input === "") {
        loaded = 0;
        return;
    } else {
        if (input[input.length-1] === ' ') return;
        if (event.target.value.length >= 3) {
            renderResultsFromSearch(currentPage);
            const msg = `The title "${input}" is unknown. Please try again.`;
            resultsHeaderNode.innerHTML = `<div class="results-showing">${msg}</div>`;
        } else {
            clearNodes('minimumLetters', input);
            const msg = `Type at least 3 letters to search...`;
            resultsHeaderNode.innerHTML = `<div class="results-showing">${msg}</div>`;
        }
    }
})

function clearNodes(mode, input) {
    resultsListNode.classList.remove("open");
    resultsListNode.innerHTML = "";
    resultsPagesNode.innerHTML = "";
    resultsShowingNode.innerHTML = '';
}

/*
/////////////////////////////////////
FETCH
*/

contentNode.addEventListener('click', event => {
    if (event.target.matches('.result-link a')){
        fetchSingleMovieByID(event.target.id)
    };
});

function fetchSingleMovieByID (id){
    const url = `${baseUrl}&i=${id}`;
    return fetch(url)
    .then(response => response.json())
    .then(filmObject => {
        console.log({filmObject})
        filmContainer.innerHTML = "";
        filmContainer.classList.add("on");
        filmContainer.innerHTML = convertMovieObject (filmObject);
    }).catch(error => console.log(error));
}

function convertMovieObject (film) {
    const keys = Object.keys(film);
    const htmlString = keys.map(item => {
        return `<div>${item}: ${film[item]}</div>`
    }).join(' ');
    // console.log(htmlString);
    // return htmlString;
    return film.Website;

    // return 
    // `<div class="article__main">
    //     <div class="article__image">
    //         <a href="${film.Website}" target="_blank" style="background-image:url(${film.Poster})" class="article__image__src"></a>
    //     </div>
    //     <div>
    //         <span class="article__header">
    //             <div><a href="${film.Website}" target="_blank"><strong>${film.Title}</strong> ${film.Year}</a></div>
    //         </span>
    //     </div>
    // </div>`;
}

//         <div class="article__text">
//             <div><h3>Plot</h3>${film.Plot}</div>
//             <div>IMDB link: <a href="https://www.imdb.com/title/${imdbID}" target="_blank">See ${film.Title} on IMDB (${film.imdbVotes} votes)</a></div>
//             <div>
//                 <ul>
//                     <li>Year: ${film.Year}</li>
//                     <li>Released: ${film.Released}</li>
//                     <li>Rated: ${film.Rated}</li>
//                     <li>Runtime: ${film.Runtime}</li>
//                     <li>Genre: ${film.Genre}</li>
//                     <li>Director: ${film.Director}</li>
//                     <li>Writer: ${film.Writer}</li>
//                     <li>Actors: ${film.Actors}</li>
//                     <li>Language: ${film.Language}</li>
//                     <li>Country: ${film.Country}</li>
//                     <li>Awards: ${film.Awards}</li>
//                     <li>Metascore: ${film.Metascore}</li>
//                     <li>imdbRating: ${film.Metascore}</li>
//                     <li>imdbVotes: ${film.imdbVotes}</li>
//                     <li>BoxOffice: ${film.BoxOffice}</li>
//                     <li>Production:  ${film.Production}</li>
//                     <li>Website: <a href="${film.Website}" target="_blank"</a></li>
//                 </ul>
//             </div>   
//         </div>
//     </div>`;
// }
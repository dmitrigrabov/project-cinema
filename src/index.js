const omdUrl = "http://www.omdbapi.com/?type=movie";
const baseUrl = "http://www.omdbapi.com/?apikey=edd66bb";
const apiKey = "edd66bb"; //"2454706d";
const resultsHeaderNode = document.querySelector(".results-header");
const resultsListNode = document.querySelector(".results-list");
const resultsPagesNode = document.querySelector(".results-pages");
const resultsShowingNode = document.querySelector(".results-showing");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
let currentPage = 1;

function getMoviesFromSearch (url){
    if (searchInput.value.length === 0) return;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        searchHeaderMessage(body);
        console.log(body.totalResults)
        pageNumbers(body);
        return body.Search
    })
    .catch(error => console.log(error))
}

// render a single film
function renderFilmList(filmList) {
    return filmList.map(film => {
        return `
            <div><b>Title:</b> ${film.Title}, <b>ID:</b> 
            <a href=${baseUrl}&i=${film.imdbID} target="_blank">${film.imdbID}</a></div>
        `;
    }).join('');
}

form.addEventListener('submit', event => {	    
    event.preventDefault();
    const url = `${baseUrl}&s=${searchInput.value}`;
    getMoviesFromSearch(url).then(filmList => {
        resultsListNode.innerHTML = '';
        resultsListNode.innerHTML = renderFilmList(filmList);
    });
});

function searchHeaderMessage (body) {
    resultsHeaderNode.innerHTML = '';
    let html = `<div><b><i>${body.totalResults} results for "${searchInput.value}"</i></b></div><br>`;
    resultsHeaderNode.innerHTML = html;
}

const pageNumbers = function (body) {
    resultsPagesNode.innerHTML = "";
    const totalPageLinks = Math.floor(body.totalResults / 10) + 1;
    let html = `<br><div><i>Showing page ${currentPage} of ${totalPageLinks}</i></div>
                <br><div>Page:`;
    for (let i=1; i<=totalPageLinks; i++) {
        html += `<a class="page-number-link" href="#" onClick=newSearchPageFetch(${i})>&nbsp;${i}&nbsp;</a>`
    }
    resultsPagesNode.innerHTML = html;
}


function getMoviesFromPagination (url){
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        // searchHeaderMessage(body);
        // pageNumbers(body);
        return body.Search
    })
    .catch(error => console.log(error))
}

const newSearchPageFetch = function (page){
    const url = `${baseUrl}&s=${searchInput.value}&page=${page}`;
    resultsShowingNode.innerHTML = `<br><div><i>Showing page ${currentPage}`;
    currentPage = page;
    getMoviesFromPagination(url).then(filmList => {
        resultsListNode.innerHTML = '';
        resultsListNode.innerHTML = renderFilmList(filmList);
    });
}
const baseUrl = "http://www.omdbapi.com/?apikey=edd66bb"; //"apiKey=2454706d";
const resultsHeaderNode = document.querySelector(".results-header");
const resultsListNode = document.querySelector(".results-list");
const resultsPagesNode = document.querySelector(".results-pages");
const resultsShowingNode = document.querySelector(".results-showing");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
searchInput.value = "sorry";
let currentPage = 1;
let prevActive = null;

function getMoviesFromSearch (url){
    if (searchInput.value.length === 0) return;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        searchHeaderMessage(body);
        pageNumbers(body);
        return body.Search
    })
    .catch(error => console.log(error))
}

// render film list
function renderFilmList(filmList) {
    return filmList.map(film => {
        return `<div><b>Title:</b> ${film.Title}, <b>ID:</b><a href=${baseUrl}&i=${film.imdbID} target="_blank">${film.imdbID}</a></div>`;
    }).join('');
}

function searchHeaderMessage (body) {
    let html = `<div><b><i>${body.totalResults} results for "${searchInput.value}"</i></b></div><br>`;
    resultsHeaderNode.innerHTML = '';
    resultsHeaderNode.innerHTML = html;
}

const pageNumbers = function (body) {
    const totalPageLinks = Math.floor(body.totalResults / 10) + 1;
    resultsShowingNode.innerHTML = `<br><div><i>Showing page ${currentPage} of ${totalPageLinks}</i></div><br><div>`;
    let html = ``;
    for (let i=1; i<=totalPageLinks; i++) {
        const active = i === 1 ? " active" : "";
        html += `<a class="page-number-link${active}" href="#" onClick=newSearchPageFetch(${i},${totalPageLinks})>&nbsp;${i}&nbsp;</a>`
    }
    resultsPagesNode.innerHTML = "";
    resultsPagesNode.innerHTML = html;
}

function getMoviesFromPagination (url){
    return fetch(url)
    .then(response => response.json())
    .then(body => body.Search)
    .catch(error => console.log(error))
}

function renderResultsFromSearch(page) {
    const url = `${baseUrl}&s=${searchInput.value}&page=${page}`;
    getMoviesFromSearch(url).then(filmList => {
        resultsListNode.innerHTML = '';
        resultsListNode.innerHTML = renderFilmList(filmList);
    });
}

const newSearchPageFetch = function (page, totalPageLinks){
    // let active = document.querySelector(".active");
    // active.className = "page-number-link active"
    // if (prevActive) { 
    //     prevActive.className = "page-number-link";
    //     prevActive = active;
    // }
    // const prevActive = document.querySelector(".active");
    // if (prevActive !== null) {
    //     prevActive.classList.remove("active")
    //     event.target.classList.add("active")
    // }
    // console.log(active);
    // const pageNumberlinks = document.querySelectorAll(".page-number-link");
    // pageNumberlinks.addEventListener();
    resultsShowingNode.innerHTML = `<br><div><i>Showing page ${page} of ${totalPageLinks}</i></div><br><div>`;
    renderResultsFromSearch(page);
    currentPage = page;
}

form.addEventListener('submit', event => {	
    currentPage = 1;    
    event.preventDefault();
    renderResultsFromSearch(currentPage);
});
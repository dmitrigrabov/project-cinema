const baseUrl = "http://www.omdbapi.com/?apikey=edd66bb"; //"apiKey=2454706d";
const contentNode = document.querySelector(".content");
const resultsHeaderNode = document.querySelector(".results-header");
const resultsListNode = document.querySelector(".results-list");
const resultsPagesNode = document.querySelector(".results-pages");
const resultsShowingNode = document.querySelector(".results-showing");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
let currentPage = 1;
// let prevThumb = null;
let loaded = 0;

function getMoviesFromSearch (url){
    if (searchInput.value.length === 0) return;
    resultsListNode.innerHTML = `<div class="padding">Loading...</div>`;
    return fetch(url)
    .then(response => response.json())
    .then(body => {
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
        searchHeaderMessage(body);
        pageNumbers(body);
        return body.Search
    })
    .catch(error => console.log(error))
}

// render film list
function renderFilmList(filmList) {
    if (filmList === undefined) {
        clearNodes('unknown', searchInput.value);
        return;
    }
    return filmList.map(film => {
        return `<div class="result-link"><a href=${baseUrl}&i=${film.imdbID} target="_blank">${film.Title}, ${film.Year}</a></div>`;
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
            html += `<a class="page-number-link${active} shadow-light" href="#" onClick="fetchFromButton(${i},${totalPageLinks});">&nbsp;${i}&nbsp;</a>`
        }
    }
    resultsPagesNode.innerHTML = "";
    resultsPagesNode.innerHTML = html;
    // setActiveButton ();
}

// function setActiveButton (){
//     contentNode.addEventListener('click', event => {
//         console.log({event});
//         let match = event.target.matches('.page-number-link');
//         if (match){  
//             const prevThumb = document.querySelector(".active");
//             if (prevThumb !== null) {
//                 prevThumb.classList.remove("active");
//                 event.target.classList.add("active");
//                 // console.log({event})
//             }
//         }
//     });
// }

function setActiveButton (event){
    const prevThumb = document.querySelector(".active");
    if (prevThumb !== null) {
        prevThumb.classList.remove("active")
        event.target.classList.add("active")
    }
}

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

form.addEventListener('submit', event => {	
    currentPage = 1;   
    event.preventDefault();
    if (event.target.value.length >= 3) {
        renderResultsFromSearch(currentPage);
    }
});

searchInput.addEventListener('input', event => {
    currentPage = 1;
    const input = event.target.value;
    if (input[input.length-1] === ' ') return;
    if (event.target.value.length >= 3) {
        renderResultsFromSearch(currentPage);
    } else {
        clearNodes('minimumLetters', input);
    }
})

function clearNodes(mode, input) {
    resultsListNode.classList.remove("open");
    resultsListNode.innerHTML = "";
    resultsPagesNode.innerHTML = "";
    resultsShowingNode.innerHTML = '';
    const msg = (mode === 'unknown') ? `The title "${input}" is unknown. Please try again.` : `Type at least 3 letters to search...`;
    resultsHeaderNode.innerHTML = `<div class="results-showing">${msg}</div>`;
}

        // const title = hightlightedWords(film.Title)

// function hightlightedWords(title){
//     const titleArray = title.split(" ")
//     const searchResultsArray = searchInput.value.split(" ");
//     const updatedWords = searchForMatches(titleArray, searchResultsArray);
//     console.log(updatedWords.join(" "));
//     return updatedWords.join(" ");
//     // const str = item.match(/[^_\W]+/g);
// }

// const searchForMatches = function(haystackArray, needleArray) {
//     const output = haystackArray.map(function(hay){
//         const found = needleArray.find(needle => hay.includes(needle));
//         return found ? `<span class="highlighted">${hay}</span>` : hay;
//     });
//     return output;
// }


// const fetchFromButton = function (page, totalPageLinks){
//     // resultsShowingNode.innerHTML = `<div><i>, page ${page} of ${totalPageLinks}</i></div>`;
//     // console.log("clicked ===============")
//     getMoviesFromPagination(url);
//     currentPage = page;
// }
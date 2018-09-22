const baseUrl = "http://www.omdbapi.com/?apikey=edd66bb"; //"apiKey=2454706d";
const contentNode = document.querySelector(".content");
const resultsHeaderNode = document.querySelector(".results-header");
const resultsListNode = document.querySelector(".results-list");
const resultsPagesNode = document.querySelector(".results-pages");
const resultsShowingNode = document.querySelector(".results-showing");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
let currentPage = 1;
let prevThumb = null;
let loaded = 0;

function getMoviesFromSearch (url, state){
    if (searchInput.value.length === 0) return;
    resultsListNode.innerHTML = 'Loading...';
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        // console.log({body})
        if (loaded === 0 || state === 'input') { 
            searchHeaderMessage(body);
            pageNumbers(body);
            loaded = 1;
        }
        return body.Search;
    }).catch(error => console.log(error));
}

function getMoviesFromPagination (url){
    return fetch(url)
    .then(response => response.json())
    .then(body => body.Search)
    .catch(error => console.log(error))
}

// render film list
function renderFilmList(filmList) {
    if (filmList === undefined) {
        // resultsShowingNode.innerHTML = '';
        // resultsPagesNode.innerHTML = '';
        return;
    }
    return filmList.map(film => {
        console.log("inside filmList")
        // const title = hightlightedWords(film.Title)
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
        console.log(totalPageLinks);
        resultsShowingNode.innerHTML = `<div><i>, page ${currentPage} of ${totalPageLinks}</i></div><div>`;
        for (let i=1; i<=totalPageLinks; i++) {
            const active = i === 1 ? " active" : "";
            html += `<a class="page-number-link${active}" href="#" onClick=newSearchPageFetch(${i},${totalPageLinks})>&nbsp;${i}&nbsp;</a>`
        }
        document.querySelector(".active").click();
    }
    resultsPagesNode.innerHTML = "";
    resultsPagesNode.innerHTML = html;
}

function renderResultsFromSearch(page, state) {
    if (searchInput.value.length === 0) return;
    resultsListNode.classList.add("active");
    const url = `${baseUrl}&s=${searchInput.value}&page=${page}`;
    getMoviesFromSearch(url, state).then(filmList => {
        resultsListNode.innerHTML = renderFilmList(filmList);
    });
}

const newSearchPageFetch = function (page, totalPageLinks){
    resultsShowingNode.innerHTML = `<div><i>, page ${page} of ${totalPageLinks}</i></div>`;
    renderResultsFromSearch(page);
    currentPage = page;
}

contentNode.addEventListener('click', event => {
    console.log(event.target)
    if (event.target.matches('.page-number-link')){
        const prevThumb = document.querySelector(".active");
        if (prevThumb !== null) {
            prevThumb.classList.remove("active")
            event.target.classList.add("active")
        }
    }
});

form.addEventListener('submit', event => {	
    currentPage = 1;   
    event.preventDefault();
    renderResultsFromSearch(currentPage, 'submit');
});

searchInput.addEventListener('input', event => {
    currentPage = 1;
    const input = event.target.value;
    if (input[input.length-1] === ' ') return;
    if (event.target.value.length >= 3) {
        renderResultsFromSearch(currentPage, 'input');
    } else {
        resultsListNode.innerHTML = "";
        resultsListNode.classList.remove("active");
    }
    // console.log(input)
})


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
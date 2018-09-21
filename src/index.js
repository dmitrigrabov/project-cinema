
const omdUrl = "http://www.omdbapi.com/?type=movie";
const apiKey = "2454706d";
const mainNode = document.querySelector(".content");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");

const getFilms = function() {
    const urlObject = getUrlFromSearch();
    if (!urlObject.searchInput) return;
    fetch(urlObject.url)
    .then(response => response.json())
    .then(body => {
        listenForSearchInput();
        showSearchResults(body, urlObject.searchInput);
    })
}

const showSearchResults = function (body, input) {
    if (!body) return;
    mainNode.innerHTML = '';
    let html = `<div><b><i>${body.totalResults} results for "${input}"</i></b></div><br>`;
    body.Search.forEach(film => {
        const linkUrl = getUrlFromResultLink(film.imdbID);
        html += `<div><b>Title:</b> "${film.Title}", <b>ID:</b> <a href="${linkUrl}" target="_blank">${film.imdbID}</a></div>`;
    });
    html += `<br><div><a href="#">Pages 1 - 10</a></div>`;
    mainNode.innerHTML = html;
}

const listenForSearchInput = function (){
    form.addEventListener('submit', event => {
        event.preventDefault();
        getFilms();
    });
}

const getUrlFromSearch = function () {
    if (searchInput.value.length === 0) return false;
    const url = `${omdUrl}&s=${searchInput.value}&apikey=${apiKey}`;
    // console.log(url);
    return {"url": url, "searchInput": searchInput.value};
}

const getUrlFromResultLink = function (id) {
    return `${omdUrl}&i=${id}&apikey=${apiKey}`;
}

const populateSelectedFilm = function (film) {
    const keys = Object.keys(film);
    let html = ""
    keys.forEach(key => {
        html += `<div><b>${key}</b>: ${film[key]}</div>`;
    });
    // console.log(html);
}
listenForSearchInput();
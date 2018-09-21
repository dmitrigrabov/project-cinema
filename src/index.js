
const omdUrl = "http://www.omdbapi.com/?type=movie";
const apiKey = "2454706d";
const mainNode = document.querySelector(".content");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
// let page = document.location["page"];

const getFilms = function(page) {
    const urlObject = getUrlFromSearch(page);
    if (!urlObject.searchInput) return;
    // const validPage = urlObject.page ? urlObject.page : "1";
    fetch(urlObject.url)
    .then(response => response.json())
    .then(body => {
        listenForSearchInput(page);
        showSearchResults(body, urlObject.searchInput, page);
    })
}

const showSearchResults = function (body, input, page) {
    if (!body) return;
    mainNode.innerHTML = '';
    const totalPageLinks = Math.floor(body.totalResults / 10) + 1;
    let html = `<div><b><i>${body.totalResults} results for "${input}"</i></b></div>`;
    html += `<div><i>Showing page ${page} of ${totalPageLinks}</i></div><br>`;
    body.Search.forEach(film => {
        const linkUrl = getUrlFromResultLink(film.imdbID);
        html += `<div><b>Title:</b> "${film.Title}", <b>ID:</b> <a href="${linkUrl}" target="_blank">${film.imdbID}</a></div>`;
    });
    html += `<br><div>Page: `;
    for (let i=1; i<=totalPageLinks; i++) {
        html += ` <a class="page-number-link" href="#" onClick="nextPageFetch(${i})">&nbsp;${i}&nbsp;</a>`;
        // html += (i < totalPageLinks) ? `&nbsp;&nbsp;|` : ``;
    } 
    html += `</div>`;
    mainNode.innerHTML = html;
}

const getUrlFromSearch = function (page) {
    if (searchInput.value.length === 0) return false;
    const url = `${omdUrl}&s=${searchInput.value}&page=${page}&apikey=${apiKey}`;
    return {"url": url, "searchInput": searchInput.value, "page": page};
}

const nextPageFetch = function (page){
    getFilms(page);
}

const listenForSearchInput = function (page){
    form.addEventListener('submit', event => {
        event.preventDefault();
        getFilms(page);
    });
}

const getUrlFromResultLink = function (id) {
    const url = `${omdUrl}&i=${id}&apikey=${apiKey}`;
    return url;
}

const populateSelectedFilm = function (film) {
    const keys = Object.keys(film);
    let html = ""
    keys.forEach(key => {
        html += `<div><b>${key}</b>: ${film[key]}</div>`;
    });
}
listenForSearchInput("1");
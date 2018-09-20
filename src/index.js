const omdUrl = "http://www.omdbapi.com/?type=movie";
const apiKey = "2454706d";

const getFilms = function(url) {
    fetch(url)
    .then(response => response.json())
    .then(body => {
        displayFilms(body);
        populateResults(body);
    })
}

const displayFilms = function (){
    const form = document.querySelector(".form");
    form.addEventListener('submit', event => {
        event.preventDefault();
        const url = getURL();
        getFilms(url);
    });
}

const getURL = function () {
    const searchInput = document.querySelector(".search");
    // const title = searchInput.value ? searchInput.value : "";
    return `${omdUrl}&t=${searchInput.value}&apikey=${apiKey}`;
}

const populateResults = function (body) {
    const mainNode = document.querySelector(".content");
    mainNode.innerHTML = '';
    const keys = Object.keys(body);
    let html = ""
    keys.forEach(key => {
        html += `<div><b>${key}</b>: ${body[key]}</div>`;
    })
    mainNode.innerHTML = html;
}
displayFilms();
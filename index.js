//Initialize variables

//Get HTML element references
const formRef = document.querySelector('.search__form');
const resultsRef = document.querySelector('.results');

//Add click event listeners on document
document.addEventListener('click', event => {
    if (event.target.matches('.result')) fetchDetails(event.target.getAttribute('data-id'));
    //event.preventDefault();
});

//Add submit event listener on form
formRef.addEventListener('submit', event => {
    event.preventDefault();
    const searchQuery = formRef.search.value;
    fetchResults(searchQuery);
});

function fetchDetails(imdbID) {
    const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&i=${imdbID}`;
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderDetails(body))
    .catch(error => console.log(error));
}

function renderDetails(body) {
    console.log(body);
    const detailRef = document.querySelector(`#${body.imdbID} .detail`);
    detailRef.innerHTML = `<p class='detail-rated'>${body.Rated}</p>
                        <p class='detail-runtime'>${body.Runtime}</p>
                        <p class='detail-genre'>${body.Genre}</p>
                        <p class='detail-director'>${body.Director}</p>
                        <p class='detail-actors'>${body.Actors}</p>
                        <p class='detail-awards'>${body.Awards}</p>
                        <p class='detail-plot'>${body.Plot}</p>
                        <p class='detail-imdbRating'>${body.imdbRating}</p>`;
}

//Fetch data
function fetchResults(searchQuery) {
    const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&s=${searchQuery}&type=movie`;
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderResults(body))
    .catch(error => console.log(error));
}

//Create search result elements
function renderResults(body) {
    console.log(body);
    resultsRef.innerHTML = '';
    body.Search.forEach(item => {
        const result = document.createElement('article');
        result.setAttribute('class','result');
        result.setAttribute('id',item.imdbID);
        result.setAttribute('data-id',item.imdbID);
        result.innerHTML = `<h1 data-id=${item.imdbID} class='result result__title'>${item.Title}</h1>
                            <h2 data-id=${item.imdbID} class='result result__year'>${item.Year}</h2>
                            <img data-id=${item.imdbID} class='result result__poster' src=${item.Poster}>
                            <div class='detail'></div>`;
        resultsRef.appendChild(result);
    });
}
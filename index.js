//Initialize variables

//Get HTML element references
const formRef = document.querySelector('.search__form');
const resultsRef = document.querySelector('.results');


//Add click event listeners on document
document.addEventListener('click', event => {
    //event.preventDefault();
});

//Add submit event listener on form
formRef.addEventListener('submit', event => {
    event.preventDefault();
    const searchQuery = formRef.search.value;
    const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&s=${searchQuery}`;
    fetchResults(APIQuery);
});

//Fetch data
function fetchResults(APIQuery) {
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderResults(body))
    .catch(error => console.log(error));
}

//Create search result elements
function renderResults(body) {
    resultsRef.innerHTML = '';
    body.Search.forEach(item => {
        const result = document.createElement('article');
        result.setAttribute('class','result');
        result.innerHTML = `<h1 class='result__title'>${item.Title}</h1>
                            <h2 class='result__year'>${item.Year}</h2>
                            <img class='result__poster' src=${item.Poster}>`;
        resultsRef.appendChild(result);
    });
    
}
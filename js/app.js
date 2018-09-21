const form = document.querySelector('#search'),
    searchInput = form.querySelector('.search__input'),
    searchButton = form.querySelector('.search__btn'),
    results = document.querySelector('.results');

let titleMovies = '',
    inputValue = '';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputValue = searchInput.value;
    runFetch(inputValue);
});

function runFetch(inputValue) {
    fetch(`http://www.omdbapi.com/?apikey=f899a3c1&s=${inputValue}`)
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            body.Search.forEach(e => {
                let searchResult = document.createElement('div');
                searchResult.className = 'results__searchResult';
                searchResult.innerHTML = `
                    <p class="results__searchResult__title">${e.Title}</p>
                    <p class="results__searchResult__year">${e.Year}</p>
                    <img class="results__searchResult__poster" src="${e.Poster}"/>
                    `;
                results.append(searchResult);
            });

        })
        .catch((error) => {
            console.log('Server failed to return data: ' + error);
        });
}


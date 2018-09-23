const form = document.querySelector('#control__search'),
    searchInput = document.querySelector('.control__search__input'),
    results = document.querySelector('.results'),
    buttonsClass = document.querySelector('.buttons'),
    nextBtn = document.querySelector('.buttons__button-next'),
    prevBtn = document.querySelector('.buttons__button-prev');

let params = {
    inputValue: '',
    pageNumber: 1,
    totalPages: 0,
    imdbID: '',
    apiKey: 'f899a3c1',
    fetchUrl: ''
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    buttonsClass.style.display = 'grid';
    results.innerHTML = '';
    params.pageNumber = 1;
    params.totalPages = 0;
    params.inputValue = searchInput.value;
    runFetch(params.inputValue, params.pageNumber);
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    results.innerHTML = '';
    // if (params.pageNumber >= params.totalPages) {
    // } else {
    //     params.pageNumber++;
    runFetch();
    // }

});
prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    results.innerHTML = '';
    // if (params.pageNumber === 1) {
    // } else {
    //     params.pageNumber--;
    runFetch();
    // }
});

function setUrl() {
    return params.fetchUrl = `https://www.omdbapi.com/?apikey=${params.apiKey}&s=${params.inputValue}&page=${params.pageNumber}&i=tt1504019&plot=full&i=${params.imdbID}`;
}

function runFetch() {
    fetch(setUrl())
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            // console.log(body);
            // params.totalPages = body.totalResults / 10; //divide by as as there is 10 results per page
            // params.totalPages = Math.floor(params.totalPages); //round down as we don't want to have anything after dot

            body.Search.forEach(e => {
                params.imdbID = e.imdbID;
                fetch(setUrl())
                    .then((response) => {
                        return response.json();
                    })
                    .then((body) => {
                        console.log(body);
                        let searchResult = document.createElement('div');
                        searchResult.className = 'results__searchResult';

                        let currentPoster = e.Poster;
                        if (currentPoster === 'N/A') {
                            currentPoster = 'images/noPoster.jpg';
                        }
                        searchResult.innerHTML = `
                    <p class="results__searchResult__title">${e.Title}</p>
                    <p class="results__searchResult__year">${e.Year}</p>
                    <p></p>
                    <img class="results__searchResult__poster" src="${currentPoster}"/>
                    `;
                        results.append(searchResult);
                    })

            });

        })
        .catch((error) => {
            console.log('Server failed to return data: ' + error);
        });
}


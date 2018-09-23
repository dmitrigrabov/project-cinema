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
    params.pageNumber = 2;
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
    // console.log(params.pageNumber);
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
    return params.fetchUrl = `https://www.omdbapi.com/?i=${params.imdbID}&plot=full&apikey=${params.apiKey}&s=${params.inputValue}&page=${params.pageNumber}`;
}

function runFetch() {
    fetch(setUrl())
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            console.log(body);
            params.totalPages = body.totalResults / 10; //divide by as as there is 10 results per page
            params.totalPages = Math.round(params.totalPages); //round up as I want to have all possible number of pages
            console.log(body.totalResults);
            console.log(params.totalPages);

            body.Search.forEach(e => {
                params.imdbID = e.imdbID;
                params.inputValue = ''; // as I have imdbID(id of movie) and we want to get full details of our searched movie I need to delete typed input and search only with imdbID
                fetch(setUrl())
                    .then((response) => {
                        return response.json();
                    })
                    .then((body) => {
                        console.log(body);
                        let movieParams = {
                            description: body.Plot,
                            poster: body.Poster,
                            title: body.Title,
                            year: body.Year
                        };

                        let searchResult = document.createElement('div');
                        searchResult.className = 'results__searchResult';

                        if (movieParams.poster === 'N/A') { //if there is no poster then I use default image
                            movieParams.poster = 'images/noPoster.jpg';
                        }
                        if (movieParams.description === 'N/A') { //if there is no description I set
                            movieParams.description = '';
                        }
                        if (movieParams.description.length > 290) { //if our description is longer than 290 characters I delete rest description and in that place insert 3 dots
                            movieParams.description = `${movieParams.description.slice(0, 290)}...`;
                        }

                        searchResult.innerHTML = `
                            <img class="results__searchResult__poster" src="${movieParams.poster}"/>
                            <p class="results__searchResult__title">${movieParams.title}</p>
                            <p class="results__searchResult__year">${movieParams.year}</p>
                            <p class="results__searchResult__description">${movieParams.description}</p>
                            <p class="emptyBox"></p>                            
                            `;

                        results.append(searchResult);
                    })

            });

        })
        .catch((error) => {
            console.log('Server failed to return data: ' + error);
        });
}


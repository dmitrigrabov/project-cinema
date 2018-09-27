const form = document.querySelector('#control__search'),
    searchInput = document.querySelector('.control__search__input'),
    results = document.querySelector('.results'),
    buttonsClass = document.querySelector('.buttons'),
    currentPageClasses = document.querySelectorAll('.currentPage'),
    nextBtn = document.querySelector('.buttons__button-next'),
    prevBtn = document.querySelector('.buttons__button-prev');

let params = {
    inputValue: searchInput.value,
    pageNumber: 2,
    totalPages: 0,
    imdbID: '',
    apiKey: 'f899a3c1'
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    buttonsClass.style.display = 'none';
    results.innerHTML = '';
    params.pageNumber = 1;
    params.totalPages = 0;
    params.inputValue = searchInput.value;
    runFetch();
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    results.innerHTML = '';
    buttonsClass.style.display = 'none';
    if (params.pageNumber === params.totalPages) {
        params.pageNumber = 1;
    } else {
        params.pageNumber++;
    }

    runFetch();
});

prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    results.innerHTML = '';
    buttonsClass.style.display = 'none';
    if (params.pageNumber === 1) {
        params.pageNumber = params.totalPages;
    } else {
        params.pageNumber--;
    }
    runFetch();

});

function setUrlWithTypedSearch() {
    return `https://www.omdbapi.com/?&plot=full&apikey=${params.apiKey}&s=${params.inputValue}&page=${params.pageNumber}`;
}

function setUrlForEachMovieWithImdbIDNumber() { //I need imdbID to get full details of every found movie
    return `https://www.omdbapi.com/?i=${params.imdbID}&plot=full&apikey=${params.apiKey}&page=${params.pageNumber}`;
}

function runFetch() {
    fetch(setUrlWithTypedSearch())
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            params.totalPages = body.totalResults / 10; //divide by as as there is 10 results per page
            params.totalPages = Math.ceil(params.totalPages); //round up as I want to have all possible number of pages
            currentPageClasses.forEach((currentPageClass) => {
                currentPageClass.textContent = `page ${params.pageNumber} / ${params.totalPages}`;
            });
            body.Search.forEach(e => {
                params.imdbID = e.imdbID;
                fetch(setUrlForEachMovieWithImdbIDNumber())
                    .then((response) => {
                        return response.json();
                    })
                    .then((body) => {
                        // console.log(body);
                        buttonsClass.style.display = 'block';
                        let movieParams = {
                            description: body.Plot,
                            poster: body.Poster,
                            title: body.Title,
                            year: body.Year,
                            actors: body.Actors
                        };

                        let searchResult = document.createElement('div');
                        searchResult.className = 'results__searchResult';

                        if (movieParams.poster === 'N/A') { //if there is no poster then I use default image
                            movieParams.poster = 'images/noPoster.jpg';
                        }
                        if (movieParams.description === 'N/A') { //if there is no description I set
                            movieParams.description = '';
                        }

                        searchResult.innerHTML = `
                            <h2 class="results__searchResult__title">${movieParams.title}</h2>
                            <img class="results__searchResult__poster" src="${movieParams.poster}"/>
                            <h3 class="results__searchResult__year hide">(${movieParams.year})</h3>
                            <h3 class="results__searchResult__actors hide">Actors: ${movieParams.actors}</h3>
                            <h3 class="results__searchResult__description hide">${movieParams.description}</h3>
                            `;
                        const posterImg = searchResult.querySelector('.results__searchResult__poster');
                        const description = searchResult.querySelector('.results__searchResult__description');
                        const year = searchResult.querySelector('.results__searchResult__year');
                        const actors = searchResult.querySelector('.results__searchResult__actors');
                        searchResult.addEventListener('click', () => {
                            // console.log(posterImg);
                            description.classList.toggle('hide');
                            year.classList.toggle('hide');
                            posterImg.classList.toggle('hide');
                            actors.classList.toggle('hide');
                        });
                        results.append(searchResult);
                    })
            });
        })
        .catch((error) => {
            console.log('Server failed to return data: ' + error);
        });
}


const form = document.querySelector('#control__search'),
    searchInput = document.querySelector('.control__search__input'),
    results = document.querySelector('.results'),
    buttonsClass = document.querySelector('.buttons'),
    nextBtn = document.querySelector('.buttons__button-next'),
    prevBtn = document.querySelector('.buttons__button-prev');

let inputValue = '',
    pageNumber = 1,
    totalPages = 0,
    imdbID = '',
    fetchUrl = '';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    buttonsClass.style.display = 'grid';
    results.innerHTML = '';
    pageNumber = 1;
    totalPages = 0;
    inputValue = searchInput.value;
    runFetch(inputValue, pageNumber);
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    results.innerHTML = '';
    nextBtn.style.border = 'none';
    if (pageNumber >= totalPages) {
    } else {
        pageNumber++;
        runFetch(inputValue, pageNumber);
    }

});
prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    results.innerHTML = '';
    if (pageNumber === 1) {
    } else {
        pageNumber--;
        runFetch(inputValue, pageNumber);
    }
});


function runFetch(inputValue, pageNumber) {
    fetchUrl = `https://www.omdbapi.com/?apikey=f899a3c1&s=${inputValue}&page=${pageNumber}&i=tt1504019&plot=full`;
    fetch(fetchUrl)
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            // console.log(body);
            totalPages = body.totalResults / 10; //divide by as as there is 10 results per page
            totalPages = Math.floor(totalPages); //round down as we don't want to have anything after dot
            console.log(totalPages);

            body.Search.forEach(e => {
                imdbID = e.imdbID;
                fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=f899a3c1`)
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


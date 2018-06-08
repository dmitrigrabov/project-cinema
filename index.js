const form = document.querySelector('#textinput');
const input = document.querySelector('#placeholder');
const movieInfo = document.querySelector('#movieinfo');

function createUrl(input) {
    const search = input.value.trim();
    return `http://www.omdbapi.com/?s=${search}&apikey=2c6457b6&`;
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function searchFilms(url) {
    fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log(data);
            let movies = data.Search/* .results? */;
            return movies.map(function(movie) {
                let div = createNode('div');
                div.innerHTML = `
                <h2>
                    ${movie.Title}, ${movie.Year}
                </h2>
                <a href="https://www.imdb.com/title/${movie.imdbID}/">
                    <img src="${movie.Poster}">
                </a>
                `;
                append(movieInfo, div);
            })
        })
        .catch(function(error) {
            console.log(error);
        });

}

function submitForm(event) {
    event.preventDefault();
    searchFilms(createUrl(input));
}

form.addEventListener('submit', submitForm);
movieInfo.addEventListener('click', )


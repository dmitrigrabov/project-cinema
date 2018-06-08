const textInput = document.querySelector('#textinput');
const textArea = document.querySelector('#placeholder');

function createApi(textArea) {
    const search = textArea.textContent.trim();
    const api = `http://www.omdbapi.com/?s=${search}&apikey=2c6457b6&`;
    return api;
}

function displayResults(response) {
    
}

function searchFilms(api) {
    fetch(api)
        .then(function(response) {
            return response.json()
        }).then(function(myJsonData) {
            console.log(response);
        });
        .catch(function(error) {
            // do something
        });

}

function submitForm(event) {
    event.preventDefault();
    alert('Search submitted.')
    createApi(textArea);
    searchFilms(api);
}

textInput.addEventListener('submit', submitForm);



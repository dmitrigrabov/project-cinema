let displayMovies = document.getElementById('showResultsContainer');
displayMovies.innerHTML = ' ';

function listenForSubmit() {
  let submitMovieSearch = document.querySelector('#submitButton');
  submitMovieSearch.addEventListener("click", function(event) {
      event.preventDefault();
      let inputText = document.querySelector('#searchForm').value;
      let inputMovie = inputText.replace(/\s/g, "+").toLowerCase();
      console.log(inputMovie);
      findAllTheMovies(inputMovie);
  });
}

listenForSubmit();

function showSearchResults(resultArray) {
  displayMovies.innerHTML = ' ';
  resultArray.forEach(function(result) {
    let showMovieTitle = document.createElement('h3');
    showMovieTitle.innerHTML = result.Title + ', ' + result.Year;
    displayMovies.appendChild(showMovieTitle);
    let showMoviePoster = document.createElement('img');
    showMoviePoster.src = result.Poster;
    displayMovies.appendChild(showMoviePoster);
  });
}

function findAllTheMovies(movie) {
  fetch(`http://www.omdbapi.com/?s=${movie}&apikey=25a585bd`)
    .then(function(response) {
      return response.json()
      debugger;
    }).then(function(myJsonData) {
      const resultArray = myJsonData.Search;
      resultArray.forEach(result => console.log(result.Title));
      showSearchResults(resultArray);
      debugger;
    }).catch(function(error) {
      debugger;
    });
}

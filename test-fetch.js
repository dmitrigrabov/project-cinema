var displayMovies = document.getElementById('showResultsContainer');
displayMovies.innerHTML = ' ';

function listenForSubmit() {
  var submitMovieSearch = document.querySelector('#submitButton');
  submitMovieSearch.addEventListener("click", function(event) {
      event.preventDefault();
      var inputText = document.querySelector('#searchForm').value;
      var inputMovie = inputText.replace(/\s/g, "+").toLowerCase();
      console.log(inputMovie);
      findAllTheMovies(inputMovie);
  });
}

listenForSubmit();

function showSearchResults(resultArray) {
  resultArray.forEach(function(result) {
    var showMovieTitle = document.createElement('h3');
    showMovieTitle.innerHTML = result.Title + ', ' + result.Year;
    displayMovies.appendChild(showMovieTitle);
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



/*
<!-- Code below does not really work -->
//var searchString = 'jurassic';
//var searchUrl = 'http://www.omdbapi.com/?s=star&apikey=25a585bd';

var displayMovies = document.getElementById('showResults');


function findAllTheMovies(movie) {
  document.querySelector("#showResults").innerHTML=' ';
  //var searchUrl = setUrl(movie);
  //console.log(searchUrl);
  fetch(`http://www.omdabpi.com/?=${movie}&apikey=25a585bd`)
  //fetch(searchUrl)
    .then(function(response) {
      return response.json()
      //debugger;
    }).then(function(myJsonData) {
      const resultArray = myJsonData.Search;
      console.log(resultArray);
      //debugger;
      resultArray.forEach(result => console.log(result.Title));
      //showSearchResult(resultArray);
    }).catch(function(error) {
      debugger;
    });
}

function listenForSubmit() {
  var submitMovieSearch = document.querySelector('#submitButton');
  submitMovieSearch.addEventListener("click", function(event) {
      event.preventDefault();
      var inputText = document.querySelector('#searchForm').value;
      var inputMovie = inputText.replace(/\s/g, "+").toLowerCase();

      console.log(inputMovie);

      findAllTheMovies(inputMovie);
  });
}

listenForSubmit();


function showSearchResult(resultArray) {
  resultArray.forEach(function(result) {
    console.log(result.Title);
    var showMovieTitle = document.createElement("h3");
    showMovieTitle.innerHTML = result.Title;
    displayMovies.appendChild(showMovieTitle);
  });
}

listenForSubmit();
//findAllTheMovies();
//showSearchResult();

function setUrl(inputMovie) {
  //var inputMovie = inputText.replace(/\s/g, "+").toLowerCase();
  var searchUrl = `http://www.omdabpi.com/?=${inputMovie}&apikey=25a585bd`;
  //console.log(searchUrl);
  return searchUrl;
}

//setUrl();*/





/*fetch(searchUrl)
  .then(function(response) {
    return response.json()
    debugger;
  }).then(function(myJsonData) {
    const resultArray = myJsonData.Search;
    debugger;
    resultArray.forEach(result => console.log(result.Title));
  }).catch(function(error) {
    debugger;
  });*/

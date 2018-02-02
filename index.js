var formLocator = document.getElementsByClassName("initialSearch")[0];
formLocator.addEventListener("submit", processQuery);

function processQuery(event){
  event.preventDefault();

  var formInput = document.getElementById("queryInput").value;
  console.log(formInput);

  console.log(fetchingFn(formInput));

}

function fetchingFn(incoming){
  fetch(`http://www.omdbapi.com/?s=${incoming}&apikey=e5643f99`)
  .then(function(response) {
      return response.json();
  }).then(function(data) {
      console.log(data);
      document.getElementsByClassName("first-search")[0].style.display = "none";
      var listOfFilms = data.Search;
      console.log(listOfFilms);
      listOfFilms.forEach(item => console.log(item.Poster, item.Title, item.Year, item.imdbID))

  }).catch(function(error) {
    debugger;
  });
}

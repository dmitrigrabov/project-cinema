//var searchString = 'jurassic';
//var searchUrl = 'http://www.omdbapi.com/?s=star&apikey=25a585bd';

function listenForSubmit() {
    var submitMovieSearch = document.querySelector('#submitButton');
    submitMovieSearch.addEventListener("click", function(event) {
      event.preventDefault();
      var movieSearchText = document.querySelector('#searchForm').value;
      //console.log(document.querySelector('#searchForm').value);

      function setUrl() {
        var startUrl = 'http://www.omdbapi.com/?s=';
        var midUrl = movieSearchText.replace(/\s/g, "+").toLowerCase();
        var endUrl = '&apikey=25a585bd';
        var searchUrl = startUrl+midUrl+endUrl;
        console.log(searchUrl);
        return searchUrlTest;
      }
      setUrl();
    });
  }

listenForSubmit();

/*
function setUrl() {
  var startUrl = 'http://www.omdbapi.com/?s=';
  var midUrl = document.querySelector('#searchForm').value;
  var endUrl = '&apikey=25a585bd';
  var searchUrlTest = startUrl+midUrl+endUrl;
  console.log(searchUrlTest);
  //return searchUrlTest;
}

setUrl();*/

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

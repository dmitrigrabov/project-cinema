var searchString = 'jurassic';
var searchUrl = 'http://www.omdbapi.com/?s=jurassic&apikey=25a585bd';

fetch(searchUrl)
  .then(function(response) {
    return response.json()
  }).then(function(myJsonData) {
    const resultArray = myJsonData.Search;
    resultArray.forEach(result => console.log(result.Title));
  }).catch(function(error) {

  });

const queryFilmForm = document.getElementById("query-film");
queryFilmForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const filmResult = document.getElementById("submit-text").value
  document.getElementById("film-result").innerHTML = filmResult
  //base url Below
  const apiUrl = "http://www.omdbapi.com/?apikey=e39b8524&type=movie&s=" + filmResult;
  console.log(apiUrl);
  //Api fetch
  fetch(apiUrl)
    // .then((res) => {
    //   return res.json()
    // }) see below side by side use of old school JS and then arrow function
    .then(function(res){
      return res.json();
    })
    .then((apiJson) => {
      console.log(apiJson);
    })
});

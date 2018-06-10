document.getElementById("query-film").addEventListener("submit", function(e) {

  e.preventDefault();
  const filmResult = document.getElementById("submit-text").value
  document.getElementById("search-query").innerHTML = filmResult
  //base url Below
  const apiUrl = "http://www.omdbapi.com/?apikey=e39b8524&type=movie&s=" + filmResult;
  //Api fetch
  fetch(apiUrl)
    // .then((res) => {
    //   return res.json()
    // }) see below side by side use of old school JS and then arrow function
    .then(function(res) {
      return res.json();
    })
    .then((apiJson) => {
      console.log(apiJson.Search);

      // apiJson.Search.forEach(function(movie){
      //   console.log(movie.Title);
      //   document.getElementById("search-results").innerHTML += movie.Title + " - " + movie.Year

        let movies = apiJson.Search;
        let result = "";
        return movies.forEach(function(movie){
          console.log(movie);
          result +=
          `<div class="card">
          <h2> Movie Name: ${movie.Title}</h2>
          <ul>
            <h3> Movie Year: ${movie.Year}</h3>
            <img class="card-image" src="${movie.Poster}" alt="Movie poster">
          </ul>
          </div>`
          document.getElementById('result').innerHTML = result;
        })

      })

    });

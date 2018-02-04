var formLocator = document.getElementsByClassName("initialSearch")[0];
formLocator.addEventListener("submit", processQuery);

function processQuery(event){
  event.preventDefault();

  var formInput = document.getElementById("queryInput").value;
  if (formInput == ""){
    return alert("Search box can't be blank. Please enter a search term.");
  } else {
    fetchingFn(formInput);
  }
}

function fetchingFn(incoming){
  fetch(`http://www.omdbapi.com/?s=${incoming}&apikey=e5643f99`)
  .then(function(response) {
      return response.json();
  }).then(function(data) {
      document.getElementsByClassName("first-search")[0].style.display = "none";
      document.getElementsByClassName("not-first-search")[0].style.display = "block";
      var listOfFilms = data.Search;
      // console.log(listOfFilms) is part of the spec
      console.log(listOfFilms);
      listOfFilms.forEach(item => makeRowForInput(item));

  }).catch(function(error) {
    debugger;
  });
}

function makeRowForInput(movie){
  var posterSrc = movie.Poster;
  var movieTitle = movie.Title;
  var movieYear = movie.Year;
  var movieIMDBid = movie.imdbID;

  var outputElementParent = document.getElementsByClassName("resultsOutput")[0];

  // TODO: create a function that returns movieDetails

  var movieDetails = document.createElement("div");
  var posterBox = document.createElement("div");
  var movieInfo = document.createElement("div");
  var image = document.createElement("img");
  var movieInfoTitle = document.createElement("p");
  var movieInfoYear = document.createElement("p");
  var movieInfoIMDB = document.createElement("p");
  var imdbLink = document.createElement("a");

  movieDetails.className = "row resultsItem";
  movieDetails.style.margin = "5px 30px";
  posterBox.className = "col-2";
  posterBox.align = "right";
  movieInfo.className = "col-10";

  if (posterSrc == "N/A"){
    image.src = "images/no-image-available.jpeg";
  } else {
    image.src = posterSrc;
  }
  image.height = "150";

  //TODO : trim excess image on horizontal axis to a fixed width

  imdbLink.href = `http://www.imdb.com/title/${movieIMDBid}`
  imdbLink.innerHTML = `Learn more about ${movieTitle} on IMDB`

  var movieTitleContent = document.createTextNode(movieTitle);
  var movieYearContent = document.createTextNode(movieYear);
  var movieIMDBContent = document.createTextNode("");

  movieDetails.appendChild(posterBox);
  movieDetails.appendChild(movieInfo);

  movieDetails.id = movieIMDBid;
  movieDetails.addEventListener("click", displayFurtherInfo);

  movieInfoIMDB.appendChild(imdbLink);

  movieInfo.appendChild(movieInfoTitle);
  movieInfo.appendChild(movieInfoYear);
  movieInfo.appendChild(movieInfoIMDB);

  movieInfoTitle.appendChild(movieTitleContent);
  movieInfoYear.appendChild(movieYearContent);
  movieInfoIMDB.appendChild(movieIMDBContent);

  posterBox.appendChild(image);


  outputElementParent.appendChild(movieDetails);
}


function displayFurtherInfo(event){
  var imdbID = event.currentTarget.id;
  fetchingDetailsFn(imdbID);
}

function fetchingDetailsFn(incoming){
  fetch(`http://www.omdbapi.com/?i=${incoming}&apikey=e5643f99`)
  .then(function(response) {
      return response.json();
  }).then(function(data) {
    // console.log(data) is part of the spec
      console.log(data);
      makeDetailedInfoCard(data);
  }).catch(function(error) {
    debugger;
  });
}

function makeDetailedInfoCard(movieDetailsObject){
  var imdbID = movieDetailsObject.imdbID;
  var movieRow = document.getElementById(imdbID);
  var runtime = movieDetailsObject.Runtime;
  var rating = movieDetailsObject.Rated;
  var plot = movieDetailsObject.Plot;

  var extraDetails = document.createElement("div");
  extraDetails.className = `col-9 detailInfo${imdbID}`;
  extraDetails.style.backgroundColor = "#84dccf";

  var runtimeP = document.createElement("p");
  var ratingP = document.createElement("p");
  var plotP = document.createElement("p");

  var runtimeContent = document.createTextNode(`Runtime: ${runtime}`);
  var ratingContent = document.createTextNode(`Rating: ${rating}`);
  var plotContent = document.createTextNode(`Plot outline: ${plot}`);

  runtimeP.appendChild(runtimeContent);
  ratingP.appendChild(ratingContent);
  plotP.appendChild(plotContent);

  extraDetails.appendChild(runtimeP);
  extraDetails.appendChild(ratingP);
  extraDetails.appendChild(plotP);

  movieRow.addEventListener("click", toggleFurtherInfo);
  movieRow.removeEventListener("click", displayFurtherInfo);


  movieRow.appendChild(extraDetails);

}

function toggleFurtherInfo (event){
  var movieRow = event.currentTarget;
  var furtherInfoBox = movieRow.lastChild;

  if (furtherInfoBox.style.display == ""){
    furtherInfoBox.style.display = "none";
  }
  else {
    furtherInfoBox.style.display = "";
  }
}

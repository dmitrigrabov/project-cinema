const searchStr = query("search__text");
const searchButton = query("search__button");
const searchForm = query("search__form");
const searchRes = query("search__form");
let resContainer = query("results__container"),
  parentNode = query("results__list");
let movieMap = new Map(),
  movieArr = [],
  htmlStr = "",
  nextStr = "",
  movieID = "",
  pageNum = 1;

//DRY Short Functions
function query(eleID) {
  return document.querySelector(`#${eleID}`);
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  return parent.appendChild(element);
}

function remove(parent, element) {
  return parent.removeChild(element);
}

//Listener for title Search
searchForm.addEventListener("submit", fetchMovies);

//Fetch Data Function for 10 movies
function fetchMovies() {
  event.preventDefault();
  let searchURL = `http://www.omdbapi.com/?s=${
    searchStr.value
  }&page=${pageNum}&apikey=39d7228f`;

  //Fetch actual start
  fetch(searchURL)
    .then(function(response) {
      return response.json();
    })
    //Process useful fetch data
    .then(function(myJsonData) {
      // console.log(myJsonData);
      let newNode = createNode("div");
      let htmlStr = `<div class="results__nav" id="results__nav">
                    <h3 >Showing ${10 * pageNum} of ${
        myJsonData.totalResults
      } films found </h3> `;

      //if there are more than 10 films display a 'Next' link
      if (myJsonData.totalResults > 10) {
        htmlStr += `<a id="results__next" href="#" onclick="nextMovies()"> Next page </a>`;
        // htmlStr += `<a id="results__next" href="#" onclick="fetchMovies()"> Next 10 results </a>`;
        pageNum++;
      }
      newNode.innerHTML = htmlStr;
      append(searchRes, newNode);

      //Iterate through data and populate Movie Map
      //Map Structure = [imdbID : [poster, title, year]
      myJsonData.Search.forEach(function(film) {
        movieMap[film.imdbID] = [film.Poster, film.Title, film.Year];
        displayMovieList(film.imdbID, movieMap);
      });
    });
}

//Display Basic film info(Poster, Title & Year) from Movie map with imdbID key
function displayMovieList(movieID, movieListMap) {
  if (pageNum > 1) {
    console.log(movieListMap);
    console.log(movieListMap.size);
  }
  let htmlStr = `<div id=${movieID} style="width:40%;"> 
           <a href="https://www.imdb.com/title/${movieID}"  target='_blank'>
             <img src=${movieListMap[movieID][0]="N/A" ? movieListMap[movieID][0] : 'http://www.placepuppy.net/150/200'} alt="Movie poster" width=auto height="200"/> </a>
           <a h2 onclick="moreInfo('${movieID}')"href="#/"> ${
    movieListMap[movieID][1]
  } </a>(${movieListMap[movieID][2]}) </h2>
        </div>`;

  // Create list of results and display
  let newNode = createNode("li");
  newNode.innerHTML = htmlStr;
  parentNode = query("results__list");
  append(parentNode, newNode);
}
// Fetch detailed movie information for one movie
// This function is called from the "on-click" action in html on the film title
function moreInfo(filmID) {
  if (typeof(results__info) !== 'undefined'){
    parentNode = query(results__info);
    while (parentNode.firstChild) {
      parentNode.firstChild.remove();
    }
  }
  fetch(`http://www.omdbapi.com/?i=${filmID}&plot=full&apikey=39d7228f`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJsonData) {
      console.log(myJsonData);
      myJsonData.Ratings.forEach(
        rating => (htmlStr += ` ${rating["Source"]}  ${rating["Value"]}   `)
      );
      // Displays data straight from myJsonData (not stored separately)
      let infoStr = `<id="results__info">
        <strong> Age Rating: </strong>${myJsonData.Rated} <br>
          <strong> Summary:</strong> ${myJsonData.Plot}<br>
          <strong> Director:</strong> ${myJsonData.Director}<br>
          <strong> Actors: </strong>${myJsonData.Actors} <br>
          <strong> Ratings:</strong>${htmlStr}
          `;
      // console.log("more info string ", moreInfo);
      parentNode = document.querySelector(`#${filmID}`);
      // Create paragraph of results and display
      let infoNode = createNode("div");
      infoNode.innerHTML = infoStr;
      parentNode.after(infoNode);
    });
}

//clear page in preparation for new display of films
function nextMovies() {
  //need to clear children of results__list;
  parentNode = query("results__list");
  while (parentNode.firstChild) {
    parentNode.firstChild.remove();
  }
  //need to clear children of results__nav;
  parentNode = query("results__nav");
  while (parentNode.firstChild) {
    parentNode.firstChild.remove();
  }
  fetchMovies();
}
// .catch(function(error) {
//console.log(error)});

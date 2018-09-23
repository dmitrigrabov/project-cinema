const baseUrlSearch = "http://www.omdbapi.com/?apikey=305417ec&s=";
const baseUrlSpecific = "http://www.omdbapi.com/?apikey=305417ec&t=";
const filmContainer = document.querySelector(".films");

const formInput = document.querySelector("form");
formInput.addEventListener("submit", function(searchEvent) {
  filmContainer.innerHTML = "";
  searchEvent.preventDefault();
  let searchInput = document.querySelector(".search__input");
  refineUrl(searchInput.value);
});

const refineUrl = search => {
  let pageNum = 1;
  fetchRefined(`${baseUrlSearch}${search}&page=${pageNum}`);
  pageNum++;
  nextpage(`${baseUrlSearch}${search}`, pageNum);
};

function fetchRefined(url) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(body => bottleneckFetchedData(body));
}
//prettier-ignore
const bottleneckFetchedData = films => films.Search.forEach(film => createFilmElement(film));

function createFilmElement(singleFilmObject) {
  const movieListElement = document.createElement("li");
  movieListElement.className = "movie__element";

  //prettier-ignore
  movieListElement.innerHTML = `<img class="movie__img" src='${singleFilmObject.Poster}'>
  <h2 class="movie__title">${singleFilmObject.Title}</h2><h2 class="movie__date">(${singleFilmObject.Year})</h2>
  <div class="image__interior">
    <img src="images/question.png" class="more__info">
  </div>`;
  appendIntoDocument(movieListElement);
}

const appendIntoDocument = movie => {
  filmContainer.appendChild(movie);
};

function nextpage(search, pageNum) {
  const next = document.createElement("button");
  next.className = "next__page";
  next.textContent = "Next Page";

  const header = document.querySelector("header");
  header.appendChild(next);
  next.addEventListener("click", function(event) {
    const films = document.querySelector(".films");
    films.innerHTML = "";
    const nextUrl = `${search}&page=${pageNum++}`;
    fetchRefined(nextUrl);
  });
}

///////////////////////////////////////////////////////

filmContainer.addEventListener("click", function(event) {
  //prettier-ignore
  if (event.target.className === "more__info") {
    /*We need the parent node to (more readably) access
        the H2 tag.                                     */
    const superParent = event.target.parentNode.parentNode;
    const filmName = pullFilmName(superParent.childNodes);
    typeSearchFilm(filmName);
    //For mobile.
  }else if(event.target.className === "movie__img"){
    const mobileSuperParent = event.target.parentNode;
    const mobileFilmName = pullFilmName(mobileSuperParent.childNodes);
    typeSearchFilm(mobileFilmName);
  }
});

const pullFilmName = childElementArray => {
  console.log(childElementArray.length);
  return childElementArray[2].textContent;
};

function typeSearchFilm(filmName) {
  console.log(filmName);
  const url = `${baseUrlSpecific}${filmName}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(body => createInfoPanel(body));
}

async function createInfoPanel(typeSearchedObject) {
  //Specify that you will wait for the promise to resolve.
  const movieID = await getMovieIDForReview(typeSearchedObject);
  const review = await getReview(movieID);
  //Currently not operating as intended.
  let mobileClose = "";
  screen.width < 700 ? (mobileClose = "Close") : (mobileClose = "x");

  const infoPanel = document.createElement("div");
  infoPanel.className = "info__panel";
  infoPanel.innerHTML =
    //prettier-ignore
    `<div class= "close">
    <button class="info__panel__close" onclick ="closeInfoPanel(this)">${mobileClose}</button>
    </div>
    <div class="img__title__date__genre">
      <img src="${typeSearchedObject.Poster}">
      <h1 class="info__panel__title">${typeSearchedObject.Title}</h1>
      <h1 class="info__panel__date">${typeSearchedObject.Year}</h1>
      <p class="genre">${typeSearchedObject.Genre}</p>
    </div>
    <div class="desc">
      <p class="info__panel__description">${typeSearchedObject.Plot}</p>
      <h2>Top Review:</h2>
      <p class="review">${review.content}</p>
      <p class="review__author">${review.author}</p>
    </div>
    <div class="director__starring">
      <p class="info__panel__director">Directed by: ${typeSearchedObject.Director}</p>
      <p class="info__panel__starring">Starring: ${typeSearchedObject.Actors}</p>
    </div>
    
    <div class="rating">
        <span class="stars">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </span>
    </div>`;
  //Will need to append it into view.
  const filmContainer = document.querySelector(".display__film");
  filmContainer.appendChild(infoPanel);
  infoPanel.scrollIntoView();
}

const closeInfoPanel = closeButton => {
  closeButton.parentNode.parentNode.remove();
};

async function getMovieIDForReview(filmObject) {
  let movieDBBaseURI = `https://api.themoviedb.org/3/search/movie?api_key=c1eda2d27f7a73d8ca633b6936e5b012&query=`;

  const response = await fetch(`${movieDBBaseURI}${filmObject.Title}`);
  const movieData = await response.json();

  const movie = movieData.results.find(item => {
    if (item.title === filmObject.Title) {
      //console.log(item.id);
      return item;
    }
  });
  return movie.id;
}
async function getReview(id) {
  //prettier-ignore
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=c1eda2d27f7a73d8ca633b6936e5b012`)
  const reviews = await response.json();
  const firstReview = await reviews.results[0];
  if (firstReview != undefined) {
    return firstReview;
  } else {
    return {
      content: "No review found for this production.",
      author: `See for yourself at themoviedb.org, ID: ${id}`
    };
  }
}

// function youMayAlsoLike(genre, actors, director, writer){
//     //search for films/tv with the same genre, actors and director
//     //fail? search for films/tv with same genre and actors
//     //fail? search for films with same genre and writer
//     fetch(`${baseUrlSearch`){

//     }
// }

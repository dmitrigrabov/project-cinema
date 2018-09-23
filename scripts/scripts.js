//API key: 210776d9

//http://www.omdbapi.com/?apikey=210776d9&[searchparameters]

const bodyElement = document.querySelector("body");
const searchTextElement = document.querySelector(".search__text");
const searchResultsElement = document.querySelector(".results");
const filmDisplayElement = document.querySelector(".film-container");
const modal = document.querySelector(".modal");
const displaySearchButton = document.querySelector(".search__display-bar");
const searchBarElement = document.querySelector(".nav__search");
const homeNavBar = document.querySelector(".nav__home");
const favouritesContainer = document.querySelector(".favourites-container")

const myStorage = window.localStorage


bodyElement.addEventListener("submit", event => {
  event.preventDefault();
  if (event.target.matches(".search")) {
    modal.style.display = "block";
    apiUrls.updateURL("s", searchTextElement.value);
    apiUrls.fetchResults(apiUrls.getURL());
  }
});

//closest instead of matches, pay attention in case of bugs
bodyElement.addEventListener("click", event => {
  if (event.target.closest(".search__result")) {
    modal.style.display = "none";
    searchResultsElement.innerHTML = "";
    filmDisplayElement.innerHTML = "";
    toggleNavBar();
    apiUrls.updateMovieURL("i", event.target.dataset.id);
    apiUrls.fetchMovie(apiUrls.getMovieURL());
  }
  if (event.target.closest(".favourite-element")){
    apiUrls.updateMovieURL("i", event.target.dataset.id);
    apiUrls.fetchMovie(apiUrls.getMovieURL());
  }
  if (event.target.matches(".search__display-bar")) {
    toggleNavBar();
  }
  if (event.target.matches(".add-favourite-button")){
    event.preventDefault()
    if (myStorage.favourites){
      apiUrls.favourites = JSON.parse(myStorage.favourites)
    }
    apiUrls.favourites.push(apiUrls.getMovieURL())
    myStorage.setItem("favourites", JSON.stringify(apiUrls.favourites))
    populateFavourites()
  }
  if (event.target.matches(".logo")){
    filmDisplayElement.innerHTML = ""
  }
  if (event.target.matches(".exit-results")){
    modal.style.display = "none"
    searchResultsElement.innerHTML = ""

  }
});

//look into actual toggle functionality with BEM
function toggleNavBar() {
  if (window.getComputedStyle(homeNavBar).display === "flex") {
    searchBarElement.style.display = "flex";
    homeNavBar.style.display = "none";
  } else {
    searchBarElement.style.display = "none";
    homeNavBar.style.display = "flex";
  }
}

const apiUrls = {
  searchParameters: {
    s: "",
    type: "",
    page: ""
  },

  movieParameters: {
    i: "",
    plot: ""
  },

  favourites: [],

  updateURL: function(parameter, update) {
    this.searchParameters[parameter] = `&${parameter}=${update}`;
  },

  updateMovieURL: function(parameter, update) {
    this.movieParameters[parameter] = `&${parameter}=${update}`;
  },

  getURL: function() {
    const customURL = `http://www.omdbapi.com/?apikey=210776d9${
      this.searchParameters.s
    }`;
    return customURL;
  },

  getMovieURL: function() {
    return `http://www.omdbapi.com/?apikey=210776d9${this.movieParameters.i}&plot=long`;
  },

  fetchResults: function(apiURL) {
    const exitButton = document.createElement("button")
    exitButton.className = "exit-results"
    exitButton.textContent = "exit"
    fetch(apiURL)
      .then(response => response.json())
      .then(body => {
        if (body.hasOwnProperty("Error")) {
          //TODO: needs to be filled out
          const searchErrorMsg = document.createElement("h3")
          searchErrorMsg.textContent = "Sorry, you found a bug"
          searchResultsElement.appendChild(searchErrorMsg)
          searchResultsElement.appendChild(exitButton)
        } else {
          body.Search.forEach(result => {
            searchResultsElement.appendChild(searchTemplate(result));
          });
          searchResultsElement.appendChild(exitButton)
        }
      });
  },

  fetchMovie: function(apiURL) {
    fetch(apiURL)
      .then(response => response.json())
      .then(body => {
        console.log(body.Title)
        filmDisplayElement.appendChild(fullFilmTemplate(body));
        this.fetchNews(this.getNewsURL(body.Title))
      });
  },

  fetchFavourites: function(apiURL){
    fetch(apiURL)
      .then(response => response.json())
      .then(body => {
        console.log("fetched")
        favouritesContainer.appendChild(favouriteTemplate(body))
      })
  },

  getNewsURL: function(searchString){
    return `https://newsapi.org/v2/everything?q="${searchString}"&sortBy=relevancy&pageSize=6&apiKey=9ed005ef4eb94baf913fce701c69972f`
  },

//tried writing this as pure but no luck
  fetchNews: function(apiURL){
     fetch(apiURL)
      .then(response => response.json())
      .then(body => {
        filmNewsElement = filmNewsTemplate(body)
        filmDisplayElement.appendChild(filmNewsElement)
      })

  }
};

const pageHandlers = {};

function searchTemplate(result) {
  const searchResultElement = document.createElement("div");
  const template = `
    <div class="search__result" data-id=${result.imdbID}>
      <img class="result__poster" src=${result.Poster} data-id=${result.imdbID}/>
      <div class="result__title">
        <h4 data-id=${result.imdbID}>${result.Title}</h4>
      </div>
      <h5 class="result__year" data-id=${result.imdbID}>(${result.Year})</h5>
    </div>
  `;
  searchResultElement.innerHTML = template;
  return searchResultElement;
}

function fullFilmTemplate(result) {
  console.log(result)
  const filmInfoElement = document.createElement("div");
  const template = `
    <div class="film-display">
      <div class="film-display__header">
        <h2>${result.Title} <small>(${result.Year})</small></h2>
        <a class="add-favourite-button" href=""><i class="far fa-star add-favourite-button"></i></a>
      </div>
      <div class="film-display__info">
        <img class="film-display__poster" src=${result.Poster}/>
        <div class="film-display__key-facts">
          <span>${result.Genre} | ${result.Runtime} | ${result.Rated}</span>
          <span> Director: ${result.Director}</span>
          <span> Written By: ${result.Writer}</span>
        </div>
      </div>
      <span class="film-display__cast"><strong>Cast:</strong> ${result.Actors}<span>
      <p>${result.Plot}<p>
      <div class="film-display__ratings">
        <h5>Ratings & Awards</h5>
        <span>${result.Awards}</span>
        <span>${result.Ratings[0].Source}: ${result.Ratings[0].Value}</span>
        <span>${result.Ratings[1].Source}: ${result.Ratings[1].Value}</span>
      </div>
      <div class="film-display__misc">
      <h5>Miscellaneous</h5>
      <span>Released: ${result.Released}, Box Office: ${result.BoxOffice}. DVD: ${result.DVD}</span>
      <span>${result.Country} | ${result.Language} | ${result.Production} </span>
      <span> ${result.Website}</span>
      </div>
    </div>
  `;
  filmInfoElement.innerHTML = template;
  return filmInfoElement;
}

function filmNewsTemplate(body){
  const filmNewsElement = document.createElement("div")
  filmNewsElement.className = "film-display__news-container"
  filmNewsElement.innerHTML = `<h4>Recent News</h4>`
  const newsStories = body.articles.map(story => {
    return `<span class="film-display__news-item">
      <a href="${story.url}"">${story.title}</a>
      <small>
        <span>${convertDateForDisplay(story.publishedAt)} |</span>
        <span>${story.source.name}</span>
      </small>
    </span>`
  })
  filmNewsElement.innerHTML += newsStories.join("")
  return filmNewsElement


}

function favouriteTemplate(result){
  const favouriteElement = document.createElement("div");
  const template = `
    <div class="favourite-element" data-id=${result.imdbID}>
      <h4 class="result__title" data-id=${result.imdbID}>${result.Title}</h4>
      <h5 class="result__year" data-id=${result.imdbID}>(${result.Year})</h5>
      <div class="favourite-element__arrows">
        <i class="arrow up"></i>
        <i class="arrow down"></i>
      </div>
    </div>
  `;
  favouriteElement.innerHTML = template;
  return favouriteElement;
}

function populateFavourites(){
  let localFaves = myStorage.getItem("favourites")
  localFaves = JSON.parse(localFaves)
  if (localFaves){
    favouritesContainer.innerHTML = ""
    localFaves.forEach(fave => {
      apiUrls.fetchFavourites(fave)
    })
  }else{
    const noFavesElement = document.createElement("div")
    noFavesElement.className = "favourite-element__none"
    noFavesElement.innerHTML = `
    <h4>You don't have any favourites</h4>
    <h6>Search to get started</h6>
    `
    favouritesContainer.appendChild(noFavesElement)
  }
}


function convertDateForDisplay(date) {
  const inputDate = new Date(date);
  return inputDate.toLocaleString();
}



populateFavourites()

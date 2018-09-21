//API key: 210776d9

//http://www.omdbapi.com/?apikey=210776d9&[searchparameters]


const bodyElement = document.querySelector("body")
const searchTextElement = document.querySelector(".search__text")
const searchResultsElement = document.querySelector(".results")
const filmDisplayElement = document.querySelector(".film-display")

bodyElement.addEventListener("submit", event => {
  event.preventDefault()
  if (event.target.matches(".search")){
    apiUrls.updateURL("s", searchTextElement.value)
    apiUrls.fetchResults(apiUrls.getURL())
  }
})

//closest instead of matches, pay attention in case of bugs
bodyElement.addEventListener("click", event => {
  if (event.target.closest(".search__result")){
    apiUrls.updateMovieURL("i", event.target.dataset.id)
    apiUrls.fetchMovie(apiUrls.getMovieURL())
  }
})

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



  updateURL: function(parameter, update) {
    this.searchParameters[parameter] = `&${parameter}=${update}`;

  },

  updateMovieURL: function(parameter, update){
    this.movieParameters[parameter] = `&${parameter}=${update}`;

  },

  getURL: function() {
  const customURL = `http://www.omdbapi.com/?apikey=210776d9${this.searchParameters.s}`
  return customURL
},

  getMovieURL: function(){
    return `http://www.omdbapi.com/?apikey=210776d9${this.movieParameters.i}`
  },

  fetchResults: function(apiURL){
    fetch(apiURL)
    .then(response => response.json())
    .then(body => {
      console.log(body.Search)
      body.Search.forEach(result => {
        searchResultsElement.appendChild(searchTemplate(result))

      })
    })

  },

  fetchMovie: function(apiURL){
    fetch(apiURL)
    .then(response => response.json())
    .then(body => {
      filmDisplayElement.appendChild(fullFilmTemplate(body))


    })

}

}

const pageHandlers = {

}

function searchTemplate (result){
  const searchResultElement = document.createElement("div")
  const template = `
    <div class="search__result" data-id=${result.imdbID}>
    <img class="result__poster" src=${result.Poster} data-id=${result.imdbID}/>
    <h4 class="result__title" data-id=${result.imdbID}>${result.Title}</h4>
    <h5 class="result__year" data-id=${result.imdbID}>(${result.Year})</h5>
    <h5 class="result__type" data-id=${result.imdbID}>${result.Type}</h5>
    </div>
  `
  searchResultElement.innerHTML = template
  return searchResultElement
}

function fullFilmTemplate (result){
  const filmInfoElement = document.createElement("div")
  const template = `
    <div class="film-display">
    <h2>${result.Title}</h2>
    <h4>${result.Actors}<h4>
    <p>${result.Plot}<p>
    </div>
  `
  filmInfoElement.innerHTML = template
  return filmInfoElement
}

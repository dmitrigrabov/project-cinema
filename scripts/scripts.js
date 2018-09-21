//API key: 210776d9

//http://www.omdbapi.com/?apikey=210776d9&[searchparameters]


const bodyElement = document.querySelector("body")
const searchTextElement = document.querySelector(".search__text")
const searchResultsElement = document.querySelector(".results")

bodyElement.addEventListener("submit", event => {
  event.preventDefault()
  if (event.target.matches(".search")){
    apiUrls.updateURL("s", searchTextElement.value)
    apiUrls.fetchResults(apiUrls.getURL())
  }
})

bodyElement.addEventListener("click", event => {
  console.log(event.target)
  if (event.target.matches(".search__result")){
    console.log("clicked on film")
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

  getURL: function() {
  const customURL = `http://www.omdbapi.com/?apikey=210776d9${this.searchParameters.s}`
  return customURL
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

  }

};


const pageHandlers = {

}

function searchTemplate (result){
  const searchResultElement = document.createElement("div")
  const template = `
    <div class="search__result" data-id=${result.imdbID}>
    <img class="result__poster" src=${result.Poster}/>
    <h4 class="result__title">${result.Title}</h4>
    <h5 class="result__year">(${result.Year})</h5>
    <h5 class="result__type">${result.Type}</h5>
    </div>
  `
  searchResultElement.innerHTML = template
  return searchResultElement


}

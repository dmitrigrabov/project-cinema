// Breaking out API object to display
function displaySearchDataOnPage(searchResultsArr) {
  //console.log(searchResultsArr);
  mainNode.innerHTML = "";
  const numberOfResults = searchResultsArr.totalResults;
  const searchArr = searchResultsArr.Search;
  searchArr.forEach(function(content) {
    //console.log(content);
    createContentOverview(content);
  });
}
// Show if error with API call
function displayErrorToUser(error) {}

//nodes we are listening out for
const mainNode = document.querySelector("main");

//Create the search previews Poster + Title + Year + Try to pull in rating
function createContentOverview(content, className = "content-overview") {
  const overviewMarkUp = `
      <a href="">
        <img src=${content.Poster} alt="${content.Title} class="parent-img">
      </a>
        <h4>${content.Title}</h4>
        <p>${content.Year}</p>
        <p>IMDB: ${content.imdbID}</p>
  `;
  const contentOverviewNode = document.createElement("div");
  contentOverviewNode.innerHTML = overviewMarkUp;
  contentOverviewNode.className = className;

  mainNode.appendChild(contentOverviewNode);

  //pull in content data for on hover information
  fetchContentDetails(content).then(contentBody => {
    const hoverMarkUp = `
          <p>Save</p>
          <p>Watched</p>
          <p>${contentBody.Ratings.Value}</p>
          <p>${contentBody.Runtime}</p>
    `;
    const hoverDetailsNode = document.createElement("div");
    hoverDetailsNode.innerHTML = detailsMarkUp;
    hoverDetailsNode.className = "hover-details";
    console.log(hoverMarkUp);
    mainNode.appendChild(hoverDetailsNode);

    //// Create content details and append it to main class
    const detailsMarkUp = `

          <img src=${contentBody.Poster} alt="${
      contentBody.Title
    } class="parent-img">

          <h4>${contentBody.Title}</h4>
          <p>${contentBody.Year}</p>
          <p>${contentBody.Rated}</p>
          <p>${contentBody.Runtime}</p>

          <button class="play-button"></button>
          <button class="watch-trailer-button"></button>

          <p>Watched</p>
          <p>Save</p>
    `;
    const contentDetailsNode = document.createElement("div");
    contentDetailsNode.innerHTML = detailsMarkUp;
    contentDetailsNode.className = "content-details";
    console.log(detailsMarkUp);

    mainNode.appendChild(contentDetailsNode);
  });
  // // NEW BODY DETAILS FROM CONTENT

  // //create details node
}

//fecth the content details from search
function fetchContentDetails(content) {
  //fetch extra movie data using imdbNumber
  const contentImdbID = content.imdbID;
  let result = fetch(
    `http://www.omdbapi.com/?i=${contentImdbID}&apikey=edd66bb`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      //console.log(body);
      return body;
    });
  //result = body;
  return result;
}

///Main fetch function
const fetchAPI = function(fetchURL) {
  fetch(fetchURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      //console.log(body);
      displaySearchDataOnPage(body);
    })
    .catch(function(error) {
      displayErrorToUser(error);
    });
};

// create search parameters to put into movie database
function createSearchParameters(searchInput) {
  //console.log(searchInput);
  const searchURL = `s=${searchInput}`;

  return buildURL(searchURL);
}

// function createContentParameters(imdbNumber) {
//   const contentURL = `i=${imdbNumber}`;
//
//   buildURL(contentURL);
// }

const buildURL = function(param) {
  //Build my api string
  const omdbURL = "http://www.omdbapi.com/?";
  const apiKey = "&apikey=edd66bb";
  const fetchURL = `${omdbURL}${param}${apiKey}`;
  fetchAPI(fetchURL);
};

//Search feature
const searchSubmit = document.querySelector("form");

searchSubmit.addEventListener("submit", function(searchEvent) {
  searchEvent.preventDefault();
  //console.log(searchEvent.target);
  let searchInput = document.querySelector(".search__input");
  //console.log(searchInput.value);
  createSearchParameters(searchInput.value);
});

//click on content Poster to reveal details

// function findCurrentDate() {
//   let currentTime = new Date();
//   let currentYear = currentTime.getFullYear();
//   // Calling load of api for first time
//   createSearchParameters(currentYear);
// }

// Find currentYear to load Api with up to date movies
//findCurrentDate();
createSearchParameters("hangover");

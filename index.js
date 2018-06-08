const form = document.querySelector("#textinput");
const input = document.querySelector("#placeholder");
const movieInfo = document.querySelector("#movieinfo");
const detailInfo = document.querySelector("#detailedinfo");
// const movietitle = document.querySelector("#movieheading");

// Event Handler "Submit"
function createUrl(input) {
  const search = input.value.trim();
  return `http://www.omdbapi.com/?s=${search}&apikey=2c6457b6&`;
}

function searchFilms(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let html = data.Search.map(function(movie) {
        return `
          <div class="moviecard">
            <h2 id="movieheading" class="movieheading">
              ${movie.Title}
            </h2>
            <h3 class="movieyear">
              ${movie.Year}
            </h3>
            <a href="https://www.imdb.com/title/${movie.imdbID}/">
              <img src="${movie.Poster}" class="poster">
            </a>
          </div>
        `;
      }).join("");
      movieInfo.innerHTML = html;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function submitForm(event) {
  event.preventDefault();
  searchFilms(createUrl(input));
}

// Event Handler "Click"
function createUrl2(title) {
  return `http://www.omdbapi.com/?t=${title}&apikey=2c6457b6&`;
}

function searchDetail(url2) {
  fetch(url2)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
        const html = `
          <div class="infocard">
            <p>${data.Plot}</p> 
          </div>
        `;
      detailInfo.innerHTML = html;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getInfo(event) {
  event.preventDefault();
  if (event.target.id === "movieheading") {
    const title = event.target.innerText;
    searchDetail(createUrl2(title));
  };
}

form.addEventListener("submit", submitForm);
movieInfo.addEventListener("click", getInfo);

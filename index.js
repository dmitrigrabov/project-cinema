const form = document.querySelector("#textinput");
const input = document.querySelector("#placeholder");
const movieInfo = document.querySelector("#movieinfo");
const detailInfo = document.querySelector("#detailedinfo");
// const movietitle = document.querySelector("#movieheading");

// Event Handler "Submit" ==> Returns Movie Results
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
            <a href="https://www.imdb.com/title/${movie.imdbID}/">
              <img src="${movie.Poster}" class="poster">
            </a>
            <div class="cardtext">
            <h2 id="movieheading" class="movieheading">
              ${movie.Title}
            </h2>
            <h3 class="movieyear">
              ${movie.Year}
            </h3>
            </div>
          </div>
        `;
      }).join("");
      movieInfo.innerHTML = html;
      input.value = '';
      input.focus();
    })
    .catch(function(error) {
      console.log(error);
    });
}

function submitForm(event) {
  event.preventDefault();
  searchFilms(createUrl(input));
}

// Event Handler "Click" ==> Returns Specific Movie Detail
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
          <div id="infocard" class="infocard">
            <p>${data.Plot}</p> 
          </div>
        `;
      detailInfo.innerHTML = html;
      detailInfo.style.visibility = 'visible';
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

// Event Handler "Click" ==> Hides Specific Movie Detail
function removeInfo() {
  if (document.getElementById("infocard")) {
    detailInfo.style.visibility = 'hidden';
// (Tried removieChild and detach(), this was the answer in the end... + line 69)
  }
}

// Scroll up on clicking the form
function scrollUp() {
  window.scrollTo(0, 0);
}

form.addEventListener("submit", submitForm);
movieInfo.addEventListener("click", getInfo);
form.addEventListener("click", removeInfo);
form.on("click", scrollUp());

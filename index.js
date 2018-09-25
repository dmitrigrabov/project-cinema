var searchTitle = ""
var pageNumber = 1;
const form = document.querySelector(".form");
let next = document.querySelector(".next");
let parent = document.querySelector(".main");
let movieItem = document.querySelectorAll(".movieItem")
let bodyarea = document.querySelector("body")
let modalbox = document.querySelector(".modal-body")
var textArea = document.querySelector(".textarea")




//search just by title (no pagination)
form.addEventListener("submit", function(event){
  event.preventDefault()
  console.log(event.target[0].value)
    searchTitle = event.target[0].value
    var url = `http://www.omdbapi.com/?apikey=77164d83&s=${searchTitle}`

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          parent.innerHTML = ""
          displayTest(body.Search)
          console.log(body)
          // textarea.value = ""
        })
    })

// function to diplay the returned search items for the main cards view
  function displayTest(movies) {
  movies.forEach(function(movie, index) {
      let movieItem = document.createElement("div")
      movieItem.setAttribute("data-id",`${movie.imdbID}`)
      console.log(movieItem);
      movieItem.className = "movieItem"
      movieItem.id = `${movie.imdbID}`
      movieItem.innerHTML = `
                    <img id="posterImage" src="${movie.Poster}" alt="movie image" onerror="this.src='imagefound.png';">
                    <h2 data-id="${movie.imdbID}">${movie.Title} (${movie.Year})</h2>
                    <i class="far fa-star"></i>
                      `
                        // <button name="favourite" type="click" value="submit-true">Fave</button>
      parent.appendChild(movieItem);
  })
}


//to pull full information
bodyarea.addEventListener("click", function(event){
  const movieContainer = event.target.closest(".movieItem")
  if(event.target.matches(".far")){
    console.log({event})
    // [movieId1, movieId2]
    localStorage.setItem("movieIDs",JSON.stringify([movieContainer.dataset.id]));
    // then do json parse
  }
  else {
  if(movieContainer){
    console.log(movieContainer.dataset.id)
    fetch(`http://www.omdbapi.com/?apikey=77164d83&i=${movieContainer.dataset.id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          // parent.innerHTML = ""
          // displayTest(body.Search)
          modal.style.display = "flex";
          console.log(body);
          displayDetails(body);
          // textarea.value = ""
        })
      }
  }
})
// addEventListener()

//populate contents of modal overlay
  function displayDetails(body) {
    // modalbox.innerHTML = "";
    modalbox.innerHTML = `
    <ul>
      <li>Director: ${body.Director}</li>
      <li>Runtime: ${body.Runtime}</li>
      <li>IMDB Rating: ${body.imdbRating}</li>
      <li>IMDB Votes: ${body.imdbVotes}</li>
      <li>Rating: ${body.Rated}</li>
      <li>Awards: ${body.Awards}</li>
      <li>Actors: ${body.Actors}</li>
    </ul>
    `
  }


// modal below Here
//get modal modalelement
var modal = document.querySelector("#simpleModal");
//get open modal button
var modalBtn = document.querySelector("#modalBtn");
//get close button
var closeBtn = document.querySelector(".closeBtn");

//listen for open Click
//modalBtn.addEventListener("click", openModal);

//listen for close Click
closeBtn.addEventListener("click", closeModal);
//listen for ourside lcick
window.addEventListener("click", clickOutside);

//function to open modal
function openModal(){
  modal.style.display = "block";
}

function closeModal(){
  modal.style.display = "none";
}

function clickOutside(e){
  if(e.target == modal){
    modal.style.display = "none";
  }
}

//infinite scrolling
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  if (Math.ceil(scrolled) === scrollable) {
    searchQuery = textArea.value
    pageNumber++
    var url = `http://www.omdbapi.com/?apikey=77164d83&s=${searchQuery}&page=${[pageNumber]}`
    event.preventDefault()
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          // parent.innerHTML = ""
          displayTest(body.Search)
        })
  }
})

//pagination - next 10
next.addEventListener("click", function(event){
    searchQuery = textArea.value
    pageNumber++
    var url = `http://www.omdbapi.com/?apikey=77164d83&s=${searchQuery}&page=${[pageNumber]}`
    event.preventDefault()
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          parent.innerHTML = ""
          displayTest(body.Search)
        })
    })

//search preview
textArea.addEventListener("input", function(event){
  searchTitle = event.target.value
  if (searchTitle.length > 2) {
    var url = `http://www.omdbapi.com/?apikey=77164d83&s=${searchTitle}`
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          parent.innerHTML = ""
          displayTest(body.Search)
        })
    }
  else {
    parent.innerHTML = ""
  }
  })

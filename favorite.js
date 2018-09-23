const favoriteList = document.querySelector(".favorite-list");
const localStorage = window.localStorage;
const mySearchResults = document.createElement("button");
const body=document.querySelector("body");
let localData = JSON.parse(localStorage.getItem("favList"));

mySearchResults.innerHTML = "Go to search results";
body.insertBefore(mySearchResults, favoriteList);

mySearchResults.addEventListener("click", function(event) {
  event.preventDefault();
  window.location.href = "movie.html";
});


function loadFavList(localData) {

  favoriteList.innerHTML=" ";
  localData.sort(function(a, b) {
    return a.index - b.index;
    })
    .map(movie => {
    let movieContainer = document.createElement("li");
    movieContainer.className = "movie";
    movieContainer.id = movie.id;
    movieContainer.value = movie.index;

    // console.log(movie.index)
    // console.log(movie.title)
    // console.log(movieContainer.value)

    let movieTitle = document.createElement("h2");
    let movieYear = document.createElement("h3");
    let posterImage = document.createElement("img");
    let upVote=document.createElement("button");
    let downVote=document.createElement("button");

    movieTitle.innerHTML = `${movie.title}`;
    movieTitle.className = "movie-title";
    movieContainer.appendChild(movieTitle);

    movieYear.innerHTML = `${movie.year}`;
    movieYear.className = "movie-year";
    movieContainer.appendChild(movieYear);

    posterImage.src = `${movie.image}`;
    posterImage.className = "movie-image";
    posterImage.alt = "Movie poster";
    movieContainer.appendChild(posterImage);

    upVote.innerHTML="Up"
    movieContainer.appendChild(upVote);

    downVote.innerHTML="Down"
    movieContainer.appendChild(downVote);

    upVote.addEventListener("click", function(event) {
      event.preventDefault();
      localData=shift(event,1);
      loadFavList(localData);
    });
    downVote.addEventListener("click", function(event) {
      event.preventDefault();
      localData=shift(event,-1);
      loadFavList(localData);
      //function;
    });

    favoriteList.appendChild(movieContainer);
    return localData;

  });
}

loadFavList(localData);

function shift(event,number){
  const currentIndex= event.target.parentNode.getAttribute("value");
  localData[parseInt(currentIndex)-number].index=currentIndex;
  localData[currentIndex].index=parseInt(currentIndex)-number;
  return localData
}

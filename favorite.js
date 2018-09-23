const favoriteList=document.querySelector(".favorite-list");
const localStorage=window.localStorage;
let localData;

function loadFavList(){
  localData=JSON.parse(localStorage.getItem("favList"));

  console.log(localData)
  Object.keys(localData).forEach(movieId =>{
    let movieContainer=document.createElement("li");
    movieContainer.className="movie";
    movieContainer.id=movieId;
    let movieTitle=document.createElement("h2");
    let movieYear=document.createElement("h3");
    let posterImage=document.createElement("img");

    movieTitle.innerHTML=`${localData[movieId].title}`;
    movieTitle.className="movie-title";
    movieContainer.appendChild(movieTitle);

    movieYear.innerHTML=`${localData[movieId].year}`;
    movieYear.className="movie-year";
    movieContainer.appendChild(movieYear);

    posterImage.src=`${localData[movieId].image}`;
    posterImage.className="movie-image";
    posterImage.alt="Movie poster";
    movieContainer.appendChild(posterImage);

    favoriteList.appendChild(movieContainer);
  })
}

loadFavList();

const searchSubmit= document.querySelector(".search-area-submit");
const searchText=document.querySelector(".search-area-text");
const searchResultList=document.querySelector(".search-result-list");
const pagination=document.querySelector(".pagination")
const localStorage=window.localStorage;
const favMovieObj={};
const myFavorite=document.createElement("button");
const body=document.querySelector("body");
const mySearchResults=document.createElement("button");
let localData;
//this is to insert search results using dom
function searchResult(body){
    body.Search.forEach(movie =>{
    let searchResultContainer=document.createElement("li");
    searchResultContainer.className="movie";
    searchResultContainer.id=movie.imdbID;
    let searchResultTitle=document.createElement("h2");
    let searchResultYear=document.createElement("h3");
    let posterImage=document.createElement("img");

    searchResultTitle.innerHTML=`${movie.Title}`;
    searchResultTitle.className="movie-title";
    searchResultContainer.appendChild(searchResultTitle);

    searchResultYear.innerHTML=`${movie.Year}`;
    searchResultYear.className="movie-year";
    searchResultContainer.appendChild(searchResultYear);

    posterImage.src=movie.Poster;
    posterImage.className="movie-image";
    posterImage.alt="Movie poster";
    searchResultContainer.appendChild(posterImage);


    let favorite=document.createElement("button");
    favorite.innerHTML="Add to favorites"
    favorite.addEventListener("click", function(event){
        const favoriteMovie=event.target.parentNode.childNodes;
        const movieId=event.target.parentNode.getAttribute("id")

        console.log(favoriteMovie)

        const movieObj ={
          id:movieId,
          title:favoriteMovie[0].textContent,
          year:favoriteMovie[1].textContent,
          image:favoriteMovie[2].getAttribute("src")
          // details:favoriteMovie[4].textContent
        }

        favMovieObj[movieId]=movieObj;

        localStorage.setItem("favList",JSON.stringify(favMovieObj))
        console.log(localStorage)



        //localStorage.setItem("favorite-movies",[])
        // window.location.href='favorite.html'
        })


    searchResultContainer.appendChild(favorite);
    searchResultList.appendChild(searchResultContainer);

    })
  }

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

const favoriteList=document.querySelector(".favorite-list");


function pages(body,page){
  totalSearchResults=body.totalResults;
  let totalPage=totalSearchResults/10;

  pagination.innerHTML=" ";
  for(i=page; i<totalPage+1;i++){

    button=document.createElement("button");
    button.innerHTML=`${i}`
    pagination.appendChild(button);

    console.log(typeof page)
    if (i> parseInt(page)+ 8 ){
      button.className="page-button hide-button"

    } else{

      button.className="page-button";
    }
  }

  if (totalPage>9 && parseInt(page)<totalPage - 8){
    const morePage=document.createElement("button");
    morePage.innerHTML=`...`;
    morePage.className="more-page";
    console.log(morePage)
    pagination.appendChild(morePage);

  }

}



let totalSearchResults=0;



//to fetch search results from API


function loadAPI(page){
  const keyWord=searchText.value;
  const url=`http://www.omdbapi.com/?s=${keyWord}&apikey=d2807699&page=${page}`;
  searchResultList.innerHTML=" "
  fetch(url)
  .then(response => response.json())
  .then(body =>{
      if(typeof body.Search==="undefined"){
        pagination.innerHTML=" ";
        const errorMessage = document.createElement("p");
        errorMessage.innerHTML=`No results available`;
        searchResultList.appendChild(errorMessage);
      } else {
        searchResult(body);
        pages(body,page);
        console.log(body);
      }
    })
  .catch(error => {
    console.log(error);
    });
  }

searchSubmit.addEventListener("click", function(event){
  event.preventDefault();

  let page=1;
  loadAPI(page);
})



pagination.addEventListener("click",event => {
  event.preventDefault();
  page=event.target.textContent;

  loadAPI(page);

})

// const loadMorePage=document.querySelector(".more-page");
// console.log(loadMorePage)
// if(loadMorePage!==null){
//
//     loadMorePage.addEventListener("click",event =>{
//     event.preventDefault();
//     page=event.target.previousSibling.textContent;
//     console.log("page")
//     startPage=parseInt(page)+1
//
//     loadAPI(startPage);
//   })
// }

//clear all results once the search box is cleared
searchText.addEventListener("input", event =>{
  event.preventDefault();
  if (searchText.value===""){
    searchResultList.innerHTML="";
    pagination.innerHTML="";
  }

})


//this is to add movie details using dom
function movieDetails(body,id){

  const searchResultDetails=document.createElement("div");
  searchResultDetails.className="search-result-details";


  let movieDirector=document.createElement("p");
  movieDirector.innerHTML=`Director: ${body.Director}`;
  searchResultDetails.appendChild(movieDirector);

  let movieActors=document.createElement("p");
  movieActors.innerHTML=`Actors: ${body.Actors}`;
  searchResultDetails.appendChild(movieActors);

  let movieCountry=document.createElement("p");
  movieCountry.innerHTML=`Country: ${body.Country}`;
  searchResultDetails.appendChild(movieCountry);

  let movieRatings=document.createElement("p");
  const ratings=body.Ratings.map(rating=>{

                          return `</br>${rating.Source}: ${rating.Value}`
                        });

  movieRatings.innerHTML=`Ratings: ${ratings}`;
  searchResultDetails.appendChild(movieRatings);

  let moviePlot=document.createElement("p");
  moviePlot.innerHTML=`Description: ${body.Plot}`;
  searchResultDetails.appendChild(moviePlot);

  document.getElementById(id).appendChild(searchResultDetails);
}

//to fetch more details about the clicked movie from the API
if (searchResultList!==null){

  searchResultList.addEventListener("click",function(event){
    event.preventDefault();

    //remove other movie details (loaded from previous click)
    const otherDetails=document.querySelector(".search-result-details")
    if(otherDetails!==null){
      otherDetails.parentNode.removeChild(otherDetails);
    }

    const id=event.target.parentNode.getAttribute("id");
    const url=`http://www.omdbapi.com/?i=${id}&plot=full&apikey=d2807699`;

    if(event.target.parentNode.lastChild.matches("button")){
      fetch(url)
      .then(response => response.json())
      .then(body =>{
        movieDetails(body,id);

      })
      .catch(error => console.log(error));

    }

  })
}

// const myFavMovie=document.querySelector(".my-favorite-movies");
// console.log(myFavMovie)
// if(myFavMovie!==null){
//
//   myFavMovie.addEventListener("click",event => {
//     console.log(loadFavList());
//   })
// }


myFavorite.innerHTML="Favorites";
mySearchResults.innerHTML="Search Results"

body.insertBefore(myFavorite,pagination);
body.insertBefore(mySearchResults,pagination);

myFavorite.addEventListener("click", function(event){
  event.preventDefault();
  window.location.href='favorite.html'

  return loadFavList()

    })


mySearchResults.addEventListener("click", function(event){
  event.preventDefault();
  window.location.href='movie.html'

    })
//

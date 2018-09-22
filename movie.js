const search= document.querySelector(".search-area");
const searchText=document.querySelector(".search-area-text");
const searchResultList=document.querySelector(".search-result-list");


//this is to insert search results using dom
function searchResult(body){
  // console.log(body)
  // console.log(body.Search)
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

    searchResultList.appendChild(searchResultContainer);


  })
}

const eventList=["submit", "click"];

//to fetch search results from API
for(event of eventList){
search.addEventListener(event, function(event){
  event.preventDefault();
  const keyWord=searchText.value;
  const url=`http://www.omdbapi.com/?s=${keyWord}&apikey=d2807699&plot=full`;
  searchResultList.innerHTML=" "
  fetch(url)
  .then(response => response.json())
  .then(body =>{
    searchResult(body);
    //console.log(body);
  })
  .catch(error => {
    console.log(error);
    // const errorMessage = document.createElement("p");
    // errorMessage.innerHTML=`No results available`;
    // searchResultList.appendChild(errorMessage);

  });
})
}

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
searchResultList.addEventListener("click",function(event){
  event.preventDefault();

  // if(event.currentTarget.childMatches("div")){
  //   delete event.currentTarget.childMatches("div");
  // }
  const id=event.target.parentNode.getAttribute("id");
  const url=`http://www.omdbapi.com/?i=${id}&plot=full&apikey=d2807699`;

  if(event.target.parentNode.lastChild.matches("img")){
    fetch(url)
    .then(response => response.json())
    .then(body =>{
      movieDetails(body,id);

    })
    .catch(error => console.log(error));

  }

})

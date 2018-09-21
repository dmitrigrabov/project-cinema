const search= document.querySelector(".search-area");
const searchText=document.querySelector(".search-area-text");
const searchResultList=document.querySelector(".search-result-list");
//const movies=document.querySelectorAll(".movie");

function searchResult(body){
  // console.log(body)
  // console.log(body.Search)
  body.Search.forEach(movie =>{
    let searchResultContainer=document.createElement("li");
    searchResultContainer.className="movie";
    searchResultContainer.id=movie.imdbID;
    let searchResultTitle=document.createElement("p");
    let searchResultYear=document.createElement("p");
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

    searchResultList.appendChild(searchResultContainer)


  })
}



search.addEventListener("submit", function(event){
  event.preventDefault();
  const keyWord=searchText.value;
  const url=`http://www.omdbapi.com/?s=${keyWord}&apikey=d2807699&plot=full`;

  fetch(url)
  .then(response => response.json())
  .then(body =>{
    searchResult(body);
    //console.log(body);
  })
  .catch(error => console.log(error));
})

function movieDetails(body){
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
                            //console.log(rating)
                          return `${rating.Source}: ${rating.Value}`
                        });
  movieCountry.innerHTML=`Ratings: ${ratings}`;
  searchResultDetails.appendChild(movieRatings);

  let moviePlot=document.createElement("p");
  moviePlot.innerHTML=`Description: ${body.Plot}`;
  searchResultDetails.appendChild(moviePlot);

}


searchResultList.addEventListener("click",function(event){
  event.preventDefault();
  //console.log("hi")
  const id=event.target.parentNode.getAttribute("id");
  const url=`http://www.omdbapi.com/?i=${id}&apikey=d2807699`;
  fetch(url)
  .then(response => response.json())
  .then(body =>{
    movieDetails(body);
console.log(document.querySelector("#id"))
    document.querySelector("#id").appendChild(searchResultDetails)
    console.log(body);
  })
  .catch(error => console.log(error));

})

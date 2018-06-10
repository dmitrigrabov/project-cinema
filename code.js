//varibles
const myForm = document.querySelector("Form");
const myTextArea= document.querySelector("#searchfield");
const myButton = document.querySelector(".favButton");
const myDiv= document.querySelector(".movies");

let favMovies=[];

//functions
function fetching()
{

  let search=myTextArea.value;
 fetch(`http://www.omdbapi.com/?s=${search}&apikey=60ece986`)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    displayMovies(jsonData);
  }).catch(function(error){
    alert("error")
  });
}

function fetchingDeatils(im)
{
  let search=myTextArea.value;
 fetch(`http://www.omdbapi.com/?i=${im}&apikey=60ece986`)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    displayDetails(jsonData, im);
  }).catch(function(error){
    alert("error")
  });
}

function displayDetails(data, im){
  const movie=document.querySelector(`#${im}`);
  console.log(data.Ratings);
  if(movie.childElementCount<9){
    let newNode=document.createElement("li");
    newNode.classList.add("details");
    console.log(data);
    for(let value in data)
      {
        if((value=="Poster") || (value=="Response") || (value=="Ratings")) {

        }

        else{
          newNode.innerHTML+=`${value}: ${data[value]} <br>`;
        }

      }
    movie.appendChild(newNode);
    }
}

function displayMovies(data){

  data.Search.forEach(function(movie){
    let newNode=document.createElement("li");
    newNode.classList.add("movie");
    newNode.id.add
  for(let value in movie)
  {
    if(value=="imdbID"){
      newNode.id=movie[value];
      newNode.innerHTML+=`<a href=https://www.imdb.com/title/${movie[value]}/> LINKK </a> <br>`;
    }
    else if(value=="Poster"){
      newNode.innerHTML+=`<img src=${movie[value]}></img> <br>`;
    }
    else{
      newNode.innerHTML+=`${value}: ${movie[value]} <br>`;
    }
  }
  newNode.innerHTML+=`<button class="fav" type="button">add to fav </button>`;
  myDiv.appendChild(newNode);
});
}

function submitHandler(event){
  event.preventDefault();
  myDiv.innerHTML="";
  fetching();
}

function resetHandler(){
  myDiv.innerHTML="";
}
function favHandler(event)
{
  if(event.target.classList.value=="fav"){
    favMovies.push(event.target.parentElement);
    alert("added to fav");
  }
  else if (event.target.classList.value=="movie") {
    fetchingDeatils(event.target.id);

  }

  //favMovies.push(event.target)
}

function showFav(event){
  console.log(favMovies);
  alert(favMovies);
}

//body
myForm.addEventListener("submit", submitHandler);
myDiv.addEventListener("click", favHandler);
myForm.addEventListener("reset", resetHandler);
myButton.addEventListener("click", showFav);

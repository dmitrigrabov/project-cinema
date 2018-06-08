//varibles
const myForm = document.querySelector("Form");
const myTextArea= document.querySelector("#searchfield");
const myButton = document.querySelector("button");
const myDiv= document.querySelector(".movies");

let search;
//functions
function fetching()
{

  search=myTextArea.value;
 fetch(`http://www.omdbapi.com/?s=${search}&apikey=60ece986`)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    displayMovies(jsonData);
  }).catch(function(error){
    alert("hh")
  });
}

function displayMovies(data){

  data.Search.forEach(function(movie){
    let newNode=document.createElement("li");
    newNode.classList.add("movie");
  for(let value in movie)
  {
    if(value=="imdbID"){
      newNode.innerHTML+=`<a href=https://www.imdb.com/title/${movie[value]}/> LINKK </a> <br>`;
    }
    else if(value=="Poster"){
      newNode.innerHTML+=`<img src=${movie[value]}></img> <br>`;
    }
    else{
      console.log(`${value}: ${movie[value]}`);
      newNode.innerHTML+=`${value}: ${movie[value]} <br>`;
    }
  }
  myDiv.appendChild(newNode);
});
}

function submitHandler(event){
  event.preventDefault();
  console.log(myDiv)
  myDiv.innerHTML="";

  fetching();
}

function resetHandler(){
  console.log(myDiv)
  myDiv.innerHTML="";
}

//body
myForm.addEventListener("submit", submitHandler);
myForm.addEventListener("reset", resetHandler);

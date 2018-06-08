//varibles
const myForm = document.querySelector("form");
const myTextArea= document.querySelector("textarea");
const myButton = document.querySelector("button");
const myDiv= document.querySelector("div");
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
    });

  /*.catch(function(error){
    alert("error");
  }); */
}

function displayMovies(data){

  data.Search.forEach(function(movie){
    let newNode=document.createElement("li");
  for(let value in movie)
  {
    if(value=="imdbID"){
    newNode.innerHTML+=`<a href=https://www.imdb.com/title/${movie[value]}/> LINKK </a> <br>`;
    }
    else if(value=="Poster"){
      newNode.innerHTML+=`<img src=${movie[value]}> img </img> <br>`;
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
  fetching();
}

//body
myForm.addEventListener("submit", submitHandler);

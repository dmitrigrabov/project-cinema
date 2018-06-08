const getSubmit = document.querySelector("#form");

function submitHandler(event){
  event.preventDefault();

  const getMovie = document.querySelector(".searchTerm");
  const movieToSearch = getMovie.value;

  // Search the api using movieToSearch
  const url = `http://www.omdbapi.com/?s=${movieToSearch}&apikey=a46e4310`;
  fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(data){
      console.log(data);
    }).catch(function(error){
      console.log("Sorry, I couldn't find anything. Try and search for something else.");
    });

}

getSubmit.addEventListener("submit", submitHandler);

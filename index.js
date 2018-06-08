
//this are my handles-variables to access html
const form = document.querySelector(".form") 
const text = document.querySelector(".userInput")
const submit = document.querySelector(".submitButton")


function addMovie (movie){
    console.log(movie);
    return movie;
}


function getMovies (movie) {
     fetch(`http://www.omdbapi.com/?s=${movie}&apikey=b91b4611`)
     .then(function(response){
         return response.json()
     })
     .then(function(data){
         //console.log(data.Search)
         return data.Search.forEach(function(item){
             addMovie(item);
         })
     })
}

// adds a listener to the submit button
form.addEventListener('submit', function (event){
    event.preventDefault();
    const searchQueryValue = text.value
    getMovies(searchQueryValue)
})





/*
fetch('http movie DataBase').
then (response  convert to response.json))
then (getData and display in HTML)
*/


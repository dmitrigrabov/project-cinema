/**

* 
*/
const myForm = document.querySelector("form");
const myInput = document.querySelector("input");
const submit = document.querySelector("button");

myForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const searchQuery = myInput.value;

  fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=b5a3d461`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });
});

//   fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=b5a3d461`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//     });

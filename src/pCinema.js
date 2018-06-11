/**

* 
*/
const myForm = document.querySelector("form");
const myInput = document.querySelector("input");
const submit = document.querySelector("movie");

// myForm.addEventListener("submit", function(event) {
//   event.preventDefault();
//   const searchQuery = myInput.value;
//   movieResults();
// });

// function movieResults() {
//   fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=b5a3d461`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//     });
// }
function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
let searchQuery = myInput.value;
console.log(searchQuery);
myForm.addEventListener("submit", function(event) {
  event.preventDefault();
  //const searchQuery = myInput.value;
  //console.log(searchQuery);
  fetch(`http://www.omdbapi.com/?s=${event.searchQuery}&apikey=b5a3d461`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let moviesResult = data.results;
      return moviesResult.map(function(film) {
        let li = createNode("li"),
          img = createNode("img"),
          span = createNode("span");
        img.src = film.Poster;
        span.innerHTML = film.Title;
        span.innerHTML = film.Year;
        append(li, img);
        append(li, span);
        append(li, span);
        append(ul, li);
      });
      //console.log(myJson);
    });
});

// function movieResults(s) {
//   fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=b5a3d461`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//     });
// }

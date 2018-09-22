  //creating a js object to reference the html form element
const form = document.querySelector(".form");
  //creating a js object to  correspond to a submit event
  //then using the text input data as argument to the searchMovies function
const textInput = form.addEventListener( "submit", event => {
  //preventing the default action of submitting the event before we've had
  //a chance to code anything to this event.
    event.preventDefault()
  // creating a js object to reference the html text iunput element
    const inputField= document.querySelector('.input')
    // using inputField as the argument for the searchMoviesfunction
    searchMovies(inputField.value);
})



//searches for movies in the api datbase, usdiong the argument "movie"
function searchMovies(movie) {
  //fetches api with api key and parameter "movie"
  fetch(`http://www.omdbapi.com/?apikey=323bfd8f&s=${movie}`)
  //.then is carried on on succesful receipt of the data
  //response stands for the data that the api has returned.
  //we are returning that data in json format
    .then(function(response) {
      return response.json();
    })
    //a promise returns a promise, so on successful completion of above
    //body, which is the json format of the api data is returned
    .then(function(body){
      console.log(body);
    //we want to diplay the particuloar details of the data we require which
    //have been returned by the api search
     displayMovies(body.Search)
    })
    //code for if the promise fails, an exception.
    .catch(function(error) {
      console.log('Server failed to return data',error);
    });
  }



  let filmItem
      function displayMovies(searchResults) {
        //selecting the html element ul as my parent node
        const parentNode = document.querySelector(".results-list"); //ul
        //map returns a new array, so requires a new variable to
        //refence it (movieString)
        const movieString = searchResults.map( item => {
          //for every item in the searchResults, add a list element
          //and insert the following html
          return `<li data-imdbid=${item.imdbID}>
                      <img src=${item.Poster}>
                      <h2> ${item.Title} </h2>
                      <h4> ${item.Year} </h4>
                  </li>`
        }).join(''); // .join() is required to remove the trailing ,

        //Sets the html of the ul to the movieString that was
        //created above
        parentNode.innerHTML = movieString;
        //Below code is for clicking on things
        //filmItem is now set to the li's within the ul.
        filmItem = document.querySelectorAll('.results-list > li')
        //spread operator changes the copy into an array
        //ask for clarification on this one??
        //Is it because we want to make through the contents?
        const filmItemCopy = [...filmItem]
        //So for each film item we add an event listener for click
        //which calls the fetchMoreDeatilsWithId function
        filmItemCopy.map(aFilm => {
          aFilm.addEventListener('click', event => {
            //fetchMoreDeatilsWithId  gets data on
            // the film using its id
            fetchMoreDeatilsWithId(event.path[1].dataset.imdbid)
          })
        })
      }


      //fetchMoreDeatilsWithId  gets data on
      // the film using its id property
  function fetchMoreDeatilsWithId (imdbIDToSearchWith) {
    //fetch casll to the api using the parameter of ID to get more info
    fetch(`http://www.omdbapi.com/?apikey=323bfd8f&i=${imdbIDToSearchWith}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(body){
        //Successful receipt of data is passed into the
        //addDisplayPlot function.
       addDisplayPlot(imdbIDToSearchWith, body);
      })
      .catch(function(error) {
        console.log('Server failed to return data',error);
      });
    }




    function addDisplayPlot(imdbIDToSearchWith, movieData) {
      // take the plot and set it in to a <p>  that i can
      //display on the screen, omitting all other li's.
      //This parent node is set to the data attribute that
      //is the `id` of the movie
      const parentNode = document.querySelector(`[data-imdbid=${imdbIDToSearchWith}]`)
      //below im setting the inner html of the parent node,
      //the ul, to contain a list that has the details for
      //the movies and im adding the Plot.
      parentNode.innerHTML =
             `<li
                  data-imdbid=${movieData.imdbID}>
                  <img src=${movieData.Poster}>
                  <h2> ${movieData.Title} </h2>
                  <p> ${movieData.Plot}</p>
                  <h4> ${movieData.Year} </h4>
              </li>`
    }

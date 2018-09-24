# Project Cinema

This is a movie search engine and data is fetched from [Open Movie Database](http://www.omdbapi.com) API.

There are two sets of html and js files; each is responsible for one page.

The movie.html and movie.js are to create the movie search functionality. Within this page, the users can search for movies using key words, read expanded movie details, use pagination to switch between pages, and save movies to favorites. A preview window will appear once three or more letters are typed in the search box.

The favorite.html and favorite.js are to save your favorite movies using local storage. The up and down buttons can be used to re-order them.

To switch between search and favorites, you can use the go to buttons at the top of the pages.

Both pages are responsive to different screen widths using the same css style file.




## Objectives

* We want to see great looking webpages that work well at all screen widths
* Your code should have consistent indentation and sensible naming
* Use lots of concise, reusable functions with a clear purpose
* Add code comments where it is not immediately obvious what your code does
* Your code should not throw errors and handle edge cases gracefully. For example not break if server fails to return expected results
* Use BEM methodology to style your page
* Try to use pure functions as much as possible, but keep in mind it will not be possible to make all functions pure.

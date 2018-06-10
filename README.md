# ~~Mission Impossible~~ Project Cinema

This assignment's brief is to create a movie search website that allows the user to enter a movie title and return information about the movie.

## My Personal Brief

My emphasis was on getting to grips and learning as much as I could about the fetch, handling and processing of the data that was returned. I experimented with a number of methods of displaying the data. I tried a table but realised that was cumbersome, and a flex box of 2 separate divs was all that was needed. I put the data in a map object with the IMDB film ID as the key. I thought it would be useful to be able to refer back to the movie map if more functionality was to be added at a later stage. The site is by no means finished. I ran out of time to implement a previous results but I am pleased I managed to retrieve more than one page of data. 

## Running the Website

Ensure that all the files : cine_index.html, cine_index.css, cine_index.js and cinema2.jpg are all within the same folder and open the cine_index.html file in a browser.

## Current Features Implemented

1. Basic Movie search on title - pressing enter or clicking the button will return the first 10 movie results that include the movie title entered
2. Clicking on a movie poster will re-direct the user to the IMDB page in a new tab for that movie
3. Clicking on the movie title will return the following information for the movie : Age Rating, Plot Summary, Director, Actors and Review ratings from IMDB, Rotten Tomatoes and Metacritic
4. Clicking on the Next page link will retrieve the next 10 results with the same functionality as previous

## Bugs

I tested my code as I went along and fixed the major problems, however, a few smaller bugs still exist:
1. Clicking Next Page twice results in the previous navigation heading not clearing so the header gets messy but the data is still returned
2. Have not implemented a minimum width so is only responsive up to a point then movie detailed text will overlap over the movie poster
3. Could not get a placeholder picture to work instead of missing movie poster, but included Alt Text that will also link to imdb page.
4. Entering a new film title and clicking search after a previous search adds new results to the bottom of the page.

## Conclusion

The biggest lesson that I learnt was to take some time out at the start of the project to sketch out a design, not only for the webpage but also to think about the structure of the code, possible functions and to write algorithms or pseudo code. I would like to finish the website in my spare time... so beware bugs! _"I'll be back..."_

## Credits
Photo courtesy of Jakob Owens on Unsplash

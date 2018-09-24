# Project Cinema


![alt text](images\READMEIMG\landing-no-faves.jpg "landing page") ![alt text](images\READMEIMG\movie-display.jpg)

## About

This project involved building a movie search engine using the OMDB api.


I believe I achieved the principal goals of the project. You can search for films, have results displayed and select one of these results for further information.

As an additional feature I used previous experience of working with newsAPI to also display recent news items about the film. This however is still quite buggy, and can show unrelated results often.

I have included a means of adding favourites via local storage.

I missed the stretch goals of:
* having pagination on search results
* being able to reorder favourites
* having a search preview




## Known issues

#### Code Organisation

The code is very messy, I had hoped to refactor but did not have time. I believe many of the API url functions (getMovieURL, getNewsURL) could fairly easily be condensed into one function. I could define functions for event handlers.

There are very few pure functions here. I have attempted BEM in places for CSS, but have got confused at points when one block starts and another ends. I have also not used toggle function to switch between "active" and hidden elements.

#### Responsive design

I tend to spend too much time tweaking for mobile, and continually neglect desktop and other view widths. As a result, tablet has no dedicated media query, and desktop is sparse and poorly put together.

#### Excess elements in HTML

There will sometimes be seemingly useless divs injected into the html due to how I've appended elements.

#### Unrelated news results

This is likely always to be an issue for some films, currently it searches for the film title in all sources. This causes issues with films with fairly ordinary names (i.e Taxi Driver). I believe it could be fixed with some tweaking, to search for other parameters (director/writer) in these cases. Also limiting the sources that newsAPI searches to Entertainment publications.

## Further Plans

#### Further news functionality

Due to the favourite functionality, I was hoping to keep track of news stories. This would mean that the main page favourites display would have icons representing the amount of new news stories related to a film since that film's page was last visited.

I feel this could be achieved with the newsAPI and saving dates of visits saved to local storage. Along with set intervals for news refreshes, I think this would be quite an interesting feature. Unfortunately I was constrained by time and would want to refactor the code before attempting this.

#### Missed stretch goals

I believe these are all achievable. Though the search preview would take a little more work, as I attempted a modal menu for search options which inadvertently disables the search bar.

I made a start on ordering favourites, but quirks of css caused the buttons to display when they shouldn't be, so I abandoned the feature to focus on removing bugs.

Background:
1. Reel Find is a film search app created for week 3 Constructor Labs weekend project.
2. The app uses www.omdbapi.com to get film data and display on the main page. 

How it works:
1. The app loads with a preset search parameter - Batman.
2. The user can search for desired title by entering the name in the search field. The event listener on the search form will trigger a fetch from the API and return the results on the main page.
3. Event listener has been added to the main page and the user will get further information on each film by clicking anywhere on the div containing that films poster, title and year. The event listener uses a second fetch (utilising the movie's IMDb ID number to get additional information for this specific film). 
When user clicks on a different film, the previous film's additional information is removed and the new film's information is displayed.
4. The app utilises API pagination  - the user can get additional search results by clicking 'load more...' button at the bottom of the main page.
5. For larger screens the user will see the first movies poster used as a page background.
6. The user can add favourite films to the 'favouites' section at the bottom of the page by clicking a blue heart next to each film. The heart turns red when a film is favourited. The function uses local storage so the favourites will be saved if the page is reloaded. In order to clear favourites, the user needs to press 'clear my favourites' button which has an event listener which clears local storage.

Notes to self:
1. Used flex grid for the first time (to arrange the div containing each film) - very useful.
2. Need to spend time thoroghly planning the final layout and functionality of the application before starting work on it. This week I jumped straight into fetching data and as a result could not use BEM as the whole HTML is disorganised with me adding new sections/divs as I went along. 
3. In relation to point 2 above, planning should also help with making the code cleaner by utilising more functions and not mutating the variables as much.

If I had more time:
1. Add 'go to top button' to help navigation;
2. Provide more informaiton for each film in favourites.
3. Have the favourites bar display on the side in full-screen mode.
4. Handle error messages and absent posters.
5. Add checkboxes to refine search for movies or series only.
6. Ability to rank favourites.
7. Ability to remove a single favourite.

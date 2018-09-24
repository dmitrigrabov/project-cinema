---
path: "/project-cinema"
date: "2018-09-24"
title: "Project cinema"
---

# Movie Quest

The aim of this project, titled "Movie Quest", is to create a search application for users to be able to find films that they like or are interested in viewing, and to show them relevent information about said film. Movie Quest has been designed to fit the mobile phone screen primarily, but has also been designed to react responsively to the size of the user's device, making it also appropriate for tablet or desktop.

**Design Objectives**

With this project I endevoured to keep all JavaScript to be function-oriented, using many short, concise functions to carry out specific processes, which are then used as callback functions within other functions. I also tried to make sure that each function involved as little mutation as possible in order prevent problems with source information.

In terms of UI design, this was the first project in which I tried to use CSS Grid to form page layout. While I did find this easier to impliment, I feel my inexperience with Grid lead to a slightly boxy and less sleek layout, although the page is still fully responseive. 

**API**

The project utilizes the [Open Movie Database](http://www.omdbapi.com) to fetch relvent data on a search term that the user inputs into the search function. On page load, the application retrieves information about films from the Star Wars franchise that were released in 2018. From there, the user can use the search feature to look for films.

**Film Description**

If the user wants to find out more information about a film they see, they can click on the "More info" button. This button makes a seperate call to the API to retrieve more detailed information about each film, using the film's IMDB id that is displayed in the ID attribute of each search result. If the API recieves a fetch request that specifies a film by ID, it returns specific information about that film only.

**Pagination**

Once the user searches for a film, the application will display page numbers at the bottom so that the user can look through multiple pages of enteries. The function that creates these pages will look at how many results have been returned by the API, divide that number by how many entries there are by page, and dynamically generate page buttons accordingly.

**Favourites Feature**

If a user finds a film that they like or would want to see, they can then add that film to their favourites list. The application adds a button to each search result which, when clicked, will take the name of the film that the button belongs to and store it in a seperate area on the page.


**Future Goals And Ideas To Be Implimented**

In order to make continual improvements to Movie Quest, I would like to impliment these changes in the future: 

- Limit the viewable amount of page buttons for each search in order to clean up the bottom of the application. 

- Have favourite be savable so that they remain after a page refresh. 

- Have favourites be rankable so that the user can be placed in preference order.

- Impliment functionality so that movie information can be displayed or hidden at the user's request, without having to make seperate API calls for each entry. 

- Add a "Popular Films" feature that will provide search results for predetermened search terms based on popular films or film series.
# MovieThing

A movie search engine - made as a weekend project for week 2 of
[Constructor Labs](https://constructorlabs.com/).

The site presents a search box which the user can enter part or all of the
title of a film. Upon clicking the "Go" button, the site will retrieve search
matches for that string from the [Open Movie
Database](http://www.omdbapi.com/) and display them below below. If there
are more than 10, a navigation link to the next 10 will appear beneath.

The user can click on the title of a film to see details about it displayed
in the panel below. If the user wishes they can use the "Favorite" checkbox
to put the film into a list of your favorite movies, which appears at top
right. The film will be placed into the first empty slot, and the user can
move it up and down or remove it using the icons that appear alongside. The
list is kept persistent through the use of LocalStorage.

To run the application, browse to the `index.html` file in the root directory.

# Project Cinema

> # A movie search engine powered by the [Open Movie Database](http://www.omdbapi.com) API.
>
> ## _”A mobile-first, responsive design that looks great at different screen widths“_

---

---

## UX

- Type in your search query and hit the button.

![image](https://user-images.githubusercontent.com/42837452/45932691-2dca1800-bf78-11e8-9108-4e4a7a2e726f.png)

- Search results are loaded below and the screen scrolls up automatically.

- Load more search results by paging through. You get 10 results at a time.

![image](https://user-images.githubusercontent.com/42837452/45932698-52be8b00-bf78-11e8-86f7-2903cda49c84.png)

- Just tap on any of the films in the search results to see more information. This loads below the search results and the screen scrolls up automatically.

![image](https://user-images.githubusercontent.com/42837452/45932722-a9c46000-bf78-11e8-8981-4af4e9e44281.png)

- Save your favourite films - just click the button on the film detail view.

![image](https://user-images.githubusercontent.com/42837452/45932711-7b468500-bf78-11e8-911d-d97474838226.png)

- You can see your list of favourites by clicking the account button in the header. You can delete films from the list individually or delete them all with a single click.

![image](https://user-images.githubusercontent.com/42837452/45932728-da0bfe80-bf78-11e8-8116-76847951a93f.png)

## Technology used

- **HTML & CSS** (Flexbox, Grid)
  - BEM methodology used in markup and CSS.
  - Individual media queries for tablet and desktop in separate files to make the styles easier to maintain.
- **JavaScript** (Fetch, OMDB API, localStorage)
  - Functions are pure as much as possible – concise reusable and each with with a clear purpose.
  - Well commented throughout.

## Surprise feature

- If the film your looking for doesn't have a poster then look out for the 'F~~W~~ill Ferrell' placeholder!

![image](https://user-images.githubusercontent.com/42837452/45932761-50106580-bf79-11e8-9980-0e13e7d227e9.png)

## Challenges, learnings and TODOs

- **localStorage**

  - Favourites currently stored individually in localStorage.
  - Working with a database that stores strings of information is challenging.
  - TODO: Need to refactor to store a single object in localStorage. On page load this can be retrieved and parsed. Stored in an object the user favourites can then be manipulated and updated. On any interaction even the object can be stringified before re-setting in localStorage.
  - [ ] TODO: Make the favourites list sortable. Add `up` and `down` buttons to your favourites which on click will move the result in relevant direction. Also sortable by date saved and film title.
  - [ ] TODO: Implement a watch list feature to save films that you want to see as well as favourites.

- **Search**
  - [ ] TODO: Create a search preview. It should listen for change events on input events and submit a search request with current query string. Display the search preview results in an absolute positioned container just below the search box. Kick of the searching after at least 3 characters have been typed.

**Refactoring**

- [ ] TODO: Refactor code to make use of export/import to keep JS easy to navigate and maintain.

---

### The original brief

- We want to see great looking webpages that work well at all screen widths
- Your code should have consistent indentation and sensible naming
- Use lots of concise, reusable functions with a clear purpose
- Add code comments where it is not immediately obvious what your code does
- Your code should not throw errors and handle edge cases gracefully. For example not break if server fails to return expected results
- Use BEM methodology in your markup and CSS to style your page
- Try to use pure functions as much as possible, but keep in mind it will not be possible to make all functions pure.

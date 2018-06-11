---
path: "/project-cinema"
date: "2018-05-28"
title: "Project cinema"
---

# Project Cinema

We want to create a movie search engine. To power it we will use the [Open Movie Database](http://www.omdbapi.com). It provides access to a huge database of films via an **API**, which stands for **Application Programming Interface**. In short, it is a set of rules and procedures you need to follow to use a remote system.

> Check out this video for some background info on APIs  
> [https://www.youtube.com/watch?v=s7wmiS2mSXY](https://www.youtube.com/watch?v=s7wmiS2mSXY)

To start using the OMDB API you will first need to sign up with them to receive and API key. The key issued to you will allow you 1000 requests per day and you will need to include this key as part of every request.

To get started, fork and clone the repo at [https://github.com/dmitrigrabov/project-cinema](https://github.com/dmitrigrabov/project-cinema). Please submit a pull request after your first commit and push commits regularly.

You should complete as many of the following tasks as you can.

- [x] Create an HTML page which should have a `form` at the top which contains a text input and a submit button. Below it should have a placeholder for the returned results.
- [x] Use JavaScript to capture the submit `event` in your search form, extract the query string from your input and use that to make an API call to the Open Movie Database API to search for films which match the query string using `fetch`. `console.log` the results
- [x] Display the data returned by the API including title, year and poster picture
- [ ] Adjust your layout to create room for a detailed view of movie information
- [ ] Capture clicks on your movie results items and use that information to make another request to the API for detailed movie information. `console.log` the returned result
- [ ] Display the detailed movie result in the in the details view you created earlier

**Your own feature**

- [ ] Implement any feature you would find useful or interesting

**Stretch goals**
- [ ] Implement pagination so that users can navigate between all movies in search results rather than just the first ten
- [ ] Make your design responsive and ensure it looks great at different screen widths
- [ ] Create a favourites list. It's up to you how you would add items to favourites. You could add a button or otherwise. Display a list of favourites somewhere on your page.
- [ ] Make the favourites list sortable. Add `up` and `down` buttons to your favourites which on click will move the result in relevant direction
- [ ] Save favourites locally using `localStorage` so that favourites persist in browser after refresh
- [ ] Let's create a search preview. It should listen for change events on input events and submit a search request with current query string. Display the search preview results in an absolute positioned container just below the search box.  
Hint: You may want to kick of the searching after at least 3 characters have been typed.

## Objectives

* We want to see great looking webpages
* Your code should have consistent indentation and sensible naming
* Use lots of concise functions with a clear purpose
* Add code comments where it is not immediately obvious what your code does
* Your code should not throw errors and handle edge cases gracefully. For example not break if server fails to return expected results

## README.md

When finished, include a README.md in your repo. This should explain what the project is, how to run it and how to use it. Someone who is not familiar with the project should be able to look at it and understand what it is and what to do with it.

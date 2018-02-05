prepPage();

// Initialize event listeners on search box
function prepPage () {
	let searchForm = document.getElementById('searchForm');

	searchForm.addEventListener('submit', searchBoxSubmit, false);

	let searchBox = document.getElementById('searchBox');

	// Show 'Search' prompt in search box when no text entered
	searchBox.addEventListener('focus', () => {
		if (searchBox.value == 'Search') {
			searchBox.value = '';
			searchBox.setAttribute('style',	'color: #000');
		}
	});

	searchBox.addEventListener('blur', () => {
		if (searchBox.value == '') {
			searchBox.value = 'Search';
			searchBox.setAttribute('style',	'color: #aaa');
		}
	});

	showFavorites();

	document.getElementById('clearFavorites').addEventListener('click', (e) => {
		e.preventDefault();
		clearFavorites();
	});
}

// Handle search form submission
function searchBoxSubmit (e) {
	e.preventDefault();
	let searchBox = document.getElementById('searchBox');

	let searchString = searchBox.value;

	// Only do anything if search prompt is absent
	if (searchString != 'Search') {

		// Remove details view when new search is run
		let detailsPanel = document.getElementById('detailsPanel');
		while (detailsPanel.firstChild) {
			detailsPanel.removeChild(detailsPanel.firstChild);
		}

		doFetch('s', searchString, 1,
			(data) => { showSearchResults(data, 1, searchString) });
	}
}

// Mechanics of requesting data from endpoint
function doFetch (type, searchString, page, handler) {

	// Two types of search: 's' and 't'
	let fetchTarget = `&${type}=${searchString}`;
	if (page) { // Result pagination
		fetchTarget += `&page=${page}`;
	}

	let apiKey = '8ed1874c';
	let apiRoot = 'http://www.omdbapi.com/?apikey=' + apiKey;

	fetch(apiRoot + fetchTarget)
		.then( (response) => {
			if (!response.ok) {
				throw new Error('Request response was not OK');
			}

			return getJSON(response);
		}).then( (data) => {
			handler(data);
		}).catch( (error) => {
			// Needs improvement (messages for different errors)
			console.log('Error fetching! ', error.message)
		});
}

// Check that our response object is JSON and extract data
function getJSON (response) {
	let contentType = response.headers.get("content-type");
	if( contentType && contentType.includes("application/json")) {
		return response.json();
	} else {
		throw new TypeError('Response was not JSON');
	}
}

// Put search result data onto page
function showSearchResults (data, page, searchString) {
	let results = data.Search;

	// To do: handle there being no results found

	if (!page) page = 1;

	let resultList = document.getElementById('resultList');

	// If we have results from a previous run, lose them
	if (resultList) {
		while (resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
		}

		// Start numbered list on page at correct position
		resultList.setAttribute('start', ((page-1) * 10) + 1);
	} else {
		resultList = document.createElement('ol');
		resultList.setAttribute('id', 'resultList');
	}	

	let searchResults = document.getElementById('searchResults');

	searchResults.appendChild(resultList);

	results.forEach((result) => {
		let listItem = createItemLink(result);
		resultList.appendChild(listItem);
	});

	searchResults.appendChild(resultsNavigation(page, searchString));
}

// Create an empty link node
function emptyLink () {
	let link = document.createElement('a');
	link.setAttribute('href', '');
	return link;
}

// Produce HTML list items
function createItemLink (item) {
	let listItem = document.createElement('li');
	let itemLink = emptyLink();

	itemLink.textContent = item.Title;
	
	// When items are clicked, request full details from endpoint
	itemLink.addEventListener('click', (e) => {
		e.preventDefault();
		doFetch('t', item.Title, undefined,
			(data) => { showMovieDetails(data) });
	}, false);

	listItem.appendChild(itemLink);
	return listItem;
}

// Create list results page navigation
function resultsNavigation (page, searchString) {
	let resultsNavigator = document.getElementById('resultsNavigation');

	// We don't need whatever was on page already
	if (resultsNavigator) {
		resultsNavigator.parentNode.removeChild(resultsNavigator);
	}

	resultsNavigator = document.createElement('div');
	resultsNavigator.setAttribute('id', 'resultsNavigation');

	// Create links for going back or forwards a page
	if (page > 1) {
		let previousTen = prevNext('prev', page, searchString);
		resultsNavigator.appendChild(previousTen);
	}

	let nextTen = prevNext('next', page, searchString);
	resultsNavigator.appendChild(nextTen);

	return resultsNavigator;
}

// Create "Previous 10" or "Next 10" result navigation links
function prevNext (direction, page, searchString) {
	let prevNextLink = emptyLink();

	let text;
	let navPage;

	if (direction == 'prev') {
		text = '&larr; Previous 10';
		navPage = page - 1;
	} else if (direction == 'next') {
		text = 'Next 10 &rarr;';
		navPage = page + 1;
	}

	prevNextLink.innerHTML = text;

	prevNextLink.addEventListener('click', (e) => {
		e.preventDefault();
		doFetch('s', searchString, navPage,
			(data) => { showSearchResults(data, navPage, searchString) });
	}, false);

	return prevNextLink;
}

// Populate details panel with data from endpoint
function showMovieDetails (data) {
	let detailsPanel = document.getElementById('detailsPanel');

	// We don't need any results from a previous run
	while (detailsPanel.firstChild) {
		detailsPanel.removeChild(detailsPanel.firstChild);
	}

	let resultBlock = document.createElement('div');

	resultBlock.appendChild(resultTitle(data));
	resultBlock.appendChild(resultPoster(data));
	resultBlock.appendChild(resultMetadata(data));
	resultBlock.appendChild(resultFavoriteToggle(data));

	detailsPanel.appendChild(resultBlock);
}

// Display the favorites list in the page sidebar
function showFavorites () {
	let favoritesList = document.getElementById('favoritesList');
	while (favoritesList.firstChild) {
		favoritesList.removeChild(favoritesList.firstChild);
	}

	for (i = 1; i <= 10; i++) {
		let faveKey = 'faveMovie' + i;

		let savedFavorite = localStorage.getItem(`${faveKey}`);
		if (!savedFavorite) continue;

		let favoritesItem = document.createElement('li');
		favoritesItem.setAttribute('id', faveKey);

		let favoriteData = savedFavorite.split('--');
		let movieTitle = favoriteData[0];
		let movieYear = favoriteData[1];

		let detailLink = emptyLink();
		detailLink.textContent = `${movieTitle} (${movieYear})`;

		// When items are clicked, request full details from endpoint
		detailLink.addEventListener('click', (e) => {
			e.preventDefault();
			doFetch('t', movieTitle, undefined,
				(data) => { showMovieDetails(data) });
		}, false);

		favoritesItem.appendChild(detailLink);

		if (i > 1)  favoritesItem.appendChild(upDown('up', faveKey));

		// To do: prevent from displaying on last item if <10 items
		if (i < 10) favoritesItem.appendChild(upDown('down', faveKey));

		let deleteLink = emptyLink();
		deleteLink.setAttribute('title', 'Remove this favorite');
		deleteLink.setAttribute('class', 'favoriteAction');

		deleteLink.addEventListener('click', (e) => {
			e.preventDefault();
			removeFavorite(faveKey);
			showFavorites();
		});

		// To do: use CSS
		deleteLink.innerHTML = '<small>❌</small>';

		favoritesItem.appendChild(deleteLink);

		favoritesList.appendChild(favoritesItem);
	}

	// To do: generate clear all link here if there are any items
}

// Create links for moving favorites items up or down the list
function upDown (direction, movieID) {
	let link = emptyLink();
	link.setAttribute('title', `Move this favorite ${direction} the list`);
	link.setAttribute('class', 'favoriteAction');

	link.addEventListener('click', (e) => {
		e.preventDefault();
		moveFavorite(movieID, direction);
		showFavorites();
	});

	link.innerHTML += direction == 'up' ? '🔼' : '🔽';
	return link;
}

// Move a favorite item up or down
function moveFavorite (favorite, direction) {
	alert(`Not implemented yet: move ${favorite} ${direction}`);
}

// Create switch to mark/unmark as favorite
function resultFavoriteToggle (data) {
	let toggle = document.createElement('input');
	toggle.setAttribute('type', 'checkbox');
	toggle.setAttribute('id', 'favoriteToggle');

	let title = data.Title;
	let year = data.Year;
	let faveData = `${title}--${year}`; // Title alone may not be unique

	let faveKey;
	for (i = 1; i <= 10; i++) {
		faveKey = 'faveMovie' + i;
		if (localStorage.getItem(`${faveKey}`) == faveData) {
			toggle.checked = true;
			break;
		}
	}

	let toggleDiv = document.createElement('div');
	toggleDiv.appendChild(toggle);
	let toggleLabel = document.createElement('label');
	toggleLabel.setAttribute('for', 'favoriteToggle');
	toggleLabel.textContent = 'Favorite';
	toggleDiv.appendChild(toggleLabel);

	toggle.addEventListener('change', (e) => {
		if (toggle.checked) {
			saveFavorite(faveData);
		} else {
			removeFavorite(`${faveKey}`);
		}

		showFavorites();
	});

	return toggleDiv;
}

// Save a favorite in local storage
function saveFavorite (faveData) {
	let saved;
	let faveKey;

	// Find first available slot in favorites list
	for (i = 1; i <= 10; i++) {
		faveKey = 'faveMovie' + i;
		if (!localStorage.getItem(`${faveKey}`)) {
			localStorage.setItem(`${faveKey}`, faveData);
			saved = true;
			break;
		}
	}

	if (!saved) {
		alert('Maximum favorites reached.');
	}
}

// Remove a favorite from local storage
function removeFavorite (f) {
	localStorage.removeItem(`${f}`);
}

// Remove all favorites items from local storage and clear list on page
function clearFavorites () {
	for (i = 1; i <= 10; i++) {
		removeFavorite('faveMovie' + i);
	}

	showFavorites();

	let toggle = document.getElementById('favoriteToggle');
	if (toggle) toggle.checked = false;
}

// Create HTML heading element for details panel
function resultTitle (data) {
	let resultTitle = document.createElement('h2');
	resultTitle.innerHTML = data.Title
		+ ' <span class="titleYear">(' + data.Year + ')</span>';
	return resultTitle;
}

// Create HTML definition list from metadata returned by endpoint
function resultMetadata (data) {
	let metadata = document.createElement('dl');

	let metadataFields = ['Director', 'Released', 'Rated', 'Runtime'];

	metadataFields.forEach((field) => {
		let fieldName = document.createElement('dt');
		fieldName.textContent = field;
		metadata.appendChild(fieldName);

		let fieldValue = document.createElement('dd');
		fieldValue.innerHTML = data[field];

		if (field == 'Director') {
			fieldValue.appendChild(directorLink(data[field]));
		}

		metadata.appendChild(fieldValue);
	});

	return metadata;
}

// Create link to search IMDB for director's name
function directorLink (name) {
	let searchURI = 'http://www.imdb.com/find?ref_=nv_sr_fn&s=nm&q='
		+ encodeURI(name);

	let searchLink = document.createElement('a');
	searchLink.setAttribute('href', searchURI);

	let imdbIcon = document.createElement('img');
	imdbIcon.setAttribute('alt', 'Search IMDb for ' + name);
	imdbIcon.setAttribute('title', 'Search IMDb for ' + name);
	imdbIcon.setAttribute('class', 'imdbIcon');
	imdbIcon.setAttribute('src', 'images/imdb-logo.png');

	searchLink.appendChild(imdbIcon);
	return searchLink;
}

// Create image element for poster in details panel
function resultPoster (data) {
	let poster = document.createElement('div');
	poster.setAttribute('id', 'resultPoster');
	poster.setAttribute('style', 'float: left; margin: 0 1em 0 0');

	let posterImage = document.createElement('img');
	posterImage.setAttribute('style', 'width: 10em;');

	// If endpoint didn't have anything, use a placeholder
	if (data.Poster == 'N/A') {
		posterImage.setAttribute('src', 'images/no-poster.png');
	} else {
		posterImage.setAttribute('alt', 'The poster for ' + data.Title 
			+ ' (' + data.Year + ')');

		posterImage.setAttribute('src', data.Poster);
	}

	poster.appendChild(posterImage);

	return poster;
}
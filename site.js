prepPage();

function prepPage () {
	let searchForm = document.getElementById('searchForm');

	searchForm.addEventListener('submit', searchBoxSubmit, false);

	let searchBox = document.getElementById('searchBox');

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
}

function searchBoxSubmit (e) {
	e.preventDefault();
	let searchBox = document.getElementById('searchBox');

	let searchString = searchBox.value;

	if (searchString != 'Search') {
		doFetch('s', searchString, 1,
			(data) => { showSearchResults(data, 1, searchString) });
	}
}

function doFetch (type, searchString, page, handler) {
	let fetchTarget = `&${type}=${searchString}`;
	if (page) {
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
			console.log('Error fetching! ', error.message)
		});
}

function getJSON (response) {
	let contentType = response.headers.get("content-type");
	if( contentType && contentType.includes("application/json")) {
		return response.json();
	} else {
		throw new TypeError('Response was not JSON');
	}
}

function showSearchResults (data, page, searchString) {
	let results = data.Search;

	if (!page) {
		page = 1;
	}

	let resultList = document.getElementById('resultList');

	// If we have results from a previous run, lose them.
	if (resultList) {
		while (resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
			resultList.setAttribute('start', ((page-1) * 10) + 1);
		}
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

function resultsNavigation (page, searchString) {
	let resultsNavigator = document.getElementById('resultsNavigation');

	if (resultsNavigator) {
		resultsNavigator.parentNode.removeChild(resultsNavigator);
	}

	resultsNavigator = document.createElement('div');
	resultsNavigator.setAttribute('id', 'resultsNavigation');

	if (page > 1) {
		let previousTen = prevNext('prev', page, searchString);
		resultsNavigator.appendChild(previousTen);
	}

	let nextTen = prevNext('next', page, searchString);
	resultsNavigator.appendChild(nextTen);

	return resultsNavigator;
}

function prevNext (direction, page, searchString) {
	let prevNextLink = document.createElement('a');
	prevNextLink.setAttribute('href', '');

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

function createItemLink (item) {
	let listItem = document.createElement('li');
	let itemLink = document.createElement('a');
	itemLink.setAttribute('href', '');

	itemLink.textContent = item.Title;
	
	itemLink.addEventListener('click', (e) => {
		e.preventDefault();
		doFetch('t', item.Title, undefined,
			(data) => { showMovieDetails(data) });
	}, false);

	listItem.appendChild(itemLink);
	return listItem;
}

function showMovieDetails (data) {
	let detailsPanel = document.getElementById('detailsPanel');

	// If we have results from a previous run, lose them.
	while (detailsPanel.firstChild) {
		detailsPanel.removeChild(detailsPanel.firstChild);
	}

	let resultBlock = document.createElement('div');

	resultBlock.appendChild(resultTitle(data));
	resultBlock.appendChild(resultPoster(data));
	resultBlock.appendChild(resultMetadata(data));

	detailsPanel.appendChild(resultBlock);
}

function resultTitle (data) {
	let resultTitle = document.createElement('h2');
	resultTitle.innerHTML = data.Title
		+ ' <span class="titleYear">(' + data.Year + ')</span>';
	return resultTitle;
}

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

function resultPoster (data) {
	let poster = document.createElement('div');
	poster.setAttribute('id', 'resultPoster');
	poster.setAttribute('style', 'float: left; margin: 0 1em 0 0');

	let posterImage = document.createElement('img');
	posterImage.setAttribute('style', 'width: 10em;');

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
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
		doFetch('s', searchString,
			(data) => { showSearchResults(data) });
	}
}

function doFetch (type, searchString, handler) {
	let fetchTarget = `&${type}=${searchString}`;

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

function showSearchResults (data) {
	let results = data.Search;

	let resultList;

	// If we have results from a previous run, lose them.
	if (document.getElementById('resultList')) {
		resultList = document.getElementById('resultList');

		while (resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
		}
	} else {
		resultList = document.createElement('ol');
		resultList.setAttribute('id', 'resultList');
	}

	document.getElementById('searchResults').appendChild(resultList);

	results.forEach((result) => {
		let listItem = createItemLink(result);
		resultList.appendChild(listItem);
	});
}

function createItemLink (item) {
	let listItem = document.createElement('li');
	let itemLink = document.createElement('a');
	itemLink.setAttribute('href', '');

	itemLink.textContent = item.Title;
	
	itemLink.addEventListener('click', (e) => {
		e.preventDefault();
		doFetch('t', item.Title,
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
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
		fetchSearchResults(searchString);
	}
}

function doFetch (fetchTarget, handler) {
	let apiKey = '8ed1874c';
	let apiRoot = 'http://www.omdbapi.com/?apikey=' + apiKey;

	fetch(apiRoot + fetchTarget)
		.then( (response) => {
			return getJSON(checkResponse(response));
		}).then( (data) => {
			handler(data);
		}).catch( (error) => {
			console.log('Error fetching! ', error.message)
		});
}

function fetchSearchResults (searchString) {
	doFetch('&s=' + searchString, (data) => { showSearchResults(data) });
}

function fetchMovieDetails (searchString) {
	doFetch('&t=' + searchString, (data) => { showMovieDetails(data) });
}

function checkResponse (response) {
	if (!response.ok) {
		throw new Error('Request response was not OK');
	}

	return response;
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
		fetchMovieDetails(item.Title);
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

	let resultTitle = document.createElement('h2');
	resultTitle.textContent = data.Title + ' (' + data.Year + ')';
	resultBlock.appendChild(resultTitle);

	let resultMetadata = document.createElement('dl');

	let metadataFields = ['Director', 'Released', 'Rated', 'Runtime'];

	metadataFields.forEach((field) => {
		let fieldName = document.createElement('dt');
		fieldName.textContent = field;
		resultMetadata.appendChild(fieldName);

		let fieldValue = document.createElement('dd');
		fieldValue.textContent = data[field];
		resultMetadata.appendChild(fieldValue);
	});

	resultBlock.appendChild(resultMetadata);
	detailsPanel.appendChild(resultBlock);
}
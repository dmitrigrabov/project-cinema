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
		doSearch(searchString);
	}
}

function doSearch (searchString) {
	let apiKey = '8ed1874c';
	let apiRoot = 'http://www.omdbapi.com/?apikey=' + apiKey;
	
	fetch(apiRoot + '&s=' + searchString)
		.then(function(response) {
			return getJSON(checkResponse(response));
		}).then(function(data) {
			handleResults(data);
		}).catch(function(error) {
			console.log('Error fetching! ', error.message)
		});
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

function handleResults (json) {
	let results = json.Search;

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
		let listItem = document.createElement('li');
		listItem.textContent = result.Title;
		resultList.appendChild(listItem);
	});
}


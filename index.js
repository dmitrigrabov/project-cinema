//Initialize variables

//Get HTML element references
const formRef = document.querySelector('.search__form');

//Add click event listeners on document
document.addEventListener('click', event => {
    //event.preventDefault();
});

//Add submit event listener on form
formRef.addEventListener('submit', event => {
    event.preventDefault();
    const searchQuery = formRef.search.value;
    console.log(searchQuery);
    const APIQuery = `http://www.omdbapi.com/?apikey=eee5954b&s=${searchQuery}`;
    fetchResults(APIQuery);
});

//Fetch data
function fetchResults(APIQuery) {
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderResults(body))
    .catch(error => console.log(error));
}

function renderResults(body) {
    console.log(body);
}
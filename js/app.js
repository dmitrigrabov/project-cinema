const form = document.querySelector('#search'),
    searchInput = form.querySelector('.search__input'),
    searchButton = form.querySelector('.search__btn'),
    results = document.querySelector('.results');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    results.innerHTML = `
    <p>${searchInput.value}</p>
    `
});

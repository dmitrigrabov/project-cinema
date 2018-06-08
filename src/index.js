const getSubmit = document.querySelector("#form");

function submitHandler(event){
  event.preventDefault();
}

getSubmit.addEventListener("submit", submitHandler);

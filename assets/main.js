const paragraph = document.querySelector("p");

fetch("http://localhost:3000/") 
    .then(response => response.text())
    .catch(error => {
        console.error(error);
    })
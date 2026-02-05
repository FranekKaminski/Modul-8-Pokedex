async function fetchData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    window.data = data;
    console.log(data);

    renderCharacters(data);
}

function renderCharacters(data) {
    const contentRef = document.getElementById("characters");
    contentRef.innerHTML = "";

    data.forEach((results) => {
        contentRef.innerHTML += `<p>${results}</p>`
    })
}
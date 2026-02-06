let pokemons = []

function load() {
    renderPokemon()
    fetchData()
}

// API AWAIT RESPONSE
async function fetchData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const detailPromises = data.results.map(pokemon =>
        fetch(pokemon.url).then(res => res.json())
    );

    pokemons = await Promise.all(detailPromises);
    window.pokemons = pokemons;
    renderPokemon();
}

// RENDER 20 POKEMON
function renderPokemon() {
    let contentRef = document.getElementById("pokemoncontainer");
    contentRef.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++) {
        contentRef.innerHTML += pokemonTemplate(i);
    }
}

// SEARCH BAR
function filterPokemon(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const listItems = document.querySelectorAll(".pokemon");
    listItems.forEach(function (item) {
        item.style.display = "flex";
        if (!item.innerText.includes(searchTerm)) {
            item.style.display = "none";
        }
    })
}

// LOAD MORE
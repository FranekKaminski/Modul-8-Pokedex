let pokemons = []

function load() {
    renderPokemon()
    fetchData()
}

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

function renderPokemon() {
    let contentRef = document.getElementById("pokemoncontainer");
    contentRef.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++) {
        contentRef.innerHTML += pokemonTemplate(i);
    }
}
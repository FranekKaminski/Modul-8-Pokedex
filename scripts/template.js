function pokemonTemplate(i) {
    let pokemon = pokemons[i];
    return `
    <article class="pokemon">
                <div class="pokeheadlines">
                    <span>#${pokemon.id}</span>
                    <h2 tabindex="0">${pokemon.name}</h2>
                </div>
                <div class="pokemonbackground">
                    <img class="pokemonimage" src="./img/testpoke.png" alt="Book Image">
                </div>
                <div class="element">
                    <img tabindex="0" class="sendicon" src="./img/types/${pokemons[0].types[0].type.name}.png" alt="Element Icon">
                    <img tabindex="0" class="sendicon" src="./img/types/${pokemons[0].types[1].type.name}.png" alt="Element Icon">
                </div>
            </article>`
}
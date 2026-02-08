function pokemonTemplate(i) {
    let pokemon = pokemons[i];
    return `
    <article class="pokemon" data-index="${i}" onclick="inspectPokemon(${i})">
                <div class="pokeheadlines">
                    <span>#${pokemon.id}</span>
                    <h2 tabindex="0">${pokemon.name}</h2>
                </div>
                <div class="pokemonbackground ${pokemons[i].types[0].type.name}">
                    <img class="pokemonimage" src="${pokemons[i].sprites.other.home.front_default}" alt="${pokemon.name}">
                </div>
                <div class="element">
                    ${pokemons[i].types.map(type => `<p>${type.type.name}</p>`).join('')}
                </div>
            </article>`
}
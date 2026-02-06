function pokemonTemplate(i) {
    let pokemon = pokemons[i];
    return `
    <article class="pokemon" id="pokemonarticle">
                <div class="pokeheadlines">
                    <span>#${pokemon.id}</span>
                    <h2 tabindex="0" id="pokemonname">${pokemon.name}</h2>
                </div>
                <div class="pokemonbackground">
                    <img class="pokemonimage" src="${pokemons[i].sprites.other.home.front_default}" alt="Pokemon Main Image">
                </div>
                <div class="element">
                    ${pokemons[i].types.map(type => `<p>${type.type.name}</p>`).join('')}
                </div>
            </article>`
}
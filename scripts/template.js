function pokemonTemplate(i) {
    let pokemon = pokemons[i];
    return `
    <article class="pokemon" data-index="${i}" onclick="inspectPokemon(${i})">
                <div class="pokeheadlines">
                    <span>#${pokemon.id}</span>
                    <h2 tabindex="0">${capitalize(pokemon.name)}</h2>
                </div>
                <div class="pokemonbackground ${pokemons[i].types[0].type.name}">
                    <img class="pokemonimage" src="${pokemons[i].sprites.other.home.front_default}" alt="${pokemon.name}">
                </div>
                <div class="element">
                    ${pokemons[i].types.map(type => `<p>${capitalize(type.type.name)}</p>`).join('')}
                </div>
            </article>`
}

function mainTabTemplate(pokemon, abilities) {
    return `
        <table>
            <tr>
                <td>Height</td>
                <td>:</td>
                <td>${pokemon.height / 10} m</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>:</td>
                <td>${pokemon.weight / 10} kg</td>
            </tr>
            <tr>
                <td>Base experience</td>
                <td>:</td>
                <td>${pokemon.base_experience}</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td>:</td>
                <td>${abilities}</td>
            </tr>
        </table>
    `;
}

function statsTabTemplate(stats) {
    return `
        <table>
            <tr><td>HP</td><td>:</td><td>${stats.hp}</td></tr>
            <tr><td>Attack</td><td>:</td><td>${stats.attack}</td></tr>
            <tr><td>Defense</td><td>:</td><td>${stats.defense}</td></tr>
            <tr><td>Sp. Attack</td><td>:</td><td>${stats["special-attack"]}</td></tr>
            <tr><td>Sp. Defense</td><td>:</td><td>${stats["special-defense"]}</td></tr>
            <tr><td>Speed</td><td>:</td><td>${stats.speed}</td></tr>
        </table>
    `;
}
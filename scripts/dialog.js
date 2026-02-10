let currentPokemonIndex = 0;

const dialogRef = document.getElementById("myDialog");
const pokemonName = document.getElementById("pokemonName");
const zoomedPokemon = document.getElementById("zoomedpokemon");
const imageCounter = document.getElementById("pokemoncounter");
const fixedImageHeight = document.getElementById("fixedimageheight");

function getImageSource(pokemon) {
    return pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other.home && pokemon.sprites.other.home.front_default
        ? pokemon.sprites.other.home.front_default
        : (pokemon.sprites && pokemon.sprites.front_default) || './img/1.jpg';
}

function updateTypeClass(pokemon) {
    const typeName = pokemon.types[0].type.name;
    fixedImageHeight.className = "";
    fixedImageHeight.classList.add(typeName);
}

function updateDialogImage() {
    if (!window.pokemons || pokemons.length === 0) return;

    const p = pokemons[currentPokemonIndex];
    zoomedPokemon.src = getImageSource(p);
    imageCounter.innerHTML = `${currentPokemonIndex + 1} / ${pokemons.length}`;
    pokemonName.innerHTML = `#${p.id} ${capitalize(p.name)}`;
    updateTypeClass(p);
}

// Open dialog for clicked pokemon index
function inspectPokemon(index) {
    currentPokemonIndex = index;
    updateDialogImage();
    changeToTab("main");
    dialogRef.showModal();
}

// CLOSE DIALOG
function closePokemon() {
    dialogRef.close();
}

dialogRef.addEventListener("click", (event) => {
    if (event.target === dialogRef) {
        closePokemon();
    }
});

// NEXT POKEMON
function nextPokemon() {
    if (!window.pokemons || pokemons.length === 0) return;
    currentPokemonIndex = (currentPokemonIndex + 1) % pokemons.length;
    updateDialogImage();
    // Refresh tab content for the new pokemon
    const activeTab = document.querySelector(".tab_btn_active");
    if (activeTab) changeToTab(activeTab.id);
}

// PREVIOUS POKEMON
function previousPokemon() {
    if (!window.pokemons || pokemons.length === 0) return;
    currentPokemonIndex = (currentPokemonIndex - 1 + pokemons.length) % pokemons.length;
    updateDialogImage();
    // Refresh tab content for the new pokemon
    const activeTab = document.querySelector(".tab_btn_active");
    if (activeTab) changeToTab(activeTab.id);
}

// DIALOG NEXT, PREVIOUS AND EXIT PROKEMON WITH KEYBOARD
function handleKeys(event) {
    if (event.key === "ArrowLeft") previousPokemon();
    if (event.key === "ArrowRight") nextPokemon();
    if (event.key === "Escape") closePokemon();
}
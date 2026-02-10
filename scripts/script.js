let pokemons = []
let offset = 0;
const limit = 20;
let renderedCount = 0;

// Capitalize first letter of string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function load() {
    fetchData()
}

// API AWAIT RESPONSE
async function fetchData() {
    showLoading();
    const { results } = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(r => r.json());
    const startIndex = pokemons.length;
    pokemons.push(...await Promise.all(results.map(p => fetch(p.url).then(r => r.json()))));
    appendPokemon((window.pokemons = pokemons, startIndex));
    renderedCount = pokemons.length;
    hideLoading();
}

// LOAD MORE
function showLoading() {
    document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
    document.getElementById("loading").classList.add("hidden");
}

function loadMorePokemon() {
    offset += limit;
    fetchData();
}

// RENDER 20 POKEMON
function renderPokemon() {
    let contentRef = document.getElementById("pokemoncontainer");
    contentRef.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++) {
        contentRef.innerHTML += pokemonTemplate(i);
    }
}

function appendPokemon(startIndex) {
    let contentref = document.getElementById("pokemoncontainer");

    for (let i = startIndex; i < pokemons.length; i++) {
        contentref.innerHTML += pokemonTemplate(i);
    }
}

// SEARCH BAR
function resetSearch() {
    const pokemonContainer = document.getElementById("pokemoncontainer");
    if (pokemonContainer.innerHTML.includes("No pokemon found")) {
        pokemonContainer.innerHTML = "";
        appendPokemon(0);
    }
    document.querySelectorAll(".pokemon").forEach(item => item.style.display = "flex");
    document.getElementById("loadMoreBtn").style.display = "block";
}

function showSearchResults(searchTerm) {
    let visibleCount = 0;
    document.querySelectorAll(".pokemon").forEach(item => {
        const isVisible = item.innerText.includes(searchTerm);
        item.style.display = isVisible ? "flex" : "none";
        if (isVisible) visibleCount++;
    });
    
    if (visibleCount === 0) {
        document.getElementById("pokemoncontainer").innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #062a33; font-size: 18px;">No pokemon found</div>';
    }
    document.getElementById("loadMoreBtn").style.display = "none";
}

function filterPokemon(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    
    if (searchTerm.length < 3) {
        resetSearch();
    } else {
        showSearchResults(searchTerm);
    }
}

function renderMainTab(pokemon) {
    const abilities = pokemon.abilities
        .map(a => capitalize(a.ability.name))
        .join(", ");

    document.getElementById("pokemoncontent").innerHTML = mainTabTemplate(pokemon, abilities);
}

function renderStatsTab(pokemon) {
    const stats = {};
    pokemon.stats.forEach(stat => {
        stats[stat.stat.name] = stat.base_stat;
    });

    document.getElementById("pokemoncontent").innerHTML = statsTabTemplate(stats);
}

async function fetchEvolutionChain(pokemon) {
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
    const evoRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();

    const evoChain = [];
    let current = evoData.chain;
    while (current) {
        evoChain.push(current.species.name);
        current = current.evolves_to[0];
    }
    return evoChain;
}

async function buildEvolutionHTML(evoChain) {
    return Promise.all(
        evoChain.map(async name => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            return `
                <div class="evo-item">
                    <img src="${getImageSource(data)}" alt="${name}">
                    <p>${capitalize(name)}</p>
                </div>
            `;
        })
    );
}

async function renderEvolutionTab(pokemon) {
    document.getElementById("pokemoncontent").innerHTML = "Loading evolution chain...";
    const evoChain = await fetchEvolutionChain(pokemon);
    const evoHTML = await buildEvolutionHTML(evoChain);
    document.getElementById("pokemoncontent").innerHTML = `
        <div class="evo-chain">
            ${evoHTML.join("<span>↓</span>")}
        </div>
    `;
}

function changeToTab(tab) {
    document.querySelectorAll(".tab_btn").forEach(btn =>
        btn.classList.remove("tab_btn_active")
    );

    document.getElementById(tab).classList.add("tab_btn_active");
    const pokemon = pokemons[currentPokemonIndex];
    if (tab === "main") renderMainTab(pokemon);
    if (tab === "stats") renderStatsTab(pokemon);
    if (tab === "evo_chain") renderEvolutionTab(pokemon);
}
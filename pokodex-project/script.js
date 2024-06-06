
let currentPokemons = 20;
let allPokemons = [];

function init() {
  fetchPokemon();
}

async function fetchPokemon() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${currentPokemons}&offset=0`
    );
    const data = await response.json();
    const pokemonList = data.results;

    await loadPokemonDetails(pokemonList);
    // renderPokemons();
    renderAllPokemonCards();
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

async function loadPokemonDetails(pokemonList) {
  for (let i = 0; i < pokemonList.length; i++) {
    const pokemon = pokemonList[i];
    let pokemonResponse = await fetch(pokemon.url);
    let pokemonDetails = await pokemonResponse.json();
    allPokemons.push(pokemonDetails);
  }
}

async function renderAllPokemonCards() {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";

  for (let i = 0; i < allPokemons.length; i++) {
    const pokemon = allPokemons[i];
    const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);
    const image = getPokemonImage(pokemon);
  
    container.innerHTML += `<div class="pokemon-card">
    <h2>${capitalizedPokemonName}</h2>
    <img src="${image}">
  </div>`;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemonImage(pokemon) {
return pokemon.sprites.front_default
}

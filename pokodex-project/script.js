let currentPokemons = 40;
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
    const typeColor = getTypeColor(pokemon);
    container.innerHTML += generatePokemonCardsHTML(image,typeColor,capitalizedPokemonName);
  }
}

function generatePokemonCardsHTML(image, typeColor, capitalizedPokemonName) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";
 return container.innerHTML += `
<div class="pokemon-card" style="background-color:${typeColor}">
  <h2>${capitalizedPokemonName}</h2>
  <img src="${image}">
</div>
`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemonImage(pokemon) {
  return pokemon.sprites.front_default;
}

function getTypeColor(pokemon) {
  const primaryType = pokemon.types[0].type.name;
  return typeColors[primaryType] || "#FFFFFF";
}


const typeColors = { 
  normal: "#A8A878", fire: "#FF7D25", water: "#6390F0", electric: "#FFD700", 
  grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", 
  ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820", 
  rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848", 
  steel: "#B8B8D0", fairy: "#EE99AC" 
};

let allPokemons = [];
let filteredPokemons = [];
let limit = 30;
let offset = 0;

function init() {
  fetchPokemon();
}

// async function fetchPokemon() {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//     const data = await response.json();
//     const pokemonList = data.results;
//     await loadPokemonDetails(pokemonList);
//     renderAllPokemonCards(); // Pass filteredPokemons to render function
//   } catch (error) {
//     console.error("Error fetching Pokémon data:", error);
//   }
// }

async function fetchPokemon() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon data');
    }
    const data = await response.json();
    const pokemonList = data.results;
    await loadPokemonDetails(pokemonList);
    renderAllPokemonCards(allPokemons); // Ensure allPokemons array is populated before rendering
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

function renderAllPokemonCards(pokemons) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";
  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);
    const image = getPokemonImage(pokemon);
    const typeColor = getTypeColor(pokemon);
    const types = getPokemonTypes(pokemon);
    container.innerHTML += generatePokemonCardsHTML(image, typeColor, capitalizedPokemonName, types);
  }
}

function generatePokemonCardsHTML(image, typeColor, capitalizedPokemonName, types) {
  return `
    <div class="pokemon-card" style="background-color:${typeColor}">
      <h2>${capitalizedPokemonName}</h2>
      <div class="image-container">
        <img class="pokemon-image" src="${image}" alt="${capitalizedPokemonName}">
      </div>
  
    </div>
  `;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemonImage(pokemon) {
  return pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
}

function getPokemonTypes(pokemon) {
  return pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
}

function getTypeColor(pokemon) {
  const primaryType = pokemon.types[0].type.name;
  const typeColors = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    flying: '#A890F0',
  };
  return typeColors[primaryType] || "#FFFFFF";
}

function loadMorePokemon() {
  offset += limit;
  init()
}



function filterPokemon() {
  let pokemonValue = document.getElementById("search-bar").value.toLowerCase();
if (pokemonValue.length >= 3) {
    filteredPokemons = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(pokemonValue)
    );

    renderAllPokemonCards(filteredPokemons);
    document.getElementById("loadmore-pokemon").style.display = "block";
  } else {
    renderAllPokemonCards(allPokemons);
    document.getElementById("loadmore-pokemon").style.display = "none";
  }
}

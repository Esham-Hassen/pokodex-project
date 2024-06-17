let allPokemons = [];
let filteredPokemons = [];
let limit = 30;
let offset = 0;

 async function init() {
 let pokemonList= await fetchPokemon();
 allPokemons.push(...pokemonList)
  renderPokemonCards(allPokemons); // Render the combined list
}

async function fetchPokemon() {
try {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data.results;
} catch (error) {
  console.log("there was a problem", error);
}
}


async function getPokemonDetails(pokemonUrl) {
  try {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('There was a problem fetching details', error);
  }
}


async function renderPokemonCards(pokemons) {
  let container = document.getElementById("pokemon-container");
  for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
  
        const details = await getPokemonDetails(pokemon.url);
        const imageUrl = details.sprites.other['official-artwork'].front_default;
        const typeColor = getTypeColor(details);
          container.innerHTML += generatePokemonCardsHTML(pokemon, imageUrl, typeColor);
    }
}


function generatePokemonCardsHTML(pokemon,imageUrl,typeColor) {
const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
return  `<div class="pokemon-card" style="background-color:${typeColor}">
 <h2>${capitalizedPokemonName}</h2>
<img class="pokemon-image" src="${imageUrl}">
</div>`

}

function getTypeColor(pokemon) {
  if (!pokemon.types || pokemon.types.length === 0) {
    return '#FFFFFF'; // White color as fallback
  }

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
    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonValue));
    document.getElementById("pokemon-container").innerHTML = ""; // Clear container before rendering filtered results
    renderPokemonCards(filteredPokemons);
    document.getElementById("loadmore-pokemon").style.display = "block";
  } else {
    document.getElementById("pokemon-container").innerHTML = ""; // Clear container before rendering all results
    renderPokemonCards(allPokemons);
    document.getElementById("loadmore-pokemon").style.display = "none";
  }
}


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

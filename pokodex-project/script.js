let allPokemons = [];
let filteredPokemons = [];
let limit = 24;
let offset = 0;

async function init() {
  showLoadingSpinner();
  let pokemonList = await fetchPokemon();
  allPokemons.push(...pokemonList);
  await renderPokemonCards(pokemonList); // Render the combined list
  hideLoadingSpinner();
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
    console.log("There was a problem fetching details", error);
  }
}

async function renderPokemonCards(pokemons) {
  let container = document.getElementById("pokemon-container");
  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];

    const details = await getPokemonDetails(pokemon.url);
    const imageUrl = details.sprites.other["official-artwork"].front_default;
    const typeColor = getTypeColor(details);
    container.innerHTML += generatePokemonCardsHTML(
      pokemon,
      imageUrl,
      typeColor,
      details.id,
      i
    );
  }
}

function generatePokemonCardsHTML(pokemon, imageUrl, typeColor, id, i) {
  const capitalizedPokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return `<div onclick="openPokemon(${i})" class="pokemon-card" style="background-color:${typeColor}">
  <h2>#${id} ${capitalizedPokemonName}</h2>
<img class="pokemon-image" src="${imageUrl}">
</div>`;
}

function getTypeColor(pokemon) {
  if (!pokemon.types || pokemon.types.length === 0) {
    return "#FFFFFF"; // White color as fallback
  }

  const primaryType = pokemon.types[0].type.name;
  const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
  };
  return typeColors[primaryType] || "#FFFFFF";
}

function loadMorePokemon() {
  showLoadingSpinner();
  offset += limit;
  init();
}

function filterPokemon() {
  let pokemonValue = document.getElementById("search-bar").value.toLowerCase();
  if (pokemonValue.length >= 3) {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonValue)
    );
    document.getElementById("pokemon-container").innerHTML = "";
    renderPokemonCards(filteredPokemons);
    document.getElementById("loadmore-pokemon").style.display = "block";
  } else {
    document.getElementById("pokemon-container").innerHTML = "";
    renderPokemonCards(allPokemons);
    document.getElementById("loadmore-pokemon").style.display = "none";
  }
}

function showLoadingSpinner() {
  document.getElementById("loading-spinner").classList.remove("d-none");
  document.getElementById("pokemon-container").classList.remove("d-none");
  document.getElementById("loadmore-pokemon").classList.add("d-none");
  document.getElementById("pokemon-container").classList.add("loading");
}

function hideLoadingSpinner() {
  document.getElementById("loading-spinner").classList.add("d-none");
  document.getElementById("pokemon-container").classList.remove("loading");
}

// async function openPokemon(index) {
//   try {
//     const pokemon = allPokemons[index];
//     const details = await getPokemonDetails(pokemon.url);
//     const imageUrl = details.sprites.other["official-artwork"].front_default;
//     const typeColor = getTypeColor(details);
//     const container = document.getElementById("pokemon-container");

//     container.innerHTML = `
//           <div class="details-content" style="background-color:${typeColor}">
//                   <div>
//                       <p>${pokemon.name}</p>
//                   </div>
  
//               <div class="pokemon-image-container">
//                   <img class="pokemon-image" src="${imageUrl}" alt="${pokemon.name}">
//               </div>

//                <div class="stats">
//                   <div>Type: ${details.types[0]?.type.name}</div>
//                   <div>Height: ${details.height}</div>
//                   <div>Weight: ${details.weight}</div>
//                   <div>${details.stats[0]?.stat.name}:<div class="complete-bar"><div class="bar" style="width: ${details.stats[0]?.base_stat - 40}%"></div></div></div>
//                   <div>${details.stats[1]?.stat.name}:<div class="complete-bar"><div class="bar" style="width: ${details.stats[1]?.base_stat - 40}%"></div></div></div>
//                   <div>${details.stats[2]?.stat.name}:<div class="complete-bar"><div class="bar" style="width: ${details.stats[2]?.base_stat - 40}%"></div></div></div>
//                   <div>${details.stats[5]?.stat.name}:<div class="complete-bar"><div class="bar" style="width: ${details.stats[5]?.base_stat - 40}%"></div></div></div>
//               </div>
//           </div>
//       `;
//   } catch (error) {
//     console.error("Error fetching or displaying Pokémon details:", error);
//   }
// }




















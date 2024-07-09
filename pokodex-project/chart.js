let currentIndex = 0;
async function openPokemon(index) {
    try {

       document.getElementById('header').classList.add('d-none');
       
        // await new Promise(requestAnimationFrame);

        const pokemon = allPokemons[index];
        const details = await getPokemonDetails(pokemon.url);
        const container = document.getElementById("pokemon-container");

       
        container.innerHTML = getPokemonHtml(pokemon, details);

      
        document.getElementById('previousButton').addEventListener('click', previousPokemon);
        document.getElementById('nextButton').addEventListener('click', nextPokemon);

        hideLoadingSpinner();

    } catch (error) {
        console.error("Error fetching or displaying Pokémon details:", error);
        hideLoadingSpinner();
    }
    document.getElementById("load-btn-container").classList.add("d-none");
    
}


// function getPokemonHtml(pokemon, details) {
//     const imageUrl = details.sprites.other["official-artwork"].front_default;
//     const typeColor = getTypeColor(details);

//     return `
//         <div class="pokemon-container">
//             <div class="details-content" id="details-content" style="background-color:${typeColor}">
//                 <div class="pokemon-name">
//                     <h1>${pokemon.name}</h1>
//                     <h1 onclick="goBack()" class="go-back">X</h1>
//                 </div>

//                 <div class="pokemon-image-container">
//                     <img class="pokemon-image" src="${imageUrl}" alt="${pokemon.name}">
//                     <p>Type: ${details.types[0]?.type.name}</p>
//                 </div>

//                 <div class="stats">
//                     <h2>Pokémon Stats</h2>
//                     ${details.stats.map(stat => `
//                         <div class="stat-item">
//                             <div>${stat.stat.name}:</div>
//                             <div class="complete-bar">
//                                 <div class="bar" style="width: ${stat.base_stat}%"></div>
//                             </div>
//                             <div>${stat.base_stat}</div>
//                         </div>
//                     `).join('')}
//                 </div>

//                 <div class="navigation-buttons">
//                     <button class="previous-btn" type="button" id="previousButton">Previous</button>
//                     <button class="next-btn" type="button" id="nextButton">Next</button>
//                 </div>
//             </div>
//         </div>
//     `;
// }


function getPokemonHtml(pokemon, details) {
    const imageUrl = details.sprites.other["official-artwork"].front_default;
    const typeColor = getTypeColor(details);

    return `
        <div class="pokemon-container">
            <div class="details-content" id="details-content" style="background-color:${typeColor}">
                <div class="pokemon-name">
                    <h1>${pokemon.name}</h1>
                    <h1 onclick="goBack()" class="go-back">X</h1>
                </div>

                <div class="pokemon-image-container">
                    <img class="pokemon-image" src="${imageUrl}" alt="${pokemon.name}">
                </div>

                <div class="stats">
                    <h2>Pokémon Stats</h2>
                    <p>Type: ${details.types.map(type => type.type.name).join(', ')}</p>
                    <p>Weight: ${details.weight / 10} kg</p>
                    <p>Height: ${details.height / 10} m</p>
                    ${details.stats.map(stat => `
                        <div class="stat-item">
                            <div>${stat.stat.name}:</div>
                            <div class="complete-bar">
                                <div class="bar" style="width: ${stat.base_stat}%"></div>
                            </div>
                            <div>${stat.base_stat}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="navigation-buttons">
                    <button class="previous-btn" type="button" id="previousButton">Previous</button>
                    <button class="next-btn" type="button" id="nextButton">Next</button>
                </div>
            </div>
        </div>
    `;
}




function previousPokemon() {
    if (currentIndex > 0) {
        currentIndex--;
        openPokemon(currentIndex);
    }
}

function nextPokemon() {
    if (currentIndex < allPokemons.length - 1) {
        currentIndex++;
        openPokemon(currentIndex);
    }
}

function goBack() {
    document.getElementById('details-content').classList.add('d-none')
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('load-btn-container').classList.remove('d-none');
    renderPokemonCards(allPokemons);
}



function previousPokemon() {
    if (currentIndex > 0) {
        currentIndex--;
        openPokemon(currentIndex);
    }
}


function nextPokemon() {
    if (currentIndex < allPokemons.length - 1) {
        currentIndex++;
        openPokemon(currentIndex);
    }
}


function goBack() {
    document.getElementById('details-content').classList.add('d-none')
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('load-btn-container').classList.remove('d-none');
    renderPokemonCards(allPokemons);
}



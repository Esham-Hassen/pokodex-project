let currentIndex = 0;

async function openPokemon(index) {
    try {
        const pokemon = allPokemons[index];
        const details = await getPokemonDetails(pokemon.url);
        const imageUrl = details.sprites.other["official-artwork"].front_default;
        const typeColor = getTypeColor(details);
        const container = document.getElementById("pokemon-container");

        container.innerHTML = `
            <div class="pokemon-container">
                <div class="details-content" style="background-color:${typeColor}">
                    <div>
                        <h1>${pokemon.name}</h1>
                    </div>

                    <div class="pokemon-image-container">
                        <img class="pokemon-image" src="${imageUrl}" alt="${pokemon.name}">
                        <p>Type: ${details.types[0]?.type.name}</p>
                    </div>

                    <div class="stats">
                        <h2>Pokémon Stats</h2>
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
                        <button class"next-btn" type="button" id="nextButton">Next</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('previousButton').addEventListener('click', previousPokemon);
        document.getElementById('nextButton').addEventListener('click', nextPokemon);

    } catch (error) {
        console.error("Error fetching or displaying Pokémon details:", error);
    }
}

function nextPokemon() {
    if (currentIndex < allPokemons.length - 1) {
        currentIndex++;
        openPokemon(currentIndex);
    }
}

function previousPokemon() {
    if (currentIndex > 0) {
        currentIndex--;
        openPokemon(currentIndex);
    }
}

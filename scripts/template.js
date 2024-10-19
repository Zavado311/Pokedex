function getPokemons(pokemon, index) {
  return `
    <div class="pokemoncard" onclick="showPokemon(${index})">
    <div id="backgroundPokemon${index}" class="imageShow">
    <div id="backgroundPokemonImage${index}"><img src="${
    pokemonObjectArray[index].sprites.other.dream_world.front_default
  }"></div></div>
  <div class="pokemonDisplayName">${pokemon.name}</div>
    <div class="pokemonDisplayId">#${formatNumberWithLeadingZeros(
      pokemonObjectArray[index].id,
      4
    )}</div>
    <div id="typesPokemon${index}"></div>
     </div>`;
}

function getInformationOfPokemon() {
  console.log(focusPokemon.id);
  return `<div class="overCard">
  <div class="pokemonName">${focusPokemon.name}</div>
  <div class="pokemonId">#${formatNumberWithLeadingZeros(
    focusPokemon.id,
    4
  )}</div>
  <div class="imageFocusPokemon"><img src="${
    focusPokemon.sprites.other.dream_world.front_default
  }"></div>
  <div class="BGwhite">
  <nav class="categoryInformation">
  <li><a href="#" onclick="getAboutPokemon()">About</a></li>
  <li><a href="#" onclick="getStatsPokemon()">Stats</a></li>
  <li><a href="#" onclick="getEvolutionPokemon()">Evolution</a></li>
  <li><a href="#" onclick="">Moves</a></li>
</nav>
  <div id="showCategory"></div>
  </div>
  <div class="closeButtonX" onclick="closeButton()">X</div><div class="navArrow leftArrow" onclick="loadPrev(${
    focusPokemon.id
  })">&#10094;</div></><div class="navArrow rightArrow" onclick="loadNext(${
    focusPokemon.id
  })">&#10095;</div>
  
  `;
}

function getAboutPokemon() {
  document.getElementById("showCategory").innerHTML = `
  <div class="categoryTitles">About</div>
  <div class="stats">Grösse</div>
  <div class="stats">${focusPokemon.height}m</div>
  <div>Beschreibung</div>
  <div class="stats">${descriptionfocusPokemon.descriptions[7].description}</div>
  <div class="">`;
}

function getStatsPokemon() {
  document.getElementById(
    "showCategory"
  ).innerHTML = `<div class="categoryTitles">Stats</div>
  <div class="stats">HP ${focusPokemon.stats[0].base_stat}</div>
  <div class="stats">Attack ${focusPokemon.stats[1].base_stat}</div>`;
}

function getEvolutionPokemon() {
  try {
       returnEvolutionNumberPokemon();
    console.log(firstEvolutionPokemon);

    document.getElementById("showCategory").innerHTML = `
    <div class="categoryTitles">Evolution</div>
    <div class="overEvolutionPokemon">
  <div class="overEvolutionPokemonPreview" onclick="showPokemon(${firstEvolutionPokemon} - 1)"><img class="evolutionPokemonImage" src="${
      pokemonObjectArray[firstEvolutionPokemon - 1].sprites.other.dream_world
        .front_default
    }">
  <div class="stats">${evolutionfocusPokemon.chain.species.name}</div></div>

  <img class="evolutionAngle" src="assets/icons/angle-down-solid.svg">

  <div class="overEvolutionPokemonPreview" onclick="showPokemon(${secondEvolutionPokemon} - 1)">
  <img class="evolutionPokemonImage" src="${
    pokemonObjectArray[secondEvolutionPokemon - 1].sprites.other.dream_world
      .front_default
  }">
  
  <div class="stats">${
    evolutionfocusPokemon.chain.evolves_to[0].species.name
  }</div></div>
  
  <img class="evolutionAngle" src="assets/icons/angle-down-solid.svg">
  
  <div class="overEvolutionPokemonPreview" onclick="showPokemon(${thirdEvolutionPokemon} - 1)">
  <img class="evolutionPokemonImage" src="${
    pokemonObjectArray[thirdEvolutionPokemon - 1].sprites.other.dream_world
      .front_default
  }">
  <div class="stats">${
    evolutionfocusPokemon.chain.evolves_to[0].evolves_to[0].species.name
  }</div></div></div>`;
  } catch (error) {
    document.getElementById("showCategory").innerHTML =
      "Um die Evolution anzuzeigen, bitte weitere Pokemons laden.";
  }
}

function formatNumberWithLeadingZeros(number, totalLength) {
  return String(number).padStart(totalLength, "0");
}

function returnEvolutionNumberPokemon() {
  firstEvolutionPokemon = evolutionfocusPokemon.chain.species.url
    .split("/")
    .slice(-2, -1)[0];
  console.log(firstEvolutionPokemon);
  secondEvolutionPokemon = evolutionfocusPokemon.chain.evolves_to[0].species.url
    .split("/")
    .slice(-2, -1)[0];
  thirdEvolutionPokemon =
    evolutionfocusPokemon.chain.evolves_to[0].evolves_to[0].species.url
      .split("/")
      .slice(-2, -1)[0];
}

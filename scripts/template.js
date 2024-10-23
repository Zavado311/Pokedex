let firstEvolutionPokemon = "";
let secondEvolutionPokemon = "";
let thirdEvolutionPokemon = "";

function getPokemons(pokemon, index) {
  return `
    <div class="pokemoncard BG${
      pokemon.types[0].type.name
    }" onclick="showPokemon(${index})">
    <div id="backgroundPokemon${index}" class="imageShow">
    <div id="backgroundPokemonImage${index}"><img src="${
    pokemonObjectArray[index].sprites.other.dream_world.front_default
  }"></div></div>
  <div class="whiteBG">
  <div class="pokemonDisplayName">${pokemon.name}</div>
    <div class="pokemonDisplayId">#${formatNumberWithLeadingZeros(
      pokemonObjectArray[index].id,
      4
    )}</div>
    <div class="typesPokemon" id="typesPokemon${index}"></div></div>
     </div>`;
}

function getPokemonTypes(pokemon, numberPokemon) {
  for (let index = 0; index < pokemon.types.length; index++) {
    document.getElementById(
      `typesPokemon${numberPokemon}`
    ).innerHTML += `<div class="designTypePokemon BG${pokemon.types[index].type.name}">${pokemon.types[index].type.name}</div>`;
  }
}

function getInformationOfPokemon() {
  return `<div class="overCard BG${focusPokemon.types[0].type.name}">
  <div class="pokemonName">${focusPokemon.name}</div>
  <div class="pokemonId">#${formatNumberWithLeadingZeros(
    focusPokemon.id,
    4
  )}</div>
  <div class="imageFocusPokemon">
  <div class="navArrow" id="leftArrow" onclick="loadPrev(${
    focusPokemon.id
  })">&#10094;</div>
  <img src="${
    focusPokemon.sprites.other.dream_world.front_default
  }"><div class="navArrow" id="rightArrow" onclick="loadNext(${
    focusPokemon.id
  })">&#10095;</div></div>
  <div class="BGwhite">
  <nav class="categoryInformation">
  <li><a onclick="getAboutPokemon()">About</a></li>
  <li><a onclick="getStatsPokemon()">Stats</a></li>
  <li><a onclick="getEvolutionPokemon()">Evolution</a></li>
  <li><a onclick="getMovesPokemon()">Moves</a></li>
</nav>
  <div id="showCategory" class="showCategory"></div>
  </div>
  <div class="closeButtonX" onclick="closeButton()">X</div></div>
  `;
}

function getAboutPokemon() {
  document.getElementById("showCategory").innerHTML = `
  <div class="categoryTitles">About</div>
  <table>
    <tr>
      <th>Grösse</th>
      <td>${focusPokemon.height} Meter</td>
    </tr>
    <tr>
      <th>Gewicht</th>
      <td>${focusPokemon.weight} Kilogramm</td>
    </tr>
    <tr>
      <th>Base-Experience</th>
      <td>${focusPokemon.base_experience}</td>
    </tr>
    <tr>
      <th>Umgebung</th>
      <td>${chainFocusPokemon.habitat.name}</td>
    </tr>
    <tr>
      <th>Schritte zum Ausbrüten</th>
      <td>${chainFocusPokemon.hatch_counter * 255}</td>
    </tr>
  </table>`;
}

function getStatsPokemon() {
  document.getElementById(
    "showCategory"
  ).innerHTML = `<div class="categoryTitles">Stats</div>
  <table>
    <tr>
      <th>HP</th>
      <td>${focusPokemon.stats[0].base_stat}</td>
    </tr>
    <tr>
      <th>Attack</th>
      <td>${focusPokemon.stats[1].base_stat}</td>
    </tr>
    <tr>
      <th>Defense</th>
      <td>${focusPokemon.stats[2].base_stat}</td>
    </tr>
    <tr>
      <th>Special Attack</th>
      <td>${focusPokemon.stats[3].base_stat}</td>
    </tr>
    <tr>
      <th>Special Defense</th>
      <td>${focusPokemon.stats[4].base_stat}</td>
    </tr>
    <tr>
      <th>Speed</th>
      <td>${focusPokemon.stats[5].base_stat}</td>
    </tr>
  </table>`;
}

async function getEvolutionPokemon() {
  try {
    await loadJSONEvolutionShowPokemon();
    returnEvolutionNumberPokemon();

    document.getElementById("showCategory").innerHTML = `
      <div class="categoryTitles">Evolution</div>
      <div class="overEvolutionPokemon">
        <div class="overEvolutionPokemonPreview" onclick="showPokemon(${firstEvolutionPokemon} - 1)">
          <img class="evolutionPokemonImage" src="${
            pokemonObjectArray[firstEvolutionPokemon - 1].sprites.other
              .dream_world.front_default
          }">
          <div class="textCapitalize">${
            evolutionfocusPokemon.chain.species.name
          }</div>
        </div>
    `;

    if (secondEvolutionPokemon !== "Keine weitere Stufe vorhanden") {
      document.getElementById("showCategory").innerHTML += `
        <img class="evolutionAngle" src="assets/icons/angle-down-solid.svg">
        <div class="overEvolutionPokemonPreview" onclick="showPokemon(${secondEvolutionPokemon} - 1)">
          <img class="evolutionPokemonImage" src="${
            pokemonObjectArray[secondEvolutionPokemon - 1].sprites.other
              .dream_world.front_default
          }">
          <div class="textCapitalize">${
            evolutionfocusPokemon.chain.evolves_to[0].species.name
          }</div>
        </div>
      `;
    }

    if (thirdEvolutionPokemon !== "Keine weitere Stufe vorhanden") {
      document.getElementById("showCategory").innerHTML += `
        <img class="evolutionAngle" src="assets/icons/angle-down-solid.svg">
        <div class="overEvolutionPokemonPreview" onclick="showPokemon(${thirdEvolutionPokemon} - 1)">
          <img class="evolutionPokemonImage" src="${
            pokemonObjectArray[thirdEvolutionPokemon - 1].sprites.other
              .dream_world.front_default
          }">
          <div class="textCapitalize">${
            evolutionfocusPokemon.chain.evolves_to[0].evolves_to[0].species.name
          }</div>
        </div>
      `;
    }
  } catch (error) {
    document.getElementById("showCategory").innerHTML =
      "Keine Evolution vorhanden.";
  }
}

function getMovesPokemon() {
  let moves = focusPokemon.moves;
  let movesHTML = '<div class="categoryTitles">Moves</div>';

  moves.forEach((move) => {
    let moveName = move.move.name;
    movesHTML += `<div class="move">${moveName}</div>`;
  });

  document.getElementById("showCategory").innerHTML = movesHTML;
}

function loadingPlaceholder() {
  document.getElementById(
    "content"
  ).innerHTML = `<div class="backgroundLoadingSpinner"><img class="loadingPokeball" src="assets/img/Pokeball.webp"></div> `;
}

function formatNumberWithLeadingZeros(number, totalLength) {
  return String(number).padStart(totalLength, "0");
}

function returnEvolutionNumberPokemon() {
  firstEvolutionPokemon = evolutionfocusPokemon.chain.species.url
    .split("/")
    .slice(-2, -1)[0];

  secondEvolutionPokemon =
    evolutionfocusPokemon.chain.evolves_to.length > 0
      ? evolutionfocusPokemon.chain.evolves_to[0].species.url
          .split("/")
          .slice(-2, -1)[0]
      : "Keine weitere Stufe vorhanden";

  thirdEvolutionPokemon =
    evolutionfocusPokemon.chain.evolves_to.length > 0 &&
    evolutionfocusPokemon.chain.evolves_to[0].evolves_to.length > 0
      ? evolutionfocusPokemon.chain.evolves_to[0].evolves_to[0].species.url
          .split("/")
          .slice(-2, -1)[0]
      : "Keine weitere Stufe vorhanden";
}

function filterPokemon() {
  document.getElementById("showButton").classList.add("d-none");
  let input = document.getElementById("searchBar").value.toLowerCase();

  if (input.length === 0) {
    document.getElementById("content").innerHTML = "";
    renderPokemon();
    return;
  }

  if (input.length < 3) {
    document.getElementById("content").innerHTML = "Kein Pokémon gefunden.";
    return;
  }

  let filteredPokemons = pokemonObjectArray.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(input) ||
      pokemon.id.toString().includes(input)
    );
  });

  if (filteredPokemons.length === 0) {
    document.getElementById("content").innerHTML = "Kein Pokémon gefunden.";
    return;
  }

  document.getElementById("content").innerHTML = "";
  filteredPokemons.forEach((pokemon) => {
    document.getElementById("content").innerHTML += getPokemons(
      pokemonObjectArray[pokemon.id - 1],
      pokemon.id - 1
    );
    getPokemonTypes(pokemonObjectArray[pokemon.id - 1], pokemon.id - 1);
  });
  document.getElementById("showButton").classList.remove("d-none");
}

function getPokemons(pokemon, index) {
  return `
    <div class="pokemoncard" onclick="showPokemon(${index})">
    <div id="backgroundPokemon${index}" class="imageShow">
    <div id="backgroundPokemonImage${index}"><img src="${
    pokemonObjectArray.sprites.front_default
  }"></div></div>
    <div class="pokemonName">${pokemon.name}</div>
    <div>#${formatNumberWithLeadingZeros(pokemonObjectArray.id, 4)}</div>
    <div id="typesPokemon${index}"></div>
    <div>${pokemonObjectArray.height}</div>
     </div>`;
}

function getInformationOfPokemon() {
  console.log(focusPokemon);
  return `<div class="overCard">
  <div class="pokemonName">${focusPokemon.name}</div>
  <div>#${formatNumberWithLeadingZeros(focusPokemon.id, 4)}</div>
  <div class="imageFocusPokemon"><img src="${
    focusPokemon.sprites.front_default
  }"></div>
  <div class="BGwhite">
  <div class="categoryInformation"><button style="background-color:red;"onclick="getAboutPokemon()">About</button>
  <div id="showCategory"></div>
  </div>
  </div>
  `;
}

function getAboutPokemon() {
  document.getElementById(
    "showCategory"
  ).innerHTML = `<div class="stats">HP ${focusPokemon.stats[0].base_stat}</div>
  <div class="stats">Attack ${focusPokemon.stats[1].base_stat}</div>`;
  console.log(focusPokemon);
}

function formatNumberWithLeadingZeros(number, totalLength) {
  return String(number).padStart(totalLength, "0");
}



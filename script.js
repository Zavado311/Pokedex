let BASE_URL = "https://pokeapi.co/api/v2/";
let showValue = 20;
let pokemonJSONArray = [];
let pokemonObjectArray = [];
let pokemonURLs = [];
let focusPokemon = [];

async function init() {
  await loadJSON();
  fetchDataJson();
}

async function loadJSON() {
  let response = await fetch(
    BASE_URL + "pokemon?limit=" + showValue + "&offset=0"
  );
  pokemonJSONArray = await response.json();
}

async function fetchDataJson() {
  document.getElementById("content").innerHTML = "";
  try {
    for (let index = 0; index < pokemonJSONArray.results.length; index++) {
      let pokemonId = pokemonJSONArray.results[index];
      let pokemon = await fetch(pokemonId.url);
      pokemonObjectArray = await pokemon.json();
      document.getElementById("content").innerHTML += getPokemons(
        pokemonId,
        index
      );
      getPokemonTypes(pokemonObjectArray, index);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    document.getElementById("content").innerHTML =
      "Es gab ein Problem beim Abrufen der Daten.";
  }
}

function getPokemonTypes(pokemon, numberPokemon) {
  for (let index = 0; index < pokemon.types.length; index++) {
    document
      .getElementById(`backgroundPokemon${numberPokemon}`)
      .classList.add(`BG${pokemon.types[0].type.name}`);
    document
      .getElementById(`backgroundPokemonImage${numberPokemon}`)
      .classList.add(`${pokemon.types[0].type.name}`);
    document.getElementById(
      `typesPokemon${numberPokemon}`
    ).innerHTML += `<div>${pokemon.types[index].type.name}</div>`;
  }
}

async function showMeMore() {
  showValue += 20;
  await loadJSON();
  await fetchDataJson();
}

async function showPokemon(index) {
  ++index;
  let getFocusPokemon = await fetch(BASE_URL + "pokemon/" + index);
  focusPokemon = await getFocusPokemon.json();

  document.getElementById("showCurrentPokemon").classList.remove("d-none");
  document.body.classList.add("no-scroll");
  document.getElementById("focusPokemon").innerHTML =
    getInformationOfPokemon();

}

/* document.body.classList.remove('no-scroll'); beutzen!!! */

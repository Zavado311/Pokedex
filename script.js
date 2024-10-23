let BASE_URL = "https://pokeapi.co/api/v2/";
let showValue = 30;
let pokemonJSONArray = [];
let pokemonObjectArray = [];
let focusPokemon = [];
let evolutionfocusPokemon = [];
let chainFocusPokemon = [];

async function init() {
  document.getElementById("showButton").classList.add("d-none");
  loadingPlaceholder();
  await loadRenderJSON();
  document.getElementById("showButton").classList.remove("d-none");
  await renderPokemon();
}

async function showMeMore() {
  showValue += 20;
  await loadRenderJSON();
  await renderPokemon();
}

async function loadRenderJSON() {
  let response = await fetch(
    BASE_URL + "pokemon?limit=" + showValue + "&offset=0"
  );
  pokemonJSONArray = await response.json();
}

async function renderPokemon() {
  try {
    await fetchpokemonObjectArray();
    document.getElementById("content").innerHTML = "";
    pokemonObjectArray.forEach((pokemonObject, index) => {
      document.getElementById("content").innerHTML += getPokemons(pokemonObject, index);
      getPokemonTypes(pokemonObject, index);
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    document.getElementById("content").innerHTML =
      "Es gab ein Problem beim Abrufen der Daten.";
  }
}

async function fetchpokemonObjectArray() {
  const fetchPromises = pokemonJSONArray.results.map((pokemonId) =>
    fetch(pokemonId.url).then((response) => response.json())
  );

  pokemonObjectArray = await Promise.all(fetchPromises);
}

async function loadJSONShowPokemon(index) {
  let getFocusPokemon = await fetch(BASE_URL + "pokemon/" + index);
  focusPokemon = await getFocusPokemon.json();

  let getChainFocusPokemon = await fetch(BASE_URL + "pokemon-species/" + index);
  chainFocusPokemon = await getChainFocusPokemon.json();
}

async function loadJSONEvolutionShowPokemon() {
  let getEvolutionFocusPokemon = await fetch(
    chainFocusPokemon.evolution_chain.url
  );
  evolutionfocusPokemon = await getEvolutionFocusPokemon.json();
}

async function showPokemon(index) {
  ++index;
  await loadJSONShowPokemon(index);

  try {
    designElements(index);
    document.getElementById("focusPokemon").innerHTML =
    getInformationOfPokemon();
    getAboutPokemon();

  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    document.getElementById("focusPokemon").innerHTML =
      "Es gab ein Problem beim Abrufen der Daten.";
  }
}

function designElements(index) {
  document.getElementById("showCurrentPokemon").classList.remove("d-none");
  document.body.classList.add("no-scroll");
  if (index == 1) {
    document.getElementById("leftArrow").classList.add("d-none");
  }

  if (index == 1010) {
    document.getElementById("rightArrow").classList.add("d-none");
  }
}

async function loadPrev(index) {
  if (index <= 1) {
    return;
  } else {
    index--;
    index--;
    await showPokemon(index);
  }
}

async function loadNext(index) {
  if (index >= pokemonObjectArray.length) {
    await showMeMore();
    await showPokemon(index);
  } else {
    await showPokemon(index);
  }
}

function closeButton() {
  document.getElementById("showCurrentPokemon").classList.add("d-none");
  document.body.classList.remove("no-scroll");
}

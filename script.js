let BASE_URL = "https://pokeapi.co/api/v2/";
let showValue = 25;
let pokemonJSONArray = [];
let pokemonObjectArray = [];
let focusPokemon = [];
let descriptionfocusPokemon = [];
let evolutionfocusPokemon = [];

let firstEvolutionPokemon = "";
let secondEvolutionPokemon = "";
let thirdEvolutionPokemon = "";

async function init() {
  await loadJSON();
  renderPokemon();
}

async function loadJSON() {
  let response = await fetch(
    BASE_URL + "pokemon?limit=" + showValue + "&offset=0"
  );
  pokemonJSONArray = await response.json();
}

async function renderPokemon() {
  document.getElementById("content").innerHTML = "";

  try {
    const fetchPromises = pokemonJSONArray.results.map((pokemonId) =>
      fetch(pokemonId.url).then((response) => response.json())
    );

    pokemonObjectArray = await Promise.all(fetchPromises);

    pokemonObjectArray.forEach((pokemonObject, index) => {
      document.getElementById("content").innerHTML += getPokemons(
        pokemonObject,
        index
      );
      getPokemonTypes(pokemonObject, index);
    });
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
  await renderPokemon();
}

async function showPokemon(index) {
  ++index;
try {
   let getFocusPokemon = await fetch(BASE_URL + "pokemon/" + index);
  focusPokemon = await getFocusPokemon.json();

  let getDescriptionFocusPokemon = await fetch(
    BASE_URL + "characteristic/" + index
  );
  descriptionfocusPokemon = await getDescriptionFocusPokemon.json();

  let getChainFocusPokemon = await fetch(BASE_URL + "pokemon-species/" + index);
  getChainFocusPokemon = await getChainFocusPokemon.json();

  let getEvolutionFocusPokemon = await fetch(
    getChainFocusPokemon.evolution_chain.url
  );
  evolutionfocusPokemon = await getEvolutionFocusPokemon.json();

  document.getElementById("showCurrentPokemon").classList.remove("d-none");
  document.body.classList.add("no-scroll");
  document.getElementById("focusPokemon").innerHTML = getInformationOfPokemon();
  getAboutPokemon();
} catch (error) {
  console.error("Fehler beim Abrufen der Daten:", error);
    document.getElementById("content").innerHTML =
      "Es gab ein Problem beim Abrufen der Daten.";
}
 
}

function closeButton(params) {
  document.getElementById("showCurrentPokemon").classList.add("d-none");
  document.body.classList.remove('no-scroll');
}


/* document.body.classList.remove('no-scroll'); beutzen!!! */

async function loadPrev(index) {
  if (index <= 1) {
    return;
  } else {
    index--;
    index--;
    await showPokemon(index);
    console.log(index);
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

async function allPokemon() {
  const getAllPokemon = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await getAllPokemon.json();

  console.log(data);

  data.results.forEach(async function (item) {
    const pokeSlc = await fetch(item.url);
    const pokeData = await pokeSlc.json();
    let arrayTypes = [];
    const pokeText = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeData.order}`
    );
    const dataText = await pokeText.json();
    let arrayText = [];
    let count = Math.floor(Math.random() * 50);
    const pokeDescription = dataText.flavor_text_entries[count].flavor_text;

    console.log(pokeDescription);

    for (let i = 0; i < pokeData.types.length; i++) {
      arrayTypes.push(pokeData.types[i].type.name);
    }

    document.querySelector("#pokeContainer").insertAdjacentHTML(
      "beforeend",
      `
        <div class="pokeCards flex-box">

            <img src="${pokeData.sprites.other.home.front_default}" alt="">

            <div class="pokeCardInfo flex-box">
                <h2 class="pokeName">${pokeData.name}</h2>
                <span class="pokeOrder">Order: ${pokeData.order}</span>
                <span class="pokeType">Type: ${arrayTypes}</span>
                <p class="pokeDescription">${pokeDescription}</p>
            </div>

        </div>
        `
    );
  });
}

allPokemon();

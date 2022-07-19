let page = 0;

async function allPokemon() {
  const getAllPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=50`);
  const data = await getAllPokemon.json();

  data.results.forEach(async function (item) {
    const pokeSlc = await fetch(item.url);
    const pokeData = await pokeSlc.json();
    let arrayTypes = [];
    const pokeText = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeData.order}`
    );
    const dataText = await pokeText.json();
    let count = Math.floor(Math.random() * 50);
    let pokeDescription;

    while(dataText.flavor_text_entries[count].language.name != "en") {
      count = Math.floor(Math.random() * 50);
    }

    pokeDescription = dataText.flavor_text_entries[count].flavor_text;

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

//paginação simples
function viewMore(){
  page += 50;
  allPokemon();
}

//paginação infinita
window.addEventListener("scroll", function (){
  const {scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 300){
      viewMore();
  }
});

const pokeInput = document.querySelector("#pokeInput");

pokeInput.addEventListener("keyup", () => {
  console.log("ok");
  const allH2 = document.querySelectorAll(".pokeName");
  const allCards = document.querySelectorAll(".pokeCards");

  for(let n of allH2) {
    // console.log(n.innerText);
  
  if(pokeInput.value === "") {
    n.parentElement.parentElement.style.display = "flex"
  }else if(n.innerText.toLowerCase().includes(pokeInput.value.toLowerCase())){
      n.parentElement.parentElement.style.display = "flex"
    }else{
      n.parentElement.parentElement.style.display = "none";
    }
  }

})
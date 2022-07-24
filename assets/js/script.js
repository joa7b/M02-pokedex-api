let page = 0;

async function allPokemon() {
  const getAllPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=50`
  );
  const data = await getAllPokemon.json();

  data.results.forEach(async function (item) {
    const pokeSlc = await fetch(item.url);
    const pokeData = await pokeSlc.json();
    let arrayTypes = [];
    const pokeText = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeData.order}`
    );
    const dataText = await pokeText.json();

    let pokeDescription;

    for (let i = 0; i < 500; i++) {
      if (dataText.flavor_text_entries[i].language.name === "en") {
        pokeDescription = dataText.flavor_text_entries[i].flavor_text;
        break;
      }
    }

    for (let i = 0; i < pokeData.types.length; i++) {
      arrayTypes.push(pokeData.types[i].type.name);
    }

    if(arrayTypes[1] == undefined){
      arrayTypes[1] = ""
    }

    document.querySelector("#pokeContainer").insertAdjacentHTML(
      "beforeend",
      `
        <div class="pokeCards flex-box">
          <div class="pokeCards2 flex-box">
            <div class="imgContainer" onclick="baloonImg()">
              <img src="${pokeData.sprites.other.home.front_default}" alt="" class="pokeImg">
            </div>

            <div class="pokeCardInfo flex-box">
              <div class="pokeNID flex-box">
                <h2 class="pokeName">${pokeData.name}</h2>
                <span class="pokeOrder">ID: ${pokeData.id}</span>
              </div>
                <span class="pokeType"><p>${arrayTypes[0]}</p> <p class="t2">${arrayTypes[1]}</p></span>
                <p class="pokeDescription">${pokeDescription}</p>  
            </div>
          </div>
          <button class="btnDetail" onclick="modal()">Detalhes</button>
          
          <div class="pokeCards teste" id="${pokeData.id}">
            <p>HP: ${pokeData.stats[0].base_stat}</p>
            <p>Attack: ${pokeData.stats[1].base_stat}</p>
            <p>Defense: ${pokeData.stats[2].base_stat}</p>
            <p>Special Attack: ${pokeData.stats[3].base_stat}</p>
            <p>Special Defense: ${pokeData.stats[4].base_stat}</p>
            <p>Special Defense: ${pokeData.stats[5].base_stat}</p>
          </div>
        </div>
        `
    );

    const emptyTypes = document.querySelectorAll(".t2");
    
    for(let n of emptyTypes) {
      if(n.innerText == "") {
        n.remove()
      }
    }

    typeColor()

    

    // if (arrayTypes[1] != "") {
    //   document.querySelector(".pokeType").appendChild(arrayTypes[1]);
    // }
  });
}

allPokemon();


//paginação simples
function viewMore() {
  page += 50;
  allPokemon();
}

//paginação infinita
window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    viewMore();
  }
});

const pokeInput = document.querySelector("#pokeInput");

pokeInput.addEventListener("keyup", () => {
  // console.log("ok");
  const allH2 = document.querySelectorAll(".pokeName");

  for (let n of allH2) {
    // console.log(n.innerText);

    if (pokeInput.value === "") {
      n.parentElement.parentElement.style.display = "flex";
    } else if (
      n.innerText.toLowerCase().includes(pokeInput.value.toLowerCase())
    ) {
      n.parentElement.parentElement.style.display = "flex";
    } else {
      n.parentElement.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  }
});

function modal() {
  const btnDetail = document.querySelectorAll(".btnDetail");

  for (let n of btnDetail) {
    n.addEventListener("click", () => {
      if (n.parentElement.querySelector(".teste").style.display == "none") {
        n.parentElement.querySelector(".teste").style.display = "unset";
      } else {
        n.parentElement.querySelector(".teste").style.display = "none";
      }
    });
  }
}

function typeColor() {
  const pokeType = document.querySelectorAll(".pokeType");
  
  for(let n of pokeType){
    console.log(n.textContent)
    if(n.innerText === "Water") {
      n.style.backgroundColor = "#4592C4";
    }else if(n.innerText === "Grass") {
      n.style.backgroundColor = "#9BCC50"
    }else if(n.innerText === "Fire") {
      n.style.backgroundColor = "#FD7D24"
    }else if(n.innerText === "Bug") {
      n.style.backgroundColor = "#729F3F"
    }else if(n.innerText === "Normal") {
      n.style.backgroundColor = "#A8A878"
    }else if(n.innerText === "Fighting") {
      n.style.backgroundColor = "#C03028"
    }else if(n.innerText === "Flying") {
      n.style.backgroundColor = "#A890F0"
    }else if(n.innerText === "Poison") {
      n.style.backgroundColor = "#A040A0"
    }else if(n.innerText === "Electric") {
      n.style.backgroundColor = "#F8D030"
    }else if(n.innerText === "Ground") {
      n.style.backgroundColor = "#E0C068"
    }else if(n.innerText === "Psychic") {
      n.style.backgroundColor = "#F85888"
    }else if(n.innerText === "Rock") {
      n.style.backgroundColor = "#B8A038"
    }else if(n.innerText === "Ice") {
      n.style.backgroundColor = "#98D8D8"
    }else if(n.innerText === "Dragon") {
      n.style.backgroundColor = "#7038F8"
    }else if(n.innerText === "Ghost") {
      n.style.backgroundColor = "#705898"
    }else if(n.innerText === "Dark") {
      n.style.backgroundColor = "#705848"
    }else if(n.innerText === "Steel") {
      n.style.backgroundColor = "#B8B8D0"
    }else if(n.innerText === "Fairy") {
      n.style.backgroundColor = "#EE99AC"
    }else if(n.textContent === "grass poison") {
      n.style.background = "linear-gradient(90deg, rgba(155,204,80,1) 50%, #A040A0 50%)";
    }else if(n.textContent === "normal flying") {
      n.style.background = "linear-gradient(90deg, rgba(168,168,120,1) 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "fire flying") {
      n.style.background = "linear-gradient(90deg, rgba(253,125,36,1) 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "bug flying") {
      n.style.background = "linear-gradient(90deg, rgba(114,159,63,1) 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "bug poison") {
      n.style.background = "linear-gradient(90deg, rgba(114,159,63,1) 50%, #A040A0 50%)"
    }else if(n.textContent === "bug grass") {
      n.style.background = "linear-gradient(90deg, rgba(114,159,63,1) 50%, rgba(155,204,80,1) 50%)"
    }else if(n.textContent === "poison ground") {
      n.style.background = "linear-gradient(90deg, #A040A0 50%, #E0C068 50%)"
    }else if(n.textContent === "normal fairy") {
      n.style.background = "linear-gradient(90deg, #A8A878 50%, #EE99AC 50%)"
    }else if(n.textContent === "poison flying") {
      n.style.background = "linear-gradient(90deg, #A040A0 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "water poison") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #A040A0 50%)"
    }else if(n.textContent === "water fighting") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #C03028 50%)"
    }else if(n.textContent === "rock ground") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #E0C068 50%)"
    }else if(n.textContent === "electric steel") {
      n.style.background = "linear-gradient(90deg, #F8D030 50%, #B8B8D0 50%)"
    }else if(n.textContent === "water psychic") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #F85888 50%)"
    }else if(n.textContent === "water ice") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #98D8D8 50%)"
    }else if(n.textContent === "ghost poison") {
      n.style.background = "linear-gradient(90deg, #705898 50%, #A040A0 50%)"
    }else if(n.textContent === "ground rock") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #B8A038 50%)"
    }else if(n.textContent === "psychic fairy") {
      n.style.background = "linear-gradient(90deg, #F85888 50%, #EE99AC 50%)"
    }else if(n.textContent === "ice psychic") {
      n.style.background = "linear-gradient(90deg, #98D8D8 50%, #F85888 50%)"
    }else if(n.textContent === "grass psychic") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, #F85888 50%)"
    }else if(n.textContent === "water flying") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "rock water") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #4592C4 50%)"
    }else if(n.textContent === "rock flying") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "ice flying") {
      n.style.background = "linear-gradient(90deg, #98D8D8 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "electric flying") {
      n.style.background = "linear-gradient(90deg, #F8D030 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "dragon flying") {
      n.style.background = "linear-gradient(90deg, #7038F8 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "water electric") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #F8D030 50%)"
    }else if(n.textContent === "psychic flying") {
      n.style.background = "linear-gradient(90deg, #F85888 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "fairy flying") {
      n.style.background = "linear-gradient(90deg, #EE99AC 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "dark flying") {
      n.style.background = "linear-gradient(90deg, #705848 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "water fairy") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #EE99AC 50%)"
    }else if(n.textContent === "grass flying") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, rgba(168,144,240,1) 50%)"
    }else if(n.textContent === "water ground") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #E0C068 50%)"
    }else if(n.textContent === "steel ground") {
      n.style.background = "linear-gradient(90deg, #B8B8D0 50%, #E0C068 50%)"
    }else if(n.textContent === "dark ice") {
      n.style.background = "linear-gradient(90deg, #705848 50%, #98D8D8 50%)"
    }else if(n.textContent === "bug steel") {
      n.style.background = "linear-gradient(90deg, rgba(114,159,63,1) 50%, #B8B8D0 50%)"
    }else if(n.textContent === "bug fighting") {
      n.style.background = "linear-gradient(90deg, rgba(114,159,63,1) 50%, #C03028 50%)"
    }else if(n.textContent === "fire rock") {
      n.style.background = "linear-gradient(90deg, #FD7D24 50%, #B8A038 50%)"
    }else if(n.textContent === "bug rock") {
      n.style.background = "linear-gradient(90deg, rgba(114,159,63,1) 50%, #B8A038 50%)"
    }else if(n.textContent === "normal psychic") {
      n.style.background = "linear-gradient(90deg, #A8A878 50%, #F85888 50%)"
    }else if(n.textContent === "ground flying") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #A890F0 50%)"
    }else if(n.textContent === "water rock") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #B8A038 50%)"
    }else if(n.textContent === "ice ground") {
      n.style.background = "linear-gradient(90deg, #98D8D8 50%, #E0C068 50%)"
    }else if(n.textContent === "steel flying") {
      n.style.background = "linear-gradient(90deg, #B8B8D0 50%, #A890F0 50%)"
    }else if(n.textContent === "water dragon") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #7038F8 50%)"
    }else if(n.textContent === "water grass") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #9BCC50 50%)"
    }else if(n.textContent === "dark fire") {
      n.style.background = "linear-gradient(90deg, #705848 50%, #FD7D24 50%)"
    }else if(n.textContent === "rock dark") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #705848 50%)"
    }else if(n.textContent === "bug water") {
      n.style.background = "linear-gradient(90deg, #729F3F 50%, #4592C4 50%)"
    }else if(n.textContent === "psychic grass") {
      n.style.background = "linear-gradient(90deg, #F85888 50%, #9BCC50 50%)"
    }else if(n.textContent === "fire fighting") {
      n.style.background = "linear-gradient(90deg, #FD7D24 50%, #C03028 50%)"
    }else if(n.textContent === "grass fighting") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, #C03028 50%)"
    }else if(n.textContent === "grass dark") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, #705848 50%)"
    }else if(n.textContent === "bug ground") {
      n.style.background = "linear-gradient(90deg, #729F3F 50%, #E0C068 50%)"
    }else if(n.textContent === "bug ghost") {
      n.style.background = "linear-gradient(90deg, #729F3F 50%, #705898 50%)"
    }else if(n.textContent === "water dark") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #705848 50%)"
    }else if(n.textContent === "fire ground") {
      n.style.background = "linear-gradient(90deg, #FD7D24 50%, #E0C068 50%)"
    }else if(n.textContent === "dark ghost") {
      n.style.background = "linear-gradient(90deg, #705848 50%, #705898 50%)"
    }else if(n.textContent === "steel fairy") {
      n.style.background = "linear-gradient(90deg, #B8B8D0 50%, #EE99AC 50%)"
    }else if(n.textContent === "steel rock") {
      n.style.background = "linear-gradient(90deg, #B8B8D0 50%, #B8A038 50%)"
    }else if(n.textContent === "fighting psychic") {
      n.style.background = "linear-gradient(90deg, #C03028 50%, #F85888 50%)"
    }else if(n.textContent === "rock grass") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #9BCC50 50%)"
    }else if(n.textContent === "rock bug") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #729F3F 50%)"
    }else if(n.textContent === "rock psychic") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #F85888 50%)"
    }else if(n.textContent === "ground dragon") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #7038F8 50%)"
    }else if(n.textContent === "ice water") {
      n.style.background = "linear-gradient(90deg, #98D8D8 50%, #4592C4 50%)"
    }else if(n.textContent === "ground psychic") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #F85888 50%)"
    }else if(n.textContent === "steel psychic") {
      n.style.background = "linear-gradient(90deg, #B8B8D0 50%, #F85888 50%)"
    }else if(n.textContent === "dragon psychic") {
      n.style.background = "linear-gradient(90deg, #7038F8 50%, #F85888 50%)"
    }else if(n.textContent === "grass ground") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, #E0C068 50%)"
    }else if(n.textContent === "water steel") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #B8B8D0 50%)"
    }else if(n.textContent === "normal water") {
      n.style.background = "linear-gradient(90deg, #A8A878 50%, #4592C4 50%)"
    }else if(n.textContent === "rock steel") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #B8B8D0 50%)"
    }else if(n.textContent === "ghost flying") {
      n.style.background = "linear-gradient(90deg, #705898 50%, #A890F0 50%)"
    }else if(n.textContent === "poison dark") {
      n.style.background = "linear-gradient(90deg, #A040A0 50%, #705848 50%)"
    }else if(n.textContent === "ghost dark") {
      n.style.background = "linear-gradient(90deg, #705898 50%, #705848 50%)"
    }else if(n.textContent === "dragon ground") {
      n.style.background = "linear-gradient(90deg, #7038F8 50%, #E0C068 50%)"
    }else if(n.textContent === "fighting steel") {
      n.style.background = "linear-gradient(90deg, #C03028 50%, #B8B8D0 50%)"
    }else if(n.textContent === "grass ice") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, #98D8D8 50%)"
    }else if(n.textContent === "poison fighting") {
      n.style.background = "linear-gradient(90deg, #A040A0 50%, #C03028 50%)"
    }else if(n.textContent === "poison bug") {
      n.style.background = "linear-gradient(90deg, #A040A0 50%, #729F3F 50%)"
    }else if(n.textContent === "poison fighting") {
      n.style.background = "linear-gradient(90deg, #A040A0 50%, #C03028 50%)"
    }else if(n.textContent === "ghost dragon") {
      n.style.background = "linear-gradient(90deg, #705898 50%, #7038F8 50%)"
    }else if(n.textContent === "psychic fighting") {
      n.style.background = "linear-gradient(90deg, #F85888 50%, #C03028 50%)"
    }else if(n.textContent === "psychic fire") {
      n.style.background = "linear-gradient(90deg, #F85888 50%, #FD7D24 50%)"
    }else if(n.textContent === "steel dragon") {
      n.style.background = "linear-gradient(90deg, #B8B8D0 50%, #7038F8 50%)"
    }else if(n.textContent === "ice ghost") {
      n.style.background = "linear-gradient(90deg, #98D8D8 50%, #705898 50%)"
    }else if(n.textContent === "electric ghost") {
      n.style.background = "linear-gradient(90deg, #F8D030 50%, #705898 50%)"
    }else if(n.textContent === "fire steel") {
      n.style.background = "linear-gradient(90deg, #FD7D24 50%, #B8B8D0 50%)"
    }else if(n.textContent === "ground steel") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #B8B8D0 50%)"
    }else if(n.textContent === "grass fairy") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, #EE99AC 50%)"
    }else if(n.textContent === "ground dark") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #705848 50%)"
    }else if(n.textContent === "dark fighting") {
      n.style.background = "linear-gradient(90deg, #705848 50%, #C03028 50%)"
    }else if(n.textContent === "normal grass") {
      n.style.background = "linear-gradient(90deg, #A8A878 50%, #9BCC50 50%)"
    }else if(n.textContent === "water ghost") {
      n.style.background = "linear-gradient(90deg, #4592C4 50%, #705898 50%)"
    }else if(n.textContent === "grass steel") {
      n.style.background = "linear-gradient(90deg, #9BCC50 50%, #B8B8D0 50%)"
    }else if(n.textContent === "bug electric") {
      n.style.background = "linear-gradient(90deg, #729F3F 50%, #F8D030 50%)"
    }else if(n.textContent === "ghost fire") {
      n.style.background = "linear-gradient(90deg, #705898 50%, #FD7D24 50%)"
    }else if(n.textContent === "ground electric") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #F8D030 50%)"
    }else if(n.textContent === "ground ghost") {
      n.style.background = "linear-gradient(90deg, #E0C068 50%, #705898 50%)"
    }else if(n.textContent === "dark steel") {
      n.style.background = "linear-gradient(90deg, #705848 50%, #B8B8D0 50%)"
    }else if(n.textContent === "dark dragon") {
      n.style.background = "linear-gradient(90deg, #705848 50%, #7038F8 50%)"
    }else if(n.textContent === "bug fire") {
      n.style.background = "linear-gradient(90deg, #729F3F 50%, #FD7D24 50%)"
    }else if(n.textContent === "steel fighting") {
      n.style.background = "linear-gradient(90deg, #B8B8D0 50%, #C03028 50%)"
    }else if(n.textContent === "rock fighting") {
      n.style.background = "linear-gradient(90deg, #B8A038 50%, #C03028 50%)"
    }else if(n.textContent === "dragon fire") {
      n.style.background = "linear-gradient(90deg, #7038F8 50%, #FD7D24 50%)"
    }
  }
}


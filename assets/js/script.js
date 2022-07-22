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

    for(let i = 0; i<500;i++){
      if(dataText.flavor_text_entries[i].language.name === "en") {
        pokeDescription = dataText.flavor_text_entries[i].flavor_text
        break;
      }
      
    }

    for (let i = 0; i < pokeData.types.length; i++) {
      arrayTypes.push(pokeData.types[i].type.name);
    }

    // let count = 0
    // let idteste = pokeData.id;

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
                <span class="pokeType">${arrayTypes}</span>
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
    // const allCards = document.querySelectorAll(".pokeCards");
    // // console.log(allCards)
    // modal()
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

  if (scrollTop + clientHeight >= scrollHeight - 300) {
    viewMore();
  }
});

const pokeInput = document.querySelector("#pokeInput");

pokeInput.addEventListener("keyup", () => {
  console.log("ok");
  const allH2 = document.querySelectorAll(".pokeName");
  const allCards = document.querySelectorAll(".pokeCards");

  for (let n of allH2) {
    // console.log(n.innerText);

    if (pokeInput.value === "") {
      n.parentElement.parentElement.style.display = "flex";
    } else if (
      n.innerText.toLowerCase().includes(pokeInput.value.toLowerCase())
    ) {
      n.parentElement.parentElement.style.display = "flex";
    } else {
      n.parentElement.parentElement.parentElement.parentElement.style.display = "none";
    }
  }
});

// function modal() {
//   const btnTeste = document.querySelectorAll(".btnDetail");
//   // console.log(btnTeste);

//   btnTeste.forEach((a) => {
    
//     a.addEventListener("click", () => {
//       console.log(a)
//       details()
//     })
//   })

// }

// function details() {
//   const teste = document.querySelectorAll(".teste");
//   // console.log(teste)
//   teste.forEach((a) => {
//     a.style.display = "block";
//   })
// }

function modal() {
  const btnDetail = document.querySelectorAll(".btnDetail");

  for(let n of btnDetail){
    n.addEventListener("click", () => {
      if(n.parentElement.querySelector(".teste").style.display == "none") {
        n.parentElement.querySelector(".teste").style.display = "unset";
      }else {
        n.parentElement.querySelector(".teste").style.display = "none";
      }
    })
  }
}














// function baloonImg() {
//   let pokeImg = document.querySelectorAll(".imgContainer");

//   for(let n of pokeImg){
//     n.addEventListener("click", () => {

//       if(n.childElementCount === 1 || n.querySelector(".pokeBaloon").style.display === "none") {
//         n.insertAdjacentHTML("afterbegin",
//         `<div class="pokeBaloon">
//           <img src="./assets/images/1373094.svg" alt="">
//         </div>`
//         )
//       }else {
//         n.querySelector(".pokeBaloon").style.display = "none";
//       }
      
      
//     });
//   }

// }




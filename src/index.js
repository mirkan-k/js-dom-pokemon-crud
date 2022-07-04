const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

const state = {
  pokemon: []
}

function fetchPokemonAndRender() {
  fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then((pokemons) => {
      state.pokemon = pokemons
      renderPokemon(state.pokemon)
    })
}

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const like = document.createElement("img");
  const remove = document.createElement("img");

  liEl.classList.add("pokemon");
  liEl.setAttribute('id', `id-${pokemon.id}`)
  
  imgEl.src = pokemon.image;
  like.src = './assets/heart.png'
  remove.src = './assets/trash.png'
  
  liEl.style.textAlign = "center"

  let liked = false
  like.style.cursor = "pointer"
  like.style.width = '2.5rem'
  like.style.margin = "0 10px"
  like.addEventListener("click", () => {
    if (!liked) {
      liked = true
      like.src = './assets/heart-full.png'
    } else {
      liked = false;
      like.src = './assets/heart.png'
    }
    console.log(liked)
  })
  remove.style.width = '2.5rem'
  remove.style.margin = "0 10px"
  remove.style.cursor = "pointer"
  remove.addEventListener("click", () => {
    removePokemon(pokemon.id)
  })
  h2El.innerText = pokemon.name;

  liEl.append(imgEl, h2El, like, remove);
  pokeList.append(liEl);
}

function renderPokemon(pokemons) {
  pokemons.forEach(pokemon => addPokemon(pokemon))
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    };
    
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    })
      .then(res =>  res.json())
      .then(pokemon => addPokemon(pokemon));

    pokeForm.reset();
  });
}

function removePokemon(id) {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'DELETE'
  })
  .then (function () {
    fetchPokemonAndRender()
  })
}
// TODO: Get the async working properly, No idea what's happening with this
// function patchEd() {
//   fetch(`http://localhost:3000/pokemons/7`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ image: "https://avatars.githubusercontent.com/u/13719921?v=4" })
//   })
//   .then ((response) => {
//     return response.json()
//   })
//   .then ((data) => {
//     console.log('patched ed', data)
//   })
// }

function init() {
  // patchEd()
  listenToAddPokemonForm();
  fetchPokemonAndRender();
}

init();
import pokemon from "./data/pokemon_4x6.js";

function creer_buissons(nb_memos) {
  //Fonction qui créer tous les buissons
  for (let i = 0; i < nb_memos; i++) {
    creer_element("./assets/bush.webp");
  }
}

function creer_element(image_source) {
  const grille = document.querySelector("#grille_de_jeu");

  let element = document.createElement("div");
  let image = document.createElement("img");
  image.src = image_source;

  element.appendChild(image);
  grille.appendChild(element);
}

function disposer_pokemons(nb_memos, pokemon) {
  //Fonction qui va disposer les pokemons
  let placement_grille = [];
  let liste_nombre_aleatoire = [];

  while (placement_grille.length < nb_memos) {
    let nombre_aleatoire = Math.floor(Math.random() * nb_memos);
    let nb_occurence = 0;
    for (let i = 0; i < nb_memos; i++) {
      if (pokemon[nombre_aleatoire]["name"] == placement_grille[i]) {
        nb_occurence += 1;
      }
    }
    if (nb_occurence == 0) {
      console.log(nb_occurence);
      placement_grille.push(pokemon[nombre_aleatoire]["name"]);
      placement_grille.push(pokemon[nombre_aleatoire]["name"]);
    }
  }
  console.log(placement_grille);
}

creer_buissons(12);
disposer_pokemons(12, pokemon);
console.log(pokemon);

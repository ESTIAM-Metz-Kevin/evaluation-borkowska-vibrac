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
  element.classList.add("box"); // Ajout de la classe box

  let image = document.createElement("img");
  image.src = image_source;
  image.classList.add("bush");

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
    for (let i = 0; i < placement_grille.length; i++) {
      if (pokemon[nombre_aleatoire]["name"] == placement_grille[i][0]) {
        nb_occurence += 1;
      }
    }
    if (nb_occurence == 0) {
      console.log(nb_occurence);
      placement_grille.push([
        pokemon[nombre_aleatoire]["name"],
        pokemon[nombre_aleatoire]["sprite"],
      ]);
      placement_grille.push([
        pokemon[nombre_aleatoire]["name"],
        pokemon[nombre_aleatoire]["sprite"],
      ]);
      nb_occurence += 1;
    }
  }

  for (let i = 0; i < 20; i++) {
    let indice_aleatoire_1 = Math.floor(Math.random() * nb_memos);
    let indice_aleatoire_2 = Math.floor(Math.random() * nb_memos);
    let valeur_temporaire = placement_grille[indice_aleatoire_1][0];
    let lien_temporaire = placement_grille[indice_aleatoire_1][1];

    placement_grille[indice_aleatoire_1][0] =
      placement_grille[indice_aleatoire_2][0];
    placement_grille[indice_aleatoire_1][1] =
      placement_grille[indice_aleatoire_2][1];

    placement_grille[indice_aleatoire_2][0] = valeur_temporaire;
    placement_grille[indice_aleatoire_2][1] = lien_temporaire;
  }

  console.log(placement_grille);
  return placement_grille;
}

function clic(memo_pokemons) {
  let nb = 0;
  let tableau_lance = [];
  const grille = document.querySelector("#grille_de_jeu");
  let division = grille.querySelectorAll("div");
  console.log(division);

  for (let i = 0; i < division.length; i++) {
    let image = division[i].querySelector("img");
    division[i].onclick = function () {
      if (nb < 2) {
        console.log(memo_pokemons);
        tableau_lance.push(memo_pokemons[i][0]);
        nb++;
        image.src = memo_pokemons[i][1];
        image.style.height = "80px";
        image.style.width = "auto";
      }
      if (nb == 2) {
        return gagne(tableau_lance);
      }
    };
  }
}

function gagne(tableau_lance) {
  console.log(tableau_lance[0], tableau_lance[1]);
  if (tableau_lance[0] == tableau_lance[1]) {
    console.log("OK");
    const grille = document.querySelector("#grille_de_jeu");
    let division = grille.querySelectorAll("div");
    let img_pokeball = document.createElement("img");
    img_pokeball.src = "./assets/pokeball.webp";

    grille.appendChild(img_pokeball);
  }
}

creer_buissons(12);
const memo_pokemons = disposer_pokemons(12, pokemon);

clic(memo_pokemons);
console.log(pokemon);

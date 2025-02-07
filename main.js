import pokemon from "./data/pokemon_4x6.js"; //On importe le tableau des pokémons (leur nom et le lien de l'image)

function jeu() {
  //Fonction principale qui vient lancer les "sous-fonctions"
  creer_buissons(12); //Fonction qui crée l'affichage des buissons
  const memo_pokemons = disposer_pokemons(12, pokemon); //On crée l'emplacement des pokémons
  clic(memo_pokemons); //On appelle la fonction qui gère les actions au clic
}

function creer_buissons(nb_memos) {
  //Fonction qui crée tous les buissons
  for (let i = 0; i < nb_memos; i++) {
    creer_element("./assets/bush.webp", i); //Appel de la fonction pour créer un élément avec le lien et l'indice
  }
}

function creer_element(image_source, id) {
  //Fonction qui crée les éléments
  const grille = document.querySelector("#grille_de_jeu"); //On récupère la grille de jeu (là où nous devons afficher les éléments)

  let element = document.createElement("div"); //Création de la div
  element.classList.add("box"); //Ajout de la classe box
  element.id = id.toString(); //Conversion de l'id en chaine de caractere et association

  let image = document.createElement("img"); //Création de l'image
  image.src = image_source; //On récupère la source de l'image
  image.classList.add("bush"); //On ajoute la classe bush

  element.appendChild(image); //On ajoute l'image dans la div
  grille.appendChild(element); //On ajoute la div dans la grille
}

function disposer_pokemons(nb_memos, pokemon) {
  //Fonction qui va "disposer" les pokémons
  let placement_grille = [];

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
  let grille = document.querySelector("#grille_de_jeu");
  let division = grille.querySelectorAll("div");

  for (let i = 0; i < division.length; i++) {
    console.log(i);
    let image = division[i].querySelector("img");
    division[i].onclick = function () {
      console.log(nb);
      if (nb < 2) {
        tableau_lance.push(i);
        nb++;
        image.src = memo_pokemons[i][1];
        image.classList.add("pokemon");
        image.classList.remove("bush");
      }
      if (nb == 2) {
        nb += 1;
        return gagne(tableau_lance, memo_pokemons);
      }
    };
  }
}

function gagne(tableau_lance, memo_pokemons) {
  let compteur = document.getElementById("stat_nombre_de_coups");
  let nb_coups = parseInt(compteur.textContent);
  compteur.textContent = nb_coups + 1;

  if (
    memo_pokemons[tableau_lance[0]][0] == memo_pokemons[tableau_lance[1]][0]
  ) {
    let div1 = document.getElementById(tableau_lance[0]);
    let div2 = document.getElementById(tableau_lance[1]);

    let img_pokeball1 = document.createElement("img");
    let img_pokeball2 = document.createElement("img");

    img_pokeball1.src = "./assets/pokeball.png";
    img_pokeball2.src = "./assets/pokeball.png";

    img_pokeball1.classList.add("pokeball");
    img_pokeball2.classList.add("pokeball");

    div1.appendChild(img_pokeball1);
    div2.appendChild(img_pokeball2);

    let barre = document.querySelector(".liste_pokemons_captures");
    let image_pokemon_capture = document.createElement("img");

    image_pokemon_capture.src = memo_pokemons[tableau_lance[0]][1];
    barre.appendChild(image_pokemon_capture);
  } else {
    setTimeout(() => {
      let division1 = document.getElementById(tableau_lance[0]);
      let division2 = document.getElementById(tableau_lance[1]);

      let image1 = division1.querySelector("img");
      let image2 = division2.querySelector("img");
      image1.src = "./assets/bush.webp";
      image2.src = "./assets/bush.webp";

      image1.classList.add("bush");
      image1.classList.remove("pokemon");

      image2.classList.add("bush");
      image2.classList.remove("pokemon");
    }, 1000);
  }
  clic(memo_pokemons);
}

jeu();

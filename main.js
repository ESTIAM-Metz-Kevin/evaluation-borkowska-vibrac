import data_pokemons from "./data/pokemon_4x6.js"; //On importe le tableau des pokémons (leur nom et le lien de l'image)

const INIT_NB_MEMO = 4; //Constante initiale

function jeu(nb_buissons) {
  //Fonction principale qui vient lancer les "sous-fonctions"

  let fini = 0; //Variable qui fixe la fin du jeu
  creer_buissons(nb_buissons); //Fonction qui crée l'affichage des buissons
  const memo_pokemons = disposer_pokemons(nb_buissons, data_pokemons); //On crée l'emplacement des pokémons
  clic(memo_pokemons, fini); //On appelle la fonction qui gère les actions au clic
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
  let placement_grille = []; //Tableau qui va stocker les pokémons

  while (placement_grille.length < nb_memos) {
    //Tant que le tableau n'est pas complet
    let nombre_aleatoire = Math.floor(Math.random() * nb_memos); //Nombre aléatoire
    let nb_occurence = 0; //Nombre d'occurence du pokémon (pour éviter les doublons de paires)
    for (let i = 0; i < placement_grille.length; i++) {
      console.log(pokemon);
      if (pokemon[nombre_aleatoire]["name"] == placement_grille[i][0]) {
        //Si le pokémon est déjà dans la liste on ne l'ajoute pas
        nb_occurence += 1;
      }
    }
    if (nb_occurence == 0) {
      //S'il n'est pas dans la liste
      placement_grille.push([
        pokemon[nombre_aleatoire]["name"],
        pokemon[nombre_aleatoire]["sprite"],
      ]); //On ajoute le premier pokemon de la paire
      placement_grille.push([
        pokemon[nombre_aleatoire]["name"],
        pokemon[nombre_aleatoire]["sprite"],
      ]); //Puis le second
      nb_occurence += 1;
    }
  }

  for (let i = 0; i < 20; i++) {
    //Rendre la liste aléatoire
    let indice_aleatoire_1 = Math.floor(Math.random() * nb_memos); //2 nombres aléatoires
    let indice_aleatoire_2 = Math.floor(Math.random() * nb_memos);
    let valeur_temporaire = placement_grille[indice_aleatoire_1][0]; //Valeur de nom tampon
    let lien_temporaire = placement_grille[indice_aleatoire_1][1]; //Valeur de lien tampon

    placement_grille[indice_aleatoire_1][0] =
        placement_grille[indice_aleatoire_2][0];
    placement_grille[indice_aleatoire_1][1] =
        placement_grille[indice_aleatoire_2][1];

    placement_grille[indice_aleatoire_2][0] = valeur_temporaire;
    placement_grille[indice_aleatoire_2][1] = lien_temporaire;
  } //Changement des valeurs (mélange)

  console.log(placement_grille); //Affichage dans la console pour tester
  return placement_grille; //On retourne le bon affichage
}

function clic(memo_pokemons, fini) {
  //Fonction lors du clic
  let nb = 0; //Nombre de clics
  let tableau_lance = []; //Tableau pour stocker les pokémons cliqués
  let grille = document.querySelector("#grille_de_jeu"); //Sélecion de la grille
  let division = grille.querySelectorAll("div"); //Sélection des div

  for (let i = 0; i < division.length; i++) {
    let image = division[i].querySelector("img"); //Sélection de l'image
    division[i].onclick = function () {
      //Fonction en cas de clic
      if (nb < 2) {
        //Max de 2 pokémons sélectionnés
        tableau_lance.push(i); //On ajoute au tableau l'indice de ceux sélectionnés
        nb++; //On augmente la variable
        image.src = memo_pokemons[i][1]; //Source de l'image
        image.classList.add("pokemon"); //On ajoute la classe pokemon
        image.classList.add("animate__animated", "animate__zoomIn");
        image.classList.remove("bush"); //On retire la classe bush
      }
      if (nb == 2) {
        //Quand 2 sont sélectionnés
        nb += 1; //On augmente de nouveau pour ne pas rerentrer dans le if
        setTimeout(() => {
          fini = gagne(tableau_lance, memo_pokemons, fini); //On appelle une fonction pour voir si on a gagné ou nn
        }, 1000); //Délais
      }
    };
  }
}

function gagne(tableau_lance, memo_pokemons, fini) {
  let compteur = document.getElementById("stat_nombre_de_coups");
  let nb_coups = parseInt(compteur.textContent);
  compteur.textContent = nb_coups + 1;

  // Récupération du record depuis le localStorage (ou 0 s'il n'existe pas encore)
  let record = localStorage.getItem("record");
  record = record ? parseInt(record) : Infinity; // Par défaut, on considère un record très élevé

  // Mise à jour du record si nécessaire
  if (nb_coups < record) {
    localStorage.setItem("record", nb_coups);
    record = nb_coups;

    // Affichage du record
    let affiche_record = document.getElementById("stat_record");
    affiche_record.textContent = record;
  }

  if (
      memo_pokemons[tableau_lance[0]][0] == memo_pokemons[tableau_lance[1]][0] //Si les 2 noms sont les mêmes -> bon mémo
  ) {
    fini += 2;
    let div1 = document.getElementById(tableau_lance[0]); //On récupère l'id
    let div2 = document.getElementById(tableau_lance[1]);

    let img_pokeball1 = document.createElement("img"); //On crée l'image des pokeballs
    let img_pokeball2 = document.createElement("img");

    img_pokeball1.src = "./assets/pokeball.png"; //On récupère la source
    img_pokeball2.src = "./assets/pokeball.png";

    img_pokeball1.classList.add("pokeball"); //On ajoute la classe pokeball
    img_pokeball2.classList.add("pokeball");

    img_pokeball1.classList.add("animate__animated", "animate__fadeIn");
    img_pokeball2.classList.add("animate__animated", "animate__fadeIn");

    div1.appendChild(img_pokeball1); //On affiche
    div2.appendChild(img_pokeball2);

    let barre = document.querySelector(".liste_pokemons_captures"); //On récupère la barre des pokemons capturés
    let image_pokemon_capture = document.createElement("img"); //On crée une image
    image_pokemon_capture.classList.add(
        "animate__animated",
        "animate__bounceInRight"
    );

    image_pokemon_capture.src = memo_pokemons[tableau_lance[0]][1]; //On récupère la source de celui capturé
    barre.appendChild(image_pokemon_capture); //On affiche celui capturé
  } else {
    //Si perdu
    //Plus besoin de délais car il est dans la fonction clic
    let division1 = document.getElementById(tableau_lance[0]); //On récupère les divisions
    let division2 = document.getElementById(tableau_lance[1]);

    let image1 = division1.querySelector("img"); //On sélectionne les images
    let image2 = division2.querySelector("img");
    image1.src = "./assets/bush.webp"; //On change la source
    image2.src = "./assets/bush.webp";

    image1.classList.add("bush"); //On ajoute la classe buisson
    image1.classList.remove("pokemon"); //Et on retire la classe pokemon

    image2.classList.add("bush");
    image2.classList.remove("pokemon");
  }
  if (fini == memo_pokemons.length) {
    return fin();
  } else {
    clic(memo_pokemons, fini); //On rappelle la fonction clic
  }
}

function fin() {
  console.log("fin");
  let block_rejouer_element = document.querySelector("#rejouer");
  block_rejouer_element.style.display = "flex";

  let slider_element = document.querySelector("#nombre_de_pokemons");
  slider_element.min = 4;
  slider_element.max = 12;
  slider_element.step = 4;
  slider_element.value = INIT_NB_MEMO;

  /* let nombrePokemons = block_rejouer_element.textContent;
  block_rejouer_element.textContent = slider_element.value;
*/
  let bouton_rejouer = block_rejouer_element.querySelector("button");

  bouton_rejouer.addEventListener("click", function () {
    block_rejouer_element.style.display = "none";
    let remise_a_zero = document.querySelectorAll(".box");
    console.log(remise_a_zero);
    for (let i = 0; i < remise_a_zero.length; i++) {
      remise_a_zero[i].remove();
    }
    jeu(slider_element.value);
  });
}

jeu(INIT_NB_MEMO); //Appel de la fonction principale
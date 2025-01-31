import pokemon from "./data/pokemon_4x3.js";
function cree_buisson(nb_buisson) {
  const grille = document.querySelector("#grille_de_jeu");
  for (let i = 0; i < nb_buisson; i++) {
    let buisson = document.createElement("div");
    // const select_buisson = grille.querySelector(buisson);
    let image = document.createElement("img");
    image.src = "./assets/bush.webp";
    image.setAttribute("class","bush");
    image.setAttribute("class","bush:hover");
    buisson.appendChild(image);
    grille.appendChild(buisson);
  }
}
cree_buisson(12);
console.log(pokemon);

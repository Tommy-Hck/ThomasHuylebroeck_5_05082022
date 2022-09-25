//création de variables pour récupérer l'id de ma page
let url = new URL(window.location.href);
let id = url.searchParams.get("id");
// redirection de la page si pas de paramètre
if (id == null) {

  alert("Pas d'appel de product.html");
  window.location.href = "http://www.disney.fr";
}
console.log(`mon id = ${id}`);

//récupérer l'id du produit
// fetch()
async function getProductById(pId) {
  // pId parce qu'on récupère les paramètres de l'Id.
  return await fetch(`http://localhost:3000/api/products/${pId}`)
    .then((response) => response.json())
    .then((data) => { return data });
}

async function main() {
  let productById = await getProductById(id);
  console.log(productById);
  sofaContent(productById);
}
// on appelle la fonction main sinon elle est inactive.
main();

//création d'une fonction pour afficher les éléments du produit
//pProductLine contient la valeur de productById
function sofaContent(pProductLine) {
  let sofaItemImg = document.querySelector(".item__img");
  let sofaImg = document.createElement("img");
  sofaImg.src = pProductLine.imageUrl;
  sofaImg.alt = pProductLine.altTxt;
  sofaItemImg.appendChild(sofaImg);
  let sofaName = document.createElement("h1");
  sofaName.textContent = pProductLine.name;

  let sofaPrice = document.getElementById("price");
  sofaPrice.textContent = pProductLine.price;

  let sofaDescription = document.getElementById("description");
  sofaDescription.textContent = pProductLine.description;

  //création d'un élément option avec une boucle pour récupérer les couleurs.
  let sofaColorSelection = document.querySelector("#colors");
  for (let color of pProductLine.colors) {
    let colorOption = document.createElement("option");
    colorOption.value = color;
    colorOption.textContent = color;
    sofaColorSelection.appendChild(colorOption);
  }

  const addToCart = document.querySelector("#addToCart");
  addToCart.addEventListener('click', (ev) => {
    const colorClick = document.querySelector("#colors");
    if (colorClick.value == "") {
      alert("no color selected");
      return;
    }
    if (quantity.value < 1 || quantity.value > 100) {
      alert("veuillez entrer une quantité correcte");
      alert(quantity.value);
      return;
    }
    addToBasket(id, colorClick.value, quantity.value);
  })
  const quantity = document.querySelector("#quantity");
  quantity.addEventListener('change', (ev) => {
    if (quantity.value < 1 || quantity.value > 100) {
      alert("veuillez entrer une quantité entre 1 et 100");
      alert(quantity.value);
      return;

    }
  })
}


//fonction pour sauvegarder mon produit dans le localstorage. JSON.stringify pour transformer mes données en Json, parse pour les remettre en JS
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart)); //stringify transforme la chaine de caracteres javascript en json
  //setitem du storage permet d'ajouter la clé et la valeur au local storage 
}

function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return []; //retourne un tableau vide puisque le panier est vide
  } else {
    return JSON.parse(cart); //parse transforme la chaine de caracteres json en javascript
  }
}

function addToBasket(idProduct, pColor, pQuantity) { //creation d'une fonction pour ajouter au panier avec les paramètres d'id du produit, de couleur et de quantité
  let cart = getCart(); //variable cart avec un get pour aller chercher les éléments dans le localstorage
  let foundProduct = cart.find(p => idProduct == p.id && pColor == p.color); //variable foundproduct avec un find pour aller chercher si les éléments existent. ici l'id du produit et sa couleur doivent obligatoirement êtres présents
  if (foundProduct != undefined) { //
    foundProduct.quantity = parseInt(pQuantity) + parseInt(foundProduct.quantity); //parseint renvoie l'entier de l'argument entre parenthèses. Ici on ajoute la valeur trouvé par parse sur pQuantity et fP.q pour ajouter la quantité au panier sans ajouter plusieurs fois le même article séparément
  } else { //sinon, on crée l'article ou id aura le paramètre idProduct, color aura le p pColor et quantity pQuantity
    let product = {
      id: idProduct,
      color: pColor,
      quantity: pQuantity,
    }
    cart.push(product); //ensuite on push pour le panier avec le produit au localstorage
  }
  saveCart(cart); //saveCart pour enregistrer
}





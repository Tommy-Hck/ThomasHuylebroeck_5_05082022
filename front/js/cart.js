//  ----------------------Création de fonctions asynchrones pour récupérer les éléments du panier pour la première et du LocalHost pour la deuxème ----------------------

async function getCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    for (let content of cart) {
        console.log(content);
        let productByFetch = await getProductById(content.id);
        console.log(productByFetch);
        cartContainer(content, productByFetch);
        // removeFromBasket(content);
    }
}

async function getProductById(pId) {
    // pId parce qu'on récupère les paramètres de l'Id.
    return await fetch(`http://localhost:3000/api/products/${pId}`)
        .then((response) => response.json())
        .then((data) => { return data });
}

//                                                   ---------------------- FIN DES FONCTIONS FETCH ----------------------



//                                                      ----------------------APPEL DES FONCTIONS ----------------------

getCart();

//fonction pour sauvegarder mon produit dans le localstorage. JSON.stringify pour transformer mes données en Json, parse pour les remettre en JS
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart)); //stringify transforme la chaine de caracteres javascript en json
    //setitem du storage permet d'ajouter la clé et la valeur au local storage 
  }


// ---------------------- création de la fonction pour implémenter mon html avec les éléments du LS (pCartContent) et du LH (pFetchContent) ----------------------


function cartContainer(pCartContent, pFetchContent) {

    let cartArticle = document.createElement("article");
    cartArticle.className = "cart__item";
    cartArticle.dataset.id = pCartContent.id;
    cartArticle.dataset.color = pCartContent.color;
    document.querySelector("#cart__items").appendChild(cartArticle);


    let cartImage = document.createElement("div");
    cartImage.className = "cart__item__img";
    let cartImage = document.createElement("img");
    cartImage.src = pFetchContent.imageUrl;
    cartImage.alt = pFetchContent.altTxt;
    cartImage.appendChild(cartImage);
    cartArticle.appendChild(cartImage);


    let cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";
    cartArticle.appendChild(cartItemContent);


    let itemDescription = document.createElement("div");
    itemDescription.className = "cart__item__content__description";
    let itemName = document.createElement("h2");
    itemName.textContent = pFetchContent.name;
    itemDescription.appendChild(itemName);

    let itemColor = document.createElement("p");
    itemColor.textContent = pCartContent.color;
    itemDescription.appendChild(itemColor);

    let itemPrice = document.createElement("p");
    itemPrice.textContent = pFetchContent.price + " €";
    itemDescription.appendChild(itemPrice);
    cartItemContent.appendChild(itemDescription);


    let itemSettings = document.createElement("div");
    itemSettings.className = "cart__item__content__settings";
    cartItemContent.appendChild(itemSettings);


    let itemSettingsQty = document.createElement("div");
    itemSettingsQty.className = "cart__item__content__settings__quantity";
    let quantity = document.createElement("p");
    quantity.textContent = "Qté : ";
    itemSettingsQty.appendChild(quantity);
    let changeQty = document.createElement("input");
    changeQty.className = "itemQuantity";
    changeQty.name = "itemQuantity";
    changeQty.min = "1";
    changeQty.max = "100";
    changeQty.setAttribute("type", "number");
    changeQty.setAttribute("value", pCartContent.quantity);
    itemSettingsQty.appendChild(changeQty);
    itemSettings.appendChild(itemSettingsQty);

    // changeQty.addEventListener('click', (ev) => {
    //     ev.preventDefault();
    //     const article = ev.target.closest('article');
    //     let qty = ev.target.value;
    //     alert(qty);
    //     let articleId = article.getAttribute('data-id');
    //     alert(articleId);
    //     let articleColor = article.getAttribute('data-color');
    //     alert(articleColor);

    //     let cart = JSON.parse(localStorage.getItem('cart'));
    //     let foundCart = cart.findIndex(changeQty);
    //     foundCart.quantity = qty;
    //     cart.splice(article);
    //     saveCart(foundCart);
// findindex et splice
    }//)


    let itemToDelete = document.createElement("div");
    itemToDelete.className = "cart__item__content__settings__delete";
    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.textContent = "Supprimer";
    itemToDelete.appendChild(deleteItem);
    itemSettings.appendChild(itemToDelete);

    deleteItem.addEventListener('click', (ev) => {
        ev.preventDefault();
        const elementToDelete = deleteItem.closest('article');
        let articleId = elementToDelete.getAttribute('data-id');
        alert(articleId);
        let articleColor = elementToDelete.getAttribute('data-color');
        alert(articleColor);
        elementToDelete.remove();

        let cart = JSON.parse(localStorage.getItem('cart'));
        let filteredCart = cart.filter(p => !(p.id == articleId && p.color == articleColor));
        saveCart(filteredCart);
    })
//}
//                                             ---------------------- Fin de la fonction  ----------------------



//                                  ----------------------Création de la fonction de calcul des totaux----------------------

//     function totalProducts(){ 
//     total = document.querySelector("#totalQuantity");
//     let cart =getCart();
//     let total = 0;
//     for (let product of cart) {
//         total += product.length;
//         return total;
//     }
// }


// function getTotal() {
//     let cart = getCart();
//     let total = document.querySelector

//     total = 0;
//     for (let product of cart) {
//         total += product.quantity * product.price;
//     }
//     return total;
// }



//                                          ----------------------Fin de la fonction de suppression----------------------



//                                           ----------------------Création de la fonction des Regex----------------------



function testRegexFirstName(pElement) {

    let firstName = document.querySelector("#firstname");
    let regexFirstName = new RegExp(/^[a-zA-Z-éèà]/);
    let firstNameTest = regexFirstName.test(firstName.value);
    alert('veuillez utiliser un prénom valide');
    return firstNameTest;
    
}
// CREER ICI LES MESSAGES D'ERREUR
// const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
// firstNameErrorMsg = 

function testRegexLastName(pElement) {

    let lastName = document.querySelector("#lastName");
    let regexLastName = new RegExp(/^[a-zA-Z-éèà]/);
    let regexLastNameTest = regexLastName.test(lastName.value);
    return regexLastNameTest;
}


function testRegexAdress(pElement) {

    let adress = document.querySelector("#adress");
    let regexAdress = new RegExp(/^[0-9]+[a-zA-Z-éèà]/)
    let regexAdressTest = regexAdress.test(adress.value);
    return regexAdressTest;
}

function testRegexAdress(pElement) {

    let city = document.querySelector("#city");
    let regexCity = new RegExp(/^[a-zA-Z-éèà]/);
    let regexCityTest = regexCity.test(city.value);
    return regexCityTest;
}

function testRegexEmail(pElement) {

    let email = document.querySelector("#email");
    let regexEmail = new RegExp(/^[a-zA-Z-éèà]/);
    let regexEmailTest = regexEmail.test(email.value);
    return regexEmailTest;
}

//                                          ----------------------Fin de la fonction des Regex----------------------




// créer le bouton pour modifier la quantité
// calcul des totaux
// post





//   fonction utilisant la methode "post" pour envoyer le formulaire vers le LS

// function postForm() {

    // constante pour selectionner mon bouton puis j'écoute au click et je récupère les données
    // const orderBtn = document.querySelector("#order");
    // orderBtn.addEventListener('click', (ev) => {

    //     ev.preventDefault();

    //     let firstNameFielfunction getTotal() {
//     let cart = getCart();
//     let total = document.querySelector

//     total = 0;
//     for (let product of cart) {
//         total += product.quantity * product.price;
//     }
//     return total;
// }d = document.querySelector("#firstname");
    //     let lastNameField = document.querySelector("#lastName");
    //     let adressField = document.querySelector("#adress");
    //     let cityField = document.querySelector("#city");
    //     let emailField = document.querySelector("#email");
    // }
    // )}


// function getTotalprice() {
//   let cart = getCart();
//   let total = 0;
//   for (let product of cart) {
//     total += product.quantity * product.price;
//   }
//   return total;
// }


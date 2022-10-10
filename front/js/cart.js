async function getCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    for (let content of cart) {
        console.log(content);
        let productByFetch = await getProductById(content.id);
        console.log(productByFetch);
        cartContainer(content, productByFetch);
    }
    //    const element = document.getElementById("myElement");
    //    const closest = element.closest('cart');
    //getTotal();
    //setPattern();
}

async function getProductById(pId) {
    // pId parce qu'on récupère les paramètres de l'Id.
    return await fetch(`http://localhost:3000/api/products/${pId}`)
        .then((response) => response.json())
        .then((data) => { return data });
}

getCart();


//  création de la fonction pour implémenter mon html avec les éléments du LS (pCartContent) et du LH (pFetchContent)
function cartContainer(pCartContent, pFetchContent) {

    let cartArticle = document.createElement("article");
    cartArticle.className = "cart__item";
    cartArticle.dataset.id = pCartContent.id;
    cartArticle.dataset.color = pCartContent.color;
    document.querySelector("#cart__items").appendChild(cartArticle);


    let cartItemImg = document.createElement("div");
    cartItemImg.className = "cart__item__img";
    let cartImg = document.createElement("img");
    cartImg.src = pFetchContent.imageUrl;
    cartImg.alt = pFetchContent.altTxt;
    cartArticle.appendChild(cartItemImg);


    let cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";
    cartItemContent.appendChild(cartArticle);


    let cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.className = "cart__item__content__description";
    let itemName = document.createElement("h2");
    itemName.textContent = pFetchContent.name;
    let itemColor = document.createElement("p");
    itemColor.textContent = pCartContent.color;
    let itemPrice = document.createElement("p");
    itemPrice.textContent = pFetchContent.price;
    cartItemContent.appendChild(cartItemContentDescription);


    let cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.className = "cart__item__content__settings";
    cartItemContent.appendChild(cartItemContentSettings);


    let cartItemContentSettingsQty = document.createElement("div");
    cartItemContentSettingsQty.className = "cart__item__content__settings__quantity";
    let quantity = document.createElement("p");
    quantity.value = pCartContent.quantity;
    let changeQty = document.createElement("input");
    changeQty.className = "itemQuantity";
    changeQty.value = pCartContent.quantity;
    cartItemContentSettings.appendChild(cartItemContentSettingsQty);

    let cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.textContent = "supprimer";
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
}

// fonction pour supprimer un produit
    function deleteProduct () {
        let deleteBtn = document.querySelector(".deleteItem");
        deleteBtn.addEventListener('click', (ev) =>{
            // preventDefault évite à la page de rafraichir après le click
            ev.preventDefault();
            const deleteId = cart.id;
            const deleteColor = cart.color;

            cart = cart.filter (el => cartContent.id !== deleteId || cartContent.color !== deleteColor);
            localStorage.setItem("cart", JSON.stringify(produitLocalStorage));

            //Alert produit supprimé et rafrachir
            alert("Ce produit a été supprimé du panier");
            location.reload();
        }
    }

    function testRegexFirstName(pElement) {

    let firstName = document.querySelector("#firstname");
    let regexFirstName = new RegExp(/^[a-zA-Z-éèà]/);
    let firstNameTest = regexFirstName.test(firstName.value);
    return firstNameTest;
}
// CREER ICI LES MESSAGES D'ERREUR
// const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
// firstNameErrorMsg

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






//   fonction utilisant la methode "post" pour envoyer le formulaire vers le LS

function postForm() {

    // constante pour selectionner mon bouton puis j'écoute au click et je récupère les données
    const orderBtn = document.querySelector("#order");
    orderBtn.addEventListener('click', (ev) => {

        ev.preventDefault();

        let firstNameField = document.querySelector("#firstname");
        let lastNameField = document.querySelector("#lastName");
        let adressField = document.querySelector("#adress");
        let cityField = document.querySelector("#city");
        let emailField = document.querySelector("#email");
    }
    }


    // FONCTION BOUTON DELETE
    // MESSAGES D'ERREUR
    // FONTCION POST

// function removeFromBasket(product, color) {
//   let cart = getCart();
//   cart = cart.filter(p => p.id != product.id && p.color != color)
//   saveCart(cart);
// }

// function getTotalprice() {
//   let cart = getCart();
//   let total = 0;
//   for (let product of cart) {
//     total += product.quantity * product.price;
//   }
//   return total;
// }

   // let totalProducts = document.querySelector("#totalQuantity");
    // totalProducts = pCart.

    // function getTotal() {
    //     let cart = getCart();
    //     let total = 0;
    //     for (let product of cart) {
    //         total += product.quantity * product.price;
    //     }
    //     return total;
    // }
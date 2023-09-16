//  ----------------------Création de fonctions asynchrones pour récupérer les éléments du panier pour la première et du LocalHost pour la deuxème ----------------------

async function getCart(fetchDom) {

    let cart = JSON.parse(localStorage.getItem('cart'));

    let totalPrice = 0; //init du total des prix
    let totalQuantity = 0; //init du total des quantités

    //#SL attention, si le localstorage est vide, ça plante
    // car on essaie d'itérer cart, qui est vide
    // donc :
    if (cart !== null) {
        for (let content of cart) {
            let productByFetch = await getProductById(content.id);

            // Ajouter le prix du produit multiplié par la quantité au total
            totalPrice += productByFetch.price * content.quantity;
            totalQuantity = content.quantity + totalQuantity;

            // #SL : ici, on conditionne le rendu des éléments html avec ce paramètre
            // s'il est true alors on fait le rendu des éléments
            if (fetchDom) {
                cartContainer(content, productByFetch);
            }
        }
    }

    // Afficher le prix total dans l'élément du DOM"
    const totalPriceElement = document.querySelector("#totalPrice");
    totalPriceElement.textContent = totalPrice;

    const totalQuantityElement = document.querySelector("#totalQuantity");
    totalQuantityElement.textContent = totalQuantity;
}

async function getProductById(pId) {
    // pId parce qu'on récupère les paramètres de l'Id.
    return await fetch(`http://localhost:3000/api/products/${pId}`)
        .then((response) => response.json())
        .then((data) => { return data });
}

//                                                   ---------------------- FIN DES FONCTIONS FETCH ----------------------



//                                                      ----------------------APPEL DES FONCTIONS ----------------------

getCart(true);



//fonction pour sauvegarder mon produit dans le localstorage. JSON.stringify pour transformer mes données en Json, parse pour les remettre en JS

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart)); //stringify transforme la chaine de caracteres javascript en json
    // newQuantity = cart.quantity; // mettre à jour le paramètre "quantity" dans cart
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
    let cartPicture = document.createElement("img");
    cartPicture.src = pFetchContent.imageUrl;
    cartPicture.alt = pFetchContent.altTxt;
    cartImage.appendChild(cartPicture);
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

    function updateCartInLocalStorage() {
        let cart = JSON.parse(localStorage.getItem('cart'));

        // Parcourir le panier et mettre à jour la quantité du produit modifié
        for (let i = 0; i < cart.length; i++) { // "i" variable qui suit l'indice de la boucle.
            if (cart[i].id === pCartContent.id && cart[i].color === pCartContent.color) { // À chaque itération de la boucle, vérifie si ID et couleur de l'élément du panier (cart[i]) correspondent à ID et couleur de pCartContent.
                cart[i].quantity = pCartContent.quantity; // mettre à jour le paramètre "quantity" dans pCartContent
            }
        }
        // Mettre à jour le Local Storage avec le panier modifié
        saveCart(cart);
        window.location.href = "cart.html";

    }

    changeQty.addEventListener("change", function (event) {
        const newQuantity = parseInt(event.target.value); // comme pour stringify/Json, parseInt permet de convertir la valeur en nombre entier. Sans parseInt, 10+5=105. Avec, 10+5=15.
        pCartContent.quantity = newQuantity; // Mettre à jour la quantité dans pCartContent

        // Mettre à jour le Local Storage avec la nouvelle quantité
        updateCartInLocalStorage();

        // Mettre à jour l'affichage pour renvoyer la nouvelle quantité
        let itemQuantity = document.querySelector("#itemQuantity");
        itemQuantity.textContent = newQuantity;
    });


    function removeFromCart(itemToRemove) {
        let cart = JSON.parse(localStorage.getItem('cart'));

        // Trouver l'indice de l'élément à supprimer dans le panier
        const index = cart.findIndex(item => item.id === itemToRemove.id && item.color === itemToRemove.color);

        if (index !== -1) { // vérifie si findIndex à bien trouvé un élément à supprimer. si -1, pas d'élément donc pas de suppression
            cart.splice(index, 1); // Supprimer l'élément du panier
            saveCart(cart);
            window.location.href = "cart.html";
        }
    }

    let settingsDelete = document.createElement("div");
    settingsDelete.className = "cart__item__content__settings__delete";
    itemSettings.appendChild(settingsDelete);
    let deleteButton = document.createElement("p");
    deleteButton.className = "deleteItem";
    deleteButton.textContent = "Supprimer";
    settingsDelete.appendChild(deleteButton);
    // Ecouter l'event pour gérer le clic sur le bouton Supprimer
    deleteButton.addEventListener("click", function () {
        // Appeler une fonction pour supprimer l'élément du panier
        removeFromCart(pCartContent);
        // Supprimer l'élément du panier de l'interface utilisateur
        cartArticle.remove();
    });
};


//                                                                    ---------CONTROLES DE SURFACE--------


const firstNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
const lastNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
const addressRegex = /^[A-Za-z0-9\s-#,]+$/;
const cityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+.[a-zA-Z]{2,4}$/;

// zoneRegex
// qsZone = '#lastname'
// qsAlert = '#lastNameErrorMsg'
// zoneName 


function genericValidation(zoneRegex, qsZone, qsAlert, zoneName, wanted) {

    // Validation de la zone
    const zone = document.querySelector(qsZone);
    const zoneValue = zone.value;

    const alert = document.querySelector(qsAlert);

    // #todo tester la longueur avec le regex

    if (zoneValue.trim() == '') {
        alert.textContent = `Veuillez rentrer une valeur dans le champ ${zoneName}`;
        return false;
    }


    if (zoneRegex.test(zoneValue)) {
        alert.textContent = "";
        return true;
        // La zone est valide
    } else {
        alert.textContent = `Veuillez rentrer un champ ${zoneName} valide (${wanted})`;

        return false;
    }
}

function btnOrder() {
    // récuperer le bouton de commande
    let orderButtonEl = document.querySelector("#order");
    // evenement bouton

    orderButtonEl.addEventListener("click", function (ev) {
        // au click
        ev.preventDefault();
        if (formValidation.firstName && formValidation.lastName && formValidation.address && formValidation.city && formValidation.email) {
            // alert("Formulaire ok : maintenant poster le panier au backend");
            sendOrder();
        }
        else {
            alert("Merci de compléter le formulaire correctement");
        }
    });
}


// fonction de mise en place des contrôles de surface
function fieldValidation() {

    const firstName = document.querySelector('#firstName');
    firstName.addEventListener("input", function (event) {
        formValidation.firstName = genericValidation(firstNameRegex, '#firstName', '#firstNameErrorMsg', 'prénom', 'lettres uniquement');
        
    });

    const lastName = document.querySelector('#lastName');
    lastName.addEventListener("input", function (event) {
        formValidation.lastName = genericValidation(firstNameRegex, '#lastName', '#lastNameErrorMsg', 'nom', 'lettres uniquement');
        
    });

    const address = document.querySelector('#address');
    address.addEventListener("input", function (event) {
        formValidation.address = genericValidation(addressRegex, '#address', '#addressErrorMsg', 'adresse', 'lettres et chiffres');
        
    });

    const city = document.querySelector('#city');
    city.addEventListener("input", function (event) {
        formValidation.city = genericValidation(cityRegex, '#city', '#cityErrorMsg', 'ville', 'lettres uniquement');
        
    });

    const email = document.querySelector('#email');
    email.addEventListener("input", function (event) {
        formValidation.email = genericValidation(emailRegex, '#email', '#emailErrorMsg', 'email', 'format nom@domaine.extension');
    });




}

const formValidation = {
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    email: false
};


//                                                      ----------------------APPEL DES FONCTIONS ----------------------
// FONCTION PRINCIPALE 
function main() {
    // rendu des éléments
    // getCart(true);

    // ajout des tests de surface sur chacune des zones
    fieldValidation();


    // gestion de l'évènement sur bouton commander
    btnOrder();


}


//Algorithme de constitution de la liste des produits :

// récupérer le local storage OK
// déclarer un tableau vide qui contiendra la liste des "id" OK
// parcourir le local storage avec une boucle (un petit "for of" serait bienvenu) OK
// pour chaque ligne, ajouter l'id au tableau déclaré précédement OK
// maintenant, il ne reste plus qu'à poster l'objet constitué du contact et de la liste des produits OK

function sendOrder() {

    // créer des constantes qui vont récupérer les valeurs de chaque champs de mon formulaire
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const address = document.querySelector('#address').value;
    const city = document.querySelector('#city').value;
    const email = document.querySelector('#email').value;
    // Je récupère les infos de mon localstorage
    let idProductsList = JSON.parse(localStorage.getItem('cart'));

    idProductsList.sort((a, b) => a.id - b.id);
    console.log(idProductsList);
    // Je créer un tableau vide qui contiendra les ID de mes produits
    const sortId = [idProductsList];

    sortId.sort((a,b)=> {
        
        return a - b;
    });
    console.log(idProductsList);

    for (products of idProductsList) {
        productIds.push(products.id); //boucle for of pour ajouter mes id produits  au tableau vide censé les contenir.
    }


    const formData = {

        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        }, products: productIds //

    };


    const url = 'http://localhost:3000/api/products/order'; // constante avec mon url puis fetch des données et méthode post
    fetch(url, {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: JSON.stringify(formData), // convertir mes données en chaîne de caractères
    }).then(resp => resp.json())
        // .then (function(data){
        // })
        .then((data) => {

            location.href = `./confirmation.html?orderId=${data.orderId}`;
            // passer le paramètre
        }).catch(function (error) {

            console.error(`erreur post produit ${error}`);
        
        })
}

main();
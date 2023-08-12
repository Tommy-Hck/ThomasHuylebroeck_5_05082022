//  ----------------------Création de fonctions asynchrones pour récupérer les éléments du panier pour la première et du LocalHost pour la deuxème ----------------------

async function getCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    for (let content of cart) {
        console.log(content);
        let productByFetch = await getProductById(content.id);
        console.log(productByFetch);
        // removeFromBasket(content);

        productByFetch.quantity = content.quantity;

        cartContainer(content, productByFetch);
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

    changeQty.addEventListener("change", function(event) {
        const newQuantity = parseInt(event.target.value); // comme pour stringify/Json, parseInt permet de convertir la valeur en nombre entier. Sans parseInt, 10+5=105. Avec, 10+5=15.
        pCartContent.quantity = newQuantity; // Mettre à jour la quantité dans pCartContent
    
        // Mettre à jour le Local Storage avec la nouvelle quantité
        updateCartInLocalStorage();
    
        // Mettre à jour l'affichage pour renvoyer la nouvelle quantité
        itemQuantity.textContent = newQuantity;
    });    

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
    }

    let settingsDelete = document.createElement("div");
    settingsDelete.className = "cart__item__content__settings__delete";
    itemSettings.appendChild(settingsDelete);
    let deleteButton = document.createElement("p");
    deleteButton.className = "deleteItem";
    deleteButton.textContent = "Supprimer";
    settingsDelete.appendChild(deleteButton);
    // Ecouter l'event pour gérer le clic sur le bouton Supprimer
    deleteButton.addEventListener("click", function() {
    // Appeler une fonction pour supprimer l'élément du panier
    removeFromCart(pCartContent);
    // Supprimer l'élément du panier de l'interface utilisateur
    cartArticle.remove();
});


    function removeFromCart(itemToRemove) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    // Trouver l'indice de l'élément à supprimer dans le panier
    const index = cart.findIndex(item => item.id === itemToRemove.id && item.color === itemToRemove.color);

    if (index !== -1) { // vérifie si findIndex à bien trouvé un élément à supprimer. si -1, pas d'élément donc pas de suppression
        cart.splice(index, 1); // Supprimer l'élément du panier
        saveCart(cart); // Mettre à jour le Local Storage avec le panier modifié
    }
}


}





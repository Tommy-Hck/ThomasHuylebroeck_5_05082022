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

    function getTotal() {
        let cart = getCart();
        let total = 0;
        for (let product of cart) {
            total += product.quantity * product.price;
        }
        return total;
    }

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



function cartContainer(pCartContent, pFetchContent) {

    let cartArticle = document.createElement("article");
    cartArticle.className = "cart__item";
    cartArticle.dataset.id = pCartContent.id;
    cartArticle.dataset.color = pCartContent.color;
    document.querySelector("#cart__items").appendChild(cartArticle);
// j'ai changé pCartContent par pFetchContent puisque je cherche l'élément du localstorage?


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
    // pFetch pour le nom car dans mon LS je n'ai que l'id, la couleur et la quantité du produit
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

    // cartItemContentDescription.appendChild(cartItemContent);
    // itemQtyDiv.appendChild(itemQty);
    // changeQty.appendChild(itemQtyDiv);
    // deleteItemDiv.appendChild(itemQty);
    // itemQty.appendchild(cartArticle)
    // cartItemContent.appendChild(cartArticle);
    // cartDescription.appendChild(cartArticle);
    // document.querySelector("#cart__items").appendChild(cartArticle);


}

 function setPattern() {

    let firstName = document.querySelector("#firstName");
    firstName.setAttribute("pattern", "[a-zA-Z-éèà]");

    let lastName = document.querySelector("#lastName");
    lastName.setAttribute("pattern", "[a-zA-Z-éèà]");

    let adress = document.querySelector("#adress");
    adress.setAttribute("pattern", "[a-zA-Z-éèà]");

    let city = document.querySelector("#city");
    city.setAttribute("pattern", "[a-zA-Z-éèà]");

    let email = document.querySelector("#email");
    email.setAttribute("pattern", "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");

    //créer une condition pour valider les informations de l'utilisateur avec un event (si: checkValidation valide => envoie vers le backend avec post?).
    // faire les regex sans les pattern.
 }


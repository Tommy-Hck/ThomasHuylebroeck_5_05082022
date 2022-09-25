// function removeFromBasket(product, color) {
//   let cart = getCart();
//   cart = cart.filter(p => p.id != product.id && p.color != color)
//   saveCart(cart);
// }

// function getNumberOfproduct() {
//   let cart = getCart();
//   let number = 0;
//   for (let product of cart) {
//     number += product.quantity;
//   }
//   return number;
// }

// function getTotalprice() {
//   let cart = getCart();
//   let total = 0;
//   for (let product of cart) {
//     total += product.quantity * product.price;
//   }
//   return total;
// }


async function getCart() {
   let cart = JSON.parse(localStorage.getItem('cart'));
   console.log(cart);
   for (let content of cart) {
       console.log(content);
       let productByFetch = await getProductById(content.id);
       console.log(productByFetch);
   }
//    const element = document.getElementById("myElement");
//    const closest = element.closest('cart');
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
    cartArticle.href = `./product.html?id=${pCartContent._id}`;
    let cartDescription = document.createElement("div");
    cartDescription.className = "cart__item__img";
    cartDescription.src = pProduit.imageUrl;
    cartDescription.alt = pProduit.altTxt;
    let cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";
    let cartItemContentDescription = document.createElement("div");
    cartItemContentDescription = "cart__item__content__description";
    let itemName = document.createElement("h2");
    itemName.textContent = pCart.name;
    let itemColor = document.createElement("p");
    itemColor = pCart.colors;
    let itemPrice = document.createElement("p");
    itemPrice = pCart.price;
    let itemQty = document.createElement("div");
    itemQty.className = "cart__item__content__settings";
    let itemQtyDiv = document.createElement("div");
    itemQtyDiv.className = "cart__item__content__settings__quantity";
    let quantity = document.createElement("p");
    quantity = pCart.quantity;
    let changeQty = document.createElement("input");
    changeQty.className = itemQuantity;
    let deleteItemDiv = document.createElement("div");
    deleteItemDiv.className = "cart__item__content__settings__delete";
    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";

    cartItemContentDescription.appendChild(cartItemContent);
    itemQtyDiv.appendChild(itemQty);
    changeQty.appendChild(itemQtyDiv);
    deleteItemDiv.appendChild(itemQty);
    itemQty.appendchild(cartArticle)
    cartItemContent.appendChild(cartArticle);
    cartDescription.appendChild(cartArticle);
}

regex controle de surface


    // let totalProducts = document.querySelector("#totalQuantity");
    // totalProducts = pCart.

}

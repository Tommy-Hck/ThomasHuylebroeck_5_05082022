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
    cartArticle.href = `./product.html?id=${pCartContent._id}`;



    let cartImage = document.createElement("img");
    cartImage.src = pFetchContent.imageUrl;
    cartImage.alt = pFetchContent.altTxt;
    let productName = document.createElement ("h2");
    productName.textContent = pFetchContent.name;
    let productColor = document.createElement ("p");
    productColor.textContent = pCartContent.color;
    let productPrice = document.createElement("p");
    productPrice.textContent = pFetchContent.price;
    let productQuantity = document.createElement("p");
    productQuantity.textContent = pCartContent.quantity;

    // let totalProducts = document.querySelector("#totalQuantity");
    // totalProducts = pCart.

}

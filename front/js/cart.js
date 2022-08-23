//récupérer les données serveur (fetch)
async function getProducts() {
    return await fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => { return data });
    //console.log(products);
}

//fonction principale
async function main() {
    let products = await getProducts();
    console.log(products);
    let itemsCard = document.getElementById("items");// = document.querySelector ("#items")
    //parcourir les données serveur (for of) (let product of products permets de séparer chaque ligne de products)
    for (let product of products) {
        console.log(product);
        //créer chaque article par rapport a une ligne des données serveur (createElement appendchild querySelector)
        productContainer(product, itemsContainer);

        console.log(product.name);
    }
}
//appel de la fonction principale
main();

function cartContainer(pCart) {

    let cartArticle = document.createElement("article");
    cartArticle.className = "cart__item";
    cartArticle.href = `./product.html?id=${pCart._id}`;
    cartArticle.
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
    let itemColor = document.createElement(p);
    itemColor = pCart.colors;
    let itemQty = document.createElement("div");
    itemQty.className = "cart__item__content__settings";

    // let productId = document.createElement("a");
    // productId.href = `./product.html?id=${pProduit._id}`;
    // let productPicture = document.createElement("img");
    // productPicture.src = pProduit.imageUrl;
    // productPicture.alt = pProduit.altTxt;
    // let productName = document.createElement("h3");
    // productName.textContent = pProduit.name;
    // let productDescription = document.createElement("p");
    // productDescription.textContent = pProduit.description;
    // productArticle.appendChild(productPicture);
    // productArticle.appendChild(productName);
    // productArticle.appendChild(productDescription);
    // productId.appendChild(productArticle);
    // pItemMain.appendChild(productId);
}

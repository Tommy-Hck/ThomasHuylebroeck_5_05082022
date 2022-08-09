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
        productContainer(product, itemsCard);

        console.log(product.name);
    }
}
//appel de la fonction principale
main();


// création d'une variable itemsCard pour aller chercher l'id items du html afin de créer de nouveaux éléments


// je créé les éléments structurels de ma section
// "La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.". Mozdev
function productContainer(pProduit, pItemMain) {
    let productId = document.createElement("a");
    productId.href = `./product.html?id=${pProduit._id}`;
    let productArticle = document.createElement("article");
    let productPicture = document.createElement("img");
    productPicture.src= pProduit.imageUrl;
    let productName = document.createElement("h3");
    let productDescription = document.createElement("p");
    productArticle.appendChild(productPicture);
    productArticle.appendChild(productName);
    productArticle.appendChild(productDescription);
    productId.appendChild(productArticle);
    pItemMain.appendChild(productId);
}




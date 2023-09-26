//récupérer les données serveur (fetch)
async function getProducts() {  //fonction async. l'expression await interrompt l'exe de la fx et attend la reso de la promise. La fonction reprend ensuite et renvoie la valeur
    return await fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => { return data });
}



//fonction principale
async function main() {
    let products = await getProducts();
    let items = document.getElementById("items");// = document.querySelector ("#items")
    //parcourir les données serveur (for of) (let product of products permets de séparer chaque ligne de products)
    for (let product of products) {
        //créer chaque article par rapport a une ligne des données serveur (createElement appendchild querySelector)
        productContainer(product, items);
    }
}
//appel de la fonction principale
main();


// création d'une variable itemsCard pour aller chercher l'id items du html afin de créer de nouveaux éléments


// je créé les éléments structurels de ma section
// création fonction productContainer pour ajouter mes éléments au html. paramètre(p)Produit pour récupérer l'id des articles
//paramètre(p)ItemMain pour terminer la hierarchie des éléments
function productContainer(pProduit, pItemMain) {
    let productId = document.createElement("a");
    productId.href = `./product.html?id=${pProduit._id}`;
    let productArticle = document.createElement("article");
    let productPicture = document.createElement("img");
    productPicture.src = pProduit.imageUrl;
    productPicture.alt = pProduit.altTxt;
    let productName = document.createElement("h3");
    productName.textContent = pProduit.name;
    let productDescription = document.createElement("p");
    productDescription.textContent = pProduit.description;
    productArticle.appendChild(productPicture);
    productArticle.appendChild(productName);
    productArticle.appendChild(productDescription);
    productId.appendChild(productArticle);
    pItemMain.appendChild(productId);
}




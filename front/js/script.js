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
    //parcourir les données serveur (for of) (let product of products permets de séparer chaque ligne de products)
    for (let product of products) {
        console.log(product);
        //créer chaque article par rapport a une ligne des données serveur (createElement appendchild querySelector)
        console.log(product.name);

    }

}
//appel de la fonction principale
main();

//création des articles
let productSelection = document.getElementsById ("items");
let productArticle = 8;
for (let i = 0; i < data.length; i++){

}
//récupérer les données serveur (fetch)
async function getProducts() {
    return await fetch("http://localhost:3000/api/products")
        .then((response) => response.json());
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
    //appel de la fonction principale
    main();


    // création d'une variable itemsCard pour aller chercher l'id items du html afin de créer de nouveaux éléments
    let itemsCard = document.getElementById ("items");

    // je créé les éléments structurels de ma section
    // "La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.". Mozdev
    product.forEach(getProducts) => {

    let productSection = document.createElement("section");
    let productId = document.createElement("a");
    let productContainer = document.createElement("article");
    let productPicture = document.createElement("img");
    let productName = document.createElement("h3");
    let productDescription = document.createElement("p");
}



//création de variables pour récupérer l'id de ma page
let url = new URL(window.location.href);
let id = url.searchParams.get("id");
console.log(`mon id = ${id}`);

//récupérer l'id du produit
 (fetch) 
 async function getProductById(pId) {
    // pId parce qu'on récupère les paramètres de l'Id.
    return await fetch(`http://localhost:3000/api/products/${pId}`)
        .then((response) => response.json())
        .then((data) => { return data });
}

async function main() {
    let productById = await getProductById(id);
    console.log(productById);
}
// on appelle la fonction main sinon elle est inactive.
main();

//création d'une fonction pour afficher les éléments du produit
function sofaContent (){
   let sofaImg = document.getElementsByClassName("item__img");
   sofaImg.src = pId.imageUrl;
   sofaImg.alt = pId.altTxt;

   let sofaName = document.createElement("h1");
   sofaName.textContent = pId.name;
   
   let sofaPrice = document.getElementById("price");
   sofaPrice.textContent = pId.price;

    let sofaDescription = document.getElementById("description");
    sofaDescription.textContent = pId.description;

    //création d'un élément option avec une boucle pour récupérer les couleurs. Manque l'ajout au panier?
    let sofaColorSelection = document.getElementsByTagName("select");
    sofaColorSelection = document.createElement("option");
    for (i = 0; [i] < data.sofaColorSelection.length; [i]++) {
        
      } 

    const colorClick = document.getElementsByTagName("option");
    colorClick.addEventListener('click', function(){
    });
}
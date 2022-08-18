//création de variables pour récupérer l'id de ma page
let url = new URL(window.location.href);
let id = url.searchParams.get("id");
console.log(`mon id = ${id}`);

//récupérer l'id du produit
 (fetch)
async function getProductById(pId) {
    return await fetch(`http://localhost:3000/api/products/${pId}`)// pId parce qu'on récupère les paramètres de l'Id.
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
   sofaImg.src = pProduit.imageUrl;
   sofaImg.alt = pProduit.altTxt;

    let sofaDescription = document.getElementById("description");
    sofaDescription.textContent = pId.description;

    let sofaColorSelection = document.getElementsByTagName("option");
    sofaColorSelection = document.createElement("option");
    sofaColorSelection.textContent = pId.colors;

    const colorClick = document.getElementsByTagName("option");
    colorClick.addEventListener('click', function(){
        colorClick.textContent = "click effectué!";
    });
}
//Récupération de l'orderId et l'appliquer au DOM
let url = new URL(window.location.href);
let orderId = url.searchParams.get("orderId");

if (orderId === null || isCartEmpty() ) {
    let emptyCart = document.querySelector('.confirmation');
    emptyCart.textContent = "Erreur";
} else {

    const orderNumber = document.querySelector('#orderId');
    orderNumber.textContent = orderId;
    localStorage.clear();
    //
}



function isCartEmpty() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return !cart || cart.length === 0;
}


//Récupération de l'orderId et l'appliquer au DOM
let url = new URL(window.location.href);
let orderId = url.searchParams.get("orderId");

const orderNumber = document.querySelector('#orderId');
orderNumber.textContent = orderId;
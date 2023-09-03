"use strict"

const NAME_CART = "zxcvbnm,./"
const addCartButtons = document.querySelectorAll(".card__add-cart")
const cart = document.getElementById("cart-content")
const openCart = document.getElementById("open-cart")
const clearCart = document.getElementById("clear-cart")
const itemCount = document.getElementById("item-count")

cartItemCount()
showItemCart()
addCartButtons.forEach(button => button.addEventListener("click", event => {
    addToCart(event);
    showItemCart();
    cartItemCount()
}));
openCart.addEventListener("click", () => renderCart(cart))
clearCart.addEventListener("click", () => {
    clearCartData();
    showItemCart();
    cartItemCount();
    renderCart(cart)
})


// Запись данных в браузерное хранилище
function setCartData(cartData) {
    const jsonCartData = JSON.stringify(cartData);// конвертируем js-обьект в json
    localStorage.setItem(NAME_CART, jsonCartData);
}

// Получение данных из хранилища
function getCartData() {
    const cartData = localStorage.getItem(NAME_CART);
    return JSON.parse(cartData) // конвертируем json в js-обьект
}

// Удаление данных из хранилища
function clearCartData() {
    localStorage.removeItem(NAME_CART)

}

// Добавляем товар в корзину
function addToCart(event) {
    const cartData = getCartData() || {}
    const button = event.target;
    button.disabled = true
    const item = button.parentElement;
    const itemId = button.dataset.id;
    const itemTitle = item.querySelector(".card-title").textContent
    const itemPrice = item.querySelector(".card__price").textContent
    const itemIMG = item.parentElement.querySelector("img").src

    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = {
            title: itemTitle,
            price: itemPrice,
            image: itemIMG
        }
        setCartData(cartData)
    }
    button.disabled = false

}

// Отрисовка корзины
function renderCart(cart) {
    const cartData = getCartData()
    let tableContent = ""
    let totalPrice = 0
    if (cartData === null || Object.keys(cartData).length === 0) {
        tableContent = "Корзина пуста"
    } else {
        tableContent += `
    <table class = "cart__table table table-info">
        <thead>
            <tr>
                <th>Название</th>
                <th>Цена</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    `
        for (const productId in cartData) {
            tableContent += `
            <tr>
                <td>${cartData[productId].title}</td>
                <td>${cartData[productId].price}</td>
                <td style="width: 30%;"><img src="${cartData[productId].image}" alt="${cartData[productId].title}" style="width: 80%;"> </td>
                <td><button type="button" class="btn btn-danger" data-id="${productId}" onclick="deleteItemCart(event)">Удалить </button></td>
            </tr>`
            totalPrice += +cartData[productId].price
        }
        tableContent += `</tdody></table>`
        tableContent += `<div> Общая стоимость товаров: ${totalPrice}</div>`
    }

    cart.innerHTML = tableContent

}

// Удаление товара поодному
function deleteItemCart(event) {
    const cartData = getCartData()
    delete cartData[event.target.dataset.id]
    setCartData(cartData);
    showItemCart();
    cartItemCount();
    renderCart(cart)
}

//Количество товаров в корзине 
function cartItemCount() {
    const cartData = getCartData()
    itemCount.textContent = cartData ? Object.keys(cartData).length : 0    
}

//Добавлен ли товар в корзину
function showItemCart() {
    const cartData = getCartData()
    addCartButtons.forEach(button => {
        if (cartData && cartData.hasOwnProperty(button.dataset.id)) {
            button.textContent = "Добавлено в корзину"
            button.className = "btn btn-success card__add-cart"
        }else {
            button.textContent = "В корзину"
            button.className = "btn btn-danger card__add-cart"
        }
    });
    
}
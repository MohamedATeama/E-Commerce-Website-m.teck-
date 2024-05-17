let product_info = document.querySelector(".product-info");
let productId = localStorage.getItem("selectedId");

(function drawPage() {
    let selectedItem = listProducts.find(item => item.id == productId);
    product_info.innerHTML = `
        <img class="col-lg-5 col-12" src="${selectedItem.img}">
        <div class="description col-lg-5 col-12">
            <h1 class="main-header">${selectedItem.name}</h1>
            <h5 class="my-3 text-primary">Price : ${selectedItem.price}</h5>
            <p class="fs-5 text-secondary">${selectedItem.desc}</p>
            <div class="d-flex align-items-start border-primary border-bottom border-3 mb-2">
                <i class="fa-solid fa-chart-simple text-primary fs-4 me-3 pt-2"></i>
                <p class="fs-5 text-secondary">Cutting-edge Technology Offers top-notch performance and efficiency.</p>
            </div>
            <div class="d-flex align-items-start border-primary border-bottom border-3 mb-2">
                <i class="fa-solid fa-camera text-primary fs-4 me-3 pt-2"></i>
                <p class="fs-5 text-secondary">Advanced Camera Capture stunning photos and videos effortlessly.</p>
            </div>
            <div class="d-flex align-items-start border-primary border-bottom border-3 mb-2">
                <i class="fa-solid fa-battery-three-quarters text-primary pt-2 fs-4 me-3"></i>
                <p class="fs-5 text-secondary">Long Battery Life Keeps you connected throughout the day.</p>
            </div>
            <div class="d-flex align-items-start border-primary border-bottom border-3 mb-2">
                <i class="fa-solid fa-fingerprint text-primary fs-4 me-3 pt-2"></i>
                <p class="fs-5 text-secondary">Innovative Features Offers unique functionalities for everyday tasks.</p>
            </div>
            <div class="d-flex align-items-start border-primary border-bottom border-3 mb-2">
                <i class="fa-solid fa-lock text-primary fs-4 me-3 pt-2"></i>
                <p class="fs-5 text-secondary">Enhanced Security Features like Face ID ensure your data stays safe</p></div>
            <button onclick="addToCart(${selectedItem.id})" class="w-100 py-2 rounded-5 btn btn-primary fs-5 my-2"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
        </div>
    `;
})();

//////////////////////////////////////////////////////////////////

let productMenu = document.getElementById("menu");
let addedItems = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
let count = document.getElementById("count");
let cartProduct = document.getElementById("cartProducts");
let cart = document.getElementById("cart");

function addToCart(id) {
    if(!localStorage.getItem("email")) {
        window.location = "login.html";
    } else {
        let product = listProducts.find((item) => item.id == id);
        if (addedItems.some(e => e.id == product.id)) {
            addedItems = addedItems.map(e => {
                if (e.id === product.id) {
                    e.qty++;
                }
                return e;
            });
        } else {
            addedItems.push(product);
        }

        productMenu.innerHTML = "";
        addedItems.forEach(e => {
            productMenu.innerHTML += `<p>${e.name}<span class="float-end">${e.qty}</span></p>`;
        });

        localStorage.setItem("products", JSON.stringify(addedItems));

        let counter = document.querySelectorAll("#menu p");
        count.innerHTML = counter.length;
        count.style.display = "block";
        location.reload();
    }
}

if(addedItems.length > 0){
    addedItems.map((e) => {
        productMenu.innerHTML += `<p>${e.name}<span class="float-end">${e.qty}</span></p>`;
    });
    count.innerHTML = addedItems.length;
    count.style.display = "block";
}

cart.addEventListener('click', ()=>{
    if(productMenu.innerHTML !== "") {
        if(cartProduct.style.display == "none") {
            cartProduct.style.display = "block";
        } else {
            cartProduct.style.display = "none";
        }
    }
});
product_info = document.querySelector(".main-content");
favProduct = JSON.parse(localStorage.getItem("favItems"));

if(favProduct.length === 0){
    setTimeout(() => {
        window.location = "index.html";
    }, 500);
}
let addfav = favProduct.map((product)=>{
    return `<div class="card rounded-4" style="width: 370px;">
        <div class="card-head m-3 d-flex justify-content-between align-items-center">
            <h3 onclick="showDetails(${product.id})" class="card-title">${product.name}</h3>
            <h4>${product.price}</h4>
        </div>
        <img onclick="showDetails(${product.id})" class="card-img-top p-3" src="${product.img}" alt="Card image" style="height: 350px;">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <button onclick="addToCart(${product.id})" class="btn btn-outline-secondary rounded-4">Add to Cart</button>
                <span onclick="remove(${product.id})"><i class="fa-solid fa-heart fs-4 text-secondary" style="color: ${product.liked == true ? 'red !important' : ''}"></i></span>
            </div>
        </div>
    </div>`
});
product_info.innerHTML = addfav.join("");

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

function showDetails(id) {
    window.location = "details.html";
    localStorage.setItem("selectedId", id);
}

function remove(id) {
    let index = favProduct.findIndex((x) => x.id == id);
    favProduct.splice(index, 1);
    localStorage.setItem("favItems", JSON.stringify(favProduct));
    location.reload();
}
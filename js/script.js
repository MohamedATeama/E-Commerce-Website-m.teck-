let latestProducts = document.getElementById("latestProducts");
let bestProducts = document.getElementById("bestProducts");
let moreProducts = document.getElementById("moreProducts");

function addProducts() {
    let addLatest = latest.map((product) => {
        return `<div class="card d-inline-block mx-3 rounded-4" style="width: 18rem;">
            <h3 onclick="showDetails(${product.id})" class="card-title text-center m-3">${product.name}</h3>
            <img onclick="showDetails(${product.id})" class="card-img-top p-3" src="${product.img}" alt="Card image" style="height: 300px;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="rate">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <h4>${product.price}</h4>
                </div>
                <p class="card-text desc">${product.desc}</p>
                <div class="d-flex justify-content-evenly align-items-center">
                    <button onclick="addToCart(${product.id})" class="btn btn-outline-secondary rounded-4">Add to Cart</button>
                    <span onclick="addToFav(${product.id})"><i class="fa-solid fa-heart fs-4 text-secondary" style="color: ${product.liked == true ? 'red !important' : ''}"></i></span>
                </div>
            </div>
        </div>`
    });
    latestProducts.innerHTML = addLatest.join("");

    let addBest = best.map((product) => {
        return `<div class="card d-inline-block mx-3 rounded-4" style="width: 18rem;">
            <h3 onclick="showDetails(${product.id})" class="card-title text-center m-3">${product.name}</h3>
            <img onclick="showDetails(${product.id})" class="card-img-top p-3" src="${product.img}" alt="Card image" style="height: 300px;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="rate">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <h4>${product.price}</h4>
                </div>
                <p class="card-text desc">${product.desc}</p>
                <div class="d-flex justify-content-evenly align-items-center">
                    <button onclick="addToCart(${product.id})" class="btn btn-outline-secondary rounded-4">Add to Cart</button>
                    <span onclick="addToFav(${product.id})"><i class="fa-solid fa-heart fs-4 text-secondary" style="color: ${product.liked == true ? 'red !important' : ''}"></i></span>
                </div>
            </div>
        </div>`
    });
    bestProducts.innerHTML = addBest.join("");

    let addMore = more.map((product) => {
        return `<div class="card rounded-4" style="width: 350px;">
            <div class="card-head m-3 d-flex justify-content-between align-items-center">
                <h3 onclick="showDetails(${product.id})" class="card-title">${product.name}</h3>
                <h4>${product.price}</h4>
            </div>
            <img onclick="showDetails(${product.id})" class="card-img-top p-3" src="${product.img}" alt="Card image" style="height: 350px;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <button onclick="addToCart(${product.id})" class="btn btn-outline-secondary rounded-4">Add to Cart</button>
                    <span onclick="addToFav(${product.id})"><i class="fa-solid fa-heart fs-4 text-secondary" style="color: ${product.liked == true ? 'red !important' : ''}"></i></span>
                </div>
            </div>
        </div>`
    });
    moreProducts.innerHTML = addMore.join("");
}

addProducts();

//////////////////////////////////////////////////////////

let productMenu = document.getElementById("menu");
let addedItems = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
let count = document.getElementById("count");
let cartProduct = document.getElementById("cartProducts");
let cart = document.getElementById("cart");

function addToCart(id) {
    if (!localStorage.getItem("email")) {
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

if (addedItems.length > 0) {
    addedItems.map((e) => {
        productMenu.innerHTML += `<p>${e.name}<span class="float-end">${e.qty}</span></p>`;
    });
    count.innerHTML = addedItems.length;
    count.style.display = "block";
}

if (localStorage.getItem("email")) {
    cart.addEventListener('click', () => {
        if (productMenu.innerHTML !== "") {
            if (cartProduct.style.display == "none") {
                cartProduct.style.display = "block";
            } else {
                cartProduct.style.display = "none";
            }
        }
    });
}

function showDetails(id) {
    window.location = "details.html";
    localStorage.setItem("selectedId", id);
}

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (searchInput.value.trim() === "") {
        allpage.style.display = "block";
        result.style.display = "none";
    } else {
        search(searchInput.value, listProducts);
    }
});

searchInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (searchInput.value.trim() === "") {
        allpage.style.display = "block";
        result.style.display = "none";
    } else {
        search(searchInput.value, listProducts);
    }
});

function search(title, arr) {
    let myarr = arr.filter((item) => item.name.toLowerCase().indexOf(title.toLowerCase()) > -1);
    searchResult(myarr);
}

let allpage = document.querySelector(".allpage");
let result = document.querySelector(".searchResult");

function searchResult(arr) {
    allpage.style.display = "none";
    result.style.display = "flex";
    let html = "";
    for (const product of arr) {
        html += `<div class="card rounded-4" style="width: 400px;">
        <div class="card-head m-3 d-flex justify-content-between align-items-center">
            <h3 onclick="showDetails(${product.id})" class="card-title">${product.name}</h3>
            <h4>${product.price}</h4>
        </div>
        <img onclick="showDetails(${product.id})" class="card-img-top p-3" src="${product.img}" alt="Card image" style="height: 350px;">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <button onclick="addToCart(${product.id})" class="btn btn-outline-secondary rounded-4">Add to Cart</button>
                <span onclick="addToFav(${product.id})"><i class="fa-solid fa-heart fs-4 text-secondary" style="color: ${product.liked == true ? 'red !important' : ''}"></i></span>
            </div>
        </div>
    </div>`;
    }
    result.innerHTML = html;
}

let favItems = localStorage.getItem("favItems") ? JSON.parse(localStorage.getItem("favItems")) : [];
let favCount = document.getElementById("favCount");

function addToFav(id) {
    if (!localStorage.getItem("email")) {
        window.location = "login.html";
    } else {
        let product = listProducts.find((item) => item.id == id);
        product.liked = true;

        if (!favItems.find(e => e.id == product.id)) {
            favItems.push(product);
        }

        localStorage.setItem("favItems", JSON.stringify(favItems));

        favCount.innerHTML = favItems.length;
        favCount.style.display = "block";

        listProducts.map(e => {
            if (e.id === product.id) {
                e.liked = true;
            }
        });

        if (allpage.style.display == "none") { search(searchInput.value, listProducts); }

        addProducts();
    }
}

if (favItems.length > 0) {
    favItems.map(item => {
        listProducts.map(e => {
            if (e.id === item.id) {
                e.liked = true;
            }
        });
    });
    addProducts();
    favCount.innerHTML = favItems.length;
    favCount.style.display = "block";
}

let fav = document.getElementById("fav");

if (localStorage.getItem("email")) {
    fav.addEventListener('click', function () {
        if (favItems.length > 0) {
            window.location.href = "favourite.html";
        }
    });
}

const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
});

sr.reveal(".main", {});
sr.reveal(".moreProducts", { delay: 200 });

const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
});

srLeft.reveal(".latest", { delay: 200 });
srLeft.reveal(".best", { delay: 100 });
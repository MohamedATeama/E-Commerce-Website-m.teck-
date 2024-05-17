content = document.querySelector(".main-content");
getproducts = localStorage.getItem("products");

if (getproducts) {
    products = JSON.parse(getproducts);
    draw(products);
}

function draw(data) {
    if(data.length === 0){
        setTimeout(() => {
            window.location = "index.html";
        }, 500);
    }
    let newdata = data.map((item) => {
        return `<div class="card rounded-4" style="width: 370px;">
                        <div class="card-head m-3 d-flex justify-content-between align-items-center">
                            <h3 onclick="showDetails(${item.id})" class="card-title">${item.name}</h3>
                            <h4>${item.price}</h4>
                        </div>
                        <img onclick="showDetails(${item.id})" class="card-img-top" src="${item.img}" alt="Card image" style="height: 350px;">
                        <div class="card-body text-center">
                            <p>Quantity: ${item.qty}</p>
                            <button onclick="remove(${item.id})" class="btn btn-outline-danger rounded-4">Remove from Cart</button>
                        </div>
                    </div>`;
    });
    content.innerHTML += newdata.join("");
}

function remove(id) {
    let index = products.findIndex((x) => x.id == id);
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
}

function showDetails(id) {
    window.location = "details.html";
    localStorage.setItem("selectedId", id);
}
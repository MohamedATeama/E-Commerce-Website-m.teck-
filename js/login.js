let email = document.getElementById("email");
let password = document.getElementById("pwd");
let validEmail = localStorage.getItem("email");
let validPassword = localStorage.getItem("password");
let loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if(email.value === "" || password === "") {
        alert("Please fill out all fields!");
    } else {
        if(email.value === validEmail && validEmail.trim() && password.value ===  validPassword && validPassword.trim()) {
            setTimeout(() => window.location = "index.html", 1000);
        } else {
            alert("Email or password is wrong!");
        }
    }
});
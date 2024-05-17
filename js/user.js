let sign = document.getElementById("sign");
let user_info = document.getElementById("user-info");
let user = document.getElementById("user");
let logout = document.getElementById("logout");

if(localStorage.getItem("email")) {
    sign.remove();
    email = localStorage.getItem("email");
    username = email.split("@")[0];
    user.innerHTML = `Welcome, ${username}`;
} else {
    user_info.remove();
}

logout.addEventListener('click', () => {
    localStorage.clear();
    setTimeout(()=> {window.location = "login.html"}, 1000);
});
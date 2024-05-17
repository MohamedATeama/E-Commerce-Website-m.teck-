let firstName = document.getElementById("fName");
let lastName = document.getElementById("lName");
let email = document.getElementById("email");
let password = document.getElementById("pwd");
let registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", function(e){
    e.preventDefault();

    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === ""){
        alert('Please fill out all fields');
    } else {
        localStorage.setItem("fname", firstName.value);
        localStorage.setItem("lname", lastName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        
        setTimeout( () => window.location = "login.html", 1000);
    }
});
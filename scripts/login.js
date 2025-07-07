`use strict`

const login = function() {
    const form = document.getElementById("the-form");

    const getJWT = function(username, password){
        fetch("http://localhost:8080/login", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "user_pwd": password})
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
            console.log("token", data.token)
        })
    }
    
    const getInput = function(e){
        e.preventDefault();
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");

        getJWT(username,password);

        window.location.href = "profile.html"

    }

    form.addEventListener("submit", getInput);   
}

document.addEventListener("DOMContentLoaded", login)
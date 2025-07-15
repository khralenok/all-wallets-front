`use strict`

const signin = function() {
    const form = document.getElementById("signin-form");

    const sentNewUserData = async function(username, password, baseCurrency){
        try{
        const response = await fetch("http://localhost:8080/signin", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "user_pwd": password,
                "base_currency": baseCurrency
            })
        })

        if (!response.ok){
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        localStorage.setItem("token", data.token)
        return true
        } catch (error) {
            console.error('Fetch error', error)
        }
    }
    
    const getSigninInput = function(e){
        e.preventDefault();
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");
        const currency = formData.get("currency");

        const success = sentNewUserData(username,password, currency);

        if (!success) {
            console.error('Can\'t Sign In')
            return
        }

        window.location.href = "index.html"
    }

    form.addEventListener("submit", getSigninInput);   
}

document.addEventListener("DOMContentLoaded", signin)
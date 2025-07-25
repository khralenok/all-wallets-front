`use strict`

const login = function() {
    const form = document.getElementById("the-form");

    const getJWT = async function(username, password){
        try{
        const response = await fetch("http://localhost:8080/login", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "user_pwd": password})
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
    
    const getLoginInput = async function(e){
        e.preventDefault();
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");

        const success = await getJWT(username,password);

        console.log(success)

        if (!success) {
            console.error('Can\'t login')
            localStorage.removeItem("token")
            return
        }

        window.location.href = "profile.html"
    }

    form.addEventListener("submit", getLoginInput);   
}

document.addEventListener("DOMContentLoaded", login)
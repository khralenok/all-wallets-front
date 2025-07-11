`use strict`

const getNewShareWalletInput = function(e, form, walletId, token){
    e.preventDefault();

    const formData = new FormData(form);

    const username = formData.get("username");
    const userRole = formData.get("role");

    sentDataToShareWallet(username, userRole, walletId, token)
}

const sentDataToShareWallet = async function(username, userRole, walletId, token) {
    try{
    const response = await fetch("http://localhost:8080/share-wallet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
        "wallet_id": walletId,
        "username": username,
        "user_role": userRole
    })
    })

    if (!response.ok){
        throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json()
    console.log(data)
    window.location.href = "profile.html"
    } catch (error) {
        console.error('Fetch error', error)
    }
}

const prepareToShareWallet = function() {
    const token = localStorage.getItem("token");
    const form = document.getElementById("share-wallet-form")

    const urlParams = new URLSearchParams(window.location.search);
    const walletId = parseInt(urlParams.get("wallet_id")); 

    const isLoggedIn = !!token;

    setTimeout(() => {
        if (!isLoggedIn) { 
            window.location.href = "index.html"
        }
    }, 3000)

    form.addEventListener("submit", (e) => getNewShareWalletInput(e, form, walletId, token))
}

document.addEventListener("DOMContentLoaded", prepareToShareWallet)
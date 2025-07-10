`use strict`

const token = localStorage.getItem("token");
const form = document.getElementById("new-wallet-form")

const getNewWalletInput = function(e){
    e.preventDefault();

    const formData = new FormData(form);
    const walletName = formData.get("wallet-name");
    const currency = formData.get("currency");

    sentWalletData(walletName, currency)
}

const sentWalletData = async function(walletName, currency) {
    try{
        const response = await fetch("http://localhost:8080/new-wallet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            "wallet_name": walletName,
            "currency": currency
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

const prepareToCreateWallet = function() {
    const isLoggedIn = !!token;

    setTimeout(() => {
        if (!isLoggedIn) { 
            window.location.href = "index.html"
        }
    }, 3000)



    form.addEventListener("submit", getNewWalletInput)
}

document.addEventListener("DOMContentLoaded", prepareToCreateWallet)
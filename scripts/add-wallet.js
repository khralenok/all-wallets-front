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
    fetch("http://localhost:8080/new-wallet", {
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
    .then(res => res.json())
    .then(() => {
        setTimeout(() => {
                window.location.href = "profile.html"
        }, 3000)
    });
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
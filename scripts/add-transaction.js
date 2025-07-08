`use strict`

const token = localStorage.getItem("token");
const form = document.getElementById("new-wallet-form")

const getNewTransactionInput = function(e){
    e.preventDefault();

    const formData = new FormData(form);

    const wallet_id = formData.get("currency");
    const amount = formData.get("amount");
    const category = 

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
        "amount": 20000000,
        "category": "Salary",
        "wallet_id": 2
    })
    })
    .then(res => res.json())
    .then(() => {
        setTimeout(() => {
                window.location.href = "profile.html"
        }, 3000)
    });
}

const prepareToCreateTransaction = function() {
    const isLoggedIn = !!token;

    setTimeout(() => {
        if (!isLoggedIn) { 
            window.location.href = "index.html"
        }
    }, 3000)

    form.addEventListener("submit", getNewWalletInput)
}

document.addEventListener("DOMContentLoaded", prepareToCreateWallet)
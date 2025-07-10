`use strict`

const token = localStorage.getItem("token");
const form = document.getElementById("new-transaction-form")

const urlParams = new URLSearchParams(window.location.search);
const wallet_id = parseInt(urlParams.get("wallet_id")); 

const getNewTransactionInput = function(e){
    e.preventDefault();

    const formData = new FormData(form);

    const isDeposit = formData.get("is-deposit") === "true";
    const amount = parseFloat(formData.get("amount"));
    const category = formData.get("category");

    sentTransactionData(wallet_id, amount, category, isDeposit)
}

const sentTransactionData = async function(walletId, amount, category, isDeposit) {
    try{
    const url = isDeposit ? "http://localhost:8080/add-income" : "http://localhost:8080/add-expense";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
        "amount": amount,
        "category": category,
        "wallet_id": walletId
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

const prepareToCreateTransaction = function() {
    const isLoggedIn = !!token;

    setTimeout(() => {
        if (!isLoggedIn) { 
            window.location.href = "index.html"
        }
    }, 3000)

    form.addEventListener("submit", getNewTransactionInput)
}

document.addEventListener("DOMContentLoaded", prepareToCreateTransaction)
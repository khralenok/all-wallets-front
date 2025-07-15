`use strict`

const fetchProfileData = async function(token) {
    const response = await fetch("http://localhost:8080/profile", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();

    return data
}

const drawUserData = function(userData) {
    const HTMLelement = document.getElementById("user-data")
    markup = `
        <a class="data"> ID: ${userData["id"]} | ${userData["username"]}</a>
        <a class="amount">${userData["balance"]} ${userData["base_currency"]}</a>
    `;

    HTMLelement.innerHTML += markup
}

const drawWalletData = function(walletData){
    const HTMLelement = document.getElementById("wallets")

    markup = `
    <div class="card">
        <a class="data">ID: ${walletData["wallet_id"]} | ${walletData["wallet_name"]} | ${walletData["user_role"]}</a>
        <div class="molecule vertical">
            <a class="amount">${walletData["balance"]} ${walletData["currency"]}</a>
        </div>
            <div class="molecule vertical"><a class="btn" href="add-transaction.html?wallet_id=${walletData["wallet_id"]}">Add Transaction</a>
            <a class="btn secondary" href="wallet.html?wallet_id=${walletData["wallet_id"]}">See Details</a>
        </div>
    </div>
    `;

    HTMLelement.innerHTML += markup
}

const getProfile = async function() {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    setTimeout(() => {
        if (!isLoggedIn) { 
            window.location.href = "index.html"
        }
    }, 3000)


    const profile = await fetchProfileData(token);

    drawUserData(profile["user"]);

    profile["wallets"].forEach(function(wallet, _) {
        drawWalletData(wallet);
    })

    const HTMLelement = document.getElementById("wallets")

    markup = `
            <div class="card">
                <div class="icon-wrapper"><span class="add-icon">+</span></div>
                <a class="btn" href="add-wallet.html">Add wallet</a>
            </div>
            `

    HTMLelement.innerHTML += markup
}

document.addEventListener("DOMContentLoaded", getProfile)
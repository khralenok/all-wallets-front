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
    <a><b>Username: </b>${userData["username"]}</a><br>
    <a><b>User ID: </b>${userData["id"]}</a><br>
    <a><b>Balance: </b>${userData["balance"]} ${userData["base_currency"]}</a><br>`;

    HTMLelement.innerHTML += markup
}

const drawWalletData = function(walletData){
    const HTMLelement = document.getElementById("wallets")

    markup = `
    <div class="card">
    <h3>${walletData["wallet_name"]}</h3>
    <div class="molecule vertical">
    <a><b>Balance: </b>${walletData["balance"]} ${walletData["currency"]}</a>
    <a><b>User role: </b>${walletData["user_role"]}</a>
    <a><b>Wallet ID: </b>${walletData["wallet_id"]}</a>
    </div>
    <div class="molecule vertical"><a class="btn secondary" href="add-transaction.html?wallet_id=${walletData["wallet_id"]}">Add Transaction</a><a class="btn secondary" href="wallet.html">See Details</a></div>
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
}

document.addEventListener("DOMContentLoaded", getProfile)
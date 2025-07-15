`use strict`

const fetchWalletData = async function(walletId, token) {
    const response = await fetch(`http://localhost:8080/wallet/${walletId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();

    return data
}

const drawWalletData = function(walletData){
    const HTMLelement = document.getElementById("wallet-data")
    const lastSnapshot = new Date(walletData["last_snapshot"])
    const createdAt = new Date(walletData["created_at"])

    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Ho_Chi_Minh'
    });

    markup = `
            <div class="card f">
                <div class="molecule">
                    <div class="molecule vertical">
                        <a class="data"><b>ID:</b> ${walletData["id"]} | ${walletData["wallet_name"]} |<b>Last snapshot:</b> ${formatter.format(lastSnapshot)} | <b>Created at:</b> ${formatter.format(createdAt)}</a>
                        <a class="amount">${walletData["balance"]} ${walletData["currency"]}</a>
                    </div>
                </div>
                <div class="molecule">
                    <a class="btn" href="add-transaction.html?wallet_id=${walletData["id"]}">Add Transaction</a>
                    <a class="btn secondary" href="share-wallet.html?wallet_id=${walletData["id"]}">Share Wallet</a>
                </div>
            </div>
    `;

    HTMLelement.innerHTML += markup
}

const fetchTransactionsData = async function(walletId, token) {
    const response = await fetch(`http://localhost:8080/transactions/${walletId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();

    return data
}

const drawTransactionData = function(trx, currency){
    const HTMLelement = document.getElementById("transactions")

    const type = trx["is_deposit"] ? "income" : "expense";

    const amount = trx["is_deposit"] ? trx["amount"] : (- trx["amount"])

    const createdAt = new Date(trx["created_at"])

    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Ho_Chi_Minh'
    });

    markup = `
                <ul class="card f">
                    <a class="amount ${type}">${amount} ${currency}</a>
                    <a class="data">
                        <b>Trx ID: </b>${trx["id"]} |
                        <b>Category: </b>${trx["category"]} | 
                        <b>Created At: </b>${formatter.format(createdAt)} | 
                        <b>Creator ID: </b>${trx["creator_id"]}
                    </a>
                </ul>
    `;

    HTMLelement.innerHTML += markup
}

const getWallet = async function() {
    const token = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);
    const walletId = parseInt(urlParams.get("wallet_id")); 
    const walletData = await fetchWalletData(walletId, token);
    const transactions = await fetchTransactionsData(walletId, token);

    drawWalletData(walletData);

    for (let i = transactions["transactions"].length - 1; i >= 0; i--){
        drawTransactionData(transactions["transactions"][i], walletData["currency"]) 
    }
}

document.addEventListener("DOMContentLoaded", getWallet)
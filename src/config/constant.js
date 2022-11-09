const prod_url = "https://servimate-admin.herokuapp.com/"
const local_url = "http://localhost:4000/"
const partnerWalletActionTypes = [{ "Add": "add" }, { "Subtract": "sub" }, { "Reset": "reset" }]
const apiAuth = {
    "customer": "Admin@789"
}

const byPassEmails = ["web.dev.deepaksingh@gmail.com"]

module.exports = {
    prod_url,
    local_url,
    partnerWalletActionTypes,
    apiAuth,
    byPassEmails
}
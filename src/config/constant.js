const prod_url = "https://dev-servimate-admin.herokuapp.com/"
const local_url = "http://localhost:4000/"
const partnerWalletActionTypes = [{ "Add": "add" }, { "Subtract": "sub" }, { "Reset": "reset" }]
const apiAuth = {
    "customer": "Admin@789"
}

module.exports = {
    prod_url,
    local_url,
    partnerWalletActionTypes,
    apiAuth
}
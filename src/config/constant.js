// const prod_url = "https://servimate-admin-prod.herokuapp.com/"
const prod_url = "https://servimate-admin.herokuapp.com/"
// const prod_url = "http://appservimateserveradmin-env.eba-kkddpstp.us-east-1.elasticbeanstalk.com/"
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
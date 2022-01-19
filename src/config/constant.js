const prod_url = "https://servimate-admin.herokuapp.com/"
const ebs_prod_url = "http://s-dev-env-admin.eba-hzkifsjt.us-east-1.elasticbeanstalk.com/"
const local_url = "http://localhost:4000/"
const partnerWalletActionTypes = [{ "Add": "add" }, { "Subtract": "sub" }, { "Reset": "reset" }]

module.exports = {
    prod_url: ebs_prod_url,
    local_url,
    partnerWalletActionTypes
}
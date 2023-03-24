const prod_url = "https://api.servimate.in/admin/"
const local_url = "http://localhost:3001/"
const partnerWalletActionTypes = [{ "Add": "add" }, { "Subtract": "sub" }, { "Reset": "reset" }]

const utilityContentTypes = [
    {
        "title": "Refer and Earn",
        "value": "REFER_AND_EARN"
    },
    {
        "title": "Popular Services",
        "value": "POPULAR_SERVICES"
    },
    {
        "title": "Home Screen Banner",
        "value": "HOMESCREEN_BANNER"
    },
    {
        "title": "Home Screen Reviews",
        "value": "HOMESCREEN_REVIEWS"
    },
    {
        "title": "Home Screen TopPicks",
        "value": "HOMESCREEN_TOP_PICKS"
    },
    {
        "title": "Home Screen BottomSliders",
        "value": "HOMESCREEN_BOTTOM_SLIDERS"
    },
    {
        "title": "Home Screen to Services",
        "value": "HOME_SCREEN_TO_SERVICES"
    }
]


const apiAuth = {
    "customer": "Admin@789"
}

const byPassEmails = ["web.dev.deepaksingh@gmail.com"]

module.exports = {
    prod_url,
    local_url,
    partnerWalletActionTypes,
    apiAuth,
    byPassEmails,
    utilityContentTypes
}

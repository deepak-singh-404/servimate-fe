const timeStampHelper = (_timestamp) => {
    if (_timestamp) {
        let hourMapDict = {
            0: "00",
            1: "01",
            2: "02",
            3: "03",
            4: "04",
            5: "05",
            6: "06",
            7: "07",
            8: "08",
            9: "09",
            10: "10",
            11: "11",
            12: "12",
            13: "01",
            14: "02",
            15: "03",
            16: "04",
            17: "05",
            18: "06",
            19: "07",
            20: "08",
            21: "09",
            22: "10",
            23: "11",
            24: "12"
        }
        let timestamp = new Date(_timestamp)
        //YYYY-MM-DD
        let date = String(timestamp.getFullYear()) + "-" + hourMapDict[Number(timestamp.getMonth()) + 1] + "-" + String(timestamp.getDate())
        //Get time
        let time = String(hourMapDict[(timestamp.getHours())]) + ":" + String(timestamp.getMinutes())
        return { date, time }
    }

}

module.exports = { timeStampHelper }
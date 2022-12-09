import * as xlsx from "xlsx";
import { apiAuth } from '../config/constant'

const downloadData = (fileName, data) => {
    if (data.length > 0) {
        let password = prompt("Enter Password:")
        if (password && password == apiAuth["customer"]) {
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            xlsx.writeFile(workbook, fileName);
        }
        else {
            if (password.length > 0) {
                alert("Wrong password.")
            }
        }
    }
}


export default downloadData
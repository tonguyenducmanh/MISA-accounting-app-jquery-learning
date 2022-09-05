var common = {
    /**
     * format ngày tháng về định dạng Việt Nam
     * @param {any} date Ngày tháng
     * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
     */
    formatDate(date) {
        try {
            if (date) {
                date = new Date(date)
                    // Lấy ra ngày:
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let year = date.getFullYear();
                return `${day}/${month}/${year}`;
            } else {
                return "";
            }
        } catch (error) {
            console.log(error);
            return "";
        }
    },

    /**
     * format tiền về định dạng VNĐ
     * @param {Number} money Tiền
     * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
     */
    formatMoneyVND(money) {
        try {
            money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(money);
            return money
        } catch (error) {
            console.log(error);
            return "";
        }
    },
    /**
     * format gender trả về định dạng giới tính chuẩn
     * @param {int} gender Giới tính
     * Author: Tô Nguyễn Đức Mạnh (05/09/2022)
     */
    formatGender(gender){
        try {
            switch (gender) {
                case 0:
                    return "Nam";
                case 1:
                    return "Nữ";
                default:
                    return "Khác";
            }
        } catch (error) {
            console.log(error)
        }
    }
}

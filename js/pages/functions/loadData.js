import MISAEnum from "../../enum.js"
import tdCheckbox from "./tdCheckbox.js"
/**
 * Thực hiện load data từ API mỗi khi tải lại trang
 * AUthor: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

 function loadData(){
    try {
        // Gọi API từ server để lấy dữ liệu
        fetch(MISAEnum.API.GETEMPLOYEELIST, {method: "GET"})
            .then(res => res.json())
            .then(res => {
                console.log(res)
                // Xóa dữ liệu cũ trong table
                let table = $("#table__employee .table__body--real")
                table.empty()
                // hiện loading lên khi đợi fetch data
                let loading = $(".table__wrap--loading")
                $(loading).removeClass(MISAEnum.table.HIDE)
                // Lấy thông tin các cột dữ liệu của bảng
                let ths = $("#table__employee thead th")
                // Xử lý dữ liệu
                let count = 1
                for(const emp of res){
                    // tạo cột tr
                    let trHTML = $(`<tr></tr>`);
                    // tạo td checkbox có từng id riêng
                    let tdCB = tdCheckbox(count)
                    trHTML.append(tdCB)
                    for(let th = 1; th< ths.length -1; th++){
                        // lấy ra thông tin propName
                        const propName = $(ths[th]).attr("propName")
                        let value = emp[propName]
                        let td = ""
                        // format văn bản
                        const formatDate = ths[th].hasAttribute("format-date");
                        const formatMoney = ths[th].hasAttribute("format-money");
                        if (formatDate){
                            value = common.formatDate(value);
                            td = `<td  class="text__align--center">${value|| ''}</td>`
                        }
                        else
                        if (formatMoney){
                            value = common.formatMoneyVND(value);
                            td = `<td  class="text__align--right">${value|| ''}</td>`
                        }
                        else{
                            // tạo cột td
                            td = `<td>${value|| ''}</td>`
                        }
                        trHTML.append(td)
                    }
                    // tạo td chức năng
                    let tdEdit = MISAEnum.table.tdEdit
                    trHTML.append(tdEdit)
                    table.append(trHTML)
                    count++
                }
                // ẩn loading đi
                $(loading).addClass(MISAEnum.table.HIDE)
            })
            .catch(res =>{
                console.log(res)
            })
    } catch (error) {
        console.log(error)
    }
}

export default loadData
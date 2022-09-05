import MISAEnum from "../../enum.js"
import tdCheckbox from "./tdCheckbox.js"
/**
 * Thực hiện load data từ API mỗi khi tải lại trang
 * AUthor: Tô Nguyễn Đức Mạnh (05/09/2022)
 */

 function loadData(){
    try {
        // Gọi API từ server để lấy dữ liệu
        fetch(MISAEnum.API.GETEMPLOYEEFILTER, {method: "GET"})
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
                for(const emp of res['Data']){
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
                    let tdEdit = `<td class="text__align--center">    
                                    <div class="contextmenu">
                                        <div class="contextmenu__main">
                                            <div class="contextmenu__button">
                                                Sửa
                                            </div>
                                            <div class="contextmenu__dropicon">
                                                <div class="contextmenu__menu">
                                                    <div class="contextmenu__item">Nhân bản</div>
                                                    <div class="contextmenu__item  contextmenu__deletebtn" valueId='${emp["EmployeeId"]}' valueName='${emp["FullName"]}'>Xóa</div>
                                                    <div class="contextmenu__item">Ngưng sử dụng</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>`
                    trHTML.append(tdEdit)
                    table.append(trHTML)
                    count++
                }
                // thêm tổng số records trong bản ghi vào trong page navigation
                $(".page__navi .page__records").text(res["TotalRecord"])
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
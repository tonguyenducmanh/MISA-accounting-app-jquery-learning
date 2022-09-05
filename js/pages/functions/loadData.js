import MISAEnum from "../../enum.js"
import tdCheckbox from "./tdCheckbox.js"
/**
 * Thực hiện load data từ API mỗi khi tải lại trang
 * AUthor: Tô Nguyễn Đức Mạnh (05/09/2022)
 */

 function loadData(){
    try {
        // xử lý địa chỉ api xem có từ khóa tìm kiếm không
        let searchValue = $(".main .content .content__search .input__field").val()
        // lấy giá trị xem có bao nhiêu records 1 trang
        let pageRange = $("#page_ranges").attr("value")
        // lấy giá trị xem có bao nhiêu trang
        let pageNumber = $(".page__number .page__count--selected").text()
        // tạo ra 1 mảng chứa các giá trị
        let arrFilter = []
        if(searchValue != null && searchValue != ""){
            arrFilter.push(`employeeFilter=${searchValue}`)
        }
        if(pageRange != null && pageRange != ""){
            arrFilter.push(`pageSize=${pageRange}`)
        }
        if(pageNumber != null && pageNumber != ""){
            arrFilter.push(`pageNumber=${pageNumber}`)
        }
        // api mặc định
        let apiFetch = MISAEnum.API.GETEMPLOYEEFILTER
        // tạo ra api mới dựa trên các giá trị filter
        if(arrFilter.length != 0){
            apiFetch = `${MISAEnum.API.GETEMPLOYEEFILTER}?${arrFilter.join("&")}`
        }

        // Gọi API từ server để lấy dữ liệu
        fetch(apiFetch, {method: "GET"})
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
                                        <div tabindex="0" class="contextmenu__main">
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
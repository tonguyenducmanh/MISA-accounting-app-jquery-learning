import editToggle, { clickOutToggle } from "./functions/editToggle.js";
import loadData from "./functions/loadData.js"
import openDeletePopup from "./functions/openDeletePopup.js";
import deletePopupHandle from "./functions/deletePopupHandle.js";
import handleKeyDown from "./functions/handleKeyDown.js";
/**
 * Khởi tạo việc gán các hàm cho emoloyee.js
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */
$(document).ready(function(){
    // fetch dữ liệu từ API trả vào table
    loadData()
    
    // click group function
    // thêm chức năng tải lại dữ liệu cho nút load lại
    // click vào nút search thì tiến hành search, click vào 
    // chọn số lượng page trên 1 trang cũng thế (3 nút có vai trò như nhau)
    $(document).on("click", ".main .content .content__reloadbtn", loadData);
    $(document).on("click", ".main .content .content__searchicon" , loadData )
    $(document).on("click", ".combobox__data .combobox__item", loadData)
    
    // thêm chức năng toggle menu edit tại mỗi records
    $(document).on("click", ".main .contextmenu__button", editToggle)
    $(document).on("click", ".main .contextmenu__dropicon", editToggle)

    // click vào thêm mới thì hiện dialog thêm mới nhân viên
    // $(document).on("click", "#content__addbtn", handleForm.showForm)

    // click vào nút xóa thì truyền id xóa vào trong popup xóa
    $(document).on("click", ".table .contextmenu .contextmenu__deletebtn", openDeletePopup)
    
    // enter keydown function
    // Thêm chức năng khi ấn enter ở button search, reload, page combobox thì sẽ loaddata
    $(document).on("keydown",  ".main .content .content__reloadbtn", {event_type: "loaddata"}, handleKeyDown)
    $(document).on("keydown",  ".main .content .content__searchicon", {event_type: "loaddata"}, handleKeyDown)
    $(document).on("keydown",  ".combobox__data .combobox__item",  {event_type: "loaddata"},handleKeyDown)
    
    // khi ấn enter lúc đang tabindex ở nút sửa hoặc icon sửa thì mở context menu
    $(document).on("keydown", ".main .contextmenu__button" , {event_type: "showcontextmenu"}, handleKeyDown)
    $(document).on("keydown", ".main .contextmenu__dropicon" , {event_type: "showcontextmenu"}, handleKeyDown)
    
    // enter lúc tabindex vào nút xóa thì truyền id xóa vào trong popup xóa
    $(document).on("keydown", ".table .contextmenu .contextmenu__deletebtn",{event_type: "opendeletepopup"}, handleKeyDown)
    
    // handle popup warning
    // click vào đồng ý hoặc ấn enter, esc thì sẽ trả về các hành động tương ứng
    $(document).on("click", "#popupAskWarning .button-primary", deletePopupHandle.delete)
    $(document).on("keydown", "#popupAskWarning .button-primary",{event_type: "delete"}, handleKeyDown)
    $(document).on("click", "#popupAskWarning .button-second", deletePopupHandle.cancel)
    $(document).on("keydown", "#popupAskWarning .button-second",{event_type: "cancel"}, handleKeyDown)
    $( "#popupAskWarning .popup--askwarning" ).draggable();
    
    
    // handle form
    // click vào nút hủy hoặc dấu x thì sẽ hiện cảnh báo muốn đóng form không
    $( "#form .form" ).draggable();
    
    // handle popup ask
    $( "#popupAsk .popup--ask" ).draggable();

    
    // esc keydown function
    // khi ấn esc thì sẽ đóng các element tương ứng
    $(document).on("keydown",{event_type: "hidecontext"}, handleKeyDown)
    $(document).on("keydown",{event_type: "hidepopupdelete"}, handleKeyDown)

    // 1 loạt các sự kiện click ra bên ngoài thì ẩn form, menu,...
    $(document).mouseup(clickOutToggle);
    // $(document).mouseup(handleForm.clickOutForm);
    $( "#popupAsk" ).mouseup(clickOutToggle);


    //1 loạt các sự kiện di chuyển form, popup theo chuột khi grab nó
})

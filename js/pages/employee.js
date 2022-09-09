import editToggle, { clickOutToggle } from "./functions/editToggle.js";
import loadData from "./functions/loadData.js"
import openDeletePopup from "./functions/popup/openDeletePopup.js";
import deletePopupHandle from "./functions/popup/deletePopupHandle.js";
import handleKeyDown from "./functions/handleKeyDown.js";
import handleForm from "./functions/handleForm.js";
import handleMultipleKey from "./functions/handleMultipleKeyDown.js";
import checked from "./functions/checked.js";
import validate from "./functions/validate.js";
import alertPopupHandle from "./functions/popup/alertPopupHandle.js";
import sameIdPopupHandle from "./functions/popup/sameIdpopupHandle.js";
import MISAEnum from "../enum.js";
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
    $(document).on("click", "#page_ranges .combobox__data .combobox__item", loadData)
    
    // thêm chức năng toggle menu edit tại mỗi records
    $(document).on("click", ".main .contextmenu__button", editToggle)
    $(document).on("click", ".main .contextmenu__dropicon", editToggle)

    // thêm chức năng ấn double click vào mỗi records thì sẽ hiện form sửa thông tin
    $(document).on("dblclick", ".main .table__body--real", handleForm.showEditForm )

    // click vào nút xóa thì truyền id xóa vào trong popup xóa
    $(document).on("click", ".table .contextmenu .contextmenu__deletebtn", openDeletePopup)
    
    // enter keydown function
    // Thêm chức năng khi ấn enter ở button search, reload, page combobox thì sẽ loaddata
    $(document).on("keydown",  ".main .content .content__reloadbtn", {event_type: "loaddata"}, handleKeyDown)
    $(document).on("keydown",  ".main .content .content__searchicon", {event_type: "loaddata"}, handleKeyDown)
    $(document).on("keydown",  "#page_ranges .combobox__item",  {event_type: "loaddata"},handleKeyDown)
    
    // khi ấn enter lúc đang tabindex ở nút sửa hoặc icon sửa thì mở context menu
    $(document).on("keydown", ".main .contextmenu__button" , {event_type: "showcontextmenu"}, handleKeyDown)
    $(document).on("keydown", ".main .contextmenu__dropicon" , {event_type: "showcontextmenu"}, handleKeyDown)
    // click ra ngoài thì ẩn contextmenu
    $(document).mouseup(clickOutToggle);
    
    // enter lúc tabindex vào nút xóa thì truyền id xóa vào trong popup xóa
    $(document).on("keydown", ".table .contextmenu .contextmenu__deletebtn",{event_type: "opendeletepopup"}, handleKeyDown)
    
    // handle popup warning
    // click vào đồng ý hoặc ấn enter, esc thì sẽ trả về các hành động tương ứng
    $(document).on("click", "#popupAskWarning .button-primary", deletePopupHandle.delete)
    $(document).on("keydown", "#popupAskWarning .button-primary",{event_type: "delete"}, handleKeyDown)
    $(document).on("click", "#popupAskWarning .button-second", deletePopupHandle.cancel)
    $(document).on("keydown", "#popupAskWarning .button-second",{event_type: "cancel"}, handleKeyDown)
    $( "#popupAskWarning .popup--askwarning" ).draggable();
    
    // handle radio button click
    $(document).on("click", "#form .radio .form__gender", checked)
    
    // click vào thêm mới thì hiện form thêm mới nhân viên
    $(document).on("click", "#content__addbtn", handleForm.showForm)

    // ấn ctrl + shift + A để hiện form thêm mới nhanh
    $(document).on("keydown", handleMultipleKey.ctrlShiftA)
    
    // ấn ctrl + K để focus vào ô tìm kiếm
    $(document).on("keydown", handleMultipleKey.ctrlK)


    // handle form
    $( "#form .form" ).draggable();
    // click vào nút hủy hoặc dấu x thì sẽ hiện cảnh báo muốn đóng form không
    $(document).on("click", "#form .form__cancel", handleForm.cancelForm)
    // khi ấn esc thì cũng hiện popup như click vào hủy
    $(document).on("keydown",{event_type: "cancelForm"}, handleKeyDown)
    // ấn vào nút cất thì tiến hành lưu
    $(document).on("click", "#form .form__save--close", handleForm.clickSave)
    // ấn vào nút cât và thêm thì lưu và nhập tiếp
    $(document).on("click", "#form .form__save--readd", handleForm.clickSaveAndAdd)

    
    // handle popup ask
    $( "#popupAsk .popup--ask" ).draggable();
    // ấn vào nút hủy thì ẩn popup nhập form tiếp
    $(document).on("click", "#popupAsk .button--cancel", handleForm.cancelForm)
    // ấn vào nút không thì ẩn form và popup
    $(document).on("click", "#popupAsk .button--no", handleForm.exitForm)
    // ấn esc thì như ấn hủy (đã viết ở cancelForm bên trên)
    // ấn ctrl + Q sẽ hủy hoàn toàn và thoát khỏi form 
    $(document).on("keydown","#form" , handleMultipleKey.ctrlQ)
    // ấn ctrl + S thì sẽ lưu và ẩn form
    $(document).on("keydown","#form" , handleMultipleKey.ctrlS)
    // ấn ctrl + shift + S thì sẽ lưu và clear form
    $(document).on("keydown", handleMultipleKey.ctrlShiftS)

    // handle alert popup
    $( "#popupAlert .popup--alert" ).draggable();
    // thêm tính năng ấn vào nút đóng thì ẩn form
    $(document).on("click", "#popupAlert .popup--alert .button-primary", alertPopupHandle.hidePopup);

    // handle wanring same Id
    $( "#popupWarning .popup--warning" ).draggable();
    // thêm tính năng ấn vào nút đóng thì ẩn form
    $(document).on("click", "#popupWarning .popup--warning .button-primary", sameIdPopupHandle);


    // form validate
    $(document).on("blur", ".form__body .input__musthave", validate.mustHaveCheck)
    // trường hợp của combobox, nếu ta ấn vào 1 item thì nó phải bỏ viền cảnh báo chưa nhập đi
    $(document).on("click", ".form__body .combobox__data .combobox__item", validate.removeAlertCheck)


    // esc keydown function
    // khi ấn esc thì sẽ đóng các element tương ứng
    $(document).on("keydown",{event_type: "hidecontext"}, handleKeyDown)
    $(document).on("keydown",{event_type: "hidepopupdelete"}, handleKeyDown)
})

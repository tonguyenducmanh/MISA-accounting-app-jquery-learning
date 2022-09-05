import editToggle, { clickOutToggle } from "./functions/editToggle.js";
import hideForm, { clickOutForm } from "./functions/hideForm.js";
import loadData from "./functions/loadData.js"
import showForm from "./functions/showForm.js";
import openDeletePopup from "./functions/openDeletePopup.js";
import deletePopupHandle from "./functions/deletePopupHandle.js";
/**
 * Khởi tạo việc gán các hàm cho emoloyee.js
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */
$(document).ready(function(){
    // fetch dữ liệu từ API trả vào table
    loadData()
    // thêm chức năng tải lại dữ liệu cho nút load lại
    $(document).on("click", ".main .content .content__reloadbtn", loadData);
    // thêm chức năng toggle menu edit tại mỗi records
    $(document).on("click", ".main .contextmenu__button", editToggle)
    $(document).on("click", ".main .contextmenu__dropicon", editToggle)
    // click vào thêm mới thì hiện dialog thêm mới nhân viên
    $(document).on("click", "#content__addbtn", showForm)
    // click vào nút hủy hoặc dấu x thì sẽ đóng form thêm mới nhân viên
    $(document).on("click", ".form .form__cancel", hideForm)

    // click vào nút xóa thì truyền id xóa vào trong popup xóa
    $(document).on("click", ".table .contextmenu .contextmenu__deletebtn", openDeletePopup)
    // handle popup xóa
    // click vào đồng ý trong pop up thì sẽ xóa records đi và load lại bảng
    $(document).on("click", "#popupAskWarning .button-primary", deletePopupHandle.delete)
    // click vào cancel trong pop up thì sẽ hủy xóa đi và clear info
    $(document).on("click", "#popupAskWarning .button-second", deletePopupHandle.cancel)
    // 1 loạt các sự kiện click ra bên ngoài thì ẩn form, menu,...
    $(document).mouseup(clickOutToggle);
    $(document).mouseup(clickOutForm);
})

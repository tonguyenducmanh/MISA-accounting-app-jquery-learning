import MISAEnum from "../../enum.js"
import deletePopupHandle from "./popup/deletePopupHandle.js";
import editToggle, { clickOutToggle } from "./editToggle.js";
import handleForm from "./handleForm.js";
import loadData from "./loadData.js"
import openDeletePopup from "./popup/openDeletePopup.js";

/**
 * Tạo chức năng khi nhấn phím enter hoặc esc thì sẽ thực hiện 1 hàm nhất định.
 * @param {string} name - Tên function muốn gán khi ấn phím.
 * Author: Tô Nguyễn Đức Mạnh (05/09/2022)
 */
function handleKeyDown(e){
    try {
        // nếu phím ấn là enter thì test xem nó muốn hành động gì
        if(e.keyCode === MISAEnum.keycode.ENTER){
            let type = e.data.event_type
            switch (type) {
                // tải danh sách trang
                case "loaddata":
                    loadData();
                    break;
                // hiện editToggle
                case "showcontextmenu":
                    editToggle(e);
                    break;
                // hiện popup xóa
                case "opendeletepopup":
                    openDeletePopup(e);
                    break;
                // đồng ý xóa
                case "delete":
                    deletePopupHandle.delete(e);
                    break;
                // hủy xóa
                case "cancel":
                    deletePopupHandle.cancel(e);
                    break;
                default:
                    break;
            }
        }
        // nếu phím ấn là esc thì test xem nó muốn hành động gì
        if(e.keyCode === MISAEnum.keycode.ESC){
            let type = e.data.event_type
            switch (type) {
                // ẩn contextmenu
                case "hidecontext":
                    clickOutToggle(e);
                    break;
                // ẩn popupdelete
                case "hidepopupdelete":
                    deletePopupHandle.cancel(e);
                    break;
                // hiện popup hỏi muốn hủy nhập form không
                case "cancelForm":
                    handleForm.cancelForm();
                    break;
                default:
                    break;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default handleKeyDown
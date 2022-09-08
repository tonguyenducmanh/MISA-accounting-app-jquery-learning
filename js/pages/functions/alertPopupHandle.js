/**
 * Ấn nút đóng thì ẩn popup đi và xóa text
 * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
 */

import MISAEnum from "../../enum.js"

function alertPopupHandle(){
    try {
        $("#popupAlert").removeClass(MISAEnum.popup.SHOW)
        $("#popupAlert .popup__text").text("")
    } catch (error) {
        console.log(error)
    }
}

export default alertPopupHandle
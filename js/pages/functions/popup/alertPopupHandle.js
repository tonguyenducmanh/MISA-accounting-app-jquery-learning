/**
 * Ấn nút đóng thì ẩn popup đi và xóa text
 * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
 */

import MISAEnum from "../../../enum.js"
import MISAResource from "../../../resource.js"

var alertPopupHandle = {
    hidePopup(){
        {
            try {
                $("#popupAlert").removeClass(MISAEnum.popup.SHOW)
                $("#popupAlert .popup__text").text("")
                // focus vào ô nhập liệu thứ đầu tiên
                $("#form .input__focus").focus();
            } catch (error) {
                console.log(error)
            }
        }
    },
    generateText(currentId){
         // gọi ngôn ngữ text định chèn
         let language = MISAEnum.language;
         // gọi ra văn bản validate
         let textAlert = MISAResource.ErrorValidate.EmployeeCode[language];
         let textAlertTwo = MISAResource.ErrorValidate.IsExisted[language];
         // chèn text vào trong popup cảnh báo trùng Id
         let textRespone = `${textAlert} < ${currentId} > ${textAlertTwo}`;
         $("#popupWarning .popup__text").append(textRespone);
    }
}

export default alertPopupHandle
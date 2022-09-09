/**
 * xử lý popup xóa của người dùng
 * Author: Tô Nguyễn Đức Mạnh (05/09/2022)
 */

import MISAEnum from "../../../enum.js"

var deletePopupHandle= {
    /**
     * tính năng xóa người dùng theo id.
     * Author: Tô Nguyễn Đức Mạnh (05/09/2022)
     */
    delete(e){
        try {
            let recordId = $(e.target).attr("value")
            // gọi api xóa đi
            let apiDelete = `${MISAEnum.API.GETEMPLOYEELIST}/${recordId}`
            fetch(apiDelete, {method:"DELETE"})
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(res => {
                    console.log(res)
                })
             // xóa các thông tin như value ID đi
             $(e.target).parents(".popup__action").children(".button-primary").attr("value", "")
             $("#popupAskWarning .popup__text").text(``)
            // đóng popup này đi
            let popupDelete = $("#popupAskWarning")
            console.log(popupDelete)
            $(popupDelete).removeClass(MISAEnum.popup.SHOW)
        } catch (error) {
            console.log(error)
        }
    },
    /**
     * hủy xóa người dùng xóa các value có sẵn trong popup đi, như value Id và nội dung.
     * Author: Tô Nguyễn Đức Mạnh (05/09/2022)
     */
    cancel(e){
        try {
            // xóa các thông tin như value ID đi
            $("#popupAskWarning .popup__action").children(".button-primary").attr("value", "")
            $("#popupAskWarning .popup__text").text(``)
            //  đóng popup này đi
            let popupDelete = $("#popupAskWarning")
            if($(popupDelete).hasClass(MISAEnum.popup.SHOW)){
                $(popupDelete).removeClass(MISAEnum.popup.SHOW)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default deletePopupHandle
/**
 * tạo ra chuỗi các sự kiện handle form
 * Author Tô Nguyễn Đức Mạnh (06/09/2022)
 */

import MISAEnum from "../../enum.js"

var handleForm = {
    /**
     * Lấy giá trị mã nhân viên mới được tạo ra từ API.
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
    getEmCode(){
        try {
            fetch(MISAEnum.API.NEWEMPLOYEECODE, {method: "GET"})
                .then(res =>res.text())
                .then(res => {
                    $("#form .form__ele .form__employeecode").val(res)
                })
                .catch(res =>{
                    console.log(res)
                })
        } catch (error) {
            console.log(error)
        }
    },
    /**
     * hiện form khi bấm vào nút thêm mới.
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
     showForm(){
        try {
            $("#form").addClass(MISAEnum.form.SHOW)
            // lấy mã employee code mới được tạo ra từ bên server
            this.getEmCode()
            // focus vào ô nhập liệu thứ 2
            $("#form .input__focus").focus()
        } catch (error) {
            console.log(error)
        }
    },
    /**
     * show popup khi ấn vào nút x hoặc nút hủy và
     * ẩn popup khi ấn vào nút hủy của popup.
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
    cancelForm(){
        try {
            if($("#form").hasClass(MISAEnum.form.SHOW)){
                if($("#popupAsk").hasClass(MISAEnum.popup.SHOW)){
                    $("#popupAsk").removeClass(MISAEnum.popup.SHOW)
                }else{
                    $("#popupAsk").addClass(MISAEnum.popup.SHOW)
                }
            }
        } catch (error) {
            console.log(error)
        }
    },
    /**
     * ẩn cả form và popup đi
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
    exitForm(){
        try {
            if($("#popupAsk").hasClass(MISAEnum.popup.SHOW)){
                $("#popupAsk").removeClass(MISAEnum.popup.SHOW)
                $("#form").removeClass(MISAEnum.form.SHOW)
            }
        } catch (error) {
            console.log(error)
        }
    },
}

export default handleForm
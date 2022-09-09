/**
 * Thêm sự kiện validate form
 * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
 */

import MISAEnum from "../../enum.js"
import MISAResource from "../../resource.js"

var validate ={
    /**
     * Check có điều kiện xem các ô nhập musthave có trống không?
     * Nếu trống thì cần thêm border màu đỏ để thông báo.
     * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
     */
    mustHaveCheck(e){
        try {
            let currentELe = $(e.target)
            if($(currentELe).val() === ""){
                $(currentELe).addClass("input__field--alert")
            }else{
                $(currentELe).removeClass("input__field--alert")
            }
        } catch (error) {
            console.log(error)
        }
    },
    /**
     * Riêng trường hợp của combobox, khi click vào 1 item thì input sẽ không có cảnh báo chưa nhập nữa.
     * Author: Tô Nguyễn Đức Mạnh (09/09/2022)
     */
     removeAlertCheck(e){
        try {
            let currentELe = $(e.target).parents(".combobox").children(".combobox__input")
            if($(currentELe).val() === ""){
                $(currentELe).addClass("input__field--alert")
            }else{
                $(currentELe).removeClass("input__field--alert")
            }
        } catch (error) {
            console.log(error)
        }
     },
    /**
     * Check có điều kiện xem các ô nhập musthave có trống không ?
     * Nếu trống thì cần thêm text vào popup cảnh báo.
     * Sau đó sẽ tạo các border đỏ bao quanh các input chưa điền.
     * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
     */
    checkBeforeSave(){
        try {
            // gọi ngôn ngữ text định chèn
            let language = MISAEnum.language
            // gọi các input có attribute validate ra
            let elements = $("#form .form__body .input__musthave")
            // gọi ra popup text field
            let popupText = $("#popupAlert .popup__text")
            let text = ""
            // tiến hành chèn văn bản validate vào trong popup
            let count = 0
            for(let i = 0 ; i< elements.length; i++){
                if($(elements[i]).val() === ""){
                    // gọi ra giá trị muốn validate
                    let validateName = $(elements[i]).attr("validate")
                    // gọi ra văn bản validate
                    let textAlert = MISAResource.ErrorValidate[validateName][language]
                    text += textAlert
                    if(i != elements.length -1){
                        text += "<br/>"
                    }
                    // gán luôn cả border cho giá trị bị trống
                    $(elements[i]).addClass("input__field--alert")
                    count++
                }
            }
            $(popupText).append(text)
            if(count > 0){
                return false
            }else{
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default validate
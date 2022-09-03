/**
 * hiện form thêm mới nhân viên khi ấn vào thêm mới
 * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
 */

import MISAEnum from "../../enum.js"

function showForm(){
    try {
        $("#form").addClass(MISAEnum.form.SHOW)
    } catch (error) {
        console.log(error)
    }
}

export default showForm
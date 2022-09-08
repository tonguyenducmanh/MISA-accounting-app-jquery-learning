
import MISAEnum from "../../../enum.js"

/**
 * Thêm tính năng xóa bản ghi khi bấm vào nút sửa.
 * Author: Tô Nguyễn Đức Mạnh (05/09/2022)
 */
function openDeletePopup(e){
    try {
        // lấy ra id của records
        let recordId = $(e.target).attr("valueId")
        let recordName = $(e.target).attr("valueName")
        // truyền id vào trong nút xóa để xóa record
        $("#popupAskWarning .button-primary").attr('value', recordId)
        // lấy ra name của records
        $("#popupAskWarning .popup__text").text(`Bạn có thực sự muốn xóa nhân viên ${recordName} không ?`)
        // hiện pop up xóa
        $("#popupAskWarning").addClass(MISAEnum.popup.SHOW)
    } catch (error) {
        console.log(error)
    }
}

export default openDeletePopup
import MISAEnum from "../../../enum.js";
/**
 * Ẩn popup trùng id khi ấn vào nút đồng ý
 * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
 */
function sameIdPopupHandle() {
  try {
    // ẩn popup đi
    let popupSameId = $("#popupWarning");
    $(popupSameId).removeClass(MISAEnum.popup.SHOW);
    // focus vào ô nhập liệu thứ đầu tiên
    $("#form .input__focus").focus();
  } catch (error) {
    console.log(error);
  }
}

export default sameIdPopupHandle;

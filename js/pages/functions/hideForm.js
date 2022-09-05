import MISAEnum from "../../enum.js";

/**
 * chức năng ẩn form thêm mới nhân viên.
 * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
 */
function hideForm() {
  try {
    $("#form").removeClass(MISAEnum.form.SHOW);
  } catch (error) {
    console.log(error);
  }
}

/**
 * ấn ra ngoài form thì ẩn toàn bộ form
 * tránh trường hợp hiện khi không dùng.
 * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
 */

export function clickOutForm(e) {
  try {
    let oldForm = $(".form__wrap .form");
    if (!oldForm.is(e.target)) {
      oldForm.removeClass(MISAEnum.form.SHOW);
    }
    // phải xóa cả dữ liệu form đang nhập đi nữa
  } catch (error) {
    console.log(error);
  }
}

export default hideForm;

/**
 * tạo ra chuỗi các sự kiện handle form
 * Author Tô Nguyễn Đức Mạnh (06/09/2022)
 */

import MISAEnum from "../../enum.js";

var handleForm = {
  /**
   * Lấy giá trị mã nhân viên mới được tạo ra từ API.
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  getEmCode() {
    try {
      fetch(MISAEnum.API.NEWEMPLOYEECODE, { method: "GET" })
        .then((res) => res.text())
        .then((res) => {
          $("#form .form__ele .form__employeecode").val(res);
        })
        .catch((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * hiện form khi bấm vào nút thêm mới.
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  showForm() {
    try {
      $("#form").addClass(MISAEnum.form.SHOW);
      // lấy mã employee code mới được tạo ra từ bên server
      handleForm.getEmCode();
      // focus vào ô nhập liệu thứ 2
      $("#form .input__focus").focus();
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * show popup khi ấn vào nút x hoặc nút hủy và
   * ẩn popup khi ấn vào nút hủy của popup.
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  cancelForm() {
    try {
      if ($("#form").hasClass(MISAEnum.form.SHOW)) {
        if ($("#popupAsk").hasClass(MISAEnum.popup.SHOW)) {
          $("#popupAsk").removeClass(MISAEnum.popup.SHOW);
        } else {
          $("#popupAsk").addClass(MISAEnum.popup.SHOW);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * ẩn cả form và popup đi
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  exitForm() {
    try {
      if ($("#popupAsk").hasClass(MISAEnum.popup.SHOW)) {
        $("#popupAsk").removeClass(MISAEnum.popup.SHOW);
        $("#form").removeClass(MISAEnum.form.SHOW);
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * thực hiện lưu vào database và đóng form đi
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  saveNew() {
    try {
      // gọi các giá trị có trong form ra
      let inputs = $(
        "#form .form__employeecode,#form .form__employeename, #form #cbxDepartment, #form .form__positionname, #form .form__dateofbirth,#form .form__gender[checked], #form .form__personaID, #form .form__createdDate, #form .form__createdwhere, #form .form__address, #form .form__phonenum,#form .form__email, #form .form__banknum,#form .form__bankname,#form .form__bankaddr "
      );
      var employee = {};
      for (const input of inputs) {
        const propName = $(input).attr("propName");
        if (propName != undefined) {
          let value = $(input).val();
          if (value) {
            employee[propName] = value;
          }
        }
      }
      console.log(employee);
      // kiểm tra xem các giá trị đã hợp lệ chưa

      // tiến hành lưu
      $.ajax({
        type: "POST",
        url: MISAEnum.API.GETEMPLOYEELIST,
        data: JSON.stringify(employee),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
            console.log("đã add thành công")
        },
        error: function(response) {
            console.log(response)
        }
    });
        // tiến hành xóa input value đi
        for (const input of inputs) {
              $(input).val("");
            }
        // tiến hành đóng form
        handleForm.cancelForm()
        handleForm.exitForm()
    } catch (error) {
      console.log(error);
    }
  },
};

export default handleForm;

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
      // chuyển trạng thái form từ edit về post
      $("#form").attr("form-type", MISAEnum.form.CREATE)
      $("#form").attr("employee-id", "")
      // focus vào ô nhập liệu thứ 2
      $("#form .input__focus").focus();
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * hiện form edit có khả năng binding toàn bộ thông tin nhân viên vào trong bảng.
   * Author: Tô Nguyễn Đức Mạnh (07/09/2022)
   */
  showEditForm(e) {
    try {
      $("#form").addClass(MISAEnum.form.SHOW);
      // lấy mã ID của record hiện tại
      let currentEle = $(e.target).parent("tr");
      let currentId = $(currentEle).attr("value");
      $("#form").attr("employee-id", currentId)
      // tạo fetch để get data về
      if (currentId != undefined && currentId != "") {
        fetch(`${MISAEnum.API.GETEMPLOYEELIST}/${currentId}`, { method: "GET" })
          .then((res) => res.json())
          .then((res) => {
            // gọi các giá trị có trong form ra
            let inputs = $(
              "#form .form__employeecode,#form .form__employeename, #form #cbxDepartment, #form .form__positionname, #form .form__dateofbirth, #form .form__personaID, #form .form__createdDate, #form .form__createdwhere, #form .form__address, #form .form__phonenum,#form .form__email, #form .form__banknum,#form .form__bankname,#form .form__bankaddr "
            );
            // gán giá trị trả về từ api vào form
            for (const input of inputs) {
              const propName = $(input).attr("propName");
              if (propName != undefined && propName !="GenderBox") {
                let temp = res[propName]
                if(input.hasAttribute("format-date")){
                  let value = common.formatDate(temp)
                  value = value.split("/").reverse().join("-")
                  temp = value
                }
                if(input.hasAttribute("format-money")){
                  temp = common.formatMoneyVND(temp)
                }
                $(input).val(temp);
              }
            }
            // gọi riêng trường hợp của select
            let genders = $("#form .radio__select input")
            for(const gender of genders){
              if($(gender).attr("value") == res["Gender"]){
                $(gender).attr("checked","check")
              }else{
                $(gender).removeAttr("checked")
              }
            }

          })
          .catch((res) => console.log(res));
      }
      // chuyển trạng thái form từ post về edit
      $("#form").attr("form-type", MISAEnum.form.EDIT)
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
      let formType = $("#form").attr("form-type")
      var employee = {};
      // check xem là sửa hay xóa, là sửa thì cần sửa địa chỉ api theo nó
      let api = MISAEnum.API.GETEMPLOYEELIST
      if(formType === MISAEnum.form.EDIT){
        api +=  `/${$("#form").attr("employee-id")}`
      }
      // gán các giá trị input vào employee
      for (const input of inputs) {
        const propName = $(input).attr("propName");
        if (propName != undefined) {
          let value = $(input).val();
          if (value) {
            employee[propName] = value;
          }
        }
      }
      // kiểm tra xem các giá trị đã hợp lệ chưa

      // tiến hành lưu
      $.ajax({
        // nếu là mới thì để type là POST, nếu là cũ thì để type là PUT
        type: formType,
        url: api,
        data: JSON.stringify(employee),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
          console.log("đã add thành công");
        },
        error: function (response) {
          console.log(response);
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Tiến hành lưu và đóng form (lưu 1 records mới)
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  saveClose() {
    try {
      handleForm.saveNew();
      // tiến hành xóa input value đi
      let inputs = $(
        "#form .form__employeecode,#form .form__employeename, #form #cbxDepartment, #form .form__positionname, #form .form__dateofbirth,#form .form__gender[checked], #form .form__personaID, #form .form__createdDate, #form .form__createdwhere, #form .form__address, #form .form__phonenum,#form .form__email, #form .form__banknum,#form .form__bankname,#form .form__bankaddr "
      );
      for (const input of inputs) {
        $(input).val("");
      }
      // tiến hành đóng form
      handleForm.cancelForm();
      handleForm.exitForm();
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Tiến hành lưu và nhập mới (lưu nhiều records mới)
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  saveReAdd() {
    try {
      handleForm.saveNew();
      // tiến hành xóa input value đi
      let inputs = $(
        "#form .form__employeecode,#form .form__employeename, #form #cbxDepartment, #form .form__positionname, #form .form__dateofbirth,#form .form__gender[checked], #form .form__personaID, #form .form__createdDate, #form .form__createdwhere, #form .form__address, #form .form__phonenum,#form .form__email, #form .form__banknum,#form .form__bankname,#form .form__bankaddr "
      );
      for (const input of inputs) {
        $(input).val("");
      }
      //   lại thêm 1 mã code mới được tạo ra
      handleForm.getEmCode();
    } catch (error) {
      console.log(error);
    }
  },
};

export default handleForm;

/**
 * tạo ra chuỗi các sự kiện handle form
 * Author Tô Nguyễn Đức Mạnh (06/09/2022)
 */

import MISAEnum from "../../enum.js";
import validate from "./validate.js";
import MISAResource from "../../resource.js";
import alertPopupHandle from "./popup/alertPopupHandle.js";

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
      $("#form").attr("form-type", MISAEnum.form.CREATE);
      $("#form").attr("employee-id", "");
      // focus vào ô nhập liệu thứ đầu tiên
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
      //  kiểm tra xem có phải là nút checkbox không, nếu không phải thì mới dùng
      if (
        !$(e.target).hasClass("checkbox__label") &&
        !$(e.target).hasClass("contextmenu__button") &&
        !$(e.target).hasClass("contextmenu__dropicon")
      ) {
        $("#form").addClass(MISAEnum.form.SHOW);
        // lấy mã ID của record hiện tại
        let currentEle = $(e.target).parent("tr");
        let currentId = $(currentEle).attr("value");
        $("#form").attr("employee-id", currentId);
        // tạo fetch để get data về
        if (currentId != undefined && currentId != "") {
          fetch(`${MISAEnum.API.GETEMPLOYEELIST}/${currentId}`, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((res) => {
              // gọi các giá trị có trong form ra
              let inputs = $(
                "#form .form__employeecode,#form .form__employeename, #form #cbxDepartment, #form #cbxPosition, #form .form__dateofbirth, #form .form__personaID, #form .form__createdDate, #form .form__createdwhere, #form .form__address, #form .form__phonenum,#form .form__email, #form .form__banknum,#form .form__bankname,#form .form__bankaddr "
              );
              // gán giá trị trả về từ api vào form
              for (const input of inputs) {
                const propName = $(input).attr("propName");
                if (propName != undefined && propName != "GenderBox") {
                  let temp = res[propName];
                  // format ngày tháng theo đúng định dạng việt nam
                  if (input.hasAttribute("format-date")) {
                    let value = common.formatDate(temp);
                    value = value.split("/").reverse().join("-");
                    temp = value;
                  }
                  // format tiền theo đúng định dạng việt nam
                  if (input.hasAttribute("format-money")) {
                    temp = common.formatMoneyVND(temp);
                  }
                  // biding dữ liệu
                  // trường hợp là input thường
                  if(!$(input).hasClass("combobox")){
                    $(input).val(temp)
                  }
                  // trường hợp là combobox
                  else{
                    // vì combobox có 1 giá trị là Id gửi đi và 1 giá trị và value cho người dùng xem,
                    // ta cần binding cả 2
                    // gán value Id vào trong combobox cha
                    $(input).attr("value", temp)
                    //gán input value vào trong combobox con
                    //gọi tới sự kiện thằng con có cái id này và giả vờ click vào nó, ta sử dụng trigger
                    $(input).children('.combobox__data').children(`.combobox__item[value=${temp}]`).trigger( "click" )
                    // debugger
                  }
                }
              }
              // gọi riêng trường hợp của select
              let genders = $("#form .radio__select");
              // tương tự như trên, ta dùng trigger để click vào dòng có giới tính phù hợp
              $(genders).children(`.radio__button[value=${res["Gender"]}]`).trigger("click")
              debugger
            })
            .catch((res) => console.log(res));
        }
        // chuyển trạng thái form từ post về edit
        $("#form").attr("form-type", MISAEnum.form.EDIT);
        // focus vào ô nhập liệu thứ 2
        $("#form .input__focus").focus();
      }
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
   * Lấy toàn bộ input của form rồi cho vào trong 1 object
   * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
   */
  getFormInput(){
      // gọi các giá trị có trong form ra
      let inputs = $(
        "#form .form__employeecode,#form .form__employeename, #form #cbxDepartment, #form #cbxPosition, #form .form__dateofbirth,#form .form__gender[checked], #form .form__personaID, #form .form__createdDate, #form .form__createdwhere, #form .form__address, #form .form__phonenum,#form .form__email, #form .form__banknum,#form .form__bankname,#form .form__bankaddr "
      );
      let employee = {}
      // gán các giá trị input vào employee
      for (const input of inputs) {
        const propName = $(input).attr("propName");
        if (propName != undefined) {
          // lấy ra giá trị value trong chỗ nhập input
          let value = $(input).val();
          if (value) {
            employee[propName] = value;
          }
          else{
            // trường hợp không phải là input mà là combobox chẳng hạn,
            // ta lấy giá trị được gán vào attribute value của nó
            employee[propName] = $(input).attr("value")
          }
        }
      }
      return employee
  }
  ,
  /**
   * thực hiện lưu vào database và đóng form đi
   * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
   */
  saveNew(type) {
    try {
      // kiểm tra xem mã Id có bị trùng chưa, nếu trùng return false luôn
      let currentId = $("#form #input__checkId").val();
      let apiTest = `${MISAEnum.API.GETEMPLOYEEFILTER}?employeeFilter=${currentId}`;

      fetch(apiTest, { method: "GET" })
        .then((res) => {
          if (res.status == 200) {
            alertPopupHandle.generateText(currentId)
            // trả về false
            return false;
          } else {
            return true;
          }
        })
        .then((res) => {
          // nếu kết quả trả về false, tức là đã có giá trị nào đó bị trùng rồi thì hiện popup lên
          // phải kiểm tra kèm xem nó có phải là thao tác thêm mới không, nếu là sửa thì trùng là cái chắc
          if (res == false && $("#form").attr("form-type") ==  MISAEnum.form.CREATE) {
            let popupSameId = $("#popupWarning");
            $(popupSameId).addClass(MISAEnum.popup.SHOW);
            return false;
          } else {
            // nếu chưa có thì chúng ta chuyển qua check validate liên quan tới ô nhập trống
            let checkBeforeSave = validate.checkBeforeSave();
            // nếu trường hợp input có trống hiện alert ngay
            if (checkBeforeSave === false) {
              alertPopupHandle.showPopup()
              return false;
            } else {
              // lấy ra các input value
              let employee = handleForm.getFormInput()
              // tiến hành lưu
              let formType = $("#form").attr("form-type");
              // check xem là sửa hay xóa, là sửa thì cần sửa địa chỉ api theo nó
              let api = MISAEnum.API.GETEMPLOYEELIST;
              if (formType === MISAEnum.form.EDIT) {
                api += `/${$("#form").attr("employee-id")}`;
              }
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
              // có 2 kiểu ấn lưu, 1 kiểu là ấn click chuột, 1 kiểu là ấn ctrl + S, thì ấn kiểu chuột
              // Jquery không hỗ trợ truyền param vào function click nên phải qua e.data.event_type
              // còn ctrl + S thì truyền được
              let typeClick =type
              // check xem kiểu lưu là cất hay cất và thêm ?
              if(typeClick == MISAEnum.saveType.save){
                // là cất thì ẩn form xóa data
                handleForm.saveClose()
              }
              if(typeClick == MISAEnum.saveType.saveAndAdd){
                // là cất và thêm thì không ẩn form chỉ xóa data
              }{
                handleForm.saveReAdd()
              }
            }
          }
        })
        .catch((res) => console.log(res));
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
  /**
   * Tạo ra 1 function phụ để truyền param save
   * Author : Tô Nguyễn Đức Mạnh (08/09/2022)
   */
  clickSave(){
    try {
      handleForm.saveNew(MISAEnum.saveType.save)
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * Tạo ra 1 function phụ để truyền param save and add
   * Author : Tô Nguyễn Đức Mạnh (08/09/2022)
   */
  clickSaveAndAdd(){
    try {
      handleForm.saveNew(MISAEnum.saveType.saveAndAdd)
    } catch (error) {
      console.log(error)
    }
  },
};

export default handleForm;

import MISAEnum from "./js/enum.js";
// đợi toàn bộ trang load ms chạy jquery
$(document).ready(function () {
  $(document).on("click", "#btnAlert", alertPopupToggle);
  $(document).on("click", "#btnAsk", askPopupToggle);
  $(document).on("click", "#btnWarning", warningPopupToggle);
  $(document).on("click", "#btnAskWarning", askWarningPopupToggle);
  $(document).on("click", "#btnForm", formToggle);
});

/**
 * hiện popup alert
 * Author: Tô Nguyễn Đức Mạnh (02/09/2022)
 */

function alertPopupToggle() {
  if ($("#popupAlert").hasClass(MISAEnum.popup.SHOW)) {
    $("#popupAlert").removeClass(MISAEnum.popup.SHOW);
  } else {
    $("#popupAlert").addClass(MISAEnum.popup.SHOW);
  }
}

/**
 * hiện popup warning
 * Author: Tô Nguyễn Đức Mạnh (02/09/2022)
 */

function warningPopupToggle() {
  if ($("#popupWarning").hasClass(MISAEnum.popup.SHOW)) {
    $("#popupWarning").removeClass(MISAEnum.popup.SHOW);
  } else {
    $("#popupWarning").addClass(MISAEnum.popup.SHOW);
  }
}

/**
 * hiện popup ask
 * Author: Tô Nguyễn Đức Mạnh (02/09/2022)
 */

function askPopupToggle() {
  if ($("#popupAsk").hasClass(MISAEnum.popup.SHOW)) {
    $("#popupAsk").removeClass(MISAEnum.popup.SHOW);
  } else {
    $("#popupAsk").addClass(MISAEnum.popup.SHOW);
  }
}
/**
 * hiện popup askwarning
 * Author: Tô Nguyễn Đức Mạnh (02/09/2022)
 */

function askWarningPopupToggle() {
  if ($("#popupAskWarning").hasClass(MISAEnum.popup.SHOW)) {
    $("#popupAskWarning").removeClass(MISAEnum.popup.SHOW);
  } else {
    $("#popupAskWarning").addClass(MISAEnum.popup.SHOW);
  }
}

/**
 * hiện form thêm nhân viên
 * Author: Tô Nguyễn Đức Mạnh (02/09/2022)
 */

function formToggle() {
  if ($("#form").hasClass(MISAEnum.form.SHOW)) {
    $("#form").removeClass(MISAEnum.form.SHOW);
  } else {
    $("#form").addClass(MISAEnum.form.SHOW);
  }
}

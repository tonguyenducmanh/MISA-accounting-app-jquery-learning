/**
 * chỉ cho phép số được nhập vào trong input
 * Author: Tô Nguyễn Đức Mạnh (09/09/2022)
 */

function isNumber(evt){
    try {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error)
    }
}

export default isNumber
/**
 * tạo chức năng khi nhấn vào label nào thì input radio tương ứng sẽ
 * có thêm attribute là checked.
 * Author : Tô Nguyễn Đức Mạnh (07/09/2022)
 */

function checked(e){
    try {
        console.log("hihi")
        // remove checked ở các radio khác đi
        let buttons = $("#form .radio .form__gender")
        for(const button of buttons){
            $(button).removeAttr("checked")
        }
        // thêm checked vào cái đang dùng
        $(e.target).attr("checked","")
    } catch (error) {
        console.log(error)
    }
}

export default checked
import MISAEnum from "../../enum.js"
import handleForm from "./handleForm.js"

/**
 * Xử lý việc nhấn nhiều phím 1 lúc trên bàn phím
 * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
 */
var handleMultipleKey = {
    /**
     * khi ấn ctrl + Q thì sẽ ẩn popup ask và ẩn form
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
    ctrlQ(event){
        if(event[MISAEnum.keyname.control] && event.code === MISAEnum.keyname.q){
            handleForm.exitForm()
        }
    },
    /**
     * Khi ấn shift + A thì sẽ hiện form thêm mới nhanh
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
    shiftA(event){
        if(event[MISAEnum.keyname.shift] && event.code === MISAEnum.keyname.a){
            handleForm.showForm()
        }
    }
}

export default handleMultipleKey
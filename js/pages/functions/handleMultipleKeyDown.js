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
            // ngăn việc nhập linh tinh vào input
            event.preventDefault();
            handleForm.showForm()
        }
    },
    /**
     * Khi ấn ctrl + S thì sẽ lưu và ẩn form
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
    ctrlS(event){
        if(event[MISAEnum.keyname.control] && event.code === MISAEnum.keyname.s){
            console.log("đã lưu và ẩn")
            // ngăn việc ấn ctrl S lưu web
            event.preventDefault();
            // hàm xử lý lưu vào db

            // ẩn form
            handleForm.cancelForm()
            handleForm.exitForm()
        }
    },
    /**
     * Khi ấn ctrl + shift + S thì sẽ lưu và clear form
     * Author: Tô Nguyễn Đức Mạnh (06/09/2022)
     */
    ctrlShiftS(event){
        if(event[MISAEnum.keyname.control] && event[MISAEnum.keyname.shift] && event.code === MISAEnum.keyname.s){
            console.log("đã lưu và clear form")
            // hàm xử lý lưu vào db

            // hàm clear form
        }
    },
}

export default handleMultipleKey
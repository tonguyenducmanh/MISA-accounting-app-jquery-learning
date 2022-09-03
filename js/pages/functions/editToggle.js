/**
 * tính năng toggle giúp ẩn hiện menu edit của mỗi record
 * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
 */

import MISAEnum from "../../enum.js"

function editToggle(e){
    // thực hiện toggle
    let newToggle = $(e.target).parents(".contextmenu__main").children(".contextmenu__dropicon")
    if($(newToggle).hasClass(MISAEnum.contextMenu.SHOW)){
        $(newToggle).removeClass(MISAEnum.contextMenu.SHOW)
    }else{
        $(newToggle).addClass(MISAEnum.contextMenu.SHOW)
    }
}

/**
 * ấn ra ngoài toggle thì ẩn toàn bộ toggle
 * (của tất cả toggle) đi, tránh trường hợp hiện khi không dùng
 * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
 */

 export function clickOutToggle(e) {
    try {
        // chọn các toggle data có trong DOM
        let oldToggle = $(".main .contextmenu__dropicon")

        // nếu click ra ngoài thì ẩn hết toggle data đi
        if (!oldToggle.is(e.target)) {
            oldToggle.removeClass(MISAEnum.contextMenu.SHOW);
        }
    } catch (error) {
        console.log(error)
    }
}


export default editToggle
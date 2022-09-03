var MISAEnum = {
    // các mã phím keycode
    keycode:{
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ENTER: 13,
        ESC:27,
    },
    // các từ khóa liên quan tới popup
    popup:{
        ALERT: "popup--alert",
        WARNING: "popup--warning",
        ASK : "popup--ask",
        SHOW: "popup__wrap--show",
    },
    form:{
        SHOW: "form__wrap--show",
    },
    contextMenu:{
        SHOW: "contextmenu__dropicon--clicked",
    },
    pageNavigation:{
        DISABLE: "page__number--disable",
        SELECTED: "page__count--selected"
    },
    API:{
        GETEMPLOYEELIST:"https://cukcuk.manhnv.net/api/v1/Employees",
        GETEMPLOYEEFILTER: "https://cukcuk.manhnv.net/api/v1/Employees/filter",
    },
    table:{
        HIDE: "table__wrap--hide",
        tdEdit:`<td class="text__align--center">    
        <div class="contextmenu">
            <div class="contextmenu__main">
                <div class="contextmenu__button">
                    Sửa
                </div>
                <div class="contextmenu__dropicon">
                    <div class="contextmenu__menu">
                        <div class="contextmenu__item">Nhân bản</div>
                        <div class="contextmenu__item">Xóa</div>
                        <div class="contextmenu__item">Ngưng sử dụng</div>
                    </div>
                </div>
            </div>
        </div>
    </td>`,
    },

}

export default MISAEnum
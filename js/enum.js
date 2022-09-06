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
    // các tên phím keyboard
    keyname:{
        control: "ctrlKey",
        q: "KeyQ",
        s: "KeyS",
        a: "KeyA",
        shift: "shiftKey",
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
        NEWEMPLOYEECODE: "https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
    },
    table:{
        HIDE: "table__wrap--hide",
    },

}

export default MISAEnum
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
        k: "KeyK",
        shift: "shiftKey",
    },
    // các từ khóa liên quan tới popup
    popup:{
        ALERT: "popup--alert",
        WARNING: "popup--warning",
        ASK : "popup--ask",
        SHOW: "popup__wrap--show",
    },
    // các từ khóa liên quan tới form
    form:{
        SHOW: "form__wrap--show",
        EDIT: "PUT",
        CREATE: "POST",
    },
    // các từ khóa liên quan tới contextmenu
    contextMenu:{
        SHOW: "contextmenu__dropicon--clicked",
        UP: "contextmenu__menu--up",
    },
    // các từ khóa liên quan tới phân trang
    pageNavigation:{
        DISABLE: "page__number--disable",
        SELECTED: "page__count--selected"
    },
    // các địa chỉ api
    API:{
        GETEMPLOYEELIST:"https://cukcuk.manhnv.net/api/v1/Employees",
        GETEMPLOYEEFILTER: "https://cukcuk.manhnv.net/api/v1/Employees/filter",
        NEWEMPLOYEECODE: "https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
    },
    // các từ khóa liên quan tới table
    table:{
        HIDE: "table__wrap--hide",
    },
    // ngôn ngữ hiện tại đang dùng là tiếng Việt
    language:"VI",
    // kiểu lưu là cất hay cất và thêm
    saveType:{
        save:"Lưu",
        saveAndAdd:"Lưu và thêm",
    },
}

export default MISAEnum
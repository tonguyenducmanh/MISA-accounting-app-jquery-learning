/**
 * Thêm sự kiện validate form
 * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
 */

var validate ={
    /**
     * Check có điều kiện xem các ô nhập musthave có trống không?
     * Nếu trống thì cần thêm border màu đỏ để thông báo.
     * Author: Tô Nguyễn Đức Mạnh (08/09/2022)
     */
    mustHaveCheck(e){
        try {
            let currentELe = $(e.target)
            if($(currentELe).val() === ""){
                $(currentELe).addClass("input__field--alert")
            }else{
                $(currentELe).removeClass("input__field--alert")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default validate
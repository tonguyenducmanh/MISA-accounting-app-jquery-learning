/**
 * Thêm checkbox kèm id vào đầu mỗi tr trong table
 * @param {string} id
 * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
 */
function tdCheckbox(id) {
  try {
    let result = `
            <td>
                <div class="checkbox">
                    <input type="checkbox" class="checkbox__button" id="checkbox__${id}">
                    <label tabindex="0" class="checkbox__label" for="checkbox__${id}"></label>
                </div>
            </td>
            `;
    return result;
  } catch (error) {
    console.log(error);
  }
}
export default tdCheckbox;

import { trashIcon } from "../images/trashIcon";

export function createTask(todoObj) {
  const { value, timeCompleted, timeCreated, checked, id } = todoObj;
  const check = checked ? "checked" : "";
  return value
    ? `<div class="task">
            <div class="task__content">
              <div class="task__content-left">
                <input type="checkbox" id="check-item-${id}" ${check} onclick="checkTask(this)">
                <p id="edit-mode-${id}-${check}" class="task__content-text" ondblclick="editInput(this)">${value}</p>
              </div>         
              <div class="task__content__time">
                <span class="task__content__time-created">${timeCreated}</span>
                <span class="task__content__time-done">${timeCompleted}</span>
              </div>
            </div>
            <div class="task__delete">
                ${trashIcon(id, check)}
            </div>
        </div>`
    : "";
}

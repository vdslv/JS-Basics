import { operationTypes, listEnum } from "../enums";
import { createTask } from "../components/task";
import { doneTasks, openedTasks } from "../index";

export function render(arr, listName, operationType = operationTypes.add) {
  if (!arr.length && listName === listEnum.doneList) {
    doneTasks.innerHTML = "";
    return;
  } else if (!arr.length && listName === listEnum.todoList) {
    openedTasks.innerHTML = "";
    return;
  }

  if (listName === listEnum.doneList) {
    operationType === operationTypes.delete ? (doneTasks.innerHTML = "") : null;
    arr.forEach((el) => {
      doneTasks.innerHTML += createTask(el);
    });
  } else {
    operationType === operationTypes.delete
      ? (openedTasks.innerHTML = "")
      : null;
    arr.forEach((el) => {
      openedTasks.innerHTML += createTask(el);
    });
  }
}

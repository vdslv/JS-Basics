import { doneTasks, openedTasks } from "../index";
import { getId, getIndex, getDate } from "../helpers";

export function handleCheck(e, doneArr, todoArr) {
  let index, temporaryStorage;
  const id = getId(e);

  doneTasks.innerHTML = "";
  openedTasks.innerHTML = "";

  if (e.checked) {
    const date = new Date();
    const timeCompleted = getDate(date);
    index = getIndex(todoArr, id);
    temporaryStorage = todoArr.splice(index, 1)[0];
    doneArr.push({
      ...temporaryStorage,
      checked: true,
      timeCompleted,
      dueDate: date.getTime(),
    });
  } else {
    index = getIndex(doneArr, id);
    temporaryStorage = doneArr.splice(index, 1)[0];
    todoArr.push({
      ...temporaryStorage,
      checked: false,
      timeCompleted: "",
      dueDate: null,
    });
  }

  return { todo: todoArr, done: doneArr };
}

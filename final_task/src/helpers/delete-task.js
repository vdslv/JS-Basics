import { getId, getIndex } from "./get-id";

export function deleteTask(event, doneArr, todoArr) {
  const id = getId(event.target);
  if (event.target.classList[0].includes("checked")) {
    let index = getIndex(doneArr, id);
    doneArr.splice(index, 1);
  } else {
    let index = getIndex(todoArr, id);
    todoArr.splice(index, 1);
  }

  return { todo: todoArr, done: doneArr };
}

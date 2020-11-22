import { listEnum } from "../enums";

export function clearList(arr, listName) {
  let result = [];
  if (listName === listEnum.doneList) {
    localStorage.removeItem("done");
  } else {
    localStorage.removeItem("todo");
  }

  return result;
}

import { render } from "./render";
import { listEnum, operationTypes } from "../enums";

export function search(todoArray, doneArray, searchText) {
  let todoForRender = filterSearch(todoArray, searchText);
  let doneForRender = filterSearch(doneArray, searchText);

  render(todoForRender, listEnum.todoList, operationTypes.delete);
  render(doneForRender, listEnum.doneList, operationTypes.delete);
}

function filterSearch(arr, text) {
  return arr.filter((el) =>
    el.value.toLowerCase().includes(text.toLowerCase())
  );
}

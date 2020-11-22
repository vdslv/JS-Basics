import { setLocalStorage } from "./set-local-storage";

export function setEditedField(objToSet) {
  objToSet.value = "";
  objToSet.checked = false;
  objToSet.element = null;
}

export function handleEditEvent(
  todoArray,
  doneArray,
  idGenerator,
  editedFieldValue
) {
  setEditedField(editedFieldValue);
  setLocalStorage(todoArray, doneArray, idGenerator);
}

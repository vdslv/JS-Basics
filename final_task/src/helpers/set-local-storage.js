export function setLocalStorage(todoArray, doneArray, idGen) {
  localStorage.setItem("todo", JSON.stringify(todoArray));
  localStorage.setItem("done", JSON.stringify(doneArray));
  localStorage.setItem("id", JSON.stringify(idGen));
}

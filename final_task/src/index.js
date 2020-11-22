import "./scss/styles.scss";
import "./components/task.scss";
import {
  setLocalStorage,
  clearList,
  render,
  handleCheck,
  getDate,
  deleteTask,
  getId,
  search,
  findIndex,
  handleEditEvent,
  handleSorting,
} from "./helpers";
import { listEnum, operationTypes } from "./enums";
import { createTask } from "./components/task";

export const openedTasks = document.querySelector(".tasks__open");
export const doneTasks = document.querySelector(".tasks__done");
export let todoArray = [];
export let doneArray = [];
export let fieldInEdit = false;
export const editedFieldValue = {
  element: null,
  value: "",
  checked: false,
  storeOldValue: "",
};

const taskText = document.getElementById("new-task__input");
const addNewTaskBtn = document.getElementById("new-task__btn");
const searchInputElement = document.getElementById("header__search");
const dropdownSortDoneElement = document.getElementById("tasks__sorted-done");
const dropdownSortOpenElement = document.getElementById("tasks__sorted-open");
let idGenerator = 0;
let inputIdsGenerator = 0;
let filteredString = "";

function onInit() {
  let todoStorage = JSON.parse(localStorage.getItem("todo"));
  let doneStorage = JSON.parse(localStorage.getItem("done"));
  let idsGenerated = JSON.parse(localStorage.getItem("id"));
  let doneSortingFilter = localStorage.getItem("doneSortingFilter");
  let todoSortingFilter = localStorage.getItem("todoSortingFilter");

  if (doneStorage || todoStorage) {
    idGenerator = idsGenerated;
  } else {
    localStorage.setItem("id", idGenerator);
  }

  doneSortingFilter
    ? (dropdownSortDoneElement.value = doneSortingFilter)
    : null;
  todoSortingFilter
    ? (dropdownSortOpenElement.value = todoSortingFilter)
    : null;

  if (todoStorage) {
    todoArray = todoStorage;
    render(todoArray, listEnum.todoList);
  }
  if (doneStorage) {
    doneArray = doneStorage;
    render(doneArray, listEnum.doneList);
  }
}

window.editInput = function (tdElement) {
  if (fieldInEdit) {
    return alert("Complete opened input");
  }
  fieldInEdit = true;
  const defaultValue = tdElement.innerText;
  editedFieldValue.element = tdElement;
  editedFieldValue.value = defaultValue;
  editedFieldValue.storeOldValue = defaultValue;
  ++inputIdsGenerator;
  tdElement.innerHTML = `<input id="input-edit-${inputIdsGenerator}"
     class="input-edit-mode"
     type="text"
     value="${defaultValue}"
     oninput="assignValue(this)" />
    `;

  tdElement.id.includes("checked") ? (editedFieldValue.checked = true) : null;
  document.getElementById(`input-edit-${inputIdsGenerator}`).focus();
};

window.assignValue = function (input) {
  editedFieldValue.value = input.value;
};

function handleAddClick() {
  if (taskText.value) {
    const date = new Date();
    const time = getDate(date);

    const newTodoItem = {
      value: taskText.value,
      dateCreated: date.getTime(),
      timeCreated: time,
      dueDate: null,
      timeCompleted: "",
      checked: false,
      id: (idGenerator += 1),
    };

    todoArray.push(newTodoItem);

    if (!filteredString) {
      openedTasks.innerHTML += createTask(newTodoItem);
    }

    search(todoArray, doneArray, filteredString);
    setLocalStorage(todoArray, doneArray, idGenerator);
    taskText.value = "";
  }
}

addNewTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddClick();
});

searchInputElement.addEventListener("input", (e) => {
  filteredString = e.target.value;
  if (filteredString) {
    render(todoArray, listEnum.todoList);
    render(doneArray, listEnum.doneList);
  }
  search(todoArray, doneArray, filteredString);
});

window.clearDoneTasks = function () {
  if (fieldInEdit) return;
  doneArray = clearList(doneArray, listEnum.doneList);
  render(doneArray, listEnum.doneList);
};

window.clearTodoTasks = function () {
  if (fieldInEdit) return;
  todoArray = clearList(todoArray, listEnum.todoList);
  render(todoArray, listEnum.todoList);
};

window.sortTasks = function (string, element) {
  let arrayToSort;
  if (string === "done") {
    arrayToSort = doneArray;
  } else {
    arrayToSort = todoArray;
  }

  arrayToSort = handleSorting(element, arrayToSort);
  if (string === "done") {
    doneArray = arrayToSort;
    localStorage.setItem("doneSortingFilter", element.value);
    render(doneArray, listEnum.doneList, operationTypes.delete);
  } else {
    todoArray = arrayToSort;
    localStorage.setItem("todoSortingFilter", element.value);
    render(todoArray, listEnum.todoList, operationTypes.delete);
  }
  setLocalStorage(todoArray, doneArray, idGenerator);
};

window.checkTask = function (htmlElement) {
  if (fieldInEdit) {
    htmlElement = null;
    return;
  }
  let { todo, done } = handleCheck(htmlElement, doneArray, todoArray);
  todoArray = todo;
  doneArray = done;

  if (filteredString) {
    search(todoArray, doneArray, filteredString);
    setLocalStorage(todoArray, doneArray, idGenerator);
    return;
  }

  setLocalStorage(todoArray, doneArray, idGenerator);
  render(todoArray, listEnum.todoList);
  render(doneArray, listEnum.doneList);
};

document.addEventListener("click", (e) => {
  if (fieldInEdit && !e.target.id.includes("input-edit")) {
    e.preventDefault();
    return alert("Complete opened input");
  }

  if (e.target.id.includes("remove")) {
    let { todo, done } = deleteTask(e, doneArray, todoArray);
    todoArray = todo;
    doneArray = done;

    if (filteredString) {
      search(todoArray, doneArray, filteredString);
      setLocalStorage(todoArray, doneArray, idGenerator);
      return;
    }

    setLocalStorage(todoArray, doneArray, idGenerator);
    render(todoArray, listEnum.todoList, operationTypes.delete);
    render(doneArray, listEnum.doneList, operationTypes.delete);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && fieldInEdit) {
    let index;
    const id = getId(editedFieldValue.element);

    if (editedFieldValue.checked) {
      index = findIndex(doneArray, id);
      doneArray[index].value = editedFieldValue.value;
    } else {
      index = findIndex(todoArray, id);
      todoArray[index].value = editedFieldValue.value;
    }

    editedFieldValue.element.innerHTML = editedFieldValue.value;
    fieldInEdit = false;
    handleEditEvent(todoArray, doneArray, idGenerator, editedFieldValue);
  }

  if (e.key === "Escape" && fieldInEdit) {
    editedFieldValue.element.innerHTML = editedFieldValue.storeOldValue;
    fieldInEdit = false;
    handleEditEvent(todoArray, doneArray, idGenerator, editedFieldValue);
  }
});

onInit();

import "./scss/styles.scss";
import { createTask } from "./js/task";

const taskText = document.getElementById("new-task__input");
const addNewTaskBtn = document.getElementById("new-task__btn");

addNewTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddClick();
});

function handleAddClick() {
  const openedTasks = document.querySelector(".tasks__open");
  openedTasks.innerHTML += createTask(taskText.value);
  taskText.value = "";
}

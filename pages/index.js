import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from '../components/Todo.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import FormValidator from '../components/FormValidator.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector("#add-todo-form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const toDoData = getToDoDataFromEvent(evt);
  createTodo(toDoData);
  
  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

function getToDoDataFromEvent(evt) {
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();

  return {name, date, id};
}

function createTodo(values) {
  const todo = new Todo(values, validationConfig.todoTemplateSelector);
  todosList.append(todo.getView());
}

initialTodos.forEach((item) => {
  createTodo(item);
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

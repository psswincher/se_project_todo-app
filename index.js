import { addTodoButton, addTodoForm, todosListSelector, initialTodos, validationConfig } from "./utils/constants.js";
import Todo from './components/Todo.js';
import { v4 as uuidv4 } from './node_modules/uuid/dist/index.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js'
import PopupWithForm from './components/PopupWithForm.js';
import ToDoCounter from './components/ToDoCounter.js';
import './index.css'

addTodoButton.addEventListener("click", () => {
  newTodoForm.open();
});

function makeTodo(item) {
  const todo = new Todo({ data: item, id: new uuidv4, selector: validationConfig.todoTemplateSelector, 
    onCheckBoxClick: () => {
      toDoCounter.updateCompleted(todo.getCompletedStatus());
    },
    onDelete: () => {
      toDoCounter.updateTotal(false);
      if (todo.getCompletedStatus()) toDoCounter.updateCompleted(false)
    }
});
  return todo.getView();
}

const toDoCounter = new ToDoCounter(initialTodos, validationConfig.todoCounterSelector);
toDoCounter.updateText();

const todoSection = new Section({items: initialTodos, 
  renderer: (item) => {
    const todo = makeTodo(item);
    todoSection.addItem(todo)
}, containerSelector: todosListSelector});

todoSection.renderItems();

const newTodoForm = new PopupWithForm({ 
  popupSelector: validationConfig.todoPopupSelector, 
  onSubmitCallback: (inputValues) => {
    console.log(inputValues);
    const newTodo = makeTodo(inputValues);

    todoSection.addItem(newTodo);
    newTodoForm.close();
    formValidator.resetValidation();
    toDoCounter.updateTotal(true);
  }
});

newTodoForm.setEventListeners();

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();


import { addTodoButton, addTodoForm, todosList, initialTodos, validationConfig } from "../utils/constants.js";
import Todo from '../components/Todo.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import FormValidator from '../components/FormValidator.js';
import Section from '../utils/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import ToDoCounter from '../components/ToDoCounter.js';

addTodoButton.addEventListener("click", () => {
  newTodoForm.open();
});

const toDoCounter = new ToDoCounter(initialTodos, validationConfig.todoCounterSelector);
toDoCounter._updateText();

const todoSection = new Section({items: initialTodos, 
  renderer: (item) => {
    const todo = new Todo({ data: item, id: new uuidv4, selector: validationConfig.todoTemplateSelector, 
      onCheckBoxClick: () => {
        toDoCounter.updateCompleted(todo._getCompletedStatus());
      },
      onDelete: () => {
        toDoCounter.updateTotal(false);
        if (todo._getCompletedStatus()) toDoCounter.updateCompleted(false)
      }
  });
    todosList.append(todo.getView())
}, containerSelector: todosList});

todoSection.renderItems();

const newTodoForm = new PopupWithForm({ 
  popupSelector: validationConfig.todoPopupSelector, 
  onSubmitCallback: (inputValues) => {
    todoSection.addItem(inputValues);
    newTodoForm.close();
    formValidator.resetValidation();
    toDoCounter.updateTotal(true);
  }
});

newTodoForm.setEventListeners();

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();


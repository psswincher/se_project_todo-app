import { addTodoButton, addTodoForm, todosList, initialTodos, validationConfig } from "../utils/constants.js";
import Todo from '../components/Todo.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import ToDoCounter from '../components/ToDoCounter.js';

addTodoButton.addEventListener("click", () => {
  newTodoForm.open();
});

function makeToDo(item) {
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
    const todo = makeToDo(item);
    //My last code review requested that change the below line to call on the Section class to append the to do item
    //However, this renderer declaration is part of the Section class and making the recommending edit creates a circular reference
    //I'm not sure what other change to make.
    todosList.append(todo)
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


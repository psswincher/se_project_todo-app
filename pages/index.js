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

function makeToDo({ itemData, onCheckBoxClickFunc, onDeleteFunc}) {
  const newTodo = new Todo({ data: itemData, id: new uuidv4, selector: validationConfig.todoTemplateSelector, 
    onCheckBoxClick: onCheckBoxClickFunc,
    onDelete: onDeleteFunc
});
return newTodo.getView();
}

const toDoCounter = new ToDoCounter(initialTodos, validationConfig.todoCounterSelector);
toDoCounter.updateText();

const todoSection = new Section({items: initialTodos, 
  renderer: (item) => {
    const todo = makeToDo({ itemData: item,  
      onCheckBoxClickFunc: () => {
        toDoCounter.updateCompleted(todo.getCompletedStatus());
      },
      onDeleteFunc: () => {
        toDoCounter.updateTotal(false);
        if (todo.getCompletedStatus()) toDoCounter.updateCompleted(false)
      }
  });
  //if I update this per code review to not reference todoList and instead use todoSection.addItem it creates a circular reference.
  //is there another approach, or some other refactor I need to do?
    todosList.append(todo);
}, containerSelector: validationConfig.containerSelector});

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


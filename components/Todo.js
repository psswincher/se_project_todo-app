export default class Todo {
    constructor(data, selector = "#todo-template") {
        this._todoTemplate = document.querySelector(selector);
        this._todoElement = this._todoTemplate.content
            .querySelector(".todo") 
            .cloneNode(true);
        this._todoNameEl = this._todoElement.querySelector(".todo__name");
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");
        this._todoDate = this._todoElement.querySelector(".todo__date");
        this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
        
        this._setToDoName(data.name);
        this._setCheckboxEl(data.completed);
            
        this._setIdAndLabel(data.id);
        this._setDueDate(data.date);

        this._setEventListeners();
    }

    _setToDoName(name = "Blank name") {
        this._todoNameEl.textContent = name;
    }

    _setCheckboxEl(bool) {
        this._todoCheckboxEl.checked = bool;
    }

    _setIdAndLabel(id) {
      this._todoCheckboxEl.id = `todo-${id}`;
      this._todoLabel.setAttribute("for", `todo-${id}`);
    }

    _setDueDate(date) {
        if (!isNaN(date)) {
            this._todoDate.textContent = `Due: ${date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}`;
          }
    }

    _setEventListeners() {
        this._todoDeleteBtn.addEventListener("click", () => {
            this._todoElement.remove();
        });
    }

    getView() {
        return this._todoElement;
    }
}
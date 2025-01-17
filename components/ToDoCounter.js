class TodoCounter {
    constructor(todos, selector) { //=".counter"
      this._element = document.querySelector(selector);
      this._completed = todos.filter(todo => todo.completed === true).length;
      this._total = todos.length;
    }
    
      updateCompleted = (increment) => {
        increment ? this._completed += 1 : this._completed -= 1;
        this._completed > this._total ? this._completed = this._total : null;
        this._completed < 0 ? this._completed = 0 : null;
        this.updateText();
    };

    updateTotal = (increment) => {
        increment ? this._total += 1 : this._total -= 1;
        this.updateText();

    };
  
    updateText() {
      this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
  }
  
  export default TodoCounter;
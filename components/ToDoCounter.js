class TodoCounter {
    constructor(todos, selector) { //=".counter"
      this._element = document.querySelector(selector);
      console.log(todos.filter(todo => todo.completed === true).length);
      this._completed = todos.filter(todo => todo.completed === true).length;
      console.log(this._completed);
      this._total = todos.length;
    }
    
      updateCompleted = (increment) => {
        increment ? this._completed += 1 : this._completed -= 1;
        this._completed > this._total ? this._completed = this._total : null;
        this._completed < 0 ? this._completed = 0 : null;
        this._updateText();
    };

    updateTotal = (increment) => {
        increment ? this._total += 1 : this._total -= 1;
        this._updateText();

    };
  
    _updateText() {
      this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
  }
  
  export default TodoCounter;
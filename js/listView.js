class ListView {
  _todoListElement = document.querySelector(".todo-list");
  renderTodoTasksList(taskList) {
    console.log(this._todoListElement);
    console.log(taskList);
  }
}

export default new ListView();

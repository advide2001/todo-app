class ListView {
  _todoListElement = document.querySelector(".todo-list");
  _todoListItemsWrapper = document.querySelector(".list-items__wrapper");
  _taskCountElement = document.querySelector(".tasks__count");

  // Generate markup for the completed list item
  _generateCompletedTodoTaskMarkup(task, id) {
    return `
      <li class="todo-list__item">
        <div class="flex ai-center">
          <input class="item__checkbox item__checkbox--checked" type="checkbox" id="${id}" name="${id}">
          <label class="item__label item__label--checked" for="${id}">${task}</label>
        </div>
        <button class="delete-button button__svg" data-icon="delete"><span class="sr-only">Delete Task</span></button>
      </li>`;
  }

  // Generate markup for the active list item
  _generateActiveTodoTaskMarkup(task, id) {
    return `
      <li class="todo-list__item">
        <div class="flex ai-center">
          <input class="item__checkbox" type="checkbox" id="${id}" name="${id}">
          <label class="item__label" for="${id}">${task}</label>
        </div>
        <button class="delete-button button__svg" data-icon="delete"><span class="sr-only">Delete Task</span></button>
      </li>`;
  }

  _generateAllTodoTasksList(taskList, activeFilter) {
    let completedTasksMarkup = "";
    let activeTasksMarkup = "";

    // Loop through the task list and generate markup
    Object.entries(taskList).forEach(([id, task]) => {
      if (task.completed)
        completedTasksMarkup += this._generateCompletedTodoTaskMarkup(
          task.task,
          id
        );
      else
        activeTasksMarkup += this._generateActiveTodoTaskMarkup(task.task, id);
    });

    if (activeFilter === "all") return activeTasksMarkup + completedTasksMarkup;
    if (activeFilter === "active") return activeTasksMarkup;
    if (activeFilter === "completed") return completedTasksMarkup;
  }

  renderTaskCount(activeTasksCount) {
    let markup = "";
    if (activeTasksCount === 0) markup = `No tasks left`;
    if (activeTasksCount === 1) markup = `${activeTasksCount} task left`;
    if (activeTasksCount > 1) markup = `${activeTasksCount} tasks left`;
    this._taskCountElement.innerHTML = markup;
  }

  renderAllTodoTasksList(taskList, activeFilter) {
    // Clear the list
    this._todoListItemsWrapper.innerHTML = "";
    // Generate markup
    const markup = this._generateAllTodoTasksList(taskList, activeFilter);
    this._todoListItemsWrapper.insertAdjacentHTML("afterbegin", markup);
  }

  renderNewTodoTask(task, id) {
    // Generate markup
    const markup = this._generateActiveTodoTaskMarkup(task, id);
    // Add it to the top of the existing list
    this._todoListItemsWrapper.insertAdjacentHTML("beforeend", markup);
  }

  deleteTodoTask(taskID) {
    // Get the task element and then remove it from the DOM
    const todoTask = document.getElementById(taskID);
    todoTask.closest("li").remove();
  }

  addHandlerTodoTextbox(handler) {
    const todoTextbox = document.querySelector(".todo__textbox");
    todoTextbox.value = "";
    todoTextbox.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handler(todoTextbox.value);
        todoTextbox.value = "";
      }
    });
  }

  addHandlerDeleteTodoTask(handler) {
    this._todoListElement.addEventListener("click", function (e) {
      const deleteButton = e.target.closest(".delete-button");
      if (!deleteButton) return;
      const taskID = deleteButton.closest("li").querySelector("input").id;
      handler(taskID);
    });
  }
}

export default new ListView();

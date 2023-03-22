class ListView {
  _todoListElement = document.querySelector(".todo-list");
  _todoListItemsWrapper = document.querySelector(".list-items__wrapper");
  _taskCountElement = document.querySelector(".tasks__count");
  _clearCompletedButton = document.querySelector(".clear-completed-button");
  _filterTasksButton = document.querySelector(".task-button-group");
  _toggleThemeButton = document.querySelector(".theme-toggle-button");

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

  // Auxiliary function to switch the color variables
  _useLightColors() {
    document.documentElement.style.setProperty(
      "--clr-primary-100",
      "237, 12%, 35%"
    );
    document.documentElement.style.setProperty(
      "--clr-primary-200",
      "249, 5%, 74%"
    );
    document.documentElement.style.setProperty(
      "--clr-primary-300",
      "0, 0%, 100%"
    );
    document.documentElement.style.setProperty(
      "--clr-primary-400",
      "0, 0%, 98%"
    );
  }
  _useDarkColors() {
    document.documentElement.style.setProperty(
      "--clr-primary-100",
      "60, 14%, 99%"
    );
    document.documentElement.style.setProperty(
      "--clr-primary-200",
      "238, 14%, 42%"
    );
    document.documentElement.style.setProperty(
      "--clr-primary-300",
      "235, 24%, 19%"
    );
    document.documentElement.style.setProperty(
      "--clr-primary-400",
      "240, 20%, 12%"
    );
  }

  // Auxiliary function to switch the bg img variables
  _useLightBgImg() {
    document.documentElement.style.setProperty(
      "--bg-img-mobile",
      "url(./../../images/bg-mobile-light.jpg)"
    );
    document.documentElement.style.setProperty(
      "--bg-img-desktop",
      "url(./../../images/bg-desktop-light.jpg)"
    );
  }
  _useDarkBgImg() {
    document.documentElement.style.setProperty(
      "--bg-img-mobile",
      "url(./../../images/bg-mobile-dark.jpg)"
    );
    document.documentElement.style.setProperty(
      "--bg-img-desktop",
      "url(./../../images/bg-desktop-dark.jpg)"
    );
  }
  // Auxiliary function to switch the svg icon variables
  _useLightSvgIcons() {
    document.documentElement.style.setProperty(
      "--theme-toggle-icon",
      "url(./../../images/icon-moon.svg)"
    );
  }
  _useDarkSvgIcons() {
    document.documentElement.style.setProperty(
      "--theme-toggle-icon",
      "url(./../../images/icon-sun.svg)"
    );
  }

  // Function to modify the variables in root element of the css
  switchVariableInRoot(userPrefersTheme) {
    // delete later
    if (userPrefersTheme === "light") {
      this._useLightColors();
      this._useLightBgImg();
      this._useLightSvgIcons();
    }
    if (userPrefersTheme === "dark") {
      this._useDarkColors();
      this._useDarkBgImg();
      this._useDarkSvgIcons();
    }
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

  renderCurrentFilter(prevFilter, activeFilter) {
    // Remove the active class from the previous filter
    document
      .querySelector(`[data-filter="${prevFilter}"]`)
      .classList.remove("button__primary--active");
    // Add the active class to the current filter
    document
      .querySelector(`[data-filter="${activeFilter}"]`)
      .classList.add("button__primary--active");
  }

  deleteTodoTask(taskID) {
    // Get the task element and then remove it from the DOM
    const todoTask = document.getElementById(taskID);
    todoTask.closest("li").remove();
  }

  toggleCompleteTask(taskID) {
    // Get the task element and then toggle the completed class
    const todoTask = document.getElementById(taskID);
    todoTask.classList.toggle("item__checkbox--checked");
    todoTask.nextElementSibling.classList.toggle("item__label--checked");
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

  addHandlerCompleteTodoTask(handler) {
    this._todoListElement.addEventListener("click", function (e) {
      const checkbox = e.target.closest(".item__checkbox");
      if (!checkbox) return;
      const taskID = checkbox.id;
      handler(taskID);
    });
  }

  addHandlerClearCompletedTasks(handler) {
    this._clearCompletedButton.addEventListener("click", function (e) {
      handler();
    });
  }

  addHandlerFiterTodoTasks(handler) {
    this._filterTasksButton.addEventListener("click", function (e) {
      const filterButton = e.target.closest(".button__primary");
      if (!filterButton) return;
      const activeFilter = filterButton.dataset.filter;
      handler(activeFilter);
    });
  }

  addHandlerToggleTheme(handler) {
    this._toggleThemeButton.addEventListener("click", function (e) {
      handler();
    });
  }
}

export default new ListView();

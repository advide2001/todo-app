import * as model from "./model.js";
import listView from "./listView.js";

const init = function () {
  listView.renderTodoTasksList(model.state.todotasks);
};
init();

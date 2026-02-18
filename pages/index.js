import { initialTodos, validationConfig } from "../utils/constants.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
// const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const generateTodo = (data) => {
  const newTodo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = newTodo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const el = generateTodo(item);

  section.addItem(el);
};

const handleFormSubmit = (data) => {
  const id = uuidv4();
  const values = { name: data.name, id, completed: false, date: data.date };
  renderTodo(values);
  todoCounter.updateTotal(true);
  addTodoPopup.close();
};
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit,
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const element = generateTodo(item);
    section.addItem(element);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

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
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close"); // ??
const todosList = document.querySelector(".todos__list");

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
  todosList.append(el);
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    renderTodo(inputValues);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

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

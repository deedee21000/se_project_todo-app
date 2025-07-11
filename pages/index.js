import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const todoTemplateSelector = "#todo-template";
const counterSelector = ".counter__text";
const addTodoPopupSelector = "#add-todo-popup";

const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, counterSelector);

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const renderTodo = (item) => {
  const todo = new Todo(item, todoTemplateSelector, handleCheck, handleDelete);
  const todoElement = todo.getView();
  section.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
section.renderItems();

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

const addTodoPopup = new PopupWithForm(addTodoPopupSelector, (inputValues) => {
  const date = new Date(inputValues.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const todoData = {
    id: uuidv4(),
    name: inputValues.name,
    date,
    completed: false,
  };
  renderTodo(todoData);
  todoCounter.updateTotal(true);
  addTodoPopup.close();
  formValidator.resetValidation();
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

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
const addTodoForm = document.querySelector(
  `${addTodoPopupSelector} .popup__form`
);

const todoCounter = new TodoCounter(initialTodos, counterSelector);

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, todoTemplateSelector);
    const todoElement = todo.getView();

    todoElement
      .querySelector(".todo__completed")
      .addEventListener("change", (e) => {
        todoCounter.updateCompleted(e.target.checked);
      });

    todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        if (todoElement.querySelector(".todo__completed").checked) {
          todoCounter.updateCompleted(false);
        }
        todoCounter.updateTotal(false);
      });

    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

const addTodoPopup = new PopupWithForm(
  addTodoPopupSelector,
  (inputValues) => {
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const todoData = {
      id: uuidv4(),
      name: inputValues.name,
      date,
      completed: false,
    };
    const todo = new Todo(todoData, todoTemplateSelector);
    const todoElement = todo.getView();

    todoElement
      .querySelector(".todo__completed")
      .addEventListener("change", (e) => {
        todoCounter.updateCompleted(e.target.checked);
      });

    todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        if (todoElement.querySelector(".todo__completed").checked) {
          todoCounter.updateCompleted(false);
        }
        todoCounter.updateTotal(false);
      });

    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
    formValidator.resetValidation();
  },
  formValidator
);
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

export default class Todo {
  constructor(data, templateSelector) {
    this._data = { ...data };
    this._templateSelector = templateSelector;
    this._element = null;
  }

  _setEventListeners() {
    const checkbox = this._element.querySelector(".todo__completed");
    const deleteBtn = this._element.querySelector(".todo__delete-btn");

    checkbox.addEventListener("change", (e) => {
      this._data.completed = e.target.checked;
    });

    deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getView() {
    const template = document.querySelector(this._templateSelector);
    this._element = template.content.querySelector(".todo").cloneNode(true);

    const nameEl = this._element.querySelector(".todo__name");
    const checkboxEl = this._element.querySelector(".todo__completed");
    const labelEl = this._element.querySelector(".todo__label");
    const dateEl = this._element.querySelector(".todo__date");

    nameEl.textContent = this._data.name;
    checkboxEl.checked = this._data.completed;
    checkboxEl.id = `todo-${this._data.id}`;
    labelEl.setAttribute("for", `todo-${this._data.id}`);

    if (this._data.date && !isNaN(new Date(this._data.date))) {
      dateEl.textContent = `Due: ${new Date(this._data.date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }
      )}`;
    }

    this._setEventListeners();
    return this._element;
  }
}

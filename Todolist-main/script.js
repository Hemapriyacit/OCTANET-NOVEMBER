const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todoJson = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();

addButton.addEventListener("click", addTodo);
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  todoJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todoJson));
  showTodos();

  input.value = "";
}

function showTodos() {
  if (todoJson.length === 0) {
    todosHtml.innerHTML = "";
    emptyImage.style.display = "block";
  } else {
    todosHtml.innerHTML = todoJson.map(getTodoHtml).join("");
    emptyImage.style.display = "none";
  }
}

function getTodoHtml(todo, index) {
  const checked = todo.status === "completed" ? "checked" : "";
  return `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)">
        <i class="fa fa-times"></i>
      </button>
    </li>
  `;
}

function updateStatus(checkbox) {
  const todoId = checkbox.id;
  const todoName = checkbox.parentElement.querySelector("span");

  if (checkbox.checked) {
    todoName.classList.add("checked");
    todoJson[todoId].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todoJson[todoId].status = "pending";
  }

  localStorage.setItem("todos", JSON.stringify(todoJson));
}

function remove(todo) {
  const index = todo.dataset.index;
  todoJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todoJson));
}
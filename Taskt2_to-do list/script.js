
const form = document.querySelector('form');
const input = document.querySelector('#task-box');
const taskList = document.querySelector('#task-list');
let yourTask;
let doneCount = document.querySelector(".undone");
let undoneCount = document.querySelector(".done");

form.addEventListener('submit', function (e) {
  e.preventDefault();
  yourTask = input.value;

  if (!yourTask) {
    alert("Please Enter Your Task First");
  } else {
    addNew();
  }
});

function addNew() {
  const task = document.createElement('div');
  task.id = "task";
  taskList.append(task);

  const taskInput = document.createElement('input');
  taskInput.value = yourTask;
  taskInput.setAttribute('readonly', 'readonly');
  taskInput.id = "main-task";
  task.append(taskInput);

  const editButton = createButton("Edit", "edit", "Click here to edit");
  const deleteButton = createButton("Delete", "delete", "Click here to delete");
  const doneButton = createButton("Done", "done", "Click here if you finished");

  task.append(editButton, deleteButton, doneButton);

  deleteButton.addEventListener('click', function (e) {
    deleteAction(e);
  });

  editButton.addEventListener('click', function (e) {
    editAction(e);
  });

  doneButton.addEventListener('click', function (e) {
    doneAction(e);
  });

  yourTask = "";
  reCalculate();
}

function createButton(text, id, title) {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.id = id;
  button.title = title;
  return button;
}

function deleteAction(e) {
  const task = e.target.parentNode;
  task.remove();
  reCalculate();
}

function editAction(e) {
  const task = e.target.parentNode;
  const taskInput = task.querySelector('input');
  const editButton = task.querySelector('#edit');

  if (editButton.innerHTML === "Edit") {
    taskInput.removeAttribute("readonly");
    editButton.innerHTML = "Save";
  } else if (editButton.innerHTML === "Save") {
    taskInput.setAttribute('readonly', 'readonly');
    editButton.innerHTML = "Edit";
  }
}

function doneAction(e) {
  const task = e.target.parentNode;
  const taskInput = task.querySelector('input');
  const doneButton = task.querySelector('.done');

  if (doneButton.innerHTML === "Done") {
    taskInput.classList.add('done-text');
    doneButton.innerHTML = "Undone";
    doneButton.id = "undone";
    reCalculate();
  } else if (doneButton.innerHTML === "Undone") {
    doneButton.innerHTML = "Done";
    taskInput.classList.remove('done-text');
    doneButton.id = "done";
    reCalculate();
  }
}

function reCalculate() {
  const doneButtons = document.querySelectorAll('#done');
  const undoneButtons = document.querySelectorAll('#undone');
  const taskListFirstChild = taskList.firstElementChild;

  if (doneButtons.length === 0 && undoneButtons.length === 0) {
    doneCount.innerHTML = "";
    undoneCount.innerHTML = "";
  } else {
    doneCount.innerHTML = `Done: ${undoneButtons.length}`;
    undoneCount.innerHTML = `Pending: ${doneButtons.length}`;
  }
}

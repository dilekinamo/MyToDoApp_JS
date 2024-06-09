const input = document.querySelector("#input");
const formToDo = document.querySelector("#area_ToDo");
const submit = document.querySelector("#btn-submit");
area_ToDo.addEventListener("click", deleteItem);
area_InProcess.addEventListener("click", deleteItem);
area_Completed.addEventListener("click", deleteItem);
var items = [];

var itemsToDoStr = [];
var itemsInProcessStr = [];
var itemsCompletedStr = [];
var itemsToDoJSON;
var itemsInProcessJSON;
var itemsCompletedJSON;

initializeVariables();

function initializeVariables() {
  itemsToDoStr = [];
  itemsInProcessStr = [];
  itemsCompletedStr = [];
  itemsToDoJSON = localStorage.getItem("itemsToDoInLS");
  if (itemsToDoJSON === null) {
    console.log("itemsToDoJSON: " + itemsCompletedJSON);
    localStorage.setItem("itemsToDoInLS", JSON.stringify(itemsToDoStr));
  }
  itemsInProcessJSON = localStorage.getItem("itemsInProcessInLS");
  if (itemsInProcessJSON === null) {
    localStorage.setItem(
      "itemsInProcessInLS",
      JSON.stringify(itemsInProcessStr)
    );
  }
  itemsCompletedJSON = localStorage.getItem("itemsCompletedInLS");
  if (itemsCompletedJSON === null) {
    localStorage.setItem(
      "itemsCompletedInLS",
      JSON.stringify(itemsCompletedStr)
    );
  }
}

var dragStartedArea;

getToDoFromLS();
getInProcessFromLS();
getCompletedFromLS();

function getToDoFromLS() {
  let itemsToDoFromLS = localStorage.getItem("itemsToDoInLS");
  items = JSON.parse(itemsToDoFromLS);
  items.forEach((element) => {
    createNewToDo(element);
  });
}

function getInProcessFromLS() {
  let itemsInProcessFromLS = localStorage.getItem("itemsInProcessInLS");
  items = JSON.parse(itemsInProcessFromLS);
  items.forEach((element) => {
    createNewInProcess(element);
  });
}

function getCompletedFromLS() {
  let itemsCompletedFromLS = localStorage.getItem("itemsCompletedInLS");
  let items = JSON.parse(itemsCompletedFromLS);
  items.forEach((element) => {
    createNewCompleted(element);
  });
}

function deleteAllToDos() {
  if (confirm("Do you want to delete all ToDos? Are you sure???")) {
    while (document.getElementById("area_ToDo").hasChildNodes())
      document
        .getElementById("area_ToDo")
        .removeChild(document.getElementById("area_ToDo").childNodes[0]);

    while (document.getElementById("area_InProcess").hasChildNodes())
      document
        .getElementById("area_InProcess")
        .removeChild(document.getElementById("area_InProcess").childNodes[0]);
    while (document.getElementById("area_Completed").hasChildNodes())
      document
        .getElementById("area_Completed")
        .removeChild(document.getElementById("area_Completed").childNodes[0]);
    console.log("localStorage.clear()");
    localStorage.clear();
    initializeVariables();
  }
}

input.addEventListener("keypress", enterPressed);

function enterPressed(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    submit.click();
    input.value = "";
  }
}

function deleteItem(e) {
  e.preventDefault();
  if (e.target.className == "bi bi-x-circle") {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
}

function deleteItemFromLS(text) {
  deleteItemInLS_ToDo(text);
  deleteItemInLS_InProcess(text);
  deleteItemInLS_Completed(text);
}

// Create New To Do - After every Dran and Drop. And after new Start
function createNewToDo(text) {
  const newLabel = document.createElement("label");
  newLabel.classList = "d-block createdLabel ms-2 me-2 mt-1";
  newLabel.setAttribute("draggable", "true");
  newLabel.setAttribute("ondragstart", "drag(event)");
  newLabel.setAttribute("id", getRandomID());
  newLabel.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.classList = "float-end";
  a.setAttribute("href", "#");
  a.innerHTML = "<i class='bi bi-x-circle'></i>";
  newLabel.appendChild(a);
  area_ToDo.appendChild(newLabel);
  // itemsToDoStr.push(text);
  // console.log(itemsToDoStr);
  // itemsToDoJSON = JSON.stringify(itemsToDoStr);
  // localStorage.setItem("itemsToDoInLS", itemsToDoJSON);
}

function addToLS(text) {
  itemsToDoJSON = localStorage.getItem("itemsToDoInLS");
  itemsToDoStr = JSON.parse(itemsToDoJSON);
  itemsToDoStr.push(text);
  itemsToDoJSON = JSON.stringify(itemsToDoStr);
  localStorage.setItem("itemsToDoInLS", itemsToDoJSON);
}

// Create New InProcess - After every Drag and Drop. And after new Start
function createNewInProcess(text) {
  const newLabel = document.createElement("label");
  newLabel.classList = "d-block createdLabel ms-2 me-2 mt-1";
  newLabel.setAttribute("draggable", "true");
  newLabel.setAttribute("ondragstart", "drag(event)");
  newLabel.setAttribute("id", getRandomID());
  newLabel.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.classList = "float-end";
  a.setAttribute("href", "#");
  a.innerHTML = "<i class='bi bi-x-circle'></i>";
  newLabel.appendChild(a);
  area_InProcess.appendChild(newLabel);
  itemsInProcessStr.push(text);
  itemsInProcessJSON = JSON.stringify(itemsInProcessStr);
  localStorage.setItem("itemsInProcessInLS", itemsInProcessJSON);
}

// Create New Completed - After every Drag and Drop. And after new Start
function createNewCompleted(text) {
  const newLabel = document.createElement("label");
  newLabel.classList = "d-block createdLabel ms-2 me-2 mt-1";
  newLabel.setAttribute("draggable", "true");
  newLabel.setAttribute("ondragstart", "drag(event)");
  newLabel.setAttribute("id", getRandomID());
  newLabel.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.classList = "float-end";
  a.setAttribute("href", "#");
  a.innerHTML = "<i class='bi bi-x-circle'></i>";
  newLabel.appendChild(a);
  area_Completed.appendChild(newLabel);
  itemsCompletedStr.push(text);
  itemsCompletedJSON = JSON.stringify(itemsCompletedStr);
  localStorage.setItem("itemsCompletedInLS", itemsCompletedJSON);
}

// Add New Item from Input Field
function addNewItem() {
  if (input.value) {
    createNewToDo(input.value);
    addToLS(input.value);
    console.log(input.value);
  } else {
    window.alert("You must enter a task!");
  }
}

// Drag and Drop functions

function dragEnter(event) {
  event.preventDefault();
}

// Create random ID - starting with id...
function getRandomID() {
  let randomArray = new Uint32Array(1);
  let text = "id";
  crypto.getRandomValues(randomArray);
  text += randomArray[0];
  return text;
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  dragStartedArea = event.target.parentElement.id;
  console.log(dragStartedArea);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  console.log(event.target.id); //neu
  if (
    (event.target.id == "head-ToDo" ||
      event.target.id == "area_ToDo" ||
      event.target.id == "ToDo") &&
    dragStartedArea != "area_ToDo"
  ) {
    document
      .getElementById("area_ToDo")
      .appendChild(document.getElementById(data));
    itemsToDoJSON = localStorage.getItem("itemsToDoInLS");
    itemsToDoStr = JSON.parse(itemsToDoJSON);
    itemsToDoStr.push(document.getElementById(data).textContent);
    itemsToDoJSON = JSON.stringify(itemsToDoStr);
    localStorage.setItem("itemsToDoInLS", itemsToDoJSON);
    deleteItemInLS_ToDo(document.getElementById(data).textContent);
  }
  if (
    (event.target.id == "head-InProcess" ||
      event.target.id == "area_InProcess" ||
      event.target.id == "InProcess") &&
    dragStartedArea != "area_InProcess"
  ) {
    document
      .getElementById("area_InProcess")
      .appendChild(document.getElementById(data));
    itemsInProcessJSON = localStorage.getItem("itemsInProcessInLS");
    itemsInProcessStr = JSON.parse(itemsInProcessJSON);
    itemsInProcessStr.push(document.getElementById(data).textContent);
    itemsInProcessJSON = JSON.stringify(itemsInProcessStr);
    localStorage.setItem("itemsInProcessInLS", itemsInProcessJSON);
    deleteItemInLS_InProcess(document.getElementById(data).textContent);
  }
  if (
    (event.target.id == "head-Completed" ||
      event.target.id == "area_Completed" ||
      event.target.id == "Completed") &&
    dragStartedArea != "area_Completed"
  ) {
    document
      .getElementById("area_Completed")
      .appendChild(document.getElementById(data));
    itemsCompletedJSON = localStorage.getItem("itemsCompletedInLS");
    itemsCompletedStr = JSON.parse(itemsCompletedJSON);
    itemsCompletedStr.push(document.getElementById(data).textContent);
    itemsCompletedJSON = JSON.stringify(itemsCompletedStr);
    localStorage.setItem("itemsCompletedInLS", itemsCompletedJSON);
    deleteItemInLS_Completed(document.getElementById(data).textContent);
  }
}

function deleteItemInLS_ToDo(text) {
  let arrStr = localStorage.getItem("itemsInProcessInLS");
  let arrArr = JSON.parse(arrStr);
  let index = arrArr.indexOf(text);
  let arrStr2 = localStorage.getItem("itemsCompletedInLS");
  let arrArr2 = JSON.parse(arrStr2);
  let index2 = arrArr2.indexOf(text);
  if (index != -1) {
    arrArr.splice(index, 1);
    arrStr = JSON.stringify(arrArr);
    localStorage.setItem("itemsInProcessInLS", arrStr);
  } else {
    if (index2 != -1) {
      arrArr2.splice(index2, 1);
      arrStr2 = JSON.stringify(arrArr2);
      localStorage.setItem("itemsCompletedInLS", arrStr2);
    }
  }
}

function deleteItemInLS_InProcess(text) {
  let arrStr = localStorage.getItem("itemsToDoInLS");
  let arrArr = JSON.parse(arrStr);
  let index = arrArr.indexOf(text);
  let arrStr2 = localStorage.getItem("itemsCompletedInLS");
  let arrArr2 = JSON.parse(arrStr2);
  let index2 = arrArr2.indexOf(text);
  if (index != -1) {
    arrArr.splice(index, 1);
    arrStr = JSON.stringify(arrArr);
    localStorage.setItem("itemsToDoInLS", arrStr);
  } else {
    if (index2 != -1) {
      arrArr2.splice(index2, 1);
      arrStr2 = JSON.stringify(arrArr2);
      localStorage.setItem("itemsCompletedInLS", arrStr2);
    }
  }
}

function deleteItemInLS_Completed(text) {
  let arrStr = localStorage.getItem("itemsToDoInLS");
  let arrArr = JSON.parse(arrStr);
  let index = arrArr.indexOf(text);
  let arrStr2 = localStorage.getItem("itemsInProcessInLS");
  let arrArr2 = JSON.parse(arrStr2);
  let index2 = arrArr2.indexOf(text);
  if (index != -1) {
    arrArr.splice(index, 1);
    arrStr = JSON.stringify(arrArr);
    localStorage.setItem("itemsToDoInLS", arrStr);
  } else {
    if (index2 != -1) {
      arrArr2.splice(index2, 1);
      arrStr2 = JSON.stringify(arrArr2);
      localStorage.setItem("itemsInProcessInLS", arrStr2);
    }
  }
}

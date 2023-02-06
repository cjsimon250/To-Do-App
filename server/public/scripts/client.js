$(document).ready(onReady);

function onReady() {
  render();
  $("#create-btn").on("click", toggleCreateButtons);

  $(".color-btns").on("click", ".create-input-btns", createInputField);

  $("main").on("click", ".submit-to-do", handleSubmit);

  getTasks();
}

//global array to hold all tasks
let tasks = [];

let showCreateInputs = false;

//toggle create buttons
function toggleCreateButtons() {
  if (showCreateInputs === true) {
    showCreateInputs = false;
  } else {
    showCreateInputs = true;
  }
  render();
}

//display new color options for task
function showNewToDoColors() {
  $(".color-btns").empty();

  $(".color-btns").append(`
    <button class="create-input-btns" id="yellow-btn"></button>
    <button class="create-input-btns" id="orange-btn"></button>
    <button class="create-input-btns" id="purple-btn"></button>
    <button class="create-input-btns" id="blue-btn"></button>
    <button class="create-input-btns" id="green-btn"></button>
    `);
}

let backgroundColor = "";
//function to add new inout field for task
function createInputField() {
  //determining input background color
  let id = $(this).attr("id");

  if (id === "yellow-btn") {
    backgroundColor = "rgb(246, 216, 82)";
  } else if (id === "orange-btn") {
    backgroundColor = "rgb(226, 116, 5)";
  } else if (id === "purple-btn") {
    backgroundColor = "rgb(160, 87, 186)";
  } else if (id === "blue-btn") {
    backgroundColor = "rgb(76, 164, 241)";
  } else if (id === "green-btn") {
    backgroundColor = "rgb(137, 247, 107)";
  }

  $("#to-do-view").append(`
  <div class="input-fields" style="background-color:${backgroundColor}">
    <textarea class="textareas" style="background-color:${backgroundColor}" maxlength="200">
    </textarea>
    <button class="submit-to-do">Submit</button>
    <button class="delete-to-do">Delete</button>
    <button class="complete-to-do">Complete</button>
  </div>
  `);
}

//function to determine the current date and time
function determineDate() {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;

  return dateTime;
}

//function to turn the background into a format that can
//be sent top the server
function restructureBackgroundColor(string) {
  let rbgArray = string.match(/\d+/g);

  colorObject = {
    color1: rbgArray[0],
    color2: rbgArray[1],
    color3: rbgArray[2],
  };

  return colorObject;
}

//function to create new object to send to data base
function handleSubmit() {
  //creating three different key values for each different color
  restructureBackgroundColor(backgroundColor);

  let toDo = {};
  toDo.task = $(this).siblings("textarea").val();
  toDo.completed = false;
  toDo.timeCreated = determineDate();
  toDo.color1 = colorObject.color1;
  toDo.color2 = colorObject.color2;
  toDo.color3 = colorObject.color3;

  //removing submit button on submission
  $(this).remove();

  //TODO make it so textarea is read only after submission TODO
  //   $(this).siblings("textarea").setAttribute("readonly", true);

  addTask(toDo);
}

//get tasks from the data base and put inyto array
function getTasks() {
  $.ajax({
    method: "GET",
    url: "/tasks",
  }).then((response) => {
    tasks = response;
    console.log(response);
    render();
  });
}

//adds the new to do task to database
function addTask(taskToAdd) {
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: taskToAdd,
  })
    .then(function (response) {
      console.log("Response from server.", response);
      getTasks();
      console.log(tasks);
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add task at this time. Please try again later.");
    });
}

function render() {
  //toggle the create color buttons
  if (showCreateInputs === false) {
    $(".color-btns").empty();
    $("#create-btn").text("+");
  } else {
    showNewToDoColors();
    $("#create-btn").text("^");
  }

  //loop through array of tasks and render to DOM
  $("#to-do-view").empty();

  for (let task of tasks) {
    let postedBackgroundColor = `rgb(${task.color1}, ${task.color2}, ${task.color3})`;

    if (task.completed === false) {
      $("#to-do-view").append(`
        <div class="input-fields" style="background-color:${postedBackgroundColor}">
          <textarea readonly class="textareas" 
          style="background-color:${postedBackgroundColor}" maxlength="200">
          ${task.task}
          </textarea>
          <button class="delete-to-do">Delete</button>
          <button class="complete-to-do">Complete</button>
          <p class="time-created">Time Created: ${task.timeCreated}</p>
        </div>
        `);
    } else {
      $("#to-do-view").append(`
        <div class="input-fields" style="background-color:${postedBackgroundColor}">
          <textarea readonly class="textareas" 
          style="background-color:${postedBackgroundColor}" maxlength="200">
          ${task.task}
          </textarea>
          <button class="delete-to-do">Delete</button>
          <button class="complete-to-do">Complete</button>
          <p class="time-completed">Time Created: ${task.timeCreated}</p>
        </div>
        `);
    }
  }
}

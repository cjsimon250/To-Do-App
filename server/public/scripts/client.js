$(document).ready(onReady);

function onReady() {
  render();
  $("#create-btn").on("click", toggleCreateButtons);

  $(".color-btns").on("click", ".create-input-btns", createInputFeild);

  $("main").on("click", ".submit-to-do", handleSubmit);
}

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
let backgroundColor;
//function to add new inout field for task
function createInputFeild() {
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

  $("main").append(`
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

//function to create new object to send to data base
function handleSubmit() {
  console.log("Submit button clicked.");
  let toDo = {};
  toDo.task = $(this).siblings("textarea").val();
  toDo.completed = false;
  toDo.timeCreated = determineDate();

  $(this).closest(".input-fields").append(`
    <p class="time-created">Time Created: ${toDo.timeCreated}</p>
  `);

  //removing submit button on submission
  $(this).remove();

  //TODO make it so textarea is read only after submission TODO
  //   $(this).siblings("textarea").setAttribute("readonly", true);

  addTask(toDo);
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
      //   refreshTasks();
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add task at this time. Please try again later.");
    });
}

function render() {
  if (showCreateInputs === false) {
    $(".color-btns").empty();
    $("#create-btn").text("+");
  } else {
    showNewToDoColors();
    $("#create-btn").text("^");
  }
}

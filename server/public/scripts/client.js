$(document).ready(onReady);

function onReady() {
  render();
  $("#create-btn").on("click", toggleCreateButtons);

  $(".color-btns").on("click", ".create-input-btns", createInputFeild);
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

function createInputFeild() {
  //determining input background color
  let backgroundColor;
  let id = $(this).attr("id");

  if (id === "yellow-btn") {
    backgroundColor = "rgb(246, 216, 82)";
    console.log(backgroundColor);
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
    <button class="submit-to-do" >Submit</button>
    <button class="delete-to-do">Delete</button>
    <button class="complete-to-do">Complete</button>
  </div>
  `);
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

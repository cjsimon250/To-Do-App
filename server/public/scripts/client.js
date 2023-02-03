$(document).ready(onReady);

function onReady() {
  render();
  $("#create-btn").on("click", toggleCreateButtons);
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

//display new color options for todo
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

function render() {
  if (showCreateInputs === false) {
    $(".color-btns").empty();
    $("#create-btn").text("+");
  } else {
    showNewToDoColors();
    $("#create-btn").text("^");
  }
}

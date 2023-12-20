// Function to make the unordered list's list items sortable to improve user experience.
$(function () {
  $('#sortable').sortable();
});
// Function to display the current day of the week and time at the top of the page in 24-hr format. 
$(function () {
  function updateCurrentTime() {
    var currentTime = dayjs();
    var currentTimeString = currentTime.format('YYYY-MM-DD, HH:mm:ss');
    var weekDay = currentTime.format('dddd');
    
    $('#currentTime24').text('Current time: ' + weekDay + ',' + ' ' + currentTimeString);
    // For each item in the sortable list, get the attribute id and replace the "hour-5 segment of the value with empty string, leaving only the hour as a string, parse that number"
    $("#sortable li").each(function () {
      var blockHour = parseInt($(this).attr("id").replace("hour-", ""));
      var textArea = $(this).find(".description");
      // If the hour of the block is before, current, or after the current hour of the day, add a class to the text area accordingly, altering its color conditionally.
      if (blockHour < currentTime.hour()) {
        textArea.addClass("past");
      } else if (blockHour === currentTime.hour()) {
        textArea.addClass("present");
      } else {
        textArea.addClass("future");
      }
    });
  }

// Updates the inital time and color coding of the blocks upon page load.
updateCurrentTime();

// Sets the interval to run the callback function updateCurentTime once every second to update time and color coding every second. 
setInterval(updateCurrentTime, 1000);

// Adds event listeners to the save button of each block to save, searches for the closest li to the save button and finding descendants of that li with the class: description
$(document).on("click", ".saveBtn", function () {
  var textArea = $(this).closest("li").find(".description");
  // Trims the start and ends of whatever string that the user inputs, so that it turns out as a string with no spaces on either end. 
  var text = textArea.val().trim();
  // Gets the value of the id attribute of the parent element to textArea (hour-9, hour-10 etc.) 
  var hour = textArea.parent().attr("id");
  // Sets those values of the id attribute as the key in the local storage. 
  localStorage.setItem(hour, text);
});

// Function to load the saved data that will then have local storage data persist upon page load. 
function loadSavedData() {
  $("#sortable li").each(function () {
    var hour = $(this).attr("id");
    var savedText = localStorage.getItem(hour);
    var textArea = $(this).find(".description");

    textArea.val(savedText);
  });
}

// Run this function upon page load so it persists. 
loadSavedData();
});

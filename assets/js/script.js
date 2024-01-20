$(document).ready(function () {
// Display the current day in format: Friday, January 19th (utilize day.js library)
var currentTime = dayjs().format("dddd, MMMM D");
$("#currentDay").text(currentTime);

// To enhance the user experience, create time blocks for standard business hours that are visible when the user scrolls down the planner.

// Present time blocks for standard business hours (e.g., 9 AM to 5 PM) on the calendar.

// Implement dynamic HTML/CSS for the time blocks.
// Ensure smooth scrolling behavior for a seamless experience.

    var container = $('.container');
    var table = $('<table>').attr('id', 'table').addClass("w-100");

    // Create table body with 9 rows
    var tableBody = $('<tbody>').attr('id', 'tableBody').addClass("w-100");
    var taskCollection = {};

    // Function to create a time block row
    function createTimeBlockRow(hour, suffix, data) {
        var newRow = $('<tr class="customRow">').attr('id', 'row').append(
            $('<td>').addClass('time').attr('data-hour', data).text(hour + suffix),
            $('<td>').addClass('task').append($('<textarea>').addClass('userInput form-control')),
            $('<td>').addClass('action').append($('<button class="customBtn">').text('💾'))
        );
        //Save the hour value as a data attribute in a 'time' column
        // newRow.find('.time').attr('hour', hour);

        // Save the initial value of the textarea in taskCollection
        taskCollection[data] = { data: newRow.find('.userInput').val() };

        return newRow;
    }
    // Create rows for 9am-11am
    for (var i = 8; i < 11; i++) {
        tableBody.append(createTimeBlockRow((i + 1), 'AM', (i + 1)));
    }
    // Create row for 12pm
    tableBody.append(createTimeBlockRow(12, 'PM', 12));
    // Create rows for 1pm-5pm
    for (var i = 0; i < 5; i++) {
        tableBody.append(createTimeBlockRow((i + 1), 'PM', (i + 12)));
    }
    // Append the body to the table
    table.append(tableBody);
    // Append the table to the container
    container.append(table);


//loop through timeBlock and check the hour
//if an hour is equal to current hour add red background
//if past bg-gray
//if future bg-green

// Function to compare the data-hour values with the current time
function compareTimeWithCurrent() {
    //get the current hour
    var currentHour = parseInt(dayjs().format("H"));
//console.log(currentHour);

// Loop through all elements with the class '.time'
$('.time').each(function(){
    //Get the value of the data-hour attribute
    var hourValue = parseInt($(this).attr('data-hour'));
    // Find the textarea within the current row
    var textarea = $(this).closest('tr').find('.userInput');

    // Compare the hourValue with the currentHour and apply background color accordingly
    if (hourValue < currentHour) {
        textarea.addClass('past'); // Change to your desired color
    }else if (hourValue === currentHour) {
        textarea.addClass('present'); // Change to your desired color
    }else{
        textarea.addClass('future'); // Change to your desired color
    }
})
}
// Call the function to initially set background colors based on the current time
compareTimeWithCurrent();

//PSEUDOCODE:
//when row is created, take a value of data together with value of textarea and create an object, 
//add this object to a collection on task. taskCollection = {data: .userInput.value}
    //taskCollection[data] = { data: newRow.find('.userInput').val() };

//when user add or change value of the input update this in a taskCollection#
   // Use event delegation to handle 'input' events on textareas within a specific row
   $('.container').on('input', '.customRow .userInput', function () {
    var timeValue = $(this).closest('tr').find('.time').data('hour');
    var inputValue = $(this).val();

    // Update taskCollection with a new object for each row
    taskCollection[timeValue] = { data: timeValue, userInput: inputValue };

    console.log('Task Collection:', taskCollection);
});
//.................................................................
// PSEUDOCOSE:
//when user press the save button, the function will check what is a data value in its row
//then will find the object with that date in collection array, and add this object to local storage.
   // Event listener to handle 'click' events on the save button
   $('.container').on('click', '.customRow .customBtn', function () {
    // Find the closest row to the button
    var closestRow = $(this).closest('tr');
    // Retrieve the data value from the closest row
    var dataValue = closestRow.find('.time').data('hour');
    // Retrieve the userInput value from the closest row
    var userInputValue = closestRow.find('.userInput').val();

    // Retrieve existing data from local storage
    var storedData = JSON.parse(localStorage.getItem('rowData')) || {};

    // Check if the object with the same data value already exists
    if (storedData.hasOwnProperty(dataValue)) {
        // Update the existing object's userInput value
        storedData[dataValue].userInput = userInputValue;
    } else {
        // Create a new object for the specific row
        storedData[dataValue] = { data: dataValue, userInput: userInputValue };
    }
    // Save the updated data to local storage
    localStorage.setItem('rowData', JSON.stringify(storedData));

    console.log('Row Data updated and saved to local storage:', storedData);
});

});

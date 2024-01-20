$(document).ready(function () {
// Display the current day in format: Friday, January 19th (utilize day.js library)
var currentTime = dayjs().format("dddd, MMMM D");
$("#currentDay").text(currentTime);

// To enhance the user experience, create time blocks for standard business hours that are visible when the user scrolls down the planner.

// Present time blocks for standard business hours (e.g., 9 AM to 5 PM) on the calendar.

// Implement dynamic HTML/CSS for the time blocks.
// Ensure smooth scrolling behavior for a seamless experience.

//var timeBlocksContainer = $("#timeBlock");


    var container = $('.container');
    var table = $('<table>').attr('id', 'table').addClass("w-100");

    // Create table body with 9 rows
    var tableBody = $('<tbody>').attr('id', 'tableBody').addClass("w-100");

    // Function to create a time block row
    function createTimeBlockRow(hour, suffix, data) {
        var newRow = $('<tr class="customRow">').append(
            $('<td>').addClass('time').attr('data-hour', data).text(hour + suffix),
            $('<td>').addClass('task').append($('<textarea>').addClass('form-control')),
            $('<td>').addClass('action').append($('<button class="customBtn">').text('💾'))
        );
        //Save the hour value as a data attribute in a 'time' column
        // newRow.find('.time').attr('hour', hour);
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
    var textarea = $(this).closest('tr').find('.form-control');

    if (hourValue < currentHour) {
        textarea.addClass('past'); // Change to your desired color
    }else if (hourValue === currentHour) {
        textarea.addClass('present'); // Change to your desired color
    }else{
        textarea.addClass('future'); // Change to your desired color
    }
})
}

compareTimeWithCurrent();
});

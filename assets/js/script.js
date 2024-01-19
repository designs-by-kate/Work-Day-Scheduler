
// Display the current day in format: Friday, January 19th (utilize day.js library)
var currentTime = dayjs().format("dddd, MMMM D"); 
$("#currentDay").text(currentTime);

// To enhance the user experience, create time blocks for standard business hours that are visible when the user scrolls down the planner.

// Present time blocks for standard business hours (e.g., 9 AM to 5 PM) on the calendar.

// Implement dynamic HTML/CSS for the time blocks.
// Ensure smooth scrolling behavior for a seamless experience.

var timeBlocksContainer = $("#timeBlocks");

$(document).ready(function () {
    var container = $('.container');
    var table = $('<table>').attr('id', 'plannerTable').addClass("w-100");

    // Create table body with 9 rows
    var tableBody = $('<tbody>').attr('id', 'timeBlocks').addClass("w-100");

    // Function to create a time block row
    function createTimeBlockRow(hour, suffix) {
        return $('<tr class="border-bottom">').append(
            $('<td>').addClass('time-column text-left').text(hour + suffix),
            $('<td>').addClass('task-column w-75 text-left bg-secondary').text('Task'),
            $('<td>').addClass('action-column').append($('<button class="btn btn-primary">').text('🔒'))
        );
    }

    // Create rows for 9am-11am
    for (let i = 8; i < 11; i++) {
        tableBody.append(createTimeBlockRow((i + 1), 'AM'));
    }

    // Create row for 12pm
    tableBody.append(createTimeBlockRow(12, 'PM'));

    // Create rows for 1pm-5pm
    for (let i = 0; i < 5; i++) {
        tableBody.append(createTimeBlockRow((i + 1), 'PM'));
    }

    // Append the body to the table
    table.append(tableBody);

    // Append the table to the container
    container.append(table);
});
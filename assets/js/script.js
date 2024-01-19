
// Display the current day in format: Friday, January 19th (utilize day.js library)
var currentTime = dayjs().format("dddd, MMMM D"); 
$("#currentDay").text(currentTime);

Description:

// To enhance the user experience, create time blocks for standard business hours that are visible when the user scrolls down the planner.

// Present time blocks for standard business hours (e.g., 9 AM to 5 PM) on the calendar.

// Implement dynamic HTML/CSS for the time blocks.
// Ensure smooth scrolling behavior for a seamless experience.

var timeBlocksContainer = $("#timeBlocks");

$(document).ready(function () {
    var container = $('.container');
    var table = $('<table>').attr('id', 'plannerTable');
    table.addClass("w-100");

    // Create table body with 9 rows
    var tableBody = $('<tbody>').attr('id', 'timeBlocks');
    tableBody.addClass("w-100");
    //rows for 9am-11am
    for (let i = 8; i < 11; i++) {
        var timeBlockRow = $('<tr class="border-bottom">').append(
            $('<td>').addClass('time-column text-left').text((i + 1) + 'AM'),
            $('<td>').addClass('task-column w-75 text-left bg-secondary').text('Task'),
            $('<td>').addClass('action-column').append($('<button class="btn btn-primary">').text('🔒'))
        );
        tableBody.append(timeBlockRow);
    }
    //row for 12pm
    for (let i = 11; i < 12; i++) {
        var timeBlockRow = $('<tr class="border-bottom">').append(
            $('<td>').addClass('time-column text-left').text((i + 1) + 'PM'),
            $('<td>').addClass('task-column w-75 text-left bg-secondary').text('Task'),
            $('<td>').addClass('action-column').append($('<button class="btn btn-primary">').text('🔒'))
        );
        tableBody.append(timeBlockRow);
    }
    //rows for 1pm-5pm
    for (let i = 0; i < 5; i++) {
        var timeBlockRow = $('<tr class="border-bottom">').append(
            $('<td>').addClass('time-column text-left').text((i + 1) + 'PM'),
            $('<td>').addClass('task-column w-75 text-left bg-secondary').text('Task'),
            $('<td>').addClass('action-column').append($('<button class="btn btn-primary">').text('🔒'))
        );
        tableBody.append(timeBlockRow);
    }

    // Append the body to the table
    table.append(tableBody);

    // Append the table to the container
    container.append(table);
});
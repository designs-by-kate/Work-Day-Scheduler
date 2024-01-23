$(document).ready(function () {
    // Display the current day using day.js library

    // Container for the time block table
    var container = $('.container');
    // Create the table element
    var table = $('<table>').attr('id', 'table').addClass("w-100");
    // Create the table body
    var tableBody = $('<tbody>').attr('id', 'tableBody');
    // Collection to store task and data
    var taskCollection = {};

    // Function to determine the ordinal suffix for a given day of the month
    var ordinal = function(o) {
        if (o > 3 && o < 21) return 'th';
        switch (o % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };
    //Get current day details
    var currentDay = dayjs().format("dddd");
    var currentDayOfMonth = dayjs().format("D");
    var currentMonth = dayjs().format("MMMM");
    var ordinalSuffix = ordinal(currentDayOfMonth);
    var currentTime = currentDay + ', ' + currentMonth + ' ' + currentDayOfMonth + ordinalSuffix;

    //Display current time on the page
    $("#currentDay").text(currentTime);

    // Function to create a time block row
    function createTimeBlockRow(hour, suffix, data) {
        var newRow = $('<tr class="customRow">').attr('id', 'row').append(
            $('<td>').addClass('time').attr('data-hour', data).text(hour + suffix),
            $('<td>').addClass('task').append($('<textarea>').addClass('userInput form-control')),
            $('<td>').addClass('action').append($('<button class="customBtn">').text('💾'))
        );

        return newRow;
    }

    // Create rows for 9am-11am
    for (var i = 9; i < 12; i++) {
        tableBody.append(createTimeBlockRow((i), 'AM', (i)));
    }

    // Create row for 12pm
    tableBody.append(createTimeBlockRow(12, 'PM', 12));

    // Create rows for 1pm-5pm
    for (var i = 1; i < 6; i++) {
        tableBody.append(createTimeBlockRow((i), 'PM', (i + 12)));
    }

    // Append table body to the table
    table.append(tableBody);
    // Append the table to the container
    container.append(table);

    // Function to compare time with the current time and set background colors
    function compareTimeWithCurrent() {
        var currentHour = parseInt(dayjs().format("H"));

        // Loop through each time block element
        $('.time').each(function(){
            var hourValue = parseInt($(this).attr('data-hour'));
            var textarea = $(this).closest('tr').find('.userInput');

            // Compare and apply background color
            if (hourValue < currentHour) {
                textarea.addClass('past');
            }else if (hourValue === currentHour) {
                textarea.addClass('present');
            }else{
                textarea.addClass('future');
            }
        });
    }

    // Call the function to set initial background colors
    compareTimeWithCurrent();

    // Event to handle 'input' events on textareas within a specific row
    $('.container').on('input', '.customRow .userInput', function () {
        var timeValue = $(this).closest('tr').find('.time').data('hour');
        var inputValue = $(this).val();

        // Update taskCollection with new data
        taskCollection[timeValue] = { data: timeValue, userInput: inputValue };
    });

    // Event listener to handle 'click' events on the save button
    $('.container').on('click', '.customRow .customBtn', function () {
        var closestRow = $(this).closest('tr');
        var dataValue = closestRow.find('.time').data('hour');
        var userInputValue = closestRow.find('.userInput').val();
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
    });

    // Function to retrieve data from local storage and update text areas on page load
    function updateTextAreasFromLocalStorage() {
        var storedData = JSON.parse(localStorage.getItem('rowData')) || {};

        // Loop through each row in the stored data
        Object.keys(storedData).forEach(function (dataValue) {
            // Find the corresponding row based on the data value
            var row = $('.customRow .time[data-hour="' + dataValue + '"]').closest('tr');
            // Update the text area in the row with the stored userInput value
            row.find('.userInput').val(storedData[dataValue].userInput);
        });
    }

    // Call the function on page load to update text areas from local storage
    updateTextAreasFromLocalStorage();
});

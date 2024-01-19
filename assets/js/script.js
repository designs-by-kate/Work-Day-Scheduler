

// Display the current day prominently at the top of the calendar.

// Utilize Day.js library to fetch and format the current date.

// format: Friday, January 19th
var currentTime = dayjs().format("dddd, MMMM D"); 
$("#currentDay").text(currentTime);

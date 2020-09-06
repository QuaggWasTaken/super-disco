$("#ref").hide();
const timeblockElRef = $("#ref")[0];
var currentHour = moment().hour()
var timeBlockTEMP = $(`<div class="row task-info" id="1">${timeblockElRef.innerHTML}</div>`);
init()

function init() {
    $("#currentDay")[0].textContent = `Schedule for ${moment().format("dddd, MMMM Do YYYY")}`;
    for (let index = 0; index < 9; index++) {
        var hour = moment().hour(index + 9).minute(0);
        var timeBlock = $(`<div class="row task-info" id="${index}">${timeblockElRef.innerHTML}</div>`);

        //init hours
        timeBlock.children()[0].textContent = hour.format("h:mmA");

        //start textbox init
        if (moment().isBefore(hour, 'hour')) {
            timeBlock.children(".task").addClass("future")
        } else if (moment().isSame(hour, 'hour')) {
            timeBlock.children(".task").addClass("present")
        } else {
            timeBlock.children(".task").addClass("past")
        }

        var storedTasks = JSON.parse(localStorage.getItem("schedule"))

        if (storedTasks) {
            timeBlock.children(".task").children()[0].value = storedTasks[index];
        }
        //end textbox init

        //init buttons
        timeBlock.children("button").addClass(`${index}`)

        $("#timeBlockContainer").append(timeBlock);
    }
}

function btnSave(button) {
        var storedTasks = JSON.parse(localStorage.getItem("schedule")) || [];
        var timeBlock = $(`#${button.classList[button.classList.length-1]}`)
        storedTasks[button.classList[button.classList.length-1]] = timeBlock.children(".task").children()[0].value;
        localStorage.setItem("schedule", JSON.stringify(storedTasks))
}
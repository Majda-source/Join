let inProgressTasksNr = 0;
let toDoTasksNr = 0;
let awaitFeedbackTasksNr = 0;
let doneTasksNr = 0;
let boardTasksNr = 0;
let urgentTasksNr = 0;

let urgentTasks = [];

async function initSummary() {
    greetUser()
    await includeHTML();
    await loadTasks();
    summaryUpdate();
    showMostUrgentDate();
    activeMenuBg();
    }

function greetUser() {
    greetAccordingToDayTime();
    greetUserName();
}

//greeting according with the time
function greetAccordingToDayTime() {
    var currentTime = new Date().getHours();
    if (currentTime < 12) {
        document.getElementById("greetText").innerHTML = "Good morning";
    } else if (currentTime < 18) {
        document.getElementById("greetText").innerHTML = "Good afternoon";
    } else {
        document.getElementById("greetText").innerHTML = "Good evening!";
    }
}

//greeting user name login
function greetUserName() {
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
        document.getElementById("user-name").innerHTML =
            loggedUser["name"];
    } else {
        document.getElementById("user-name").innerHTML = "Guest";
    }
}


async function loadTasks() {
    setURL("https://majda-halim.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    downloadedTasks = await JSON.parse(backend.getItem('downloadedTasks')) || [];
    users = await JSON.parse(backend.getItem('users')) || [];
}


/**
 * Retrieves all tasks with 'Urgent' priority and sorts them by due date in descending order
 * @function
 * @returns {Array} The array of urgent tasks, sorted by due date.
 */
function getUrgentTasks() {
    for (let i = 0; i < downloadedTasks.length; i++) {
        const task = downloadedTasks[i];
        if (task.prio === 'Urgent') {
            urgentTasks.push(task);
        }
    }

    /**
     * Sorts the urgent tasks array by due date in descending order
     * @function
    * @param {Array} urgentTasks - The array of urgent tasks to sort
    * @returns {Array} The sorted array of urgent tasks
    * In urgentTasks.sort(function (a, b) {...}) sind a und b die beiden 
    * Elemente des Arrays, die im Vergleich miteinander verglichen werden.
    * Innerhalb der Sortierfunktion werden die beiden Elemente a und b 
    * verglichen und das Ergebnis bestimmt, wie die Elemente sortiert werden.
    * Es ist eine Art der Vergleichsfunktion, die dazu verwendet wird, 
    * um die Reihenfolge der Elemente im Array zu bestimmen.
    * Wenn das Ergebnis kleiner als 0 ist, wird a vor b platziert, 
    * wenn es größer als 0 ist, wird b vor a platziert und wenn es 0 ist, 
    * bleibt die Reihenfolge unverändert. In diesem Fall werden die beiden Elemente
    *  a und b nach ihrem dueDate verglichen, indem die Datumsstrings in Datumsobjekte 
    * umgewandelt und dann subtrahiert werden.
    */
    urgentTasks.sort(function (a, b) {
        return new Date(b.dueDate) - new Date(a.dueDate);
    });
}


/**
 * display the due date of the most urgent task
 * @function
 * @returns {string} The due date of the most urgent task or 'No urgent Tasks' 
 * if there are no urgent tasks
 */
function showMostUrgentDate() {
    getUrgentTasks();
    if (urgentTasks.length > 0) {
        let lastIndex = urgentTasks.length - 1;
        document.getElementById('newDate').innerHTML = urgentTasks[lastIndex].dueDate;
    }
    else {
        document.getElementById('newDate').innerHTML = 'No urgent Tasks';
    }
}


/** updates summary data to show actual board overview
 * 
 */
function summaryUpdate() {
    loadPositionFrimBoard();
    renderNumberInSummary();
}

function loadPositionFrimBoard() {
    for (let i = 0; i < downloadedTasks.length; i++) {
        const boardTasks = downloadedTasks[i];
        if (boardTasks["category"] == "in-progress") {
            inProgressTasksNr++;
        }
        if (boardTasks["category"] == "to-do") {
            toDoTasksNr++;
        }
        if (boardTasks["category"] == "awaiting-feedback") {
            awaitFeedbackTasksNr++;
        }
        if (boardTasks["category"] == "done") {
            doneTasksNr++;
        }
        if (boardTasks["prio"] == "Urgent") {
            urgentTasksNr++;
        }
    }
    boardTasksNr = downloadedTasks.length;
}


function renderNumberInSummary() {
    let toDoTasks = document.getElementById("toDoTasks");
    let inProgressTasks = document.getElementById("inProgressTasks");
    let a_f_Tasks = document.getElementById("a_f_Tasks");
    let doneTasks = document.getElementById("doneTasks");
    let tasksInBoard = document.getElementById("tasksInBoard");
    let urgentTasks = document.getElementById("urgentTasks");
    inProgressTasks.innerHTML = `${inProgressTasksNr}`;
    toDoTasks.innerHTML = `${toDoTasksNr}`;
    a_f_Tasks.innerHTML = `${awaitFeedbackTasksNr}`;
    doneTasks.innerHTML = `${doneTasksNr}`;
    tasksInBoard.innerHTML = `${boardTasksNr}`;
    urgentTasks.innerHTML = `${urgentTasksNr}`;
}







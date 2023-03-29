


/** HTML to generate a task
 * 
 * @param {array} element - beinhaltet den gefilterten Array mit forschleifen Zahl der jeweiligen Kategorie.
 * 
 * 
 */
function addTaskToKanbanHTML(element) { // element = task[0] or task[1] only filterd in category
    return `
    <div class="kanban-task-container" draggable="true" ondragstart="startDragging(${element['id']})" onclick="displayClickedTask(id)" id="${element['id']}">
    <div>
        <span class="task-type" id="task-type${NumberOfCurrentTasks}">${element['sector']}</span>
    </div>

    <div>
        <h3 class="kanban-task-title" ">
            ${element['title']}
        </h3>
    </div>

    <p class="task-description"> 
        ${element['description']}...
    </p>
    <div class="progress-section" id="progress-section-${element['id']}">
        <div class="progress-border" id="progressbar-${element['id']}">

        </div>

        <span id="progressbar-comparison-${element['id']}" class="progressbar-comparison">
        
         </span>
        </div>

    <div style="display:flex; justify-content: space-between; align-items:center; margin-top: 10px;">
        <div class="assigned-employees" id="assigned-employees-board-${element['id']}">

        </div>

        <img src="" id="importance-id-${element['id']}">
    </div>
</div>
    `;
}


/** HTML Code for display clicked Task
 * 
 *  all @param are explained in function "displayClickedTask()"
 */
 function displayClickedTaskHTML(id, actualSector) {
    return document.getElementById('c-t-window').innerHTML = /*html*/`

    <img src="./assets/img/pencil.svg" class="c-t-edit-button" onclick="editClickedTask()">

    <div class="c-t-first-row"> 
        <div class="c-t-category" id="c-t-category"> 
            <span id="c-t-category-html">${actualSector}</span>
        </div>

        <div class="c-t-exit-arrow" onclick="hideClickedTask()"> 
            <img src="./assets/img/close.svg"> 
        </div> 
    </div> 

    <div class="c-t-title" >
        <b>  ${downloadedTasks[id]['title']} </b>
    </div>

    <div class="c-t-description">
        <p> 
            ${downloadedTasks[id]['description']} 
        </p>
    </div>

    <div id="subtask-section" class="c-t-subtask-section"> 
        <div class="c-t-infos"> 
            <span>
                <b> 
                    Subtasks:
                </b>
            </span>
        </div>

        <div class="c-t-subtasks" id="subtasks"> 
        </div> 
    </div> 

    <div class="c-t-infos"> 
        <span>
            <b>
                Due date:
            </b>
        </span>
        <span class="c-t-space"> 
        ${downloadedTasks[id]['dueDate']}
        </span> 
    </div>

    <div class="c-t-infos"> 
        <span>
            <b>
                Priority:
            </b>
        </span>
        <span class="c-t-space priority-box" id="priority-box-c-t"> 
            ${downloadedTasks[id]['prio']}
            <img src="./assets/img/arrows_up_w.svg" class="c-t-priority-icon" id="importance-id-c-t-${currentClickedTask}"> 
        </span> 
    </div>

    <div class="c-t-infos"> 
        <span>
            <b>
                Assigned to:
            </b>
        </span>
    </div>

    <div class="c-t-assignedTo" id="c-t-assignedTo">
    </div> 
`;
}


/** code to create a assigned contact for the function "createAssignedContacs"
 * 
 * @param {number} i - hands over from for loop 
 * 
 */
 function createAssignedContacsHTML(i, assignedContacts) {
    return document.getElementById('c-t-assignedTo').innerHTML += `
            <div class="c-t-contact"> 
                <div class="c-t-profilimages"> 
                    <span id="c-t-initials${i}">  
                    </span> 
                </div> 
                <span>
                    ${assignedContacts[i]}
                </span> 
            </div>
`;
}


/** code to create assigned subtasks to clickedTask view
 * 
 * @param {*} id - contains id from clicked task (current clicked task id)
 * @param {*} i - hands over from for loop to show all subtasks
 * @param {*} checked  - contains nothing "" or "true", to show a checked or a unchecked checkbox
 * @param {*} arrayOfSubtasks - contains "downloadedTasks[id]['subtasks']"
 */
 function  createSubtasksHTML(id, i, checked, arrayOfSubtasks){
    return             document.getElementById('subtasks').innerHTML += `
    <label class="c-t-checkbox">
        <input type="checkbox" ${checked} id="subtask-id-${id}-${i}" onclick="updateCheckboxStatus(${i})"> 
        <span class="checkmark">${arrayOfSubtasks[i]['subtask']} </span> 
    </label>
    `
}


 
/** HTML function to create the editMenu from clickedTask
 * 
 */
 function editClickedTask() {

    document.getElementById('c-t-window').innerHTML = /*html*/`
    <form onsubmit="getNewValueFromEditedTask(); return false;">

        <div class="c-t-exit-arrow-edit" onclick="displayClickedTask(currentClickedTask)"> 
            <img src="./assets/img/close.svg"> 
        </div> 


        <h4> Title </h4> 
        <input placeholder="Enter a title" required id="c-t-title-edit" class="clicked-task-window-edit-input"> 
        <h4> Description</h4> 
        <textarea type="text" required placeholder="Enter a Description" id="c-t-description-edit"></textarea> 
        <h4> Due date </h4> 
        <input type="date" id="c-t-date-edit" class="clicked-task-window-edit-input" > 
        <h4> Prio </h4> 
        <div class="c-t-prio-divs-head"> 
            <div class="c-t-prio-divs" onclick="markedPrioCT('Urgent')" id="prio-urgent-c-t-edit">Urgent <img src="./assets/img/arrows-up.svg" id="prio-urgent-c-t-edit-img"> </div>  
            <div class="c-t-prio-divs" onclick="markedPrioCT('Medium')" id="prio-medium-c-t-edit">Medium <img src="./assets/img/equal-sign.svg" id="prio-medium-c-t-edit-img" > </div>  
            <div class="c-t-prio-divs" onclick="markedPrioCT('Low')" id="prio-low-c-t-edit">Low    <img src="./assets/img/arrows-down.svg" id="prio-low-c-t-edit-img" > </div>  
        </div>
        <h4> Assigned to </h4> 

        <div onclick="showContacts()" id="select-div-contact" class="select-div no-margin-bottom">
                    <span id="selected-contact">Select contacts to assign</span>
                    <input class="hidden-input" id="hidden-contact-input" type="text" required class="clicked-task-window-edit-input">
                    <img src="./assets/img/dropdown-arrow.svg" alt="dropdown_arrow">
                </div>
                <ul id="ul-contact" class="d-none">
                    <div onclick="selectContact(id)" id="div-contact-1" class="div-li-contact">
                        <li id="contact-1">Max Mustermann</li>
                        <input onclick="proofCheck(id), editContacts('Max Mustermann')" class="input-checkbox" type="checkbox" id="checkbox-contact-1">
                    </div>
                    <div onclick="selectContact(id)" id="div-contact-2" class="div-li-contact">
                        <li id="contact-2">Peter Müller</li>
                        <input onclick="proofCheck(id), editContacts('Peter Müller')" class="input-checkbox" type="checkbox" id="checkbox-contact-2">
                    </div>
                    <div onclick="selectContact(id)" id="div-contact-3" class="div-li-contact">
                        <li id="contact-3">Angela Schmidt</li>
                        <input onclick="proofCheck(id), editContacts('Angela Schmidt')" class="input-checkbox" type="checkbox" id="checkbox-contact-3">
                    </div>
                </ul>

                <div id="all-contacts-initials" class="contact-initials d-none">
                    <div class="bg-violet d-none" id="initials-1">
                        <span>HS</span>
                    </div>
                    <div class="bg-blue d-none" id="initials-2">
                        <span>SF</span>
                    </div>
                    <div class="bg-green d-none" id="initials-3">
                        <span>MM</span>
                    </div>
                </div>
    <div class="c-t-ok-edit-button-div"> 
        <button class="c-t-ok-edit-button" type="submit" name="action" value="edit" >
            <span> Ok </span> 
            <img src="./assets/img/create.png">
        </button>
    </div>
    
    
    <div class="c-t-remove-edit-button-div"> 
        <div class="c-t-remove-edit-button" onclick="deleteTask()" >
            <span> Delete Task </span> 
            <img src="./assets/img/remove.png">
        </div>
    </div> 
    <form> 
    `;
}


/** HTML function to generate the profilpicture on board view for every task
 * 
 * @param {array} element - contains array path to current processing task 
 * @param {*} pixels - sets pixels for the staggered design for the profile pictures
 */
 function createAssignedContacsOnBoardHTML(element, pixels) {
    return    document.getElementById(`assigned-employees-board-${element['id']}`).innerHTML += `
    <div class="c-t-profilimages" style="right:${pixels}px"> 
        <span id="initials-${element['id']}-${i}">  

        </span> 
    </div> 
    `;
}
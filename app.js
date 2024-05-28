/* ==========================================================================
Constants
========================================================================== */
// Inputs
const input_unit_name = document.getElementById('unit_name');
const input_unit_color = document.getElementById('unit_color');
const textarea_unit_info = document.getElementById("unit_info");

const select_table_painting_method = document.getElementById("painting_method");
const select_earlist_start = document.getElementById("earliest_start");
const select_latest_end = document.getElementById("latest_end");
const input_hide_no_spots = document.getElementById('spots_toggle');
// Buttons
const button_submit_unit_info = document.getElementById("unit_button");
const button_refresh_timetable = document.getElementById("timetable_button");
// Tables
const table_unit_info = document.getElementById('unit_table');
const table_timetable = document.getElementById('timetable');
// Other
const timetable_lists = document.querySelectorAll('.table__list');
// Dictionaries / Maps
const dict_days = new Map([
    ["Mon", 1],
    ["Tue", 2],
    ["Wed", 3],
    ["Thu", 4],
    ["Fri", 5]
]);
const dict_times = new Map([
    ["07:00", 1],
    ["07:30", 2],
    ["08:00", 3],
    ["08:30", 4],
    ["09:00", 5],
    ["09:30", 6],
    ["10:00", 7],
    ["10:30", 8],
    ["11:00", 9],
    ["11:30", 10],
    ["12:00", 11],
    ["12:30", 12],
    ["13:00", 13],  // 1:00 PM
    ["13:30", 14],  // 1:30 PM
    ["14:00", 15],  // 2:00 PM
    ["14:30", 16],  // 2:30 PM
    ["15:00", 17],  // 3:00 PM
    ["15:30", 18],  // 3:30 PM
    ["16:00", 19],  // 4:00 PM
    ["16:30", 20],  // 4:30 PM
    ["17:00", 21],  // 5:00 PM
    ["17:30", 22],  // 5:30 PM
    ["18:00", 23],  // 6:00 PM
    ["18:30", 24],  // 6:30 PM
    ["19:00", 25],  // 7:00 PM
    ["19:30", 26]   // 7:30 PM
]);
/* ==========================================================================
Objects
========================================================================== */
class TimeCommitment {
    static unique_id = 0;
    constructor(name, activity_id, day, start_time, duration, spots, color) {
        this.id = TimeCommitment.unique_id;
        this.name = name;
        this.activity_id = activity_id;
        this.day = day;
        this.start_time = start_time;
        this.duration = duration;
        this.spots = spots;
        this.color = color;
        this.hidden = false;
        this.perma_hide = false;
        this.added_to_table = false;

        TimeCommitment.unique_id++;
    }
    GetID() {
        return this.id;
    }
    GetName() {
        return this.name;
    }
    GetActivityID() {
        return this.activity_id;
    }
    GetDay() {
        return this.day;
    }
    GetStartTime() {
        return this.start_time;
    }
    GetDuration() {
        return this.duration;
    }
    GetSpots() {
        return this.spots;
    }
    GetColor() {
        return this.color;
    }
    GetHiddenStatus() {
        return this.hidden;
    }
    SetHiddenStatus(bool) {
        this.hidden = bool;
    }
    GetPermanentHiddenStatus() {
        return this.perma_hide;
    }
    TogglePermanentHide() {
        if (this.perma_hide === false) {
            this.perma_hide = true;
        }
        else if (this.perma_hide === true) {
            this.perma_hide = false;
        }
    }
    GetTableStatus() {
        return this.added_to_table;
    }
    SetTableStatus(bool) {
        this.added_to_table = bool;
    }
    ReturnUnitTableFormat() {
        return [this.name, this.activity_id, this.day, this.start_time, this.duration, this.spots]
    }
}
class Node {
    // constructor
    constructor(element) {
        this.element = element;
        this.next = null
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    // adds an element at the end of list
    add(element) {
        // creates a new node
        let node = new Node(element);
 
        // to store current node
        let current;
 
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
 
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
 
            // add node
            current.next = node;
        }
        this.size++;
    }
    // insert element at the position index of the list
    insertAt(element, index) {
        if (index < 0 || index > this.size)
            return console.log("Please enter a valid index.");
        else {
            // creates a new node
            let node = new Node(element);
            let curr, prev;
 
            curr = this.head;
 
            // add the element to the
            // first index
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                let it = 0;
 
                // iterate over the list to find
                // the position to insert
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // adding an element
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }
    // removes an element from the specified location
    removeFrom(index) {
        if (index < 0 || index >= this.size)
            return console.log("Please Enter a valid index");
        else {
            let curr, prev, it = 0;
            curr = this.head;
            prev = curr;
 
            // deleting first element
            if (index === 0) {
                this.head = curr.next;
            } else {
                // iterate over the list to the
                // position to remove an element
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // remove the element
                prev.next = curr.next;
            }
            this.size--;
 
            // return the remove element
            return curr.element;
        }
    }
    // removes a given element from the list
    removeElement(element) {
        let current = this.head;
        let prev = null;
 
        // iterate over the list
        while (current != null) {
            // comparing element with current
            // element if found then remove the
            // and return true
            if (current.element === element) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return null;
    }
    removeByID(id) {
        let current = this.head;
        let prev = null;

        // Iterate over the list
        while (current !== null) {
            // Check if the current node's ID matches the given ID
            if (current.element.id === id) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return null;
    }
    findByID(id) {
        let current = this.head;

        // Iterate over the list
        while (current !== null) {
            // Check if the current node's ID matches the given ID
            if (current.element.id === id) {
               return current;
            }
            current = current.next;
        }
        return null;
    }
    // finds the index of element
    indexOf(element) {
        let count = 0;
        let current = this.head;
 
        // iterate over the list
        while (current != null) {
            // compare each element of the list
            // with given element
            if (current.element === element)
                return count;
            count++;
            current = current.next;
        }
 
        // not found
        return -1;
    }
    isEmpty() {
        return this.size == 0;
    }
    size_of_list() {
        console.log(this.size);
    }
    printList() {
        let curr = this.head;
        let str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        console.log(str);
    }
}
// Instances
let tc_list = new LinkedList();
let altered_cells = new LinkedList();
/* ==========================================================================
Event Listeners
========================================================================== */
button_submit_unit_info.addEventListener("click", (event) => {
    console.log("CLICKED")

    // Check if input fields are empty
    if (input_unit_name.value === "") {return false;}
    if (textarea_unit_info.value === "") {return false;}

    // Reset the timetable
    ResetTimetable();

    // ProcessUserInput removes unneccessary information and formats the data
    const unit_info_matrix = ProcessUserInput();

    // Invalid input (not comprehensive)
    if (unit_info_matrix.length === 0) {return false;}
    
    // Create a TimeCommitment object for each tutorial or lecture
    CreateTimeCommitments(unit_info_matrix)

    // Add the TimeCommitments to the unit table
    AddTimeCommitmentsToUnitTable();
    // Add the TimeCommitments to the timetable
    AddTimeCommitmentsToTimetable();

    event.preventDefault();
});
button_refresh_timetable.addEventListener("click", (event) => {
    console.log("CLICKED")
    // Reset the timetable
    ResetTimetable();
    // Add the TimeCommitments to the timetable
    if (!tc_list.isEmpty()) {
        AddTimeCommitmentsToTimetable();
    }
    event.preventDefault();
});
/* ==========================================================================
Functions
========================================================================== */
function ProcessUserInput() {
    console.log("ProcessUserInput()");
    // Split the input into lines
    const lines = textarea_unit_info.value.trim().split('\n');

    // Split each line by the tab character to get the columns
    let matrix = lines.map(line => line.trim().split('\t'));

    // Remove the top row
    matrix.shift();

    // Remove irrelevant data
    const rows_to_keep = [0, 1, 2, 3, 6];
    matrix = matrix.map(row => {
        return rows_to_keep.map(index => row[index]);
    });

    // Trim whitespace from each value in the matrix
    matrix = matrix.map(row => row.map(cell => cell.trim()));

    // Swap the last two columns because it looks better
    matrix.forEach(row => {
        const temp = row[row.length - 2]; 

        row[row.length - 2] = row[row.length - 1]; 
        row[row.length - 1] = temp;
    });

    // Add the unit name to the first cell of each row
    matrix = matrix.map(row => {
        row.unshift(input_unit_name.value);
        return row;
    });

    // Reset user input
    input_unit_name.value = "";
    textarea_unit_info.value = "";

    return matrix;
}
function AddTimeCommitmentsToUnitTable() {
    console.log("AddTimeCommitmentsToUnitTable()");

    if (!tc_list.isEmpty()) {
        let current_tc = tc_list.head;

        // Iterate over the list of time commitments
        while (current_tc !== null) {
            // Check if the time commitment should be added to the table
            if (!current_tc.element.GetTableStatus()) {
                // Confirm that the element has been added to the table
                current_tc.element.SetTableStatus(true);

                // Create a new table row
                const row = document.createElement('tr');
                row.classList.add("table__row");

                // Retrieve the row data from the time commitment
                const row_data = current_tc.element.ReturnUnitTableFormat();

                // For each element in row_data, add to table
                row_data.forEach((cell_data, index) => {
                    // Create a new table cell
                    const cell = document.createElement('td');
                    cell.classList.add("table__cell");

                    // Set the text content of the cell
                    cell.textContent = cell_data;

                    // Add the cell to the row
                    row.appendChild(cell);

                    // Check if it's the last cell
                    if (index === row_data.length - 1) {
                        // Create a new table cell for the button
                        const cell = document.createElement('td');
                        cell.classList.add("table__cell");

                        cell.appendChild(GenerateActionButtons(current_tc.element));

                        // Add the cell to the row
                        row.appendChild(cell);
                    }
                });
                // Add the row to the table
                table_unit_info.appendChild(row);
            }
            // Move to the next time commitment
            current_tc = current_tc.next;
        }
    }
}
function GenerateActionButtons(tc) {
    // Create a container to hold the buttons
    const buttons_container = document.createElement('div');
    buttons_container.classList.add("even_columns");

    // Create the delete button
    const button_delete = document.createElement('button');
    // Set delete button properties
    button_delete.classList.add("button__options");
    button_delete.dataset.timeCommitmentPairing = tc.GetID();
    // Delete button visuals
    var img_trash = document.createElement("img");
    img_trash.src = "images/trash.svg";
    img_trash.alt = "";
    button_delete.appendChild(img_trash);
    // Accessibility context
    const delete_context = document.createElement("span");
    delete_context.classList.add("visually_hidden");
    delete_context.innerText = `Delete: ${tc.GetName()} ${tc.GetActivityID()} on ${tc.GetDay()} at ${tc.GetStartTime()}`;
    // Add span to button
    button_delete.appendChild(delete_context);
    // Listen for click event
    button_delete.onclick = function() {
        DeleteTimeCommitment(this);
    };

    // Create the hide button
    const button_hide = document.createElement('button');
    // Set hide button properties
    button_hide.classList.add("button__options");
    button_hide.dataset.timeCommitmentPairing = tc.GetID();
    // Hide button visuals
    var img_eye = document.createElement("img");
    img_eye.src = "images/eye.svg";
    img_eye.alt = "";
    button_hide.appendChild(img_eye);
    // Accessibility context
    const hide_context = document.createElement("span");
    hide_context.classList.add("visually_hidden");
    hide_context.innerText = `Hide: ${tc.GetName()} ${tc.GetActivityID()} on ${tc.GetDay()} at ${tc.GetStartTime()}`;
    // Add span to button
    button_hide.appendChild(hide_context);
    // Listen for click event
    button_hide.onclick = function() {
        HideTimeCommitmentToggle(this);
    };

    buttons_container.appendChild(button_delete);
    buttons_container.appendChild(button_hide);

    return buttons_container;
}
function DeleteTimeCommitment(button) {
    // Remove the row from the unit table
    button.closest('tr').remove();
    // Remove the time commitment
    tc_list.removeByID(parseInt(button.dataset.timeCommitmentPairing));
    // Re-paint the timetable
    ResetTimetable();
    if (!tc_list.isEmpty()) {
        AddTimeCommitmentsToTimetable();
    }
}
function HideTimeCommitmentToggle(button) {
    const tc_to_toggle_hide = tc_list.findByID(parseInt(button.dataset.timeCommitmentPairing))

    tc_to_toggle_hide.element.TogglePermanentHide();

    // Set hide button visuals
    const button_image = button.firstChild;
    const src = button_image.getAttribute('src');
    
    if (src === "images/eye.svg") {
        button_image.setAttribute('src', "images/eye_off.svg");
    } 
    else if (src === "images/eye_off.svg") {
        button_image.setAttribute('src', "images/eye.svg");
    }
    // Re-paint the timetable
    ResetTimetable();
    if (!tc_list.isEmpty()) {
        AddTimeCommitmentsToTimetable();
    }
}
function CreateTimeCommitments(matrix) {
    console.log("CreateTimeCommitments()");
    // Create a TimeCommitment object for each row and add to list
    matrix.map(row => {
        // Retrieve processed textarea values
        let [name, activity_id, day, start_time, duration, spots] = row;
        // Get the color
        const color = input_unit_color.value;
        // "2 hrs" becomes "2" - then parsed to int
        duration = parseInt(duration.slice(0, 1));

        // Create a new time commitment
        const time_commitment = new TimeCommitment(name, activity_id, day, start_time, duration, parseInt(spots), color);
        // Add the time commitment to the linked list
        tc_list.add(time_commitment); 
    });
}
function AddTimeCommitmentsToTimetable() {
    console.log("AddTimeCommitmentsToTimetable()");
    // Start from the head of the linked list
    let current = tc_list.head;

    // Traverse the linked list
    while (current !== null) {
        CheckAgainstFilters(current.element);

        // Time Commitment passed filter check
        if (current.element.GetHiddenStatus() === false) {
            
            // Determine the row and column indices based on day and start time
            const column_index = dict_days.get(current.element.GetDay());
            const row_index = dict_times.get(current.element.GetStartTime());
            
            PaintTimeCommitmentGraphics(row_index, column_index, current.element);
        }

        // Move to the next node in the linked list
        current = current.next;
    }
}
function CheckAgainstFilters(tc) {
    // Time Commitment has been set to be permanently hidden by the user
    if (tc.GetPermanentHiddenStatus() === true) {
        tc.SetHiddenStatus(true);
        return;
    }
    // Time commitment starts at a time that is too early
    if (GetNumberForTimeString(tc.GetStartTime()) < select_earlist_start.value) {
        tc.SetHiddenStatus(true);
        return;
    }
    // Time commitment ends at a time too late
    if ((GetNumberForTimeString(tc.GetStartTime()) + (tc.GetDuration() * 2)) > select_latest_end.value) {
        tc.SetHiddenStatus(true);
        return;
    }
    // There are no free spots
    if (input_hide_no_spots.checked && tc.GetSpots() === 0) {
        tc.SetHiddenStatus(true);
        return;
    }
}
function GetNumberForTimeString(time_string) {
    // Check if the time string exists in the Map
    if (dict_times.has(time_string)) {
        // Return the number associated with the time string
        return dict_times.get(time_string);
    } 
    else {
        // Return null if the time string is not found in the Map
        return null;
    }
}
function PaintTimeCommitmentGraphics(start_row_index, column_index, tc) {
    console.log("PaintTimeCommitmentGraphics()");

    // Number of cells to paint is equal to duration in hours * 2 (half-hour blocks)
    const steps = tc.GetDuration() * 2;

    // The current row to paint will be updated
    let current_row_index = start_row_index;

    for (let i = steps; i > 0; i--) {
        // Reference the table cell
        const cell = table_timetable.rows[current_row_index].cells[column_index];

        // Reference the cell's list
        const list = cell.querySelector(".table__list");

        // Create new item
        const item = document.createElement("li");
        item.classList.add("table__item");

        // Add to the cell's list
        list.appendChild(item);

        // Paint table cells based on selected method
        if (select_table_painting_method.value === "regular") {
            item.style.backgroundColor = tc.GetColor();
        }
        else if (select_table_painting_method.value === "color_mix") {
            PaintWithMixing(cell, tc);
        }

        // Write text to item
        WriteToCellItem(item, i, steps, tc);

        current_row_index++;
    }
}
function WriteToCellItem(item, current_step, max_steps, tc) {
    // Create a span for the additional screen reader info
    const accessibility_context = document.createElement("span");
    accessibility_context.classList.add("visually_hidden");

    // First cell painted
    if (current_step === max_steps && select_table_painting_method.value === "regular") {
        // Create a paragraph
        const paragraph = document.createElement("p");
        paragraph.classList.add("line_clamp");
        // Add paragraph to list item
        item.appendChild(paragraph);

        // Display the name and activity_id of the time commitment
        paragraph.innerText = `${tc.GetName()} ${tc.GetActivityID()}`;
        // Provide additional context for screen readers
        accessibility_context.innerText = `${GetIndex(max_steps, current_step)} of ${max_steps}`;
        // Add span to paragraph
        paragraph.appendChild(accessibility_context);
    }
    // Other cell painted
    else {
        // Provide full context for screen readers
        accessibility_context.innerText = `${tc.GetName()} ${tc.GetActivityID()} ${GetIndex(max_steps, current_step)} of ${max_steps}`;
        item.appendChild(accessibility_context);
    }
}
function GetIndex(max_steps, current_step) {
    return Math.abs((max_steps - current_step) + 1);
}
function PaintWithMixing(cell, tc) {
    // This is really dumb; I don't think anyone would actually want to use this
    // It was fun making this anyway lol
    console.log("MixThePaint()");
    // First color entered for the cell, modify --clr_one
    if (GetCustomPropertyValue(cell, "--clr_one") == "transparent") {
        cell.style.setProperty("--clr_one", tc.GetColor());
    }
    // Second color entered for the cell, modify --clr_two
    else if (GetCustomPropertyValue(cell, "--clr_two") == "transparent") {
        cell.dataset.mixCount++;
        cell.style.setProperty("--clr_two", tc.GetColor());
        cell.style.setProperty("--mix_percentage", DetermineMixPercentage(cell.dataset.mixCount));
    }
    // Store the current color and then mix in the new one
    else {
        cell.dataset.mixCount++;
        const clr_current = window.getComputedStyle(cell).backgroundColor;
        cell.style.setProperty("--clr_one", clr_current);
        cell.style.setProperty("--clr_two", tc.GetColor());
        cell.style.setProperty("--mix_percentage", DetermineMixPercentage(cell.dataset.mixCount));
    }
    altered_cells.add(cell);
}
function DetermineMixPercentage(mix_count) {
    let operand = parseInt(mix_count);
    return ((operand / (operand + 1)) * 100 + "%")
}
function GetCustomPropertyValue(element, property_name) {
    // Get the computed style for the given element
    const computedStyle = window.getComputedStyle(element);

    // Retrieve the value of the specified custom property
    return computedStyle.getPropertyValue(property_name).trim();
}
function ResetTimetable() {
    console.log("ResetTimetable()");

    // Reset the lists
    timetable_lists.forEach((ul) => {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    });

    if (!altered_cells.isEmpty()) {
        // Reset the colors applied to cells
        let current_cell = altered_cells.head;
        while (current_cell !== null) {
            const cell = current_cell.element;
            cell.style.setProperty("--clr_one", "transparent");
            cell.style.setProperty("--clr_two", "transparent");
            cell.style.setProperty("--mix_percentage", "100%");
            cell.dataset.mixCount = 0;
            current_cell = current_cell.next;
        }
        // Reset list by creating a new list (old one should be garbage collected)
        altered_cells = new LinkedList();
    }

    // Reset the hidden values of every time commitment
    if (!tc_list.isEmpty()) {
        let current_tc = tc_list.head;
        while (current_tc !== null) {
            current_tc.element.SetHiddenStatus(false);
            current_tc = current_tc.next;
        }
    }
}
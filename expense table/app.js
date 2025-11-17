//variables
const addEntryBtn = document.getElementById("addEntryBtn");
const entryForm = document.getElementById("entryForm");
const submitEntry = document.getElementById("submitEntry");
const tableBody = document.querySelector("#expenseTable tbody");
const sortCategory = document.getElementById("sortCategory");

let editIndex = null; //helper variable for row edits

//toggle add a value form
addEntryBtn.addEventListener("click", () => {
    entryForm.classList.toggle("d-none");
    clearForm();
    editIndex = null;
});

//save form (add or edit)
submitEntry.addEventListener("click", () => {
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

	//check if all forms are filled
    if (!amount || !category || !date) {
        alert("Please fill all required fields.");
        return;
    }

    if (editIndex !== null) {
        //if an edit was made, edit the corresponding row
        const row = tableBody.children[editIndex];
        row.children[0].textContent = parseFloat(amount).toFixed(2);
        row.children[1].textContent = category;
        row.children[2].textContent = date;
        row.children[3].textContent = description;
    } else {
        //add a new row
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${parseFloat(amount).toFixed(2)}</td>
            <td>${category}</td>
            <td>${date}</td>
            <td>${description}</td>
            <td>
                <button class="btn btn-sm btn-warning editBtn">Edit</button>
                <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    }

    clearForm();
    editIndex = null;
});

//edit/delete rows
tableBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const index = [...tableBody.children].indexOf(row);

    //delete
    if (e.target.classList.contains("deleteBtn")) {
        row.remove();
        return;
    }

    //edit
    if (e.target.classList.contains("editBtn")) {
        editIndex = index;

        document.getElementById("amount").value = row.children[0].textContent;
        document.getElementById("category").value = row.children[1].textContent;
        document.getElementById("date").value = row.children[2].textContent;
        document.getElementById("description").value = row.children[3].textContent;

        entryForm.classList.remove("d-none");
    }
});

//sort by category
sortCategory.addEventListener("change", () => {
    const filter = sortCategory.value;

    const rows = Array.from(tableBody.querySelectorAll("tr"));
    rows.forEach(row => {
        const categoryCell = row.children[1].textContent;

        row.style.display = (!filter || categoryCell === filter)
            ? ""
            : "none";
    });
});

//clears everything
function clearForm() {
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}
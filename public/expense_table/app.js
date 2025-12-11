const addEntryBtn = document.getElementById("addEntryBtn");
const entryForm = document.getElementById("entryForm");
const submitEntry = document.getElementById("submitEntry");
const tableBody = document.querySelector("#expenseTable tbody");
const sortCategory = document.getElementById("sortCategory");
let editIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  fetchExpenses();
});

addEntryBtn.addEventListener("click", () => {
  entryForm.classList.toggle("d-none");
  clearForm();
  editIndex = null;
});

submitEntry.addEventListener("click", () => {
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;

  if (!amount || !category || !date) {
    alert("Please fill all required fields.");
    return;
  }

  const dataToSend = { amount, category, date, description };

  addEntry(dataToSend)
    .then(() => {
      clearForm();
      editIndex = null;
      fetchExpenses();
    })
    .catch((error) => {
      alert("There was a problem saving your entry.");
    });
});

tableBody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  const expenseId = row.dataset.expenseId;

  if (e.target.classList.contains("deleteBtn")) {
    deleteExpense(expenseId).then(() => {
      row.remove();
    });
    return;
  }

  if (e.target.classList.contains("editBtn")) {
    editIndex = [...tableBody.children].indexOf(row);
    document.getElementById("amount").value = row.children[0].textContent;
    document.getElementById("category").value = row.children[1].textContent;
    document.getElementById("date").value = row.children[2].textContent;
    document.getElementById("description").value = row.children[3].textContent;
    entryForm.classList.remove("d-none");
  }
});

sortCategory.addEventListener("change", () => {
  const filter = sortCategory.value;
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.forEach(row => {
    const categoryCell = row.children[1].textContent;
    row.style.display = (!filter || categoryCell === filter) ? "" : "none";
  });
});

function addEntry(dataToSend) {
  return fetch("/api/addExpense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend)
  })
    .then((res) => res.json());
}

function fetchExpenses() {
  fetch("/api/getExpenses")
    .then((res) => res.json())
    .then((data) => {
      tableBody.innerHTML = "";
      (data.expenses || []).forEach(expense => {
        addRowToTable(expense);
      });
    });
}

function addRowToTable(expense) {
  const row = document.createElement("tr");
  row.dataset.expenseId = expense.expense_id;

  row.innerHTML = `
    <td>${parseFloat(expense.amount).toFixed(2)}</td>
    <td>${expense.category_name}</td>
    <td>${expense.date_of_expense}</td>
    <td>${expense.expense_desc || ""}</td>
    <td>
      <button class="btn btn-sm btn-warning editBtn">Edit</button>
      <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);
}

function deleteExpense(id) {
  return fetch(`/api/deleteExpense/${id}`, {
    method: "DELETE"
  }).then(res => res.json());
}

function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
}

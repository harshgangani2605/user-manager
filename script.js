// === References ===
const userForm = document.getElementById("userForm");
const userTableBody = document.querySelector("#userTable tbody");
const searchInput = document.getElementById("search");

let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

// === Render Table ===
function renderTable(data = users) {
  userTableBody.innerHTML = "";

  data.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.language}</td>
      <td>
        <button class="edit" onclick="editUser(${index})">Edit</button>
        <button class="delete" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

// === Add / Edit User ===
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    language: document.getElementById("language").value,
  };

  // Validation
  if (!/^\d{10}$/.test(user.phone)) {
    alert("Phone must be 10 digits!");
    return;
  }

  if (editIndex === null) {
    // Add new
    users.push(user);
  } else {
    // Update existing
    users[editIndex] = user;
    editIndex = null;
  }

  localStorage.setItem("users", JSON.stringify(users));
  renderTable();
  userForm.reset();
});

// === Edit User ===
function editUser(index) {
  const user = users[index];
  document.getElementById("firstName").value = user.firstName;
  document.getElementById("lastName").value = user.lastName;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("language").value = user.language;

  editIndex = index;
}

// === Delete User ===
function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderTable();
  }
}

// === Search Filter ===
searchInput.addEventListener("input", function () {
  const term = searchInput.value.toLowerCase();
  const filtered = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

// === Initial Render ===
renderTable();

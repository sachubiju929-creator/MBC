let selectedRole = "student";

function setRole(role, element) {
  selectedRole = role;

  document.querySelectorAll(".tab").forEach(btn =>
    btn.classList.remove("active")
  );

  element.classList.add("active");
}

function login() {
  const username = document.getElementById("username").value;

  if (!username) {
    alert("Enter username");
    return;
  }

  window.location.href = "dashboards/student.html";
}
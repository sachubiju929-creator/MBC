let selectedRole = "student";

function setRole(role, element) {
  selectedRole = role;

  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));

  element.classList.add("active");

  const titles = {
    student: "Student Login",
    warden: "Warden Login",
    mess: "Mess Staff Login"
  };

  const loginTitle = document.getElementById("loginTitle");
  if (loginTitle) loginTitle.innerText = titles[role] || "Login";
}

function login() {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");
  const username = usernameEl ? usernameEl.value.trim() : "";
  const password = passwordEl ? passwordEl.value : "";

  if (!username) {
    alert("Enter username");
    return;
  }

  if (!password) {
    alert("Enter password");
    return;
  }

  const roleToPath = {
    student: "dashborad/student.html",
    warden: "dashborad/warden.html",
    mess: "dashborad/mess.html"
  };

  const target = roleToPath[selectedRole] || roleToPath.student;
  window.location.href = target;
}
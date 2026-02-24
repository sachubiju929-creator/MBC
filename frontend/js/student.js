const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) {
  window.location.href = "../index.html";
}

// Show data
document.getElementById("name").innerText = "Welcome " + user.name;

function logout() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}
const user = JSON.parse(sessionStorage.getItem("user"));

if (!user || user.role !== "mess") {
  window.location.href = "../index.html";
}

document.getElementById("name").innerText =
  "Welcome " + user.data.name;

document.getElementById("students").innerText =
  user.data.totalStudents || 150;

document.getElementById("meals").innerText =
  450;

document.getElementById("cuts").innerText =
  12;

function logout() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}
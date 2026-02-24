const user = JSON.parse(sessionStorage.getItem("user"));

if (!user || user.role !== "warden") {
  window.location.href = "../index.html";
}

document.getElementById("name").innerText = "Welcome " + user.data.name;
document.getElementById("students").innerText = user.data.totalStudents;
document.getElementById("leaves").innerText = user.data.pendingLeaves;
document.getElementById("complaints").innerText = user.data.pendingComplaints;

function logout(){
  sessionStorage.clear();
  window.location.href="../index.html";
}
function sendReset() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Enter Email");
    return;
  }

  alert("Reset link sent (Demo)");

  window.location.href = "reset.html";
}
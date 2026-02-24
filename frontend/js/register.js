function register() {

  const role = document.getElementById("role").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const newUser = {
    role: role,
    name: name,
    email: email
  };

  // Store temporarily (Demo Version)
  localStorage.setItem("registeredUser", JSON.stringify(newUser));

  alert("Registration Successful!");

  window.location.href = "index.html";
}
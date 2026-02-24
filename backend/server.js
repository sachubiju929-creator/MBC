const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
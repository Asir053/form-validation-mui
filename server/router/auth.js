const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from server");
});

router.post("/register", (req, res) => {
  res.json({ message: req.body });
});

module.exports = router;

// app.listen(5000, () => {
//   console.log("Server is running");
// });

const express = require("express");
const { checkIfFileExists } = require("./middleware.js");
const { communicate } = require("./communicate.js");
const app = express();
app.use(express.json());

app.post("/calculate", checkIfFileExists,communicate);

app.listen(6000, () => {
  console.log("container_P1 running @ 6000");
});

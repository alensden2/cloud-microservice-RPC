const axios = require("axios");
const communicate = (req, res) => {
//   axios
//     .post("http://localhost:5000/calculate", req.body)
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });

console.log(req.body)  
res.json({ message: "Data received successfully" });

};

module.exports = {
    communicate
}
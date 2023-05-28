const fs = require("fs");
const csv = require("csv-parser");

const checkIfFileExists = (req, res, next) => {
  const fileName = req.body.file;
  const filePath = "../files/" + fileName;
  if (fileName == null || fileName === "") {
    res.status(400).json({
      file: null,
      error: "Invalid JSON input.",
    });
  } else {
    /** file exists logic */
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(200).json({
          file: fileName,
          error: "File not found.",
        });
        return;
      }
      let invalidCSV = false;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("headers", (headers) => {
          const missingHeaders = headers.filter(
            (header) => header.trim() === ""
          );
          const containsComma = headers.some((header) => header.includes(","));
          if (missingHeaders.length > 0 || containsComma) {
            invalidCSV = true;
          }
        })
        .on("data", (row) => {
          Object.values(row).forEach((value) => {
            if (value.trim() === "" || value.includes(",")) {
              invalidCSV = true;
            }
          });
        })
        .on("error", (error) => {
          res.status(200).json({
            file: fileName,
            error: "Invalid CSV input.",
          });
        })
        .on("end", () => {
          if (invalidCSV) {
            res.status(200).json({
              file: fileName,
              error: "Invalid CSV input.",
            });
          } else {
            req.jsonObj = { From: "First" };
            next();
          }
        });
    });
  }
};

module.exports = {
  checkIfFileExists,
};

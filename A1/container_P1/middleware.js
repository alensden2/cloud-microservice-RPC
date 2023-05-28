const fs = require("fs");

const checkIfFileExists = (req, res, next) => {
  const fileName = req.body.file;
  const filePath = "../files/" + fileName;
  if (fileName == null || fileName == "") {
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
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.status(500).json({
            file: fileName,
            error: "Invalid JSON input.",
          });
          return;
        }

        if (!data.includes(",")) {
          res.status(200).json({
            file: fileName,
            error: "Input file not in CSV format.",
          });
          return;
        }

        req.jsonObj = { From: "First" };
        next();
      });
    });
  }
};

module.exports = {
  checkIfFileExists,
};

const fs = require("fs");

const checkIfFileExists = (req, res, next) => {
  const filePath = req.body.file;
  if (filePath == null || filePath == "") {
    res.status(400).json({
      file: null,
      error: "Invalid JSON input.",
    });
  } else {
    /** file exists logic */
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(200).json({
          file: filePath,
          error: "File not found.",
        });
        return;
      }
      req.jsonObj = {From: "First"};
      next()
    });
  }
 
};

module.exports = {
  checkIfFileExists,
};

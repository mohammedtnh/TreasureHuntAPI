const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media", //starting from app.js
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${req.body.name}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;

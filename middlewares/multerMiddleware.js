const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(new Error('File type not supported.'));
    } else {
      cb(null, true);
    }
  }
});

const handleFileUpload = (req, res, next) => {
  upload.single('profileimg')(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(400).send({ error: err.message });
    } else {
      next();
    }
  });
};
module.exports = handleFileUpload;

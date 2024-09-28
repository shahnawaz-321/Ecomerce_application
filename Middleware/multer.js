const multer = require('multer');

const storage = multer.memoryStorage();
const single_upload = multer({
  storage,
}).single('file');

module.exports = single_upload;

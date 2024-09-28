const datauriparser = require('datauri/parser');

const path = require('path');

const getDatauri = (file) => {
  const parser = new datauriparser();
  // console.log(parser);
  const extName = path.extname(file.originalname).toString();
  //console.log(extName);
  //console.log(parser.format(extName, file.buffer));
  return parser.format(extName, file.buffer);
};

module.exports = getDatauri;

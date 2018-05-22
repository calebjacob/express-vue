const m = require('moment');



function moment(value, format) {
  if (value) {
    return m(value).format(format);
  }


  return '';
}



export default moment;

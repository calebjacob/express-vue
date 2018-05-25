function get(req, res) {
  res.json({
    thing: 'car',
    color: 'blue',
    miles: 7000,
    foobar: req.foobar
  });
}



function post(req, res) {
  res.json({
    id: 1
  });
}



module.exports = {
  get,
  post
};

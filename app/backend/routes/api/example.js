function get(req, res) {
  res.json({
    color: 'blue',
    foobar: req.foobar,
    miles: 7000,
    thing: 'car'
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

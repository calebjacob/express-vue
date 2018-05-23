function get(req, res, next) {
  res.json({
    thing: 'car',
    color: 'blue',
    fancy: true,
    miles: 7000
  });
}



module.exports = {
  get
};

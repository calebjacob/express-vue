function example(req, res, next) {
  req.foobar = true;

  next();
}



module.exports = example;

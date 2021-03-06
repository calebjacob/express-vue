function debug(error, req, res, next) {
  console.dir(error, {
    depth: null,
    colors: true
  });

  next(error);
}

module.exports = debug;

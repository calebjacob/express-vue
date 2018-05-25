function debug(error, req, res, next) {
  console.dir(error, {
    depth: null,
    colors: true
  });

  res.status(500);
  res.json({});
};



module.exports = debug;

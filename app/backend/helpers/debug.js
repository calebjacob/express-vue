function debug(error, req, res) {
  console.dir(error, {
    depth: null,
    colors: true
  });

  res.status(500);
  res.json({});
}



module.exports = debug;

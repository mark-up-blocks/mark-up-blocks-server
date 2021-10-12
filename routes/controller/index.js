function responseOk(req, res) {
  res.status(200);
  res.json({ result: "ok" });
}

module.exports = {
  responseOk
};

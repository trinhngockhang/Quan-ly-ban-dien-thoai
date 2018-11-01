module.exports = (req, res, next) => {
  console.log("da vao mdw",req.user.type);
  if (!(req.user.type === "boss")) {
    return res.redirect('/notAuth');
  }
  next();
};

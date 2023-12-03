const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  //get the token from the header
  const token = req.header("Authorization")?.split("Bearer ")[1];

  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ code: "no-token", msg: "No Token, Authorization Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ code: "invalid-token", msg: "Token is Not Valid" });
  }
};

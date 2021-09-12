const jwt = require("jsonwebtoken");
const user = require("../apis/models/adminModel");
const cookieParser = require("cookie-parser");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Book;
    const infos = jwt.verify(token, "Book");
    // console.log("helllo", infos);
    const rootuser = await user.findOne({
      _id: infos._id,
      "tokens.token": token,
    });
    console.log("helllo", token);
    if (!rootuser) {
      res.status(422).json({ error: "error" });
    }
    req.token = token;
    req.rootuser = rootuser;
    req.userID = rootuser._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "error" });
  }
};
module.exports = Authenticate;

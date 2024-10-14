const { Admin, Student } = require("../models/users");
const jwt = require("jsonwebtoken");

const authenticateProtectedRoutes = async (req, res, next) => {
  const token = req.cookies.AccessToken;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const { email, isAdmin } = jwt.verify(token, process.env.JWT_TOKEN);
  let user;
  if (isAdmin) {
    user = await Admin.findOne({ email }).select("-_id -__v -password");
  } else {
    user = await Student.findOne({ email }).select("-_id -__v -password");
  }
  if (!user) {


    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    // res.status(200).json(user);
    next();
  }
};

module.exports = authenticateProtectedRoutes;

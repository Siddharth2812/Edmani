const { Admin, Student } = require("../models/users");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

//signup (registration)
router.post("/signup", async (req, res) => {
  const { username, password, email, isAdmin } = req.body;
  try {
    if (isAdmin) {
      let user = await Admin.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Admin already exists" });
      }
      user = new Admin({ username, password, email });
      await user.save();
    } else {
      let user = await Student.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Student already exists" });
      }
      user = new Student({ username, password, email });
      await user.save();
    }
    res.status(201).json({ message: "User created successfully" });
    //we need to redirect back to login page (to save cookies)  //do it in front-end
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//signin (login)
router.post("/signin", async (req, res) => {
  const { email, password, isAdmin } = req.body;
  let token;
  try {
    if (isAdmin) {
      let admin = await Admin.findOne({ email });
      if (admin) {
        if (admin.password === password) {
          token = jwt.sign({ email, isAdmin: true }, process.env.JWT_TOKEN);
        } else {
          return res.status(403).json({ message: "Invalid email or password" });
        }
      } else {
        return res.status(403).json({ message: "No Admin found!" });
      }
    } else {
      let student = await Student.findOne({ email });
      if (student) {
        if (student.password === password) {
          token = jwt.sign({ email, isAdmin: false }, process.env.JWT_TOKEN);
        } else {
          return res.status(403).json({ message: "Invalid email or password" });
        }
      } else {
        return res.status(403).json({ message: "No Student found!" });
      }
    }
    res
      .cookie("AccessToken", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .json({ message: "Login Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("AccessToken");
  res.json({ message: "Logout Success" });
});

module.exports = router;

const { Student } = require("../models/users");
const express = require("express");
const HackathonRegistrations = require("../models/registrations");
const { Hackathon, PreviousHackathons } = require("../models/hackathons");
const authenticateProtectedRoutes = require("../helpers/checkCookie");
const router = express.Router();
const mongoose = require('mongoose');
const {Sport} = require("../models/sports");

//---------------------------------------------------------------

//Student hackathon registration
router.post("/hackathon", authenticateProtectedRoutes, async (req, res) => {
  try {
    const { hackathon_title, email, team_emails } = req.body;
    const title = hackathon_title;

    // Check if hackathon exists
    const isHackathonExists = await Hackathon.findOne({ title });
    if (!isHackathonExists) {
      return res.status(400).json({ message: "Hackathon does not exist" });
    }

    const student = await Student.findOne({
      email,
      hackathons: {
        $elemMatch: { hackathon_title },
      },
    });
    if (student) {
      console.log(student);
      return res.status(400).json({ message: "Student already registered" });
    }

    // Register student
    const registerStudent = new HackathonRegistrations({
      ...req.body,
      hackathon_title: title,
    });
    await registerStudent.save();

    // Update student details
    const hackathonDetails = {
      hackathon_title: title,
      friends: [...team_emails],
    };
    await Student.findOneAndUpdate(
      { email },
      { $push: { hackathons: hackathonDetails } },
      { new: true }
    );

    // Update previous hackathon details
    await PreviousHackathons.findOneAndUpdate(
      { hackathon_title: title },
      { $push: { student_teams: { team_emails: [...team_emails, email] } } },
      { new: true }
    );

    res.status(200).json({ message: "Hackathon registration successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/hackathon/:id",authenticateProtectedRoutes, async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Hackathon ID" });
    }

    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    res.json(hackathon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/hackathons", async (req, res) => {
  const hackathons = await Hackathon.find();
  res.json(hackathons);
});


router.get("/sports", async(req,res)=>{
  const sports = await Sport.find();
  res.json(sports);
});



module.exports = router;

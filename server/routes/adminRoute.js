const Course = require("../models/courses");
const { Admin } = require("../models/users");
const express = require("express");
const { Hackathon, PreviousHackathons } = require("../models/hackathons");
const {Sport} = require("../models/sports");
// const authenticateProtectedRoutes = require("../helpers/checkCookie");
const router = express.Router();

//---------------------------------------------------------------

//Create a new Course
router.post("/create/course", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

//Update existing course using course id/name (unique)
router.put("/courses/:courseId", async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.status(200).json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

//Get all courses
router.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

//Delete course using course id/name (unique)
router.delete("/courses/:courseId", async (req, res) => {
  const courses = await Course.findByIdAndDelete(req.params.courseId);
  if (courses) {
    res.status(200).json({ message: "Course deleted successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

//---------------------------------------------------------------

//Create a hackathon
router.post("/create/hackathon", async (req, res) => {
  const { title, admin_email } = req.body;
  const isHackathonExists = await Hackathon.findOne({ title });
  if (isHackathonExists) {
    res.json({ message: "The Hackathon already exists with this title" });
  } else {
    const hackathon = new Hackathon(req.body);
    await hackathon.save();

    //we update the hackathon title in the admins hackathons array (the hackathons he had created before and this hackathon)
    const admin = await Admin.findOneAndUpdate(
      { email: admin_email },
      { $addToSet: { hackathons: { $each: [title] } } }, // Add new hackathons to the array
      { new: true }
    );

    // we save the hackathon in another collection to track the hackathon
    const previousHackathons = await PreviousHackathons({
      admin_email,
      hackathon_title: title,
    });

    await previousHackathons.save();

    res.json({ message: "Hackathon is created succesfully" });
  }
});

//Update existing hackathon using hackathon id/name (unique)
router.put("/hackathon", async (req, res) => {
  try {
    const { title, ...data } = req.body;
    let hackathon = await Hackathon.findOne({ title });
    if (hackathon) {
      const updatedHackathon = await Hackathon.findByIdAndUpdate(
        hackathon._id,
        { ...data },
        { new: true }
      );
      res.status(200).json({ message: "Hackathon updated successfully" });
    } else {
      res.status(404).json({ message: "Hackathon not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get all hackathons created by specific admin
router.get("/hackathons", async (req, res) => {
  const admin_email = req.body.email;
  const hackathons = await Hackathon.find({ admin_email });
  res.json({ hackathons });
});

router.get("/hackathon", async (req, res) => {
  const { title } = req.body;
  // const admin_email = email;
  const hackathon_title = title;
  const hackathon = await PreviousHackathons.findOne({ hackathon_title });
  res.json({ hackathon });
});

//Delete hackathon using hackathon id/name (unique)
router.delete("/hackathon", async (req, res) => {
  try {
    const { title, admin_email } = req.body;
    const email = admin_email;
    console.log(email);
    if (!title || !admin_email) {
      return res
        .status(400)
        .json({ message: "Title and admin email are required" });
    }

    // Delete hackathon
    const hackathon = await Hackathon.findOneAndDelete({ title });

    // Delete previous hackathon
    const previousHackathon = await PreviousHackathons.findOneAndDelete({
      hackathon_title: title,
    });

    // Update admin's hackathons array
    const user = await Admin.findOneAndUpdate(
      { email },
      { $pull: { hackathons: title } },
      { new: true }
    );

    // Check if hackathon and previous hackathon were deleted and also admins array was updated
    if (hackathon && previousHackathon && user) {
      res.status(200).json({ message: "Hackathon deleted successfully" });
    } else {
      res.status(404).json({ message: "Hackathon not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/create/sport", async(req,res)=>{
  const newSport = new Sport(req.body);
  await  newSport.save();
  const admin = await Admin.findOneAndUpdate(
    { email: admin_email },
    { $addToSet: { sports: { $each: [title] } } }, // Add new hackathons to the array
    { new: true }
  );

  // we save the hackathon in another collection to track the hackathon
  const previousHackathons = await PreviousHackathons({
    admin_email,
    hackathon_title: title,
  });

  await previousHackathons.save();

  res.json({ message: "Hackathon is created succesfully" });
} )
//---------------------------------------------------------------

//---------------------------------------------------------------

module.exports = router;

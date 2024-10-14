const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  class: String,
  videoLink: String,
  topic: String,
  notes: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

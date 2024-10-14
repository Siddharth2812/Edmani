const mongoose = require("mongoose");

//creating a new hackathon
const hackathonSchema = new mongoose.Schema({
  admin_email: { type: String, required: true },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  organization_img: {
    type: String,
  },
  event_img: {
    type: String,
  },
  event_mode: {
    type: String,
    required: true,
  },
  cost: {
    type: String, //free or cost
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  hackathon_date: {
    type: Date,
  },
  venue: {
    type: String,
  },
  team_size: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date, //last date to register
    required: true,
  },
  hackathon_website: {
    type: String,
  },
  previous_images: {
    type: [String], //list of img urls
  },
  technology_stack: {
    type: String,
    required: true,
  },
  about_organization: {
    type: String,
  },
  rules_and_guidelines: {
    type: String,
  },
  evaluation_process: {
    type: String,
  },
  event_benefits: {
    type: String,
  },
  contact_details: {
    type: String,
  },
});

const registeredStudentsSchema = new mongoose.Schema({
  admin_email: { type: String, required: true },
  hackathon_title: {
    type: String,
    required: true,
    unique: true,
  },
  student_teams: {
    type: [{ team_emails: [String] }], //Students emails based on teams formed (to know how many got registered)
    default: [],
  },
});

const PreviousHackathons = mongoose.model(
  "PreviousHackathons",
  registeredStudentsSchema
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

module.exports = { Hackathon, PreviousHackathons };

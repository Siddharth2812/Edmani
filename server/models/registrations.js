const mongoose = require("mongoose");

const hackathonRegistrationSchema = new mongoose.Schema({
  hackathon_title: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    //Take the student's email address who got logged and registering
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phno: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  },
  year: {
    type: mongoose.Schema.Types.Mixed, // Allows both numbers and strings
    required: true,
  },
  payment_image: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  team_emails: {
    type: [String], // Array of email strings
    validate: {
      validator: function (emails) {
        return emails.length > 0; // Ensures at least one email is present    (without including leader email)
      },
      message: "At least one team email is required",
    },
  },
});

const HackathonRegistration = mongoose.model(
  "HackathonRegistration",
  hackathonRegistrationSchema
);

module.exports = HackathonRegistration;

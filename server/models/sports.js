const mongoose  = require("mongoose")

const sportSchema = new mongoose.Schema({
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
      isFree: {
        type: Boolean, //free or cost
        required: true,
      },
      price: {
        type: Number,
        default: 0,
      },
      event_date: {
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

      previous_images: {
        type: [String], //list of img urls
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
    
})

const registeredStudentsSchema = new mongoose.Schema({
    admin_email: { type: String, required: true },
    sport_title: {
      type: String,
      required: true,
      unique: true,
    },
    student_teams: {
      type: [{ team_emails: [String] }], //Students emails based on teams formed (to know how many got registered)
      default: [],
    },
  });

  const Sport = mongoose.model("Sport", sportSchema);

  module.exports = {Sport}

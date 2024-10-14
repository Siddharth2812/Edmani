const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  hackathons: {
    type: [{ hackathon_title: { type: String }, friends: { type: [String] } }], // hackathon title along with there friends email
    default: [],
  },
});

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  hackathons: {
    type: [String], //here we store the hackathons created by the admin
    default: [],
  },
  sports : {
    type: [String],
    default:[]
  }
});

const Student = mongoose.model("Student", studentSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
  Student,
  Admin,
};

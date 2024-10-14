const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
// const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const app = express();

const AuthRoute = require("./routes/authRoute");
const AdminRoute = require("./routes/adminRoute");
const StudentRoute = require("./routes/studentRoute");
const { Admin, Student } = require("./models/users");
const authenticateProtectedRoutes = require("./helpers/checkCookie");

dotenv.config();

//middlewares
app.use(cookie());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
const API = process.env.API_VERSION;
app.use(`${API}/auth`, AuthRoute);
app.use(`${API}/admin`, authenticateProtectedRoutes, AdminRoute);
app.use(`${API}/student`, StudentRoute);

//Check login cookie if not send to login page




//DB Connection
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));
};

app.get("/", (req, res) => {
  res.send("server working ==> Go and code now");
});

app.all("*", (req, res) => {
  res.json({ messgae: "Route not found" });
});

//server connection
app.listen(process.env.PORT || 3001, () => {
  console.log(`server listening on ${process.env.PORT || 3001}`);
  connectDB();
});

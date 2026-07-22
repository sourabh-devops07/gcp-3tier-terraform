
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
  username: String,
  city: String,
  qualification: String
});

const Student = mongoose.model("Student", studentSchema);

// ======================
// GET ALL STUDENTS
// ======================
app.get("/api/students", async (req, res) => {

  try {

    const students = await Student.find();

    res.json(students);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// ======================
// ADD STUDENT
// ======================
app.post("/api/students", async (req, res) => {

  try {

    const student = new Student(req.body);

    await student.save();

    res.json({
      message: "Student saved successfully",
      data: student
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// ======================
// UPDATE STUDENT
// ======================
app.put("/api/students/:id", async (req, res) => {

  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.json({
      message: "Student updated successfully",
      data: student
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// ======================
// DELETE STUDENT
// ======================
app.delete("/api/students/:id", async (req, res) => {

  try {

    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// ======================
// START SERVER
// ======================
app.listen(5000, "0.0.0.0", () => {

  console.log("Backend server running on port 5000");

});

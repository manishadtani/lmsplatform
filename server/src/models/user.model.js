import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    default: "student"
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  photoUrl: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;

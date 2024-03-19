import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    employeeId: {
      type: Number,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    assignedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mycourse",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("userpcs", userSchema);

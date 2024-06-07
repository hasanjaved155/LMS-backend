import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    // finalRating: {
    //   type: String,
    //   default: 0,
    // },
    role: [
      {
        rolename: {
          type: String,
          enum: ["Employee", "Buyer"], // Restrict values to "Employee" or "Buyer"
          required: true,
        },
      },
    ],

  },
  { timestamps: true }
);

export default mongoose.model("dashboards", userSchema);

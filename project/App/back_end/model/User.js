const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);

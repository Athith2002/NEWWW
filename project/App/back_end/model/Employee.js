const mongoose = require("mongoose");
const { Schema } = mongoose;

const Employee = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", Employee);

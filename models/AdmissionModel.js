// models/Admission.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const admissionSchema = new Schema(
  {
   
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNum: { type: Number, required: true },
  },{
    createdAt: {
        type: Date,
        default: Date.now(),
      }
  },
  {
    timestamps: true,
  }
);

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
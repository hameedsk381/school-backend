// models/Admission.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const admissionSchema = new Schema(
  {
    studentName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    motherTongue: { type: String, required: true },
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    bankAccountNum: { type: String, required: true },
    bankName: { type: String, required: true },
    bankBranch: { type: String, required: true },
    ifscCode: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    whatsappNumber: { type: Number, required: true },
    guardianName: { type: String, },
    guardianOccupation: { type: String,  },
    nationality: { type: String, required: true },
    caste: { type: String, required: true },
    subCaste: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    previousSchool: { type: String, required: true },
    schoolCode: { type: String, required: true },
    studiedClass: { type: String, required: true },
    medium: { type: String, required: true },
    isEligibleForPromotion: { type: Boolean, required: true },
    daysPresentInPreviousSchool: { type: Number, required: true },
    transferCertificateNum: { type: String, required: true },
    classJoined: { type: String, required: true },
    childInfoNum: { type: String, required: true },
    firstLanguage: { type: String, required: true },
    secondLanguage: { type: String, required: true },
    personalMarksIdentification1: { type: String, required: true },
    personalMarksIdentification2: { type: String, required: true },
    remarks: { type: String, required: true },
    acceptTerms: { type: Boolean, required: true },
    signature: { type: String, required: true },
    passportPhoto: { type: String, required: true },
  },
    {
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
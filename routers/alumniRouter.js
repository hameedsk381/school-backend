const handleFileUpload = require("../middlewares/multerMiddleware");
const Alumni = require("../models/alumniModel");
const Contact = require("../models/contactModel");

const alumniRoute = require("express").Router();

alumniRoute.post("/",handleFileUpload, async (req, res) => {
  try {
    const { name,email, fathersName, mothersName, teachersName, lastClassStudied ,yearOfPassing,principalName ,testimony} = req.body;
  
      // Validate user input
      if (!name || !email || !fathersName || !mothersName || !teachersName || !lastClassStudied || !yearOfPassing || !principalName || !testimony ) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: "Please upload your image" });
      }
  
      const existingUser = await Alumni.findOne({ email });
  
      if (existingUser) {
        return res.json({
          message: "You have already submitted the form ",
        });
      }
  
      const profilePicture = req.file.buffer.toString("base64");
  
     await new Alumni({
        name,
        email,
       fathersName,mothersName,principalName,teachersName,yearOfPassing,testimony,lastClassStudied,
       image :  profilePicture,
      }).save();
  
      
    res.status(201).json({
      message: "Form has been successfully submitted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
alumniRoute.get("/", async (req, res) => {
    try {
      const alumni = await Alumni.find();
  
     
  
      res.status(200).json(alumni);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  alumniRoute.delete("/:id", async (req, res) => {
    try {
      const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);
      
      if (!deletedAlumni) {
        return res.status(404).json({ message: "Alumni not found" });
      }
      
      res.status(200).json({ message: "Alumni deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = alumniRoute;

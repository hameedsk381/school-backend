const Contact = require("../models/contactModel");

const contactRoute = require("express").Router();

contactRoute.post("/", async (req, res) => {
  try {
    const { name, email, message, relation, contactNumber } = req.body;

    // Validate user input
    if (!name || !email || !message || !relation || !contactNumber) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = new Contact({
      name,
      email,
      relation,
      message,
      contactNumber,
    });

    const newUser = await user.save();

    res.status(201).json({
      message: "Thank you for contacting us we will get back to you soon....",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
contactRoute.get("/", async (req, res) => {
    try {
      const contacts = await Contact.find();
  
     
  
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = contactRoute;

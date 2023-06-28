
const clubRoute = require('express').Router()
const Club = require("../models/clubModel");
const ClubMember = require("../models/clubmemberModel");

//Club  routes

  
  clubRoute.get('/', async (req, res) => {
    try {
      const clubs = await Club.find().populate('members');
      res.json(clubs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  clubRoute.post('/create-club', async (req, res) => {
    const { name, description,chairlady,secretary,president } = req.body;
  
    try {
      const club = new Club({
        name,
        description,chairlady,secretary,president
      });
  
      await club.save();
      res.status(200).json({ message: `Club created successfully with name ${name}`  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  
  clubRoute.post('/add-member', async (req, res) => {
    const { name, classNum, rollNo,club } = req.body;
  
    try {
      // find the club by name
      const clubuser = await Club.findOne({ name:club });
  
      if (!clubuser) {
        return res.status(400).json({ message: 'Club not found' });
      }
  
      // create a new club member
      const clubMember = new ClubMember({
        name,
        classNum,
        rollNo,
        club: clubuser._id
      });
  
      // save the club member to the database
      await clubMember.save();
  
      // add the club member to the club's members array
      clubuser.members.push(clubMember._id);
      await clubuser.save();
  
      res.status(200).json({ message: 'Club member added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = clubRoute;
const express = require('express');
const Announcement = require('../models/announcementModel.js');
const announcementRouter = express.Router();


// Get all announcements
announcementRouter.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single announcement by id
announcementRouter.get('/:id', getAnnouncement, (req, res) => {
  res.json(res.announcement);
});

// Create an announcement
announcementRouter.post('/', async (req, res) => {
  const announcement = new Announcement({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const newAnnouncement = await announcement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an announcement by id
announcementRouter.patch('/:id', getAnnouncement, async (req, res) => {
  if (req.body.title != null) {
    res.announcement.title = req.body.title;
  }
  if (req.body.description != null) {
    res.announcement.description = req.body.description;
  }
  
  try {
    const updatedAnnouncement = await res.announcement.save();
    res.json(updatedAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an announcement by id
announcementRouter.delete('/:id', async (req, res) => {
  try {
const response =   await Announcement.findByIdAndDelete(req.params.id)
    if(response){
        res.json({ message: 'Announcement deleted' });
    } else {
        res.json({ message: 'ID not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single announcement by id
async function getAnnouncement(req, res, next) {
  let announcement;
  try {
    announcement = await Announcement.findById(req.params.id);
    if (announcement == null) {
      return res.status(404).json({ message: 'Cannot find announcement' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.announcement = announcement;
  next();
}

module.exports = announcementRouter;

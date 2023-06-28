const express = require('express');
const Event = require('../models/eventModel.js');
const eventRouter = express.Router();


// Get all events
eventRouter.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single event by id
eventRouter.get('/:id', getEvent, (req, res) => {
  res.json(res.event);
});

// Create an event
eventRouter.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an event by id
eventRouter.patch('/:id', getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = req.body.title;
  }
  if (req.body.description != null) {
    res.event.description = req.body.description;
  }
  
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event by id
eventRouter.delete('/:id', async (req, res) => {
  try {
const response =   await Event.findByIdAndDelete(req.params.id)
    if(response){
        res.json({ message: 'Event deleted' });
    } else {
        res.json({ message: 'ID not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single event by id
async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Cannot find event' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.event = event;
  next();
}

module.exports = eventRouter;

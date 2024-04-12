const express = require('express');
const MeetingNote = require('../models/Note');

const router = express.Router();

// Get all notes or filter by keyword and date range
router.get('/', async (req, res) => {
  try {
    let query = MeetingNote.find();

    // Filter by keyword in title or content
    if (req.query.keyword) {
      query = query.where({ $or: [{ title: new RegExp(req.query.keyword, 'i') }, { content: new RegExp(req.query.keyword, 'i') }] });
    }

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query = query.where({
        createdDate: {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate)
        }
      });
    }

    const notes = await query.exec();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new note
router.post('/', async (req, res) => {
  const note = new MeetingNote(req.body);

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing note
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await MeetingNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    await MeetingNote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

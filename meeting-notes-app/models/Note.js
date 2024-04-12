const mongoose = require('mongoose');

// Schema for the action items in a note
const actionItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
});

// Main schema for the note
const meetingNoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  actionItems: [actionItemSchema],
  createdDate: { type: Date, default: Date.now },
});

// Create a model from the schema
const MeetingNote = mongoose.model('MeetingNote', meetingNoteSchema);

module.exports = MeetingNote;

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['pdf', 'image', 'folder', 'note'],
    required: true
  },
  size: { type: Number, required: true },
  path: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  content: { type: String } // For text-based notes
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
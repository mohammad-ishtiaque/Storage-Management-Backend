const express = require('express');
const router = express.Router();
const protect = require('../utils/protect');
const upload = require('../utils/upload');
const File = require('../models/File');
const User = require('../models/User');



//show favorites files
router.get('/favorites', protect, async (req, res) => {
    try {
      const favorites = await File.find({
        user: req.user.id,
        isFavorite: true
      });
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  
// Upload file
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const fileSize = req.file.size;

    // Check storage limit
    if (user.storage.used + fileSize > user.storage.total) {
      return res.status(400).json({ message: 'Storage limit exceeded' });
    }

    // Create file record
    const newFile = new File({
      user: user._id,
      name: req.file.originalname,
      type: req.file.mimetype.startsWith('image') ? 'image' : 
            req.file.mimetype === 'application/pdf' ? 'pdf' : 'note',
      size: fileSize,
      path: req.file.path
    });

    await newFile.save();
    
    // Update user storage
    user.storage.used += fileSize;
    await user.save();

    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Toggle favorite
router.patch('/:id/favorite', protect, async (req, res) => {
  try {
    const file = await File.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isFavorite: req.body.isFavorite },
      { new: true }
    );

    if (!file) return res.status(404).json({ message: 'File not found' });

    // Update user's favorites array
    const user = await User.findById(req.user.id);
    if (file.isFavorite) {
      user.favorites.push(file._id);
    } else {
      user.favorites.pull(file._id);
    }
    await user.save();

    res.json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
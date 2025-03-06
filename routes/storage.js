const express = require('express');
const router = express.Router();
const protect = require('../utils/protect'); 
const File = require('../models/File');
const User = require('../models/User');

// Get storage summary
router.get('/summary', protect, async (req, res) => {
  try {
    // Calculate storage usage
    const user = await User.findById(req.user.id);
    const files = await File.aggregate([
      { $match: { user: user._id } },
      { 
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          totalSize: { $sum: "$size" }
        }
      }
    ]);

    const summary = {
      total: user.storage.total,
      used: user.storage.used,
      remaining: user.storage.total - user.storage.used,
      breakdown: files.reduce((acc, curr) => {
        acc[curr._id] = {
          count: curr.count,
          size: curr.totalSize
        };
        return acc;
      }, {})
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
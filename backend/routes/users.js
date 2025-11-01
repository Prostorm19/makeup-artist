const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/artists
// @desc    Get all artists
// @access  Public
router.get('/artists', async (req, res) => {
    try {
        const artists = await User.find({ userType: 'artist' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({ artists });
    } catch (error) {
        console.error('Get artists error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/users/artist/:id
// @desc    Get single artist profile
// @access  Public
router.get('/artist/:id', async (req, res) => {
    try {
        const artist = await User.findOne({
            _id: req.params.id,
            userType: 'artist'
        }).select('-password');

        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        res.json({ artist });
    } catch (error) {
        console.error('Get artist error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
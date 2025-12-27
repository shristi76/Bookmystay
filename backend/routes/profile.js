const express = require('express');
const router = express.Router();
const Profile = require("../model/profile");
const auth = require("../middleware/auth");

// GET profile
router.get("/", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// CREATE profile
router.post("/", auth, async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Profile data required" });
        }

        const existingProfile = await Profile.findOne({ user: req.user.id });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists" });
        }

        const profile = new Profile({
            ...req.body,
            user: req.user.id
        });

        await profile.save();
        res.status(201).json(profile);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE profile
router.put("/", auth, async (req, res) => {
    try {
        const { user, ...updateData } = req.body;

        const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: updateData },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(updatedProfile);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE profile
router.delete("/", auth, async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ user: req.user.id });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json({ message: "Profile deleted" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

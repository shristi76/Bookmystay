const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const Profile = require("../model/profile");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        const newProfile = new Profile({
            user: newUser._id,
            bio: "",
            phone: "",
            gender: "",
            dob: null,
            avatar: "",
            location: "",
        });
        await newProfile.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({ token, user: newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        let existingProfile = await Profile.findOne({ user: user._id });

        if (!existingProfile) {
            const newProfile = new Profile({
                user: user._id,
                bio: "",
                phone: "",
                gender: "",
                dob: null,
                avatar: "",
                location: "",
            });
            await newProfile.save();
        }

        const token = jwt.sign(
            {
                id: user._id,
                isHost: user.isHost,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isHost: user.isHost,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

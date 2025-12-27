const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Listing = require("../model/listing");
const auth = require("../middleware/auth");


// =========================
// GET ALL LISTINGS (FILTER)
// =========================
router.get("/", async (req, res) => {
    try {
        const { location, minprice, maxprice } = req.query;
        const filter = {};

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (minprice || maxprice) {
            filter.price = {};
            if (minprice) filter.price.$gte = Number(minprice);
            if (maxprice) filter.price.$lte = Number(maxprice);
        }

        const listings = await Listing.find(filter);
        res.json(listings);

    } catch (error) {
        res.status(500).json({ message: "Error fetching listings" });
    }
});
// Host can view their own listings
router.get("/my-listings", auth, async (req, res) => {
    try {
        if (!req.user.isHost) {
            return res.status(403).json({ message: "Only hosts can view their listings" });
        }

        const listings = await Listing.find({ hostid: req.user.id })
            .sort({ createdAt: -1 });

        if (listings.length === 0) {
            return res.json({ message: "No listings found", listings: [] });
        }

        res.json(listings);

    } catch (error) {
        res.status(500).json({ message: "Error fetching listings" });
    }
});

// =========================
// GET LISTING BY ID
// =========================
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid listing ID" });
        }

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.json(listing);

    } catch (error) {
        res.status(500).json({ message: "Error fetching listing" });
    }
});


// =========================
// CREATE LISTING (HOST ONLY)
// =========================
router.post("/", auth, async (req, res) => {
    try {
        if (!req.user.isHost) {
            return res.status(403).json({ message: "Only hosts can add listings" });
        }

        const listing = new Listing({
            ...req.body,
            hostid: req.user.id
        });

        await listing.save();
        res.status(201).json(listing);

    } catch (error) {
        res.status(500).json({ message: "Error creating listing" });
    }
});


// =========================
// UPDATE LISTING (HOST ONLY)
// =========================
router.put("/:id", auth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid listing ID" });
        }

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (!req.user.isHost || listing.hostid.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Prevent changing host
        const { hostid, ...updateData } = req.body;

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedListing);

    } catch (error) {
        res.status(500).json({ message: "Error updating listing" });
    }
});


// =========================
// DELETE LISTING (HOST ONLY)
// =========================
router.delete("/:id", auth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid listing ID" });
        }

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (!req.user.isHost || listing.hostid.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await listing.deleteOne();
        res.json({ message: "Listing deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting listing" });
    }
});



module.exports = router;

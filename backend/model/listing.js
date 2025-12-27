const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: { type: String, required: true },
    price: { type: Number, required: true },
    images: [String],
    hostid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bookingdates: [
      {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);

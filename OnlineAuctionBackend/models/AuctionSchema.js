const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  seller: { type: String, required: true },
  status: { type: String, enum: ['active', 'sold', 'expired'], default: 'active' },
  bids: [{
    bidder: String,
    amount: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  winner: { type: String, default: null },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auction', auctionSchema);
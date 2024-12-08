const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  referralCode: { type: String, required: true, unique: true },
  referredBy: { type: String, default: null }, // Referral code of the parent
  wallet: { type: Number, default: 0 },
  referralHierarchy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Direct referrals
});

module.exports = mongoose.model('User', userSchema);
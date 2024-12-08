const User = require('../models/User');

// Register a new user with referral logic
exports.registerUser = async (req, res) => {
  const { name, email, referralCode, referredBy } = req.body;
  try {
    // Validate referredBy
    if (referredBy) {
      const parent = await User.findOne({ referralCode: referredBy });
      if (!parent) return res.status(400).json({ message: 'Invalid referral code' });
      if (parent.referralHierarchy.length >= 8)
        return res.status(400).json({ message: 'Referral limit exceeded' });
    }

    // Create a new user
    const newUser = new User({ name, email, referralCode, referredBy });
    await newUser.save();

    // Add to parent's referral hierarchy
    if (referredBy) {
      const parent = await User.findOne({ referralCode: referredBy });
      parent.referralHierarchy.push(newUser._id);
      await parent.save();
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
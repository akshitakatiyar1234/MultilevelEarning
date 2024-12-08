const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Record a purchase and distribute profits
exports.recordPurchase = async (req, res) => {
  const { userId, amount } = req.body;
  if (amount <= 1000) return res.status(400).json({ message: 'Minimum purchase amount is 1000Rs' });

  try {
    const user = await User.findById(userId).populate('referralHierarchy');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const transaction = new Transaction({ userId, amount });
    await transaction.save();

    const io = req.io;

    // Distribute profits
    if (user.referredBy) {
      const parent = await User.findOne({ referralCode: user.referredBy });
      if (parent) {
        const directProfit = amount * 0.05;
        parent.wallet += directProfit;
        await parent.save();
        io.to(parent._id.toString()).emit('walletUpdate', { message: `Direct referral profit: ${directProfit}Rs` });

        if (parent.referredBy) {
          const grandParent = await User.findOne({ referralCode: parent.referredBy });
          if (grandParent) {
            const indirectProfit = amount * 0.01;
            grandParent.wallet += indirectProfit;
            await grandParent.save();
            io.to(grandParent._id.toString()).emit('walletUpdate', { message: `Indirect referral profit: ${indirectProfit}Rs` });
          }
        }
      }
    }

    res.status(200).json({ message: 'Transaction recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
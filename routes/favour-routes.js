const express = require('express');
const router = express.Router();
const Favour = require('../models/favour');
const User = require('../models/user');
const passport = require('passport');

 const auth = passport.authenticate('jwt', { session: false });

// ✅ Create favour
// Route 1: Authenticated, Non-anonymous favour
router.post('/create', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      reward,
      owedTo,
      favourType,
      requiredBy,
      proof
    } = req.body;

    const favour = new Favour({
      title,
      description,
      reward,
      from: req.user._id, // Required here
      to: owedTo,
      favourType,
      requiredBy,
      proof,
      isAnonymous: false
    });

    await favour.save();
    res.status(201).json(favour);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Route 2: Authenticated, Anonymous favour
router.post('/create-anonymous', async (req, res) => {
  try {
    const {
      title,
      description,
      reward,
      owedTo,
      favourType,
      requiredBy,
      proof
    } = req.body;

    const favour = new Favour({
      title,
      description,
      reward,
      favourType,
      requiredBy,
      proof,
      isAnonymous: true
    });

    await favour.save();
    res.status(201).json(favour);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/bulk-create', async (req, res) => {
  try {
    const favours = req.body;

    if (!Array.isArray(favours) || favours.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of favour objects.' });
    }

    const createdFavours = await Favour.insertMany(favours);

    res.status(201).json({
      message: `${createdFavours.length} favours inserted successfully.`,
      favours: createdFavours
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/my-favours', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const favours = await Favour.find({ from: userId });

    res.status(200).json(favours);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// // ✅ Edit favour
router.put('/:id', auth, async (req, res) => {
  try {
    const favour = await Favour.findById(req.params.id);
    if (!favour) return res.status(404).json({ message: 'favour not found' });
    if (favour.requestUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to edit this favour' });
    }

    Object.assign(favour, req.body);
    await favour.save();
    res.json(favour);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/favours/i-owe', auth, async (req, res) => {
  try {
    const favours = await Favour.find({
      to: req.user._id,
      status: 'Pending'
    });
    res.json(favours);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/favours/i-owed', auth, async (req, res) => {
  try {
    const favours = await Favour.find({
      from: req.user._id,
      status: 'Pending'
    });
    res.json(favours);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/favours/i-completed', auth, async (req, res) => {
  try {
    const favours = await Favour.find({
      claimedBy: req.user._id,
      status: { $in: ['Completed', 'Verified'] }
    });
    res.json(favours);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/favours/completed-for-me', auth, async (req, res) => {
  try {
    const favours = await Favour.find({
      from: req.user._id,
      claimedBy: { $ne: null },
      status: { $in: ['Completed', 'Verified'] }
    });
    res.json(favours);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const favours = await Favour.find()
      .populate('from')        // full user object
      .populate('to')          // full user object
      .populate('claimedBy')   // full user object
      .sort({ createdAt: -1 }) // sort latest first — you can adjust this
      .skip(skip)
      .limit(limit);

    const total = await Favour.countDocuments();

    res.status(200).json({
      favours,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/leaderboard2', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const leaderboard = await Favour.aggregate([
      {
        $match: {
          claimedBy: { $ne: null },
          status: { $in: ['Completed', 'Verified'] }
        }
      },
      {
        $group: {
          _id: '$claimedBy',
          completedCount: { $sum: 1 }
        }
      },
      { $sort: { completedCount: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$user._id',
          name: '$user.name',
          email: '$user.email',
          points: '$user.points',
          completedCount: 1
        }
      }
    ]);

    const total = await Favour.aggregate([
      {
        $match: {
          claimedBy: { $ne: null },
          status: { $in: ['Completed', 'Verified'] }
        }
      },
      { $group: { _id: '$claimedBy' } },
      { $count: 'totalUsers' }
    ]);

    res.json({
      leaderboard,
      pagination: {
        page,
        limit,
        totalUsers: total[0]?.totalUsers || 0,
        totalPages: Math.ceil((total[0]?.totalUsers || 0) / limit)
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// // ✅ Get most recent favours (limit 10)
// router.get('/recent', auth, async (req, res) => {
//   try {
//     const recentfavours = await favour.find({ status: 'pending' })
//       .sort({ created: -1 })
//       .limit(10)
//       .populate('requestUser owedTo', 'fullName email avatar');

//     res.json(recentfavours);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Get top 3 users who did favours for others
// router.get('/top-helpers', auth, async (req, res) => {
//   try {
//     const topUsers = await favour.aggregate([
//       { $match: { status: 'completed', owedTo: { $ne: null } } },
//       { $group: { _id: "$owedTo", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//       { $limit: 3 },
//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "user"
//         }
//       },
//       { $unwind: "$user" },
//       {
//         $project: {
//           _id: 0,
//           userId: "$user._id",
//           fullName: "$user.fullName",
//           email: "$user.email",
//           avatar: "$user.avatar",
//           favoursGiven: "$count"
//         }
//       }
//     ]);

//     res.json(topUsers);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });
module.exports = router;
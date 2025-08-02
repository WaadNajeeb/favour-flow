const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const { generateAvatar } = require('../services/helper');

// REGISTER
router.post("/register", async (req, res) => {
  const { firstName, lastName, password, confirmpass, email, avatar } = req.body;

  if (!firstName || firstName.length < 2) {
    return res.status(400).json({ success: false, message: "Enter First Name" });
  }
  if (!lastName || lastName.length < 2) {
    return res.status(400).json({ success: false, message: "Enter Last Name" });
  }

  if (!email || !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  if (!password || password.length < 8 || password !== confirmpass) {
    return res.status(400).json({ success: false, message: "Password must match and be at least 8 characters" });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  try {
    // Saving new user in DB
    const newUser = new User();
    //TODO fix avatar generation
    newUser.avatar = ""
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email.toLowerCase();
    newUser.password = newUser.hashPassword(password);

    const savedUser = await newUser.save();

    return res.send({
      success: true,
      message: "Account created!",
    });
  } catch (err) {
    console.error(err);
    return res.send({
      success: false,
      message: "Server error",
    });
  }

});


// LOGIN
router.post("/login", (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: info?.message });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      token: refreshToken,
      user: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Logged in successfully", accessToken: accessToken, refreshToken: refreshToken });
  })(req, res, next);
});

// GET NEW ACCESS TOKEN
router.get('/token', async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) return res.status(400).json(false);

  const storedToken = await RefreshToken.findOne({ token: refreshToken });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    return res.status(403).json(false);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    res.json(true);
  } catch (err) {
    console.error('Invalid refresh token:', err);
    res.status(403).json(false);
  }
});

// GET CURRENT USER
router.get('/current_user', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { _id, email, role } = req.user;
  const { fullName } = await User.findById(_id).select('fullName');
  res.json({ fullName, email, role });
});

// CHECK AUTH
router.get('/isAuthenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(true);
});

// CHECK SIGN-IN
router.get('/isSigned', (req, res) => {
  const accessToken = req.cookies?.accessToken;
  res.json(!!accessToken);
});

// LOGOUT
router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./services/passport");
const authRoutes = require("./routes/auth-routes.js");
const favourRoutes = require("./routes/favour-routes.js");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const keys = require('./config/keys');
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4200', // don't use '*'
  credentials: true               // allow cookies and credentials
}));
mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.use("/auth", authRoutes);
app.use("/favour", favourRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

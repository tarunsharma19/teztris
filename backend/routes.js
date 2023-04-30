const express = require("express");
const leaderboardController = require("./controllers/leaderboard");
const profileController = require("./controllers/profile");
const router = express.Router();


router.get('/leaderboard', leaderboardController.leaderboard);
router.get('/profile', profileController.getMe);

module.exports = router;
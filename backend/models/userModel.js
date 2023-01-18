const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: String },
    highScore: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    activeGameId: { type: String },

});

module.exports = mongoose.model("User", userSchema);

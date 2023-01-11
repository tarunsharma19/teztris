const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: String },
    // walletId: { type: String, unique: true, required: true },
    highScore: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    activeGameId: { type: String },

});

module.exports = mongoose.model("User", userSchema);

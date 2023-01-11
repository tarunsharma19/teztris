const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    _id: { type: String },
    // gameId: { type: String, unique: true, required: true },
    isPublic: { type: Boolean, default: false },
    tokenData: {
        amount: { type: Number, default: 0 },
        betToken: { type: String, required: true },
        betTokenId: { type: Number, required: true },
        betTokenType: { type: String, required: true },
        betTokenName: { type: String, required: true }
    },
    me: { type: String, required: true },
    opponent: { type: String },
    scoreMe: { type: Number, default: -1 },
    scoreOpponent: { type: Number, default: -1 },
    status: { type: String, default: 'init', enum: ['init', 'opponent-found', 'ongoing', 'complete'] }
});

module.exports = mongoose.model("Game", gameSchema);

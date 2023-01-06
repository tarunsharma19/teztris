const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameId: { type: String, unique: true, required: true },
    isPublic: { type: Boolean, default: false },
    tokenData: {
        amount: { type: Number, default: 0 },
        betToken: { type: String, required: true },
        betTokenId: { type: Number, required: true },
        betTokenType: { type: String, required: true },
        betTokenName: { type: String, required: true }
    },
    me: { type: String },
    opponent: { type: String }
});

module.exports = mongoose.model("Game", gameSchema);

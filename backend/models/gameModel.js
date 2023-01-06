const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameId: { type: String, unique: true, required: true },
    tokenData: {},
    participants: [],
});

module.exports = mongoose.model("Game", gameSchema);

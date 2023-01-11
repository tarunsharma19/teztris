const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

var Q = new Queue();

//TESTING PENDING
const endHandler = async (socket, data) => {

    const gameId = data.gameId;
    const score = data.score;

    const game = await Game.findOne({ gameId });
    const me = await User.findOne({ wallet: game.me })
    const opponnent = await User.findOne({ wallet: game.opponent })


    // console.log(gameId, score);
    // let res;
    // let metadata;

    // if (scores[gameId] === undefined) {
    //     // kisi ka nai khatam hua 
    //     scores[gameId] = { player1: address, score1: score };
    //     console.log(scores);
    //     io.to(gameId).emit("p1 ended", score);
    // }
    // else {
    //     //  ek ka already khatam hogya
    //     // this is critical section code
    //     if (!lock) {
    //         // ate hi lock krdo state
    //         lock = true;

    //         // do work
    //         if (scores[gameId].score1 > score) {
    //             metadata = await nft.nftFlow(scores[gameId].player1, address, gameData[gameId].betTokenName, gameData[gameId].amount);
    //             console.log(metadata);
    //             console.log(metadata.Ipfs);
    //             res = await reportWinner(gameId, scores[gameId].player1, metadata.Ipfs);
    //             console.log(res);
    //             if (res.success) {
    //                 io.to(gameId).emit("game over", scores[gameId].player1);
    //                 delete scores[gameId];
    //                 delete gameData[gameId];
    //             }
    //             else
    //                 io.to(gameId).emit("issue");

    //         }
    //         else {
    //             metadata = await nft.nftFlow(address, scores[gameId].player1, gameData[gameId].betTokenName, gameData[gameId].amount);
    //             console.log(metadata);
    //             console.log(metadata.Ipfs);
    //             res = await reportWinner(gameId, address, metadata.Ipfs);
    //             console.log(res);
    //             if (res.success) {
    //                 io.to(gameId).emit("game over", address);
    //                 delete scores[gameId];
    //                 delete gameData[gameId];
    //             }
    //             else
    //                 io.to(gameId).emit("issue");
    //         }

    //         // unlock 
    //         lock = false;
    //     } else {
    //         // handle what to do if state is locked
    //         // add to queue
    //         Q.enqueue({ game: gameId, addy: address, scr: score });

    //         // now handle queue using set timeout


    //     }



    //     console.log(scores, gameData);

    // }
}


const handleQueue = () => {
    // console.log("checking queue");

    if (Q.size() > 0) {
        console.log("some object is found in queue", Q.size());
        // run this function every second when queue is not empty
        if (!lock) {
            console.log("handling queue");
            // when lock is free
            // get details
            var ob = Q.dequeue();
            // call end (it handles lock as it is)
            end(ob.game, ob.addy, ob.scr);
        }
        console.log(Q.size());
    }
}

setInterval(handleQueue, [1000]);

module.exports = endHandler;
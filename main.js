// Created by Aaron Burdick 2018

Array.prototype.reverse = function () {
    return this.map((_, i) => this[this.length - (1 + i)]);
  }
  
  /*
    Initial Canvas declaration
  */
  const BOARD_WIDTH_PX = 240;
  const BOARD_HEIGHT_PX = 400;
  const BOARD_WIDTH = 12;
  const BOARD_HEIGHT = 20;
  const LINE_LEVEL_INCREMENT = 3;
  
  const quotes = [
    `Tetris (Russian: Тетрис [ˈtɛtrʲɪs]) is a tile-matching puzzle video game, originally designed and programmed by Russian game designer Alexey Pajitnov.`,
    `It was released on June 6, 1984, while he was working for the Dorodnitsyn Computing Centre of the Academy of Science of the Soviet Union in Moscow.`,
    `He derived its name from the Greek numerical prefix tetra- (all of the game's pieces contain four segments) and tennis, Pajitnov's favorite sport.`,
    `Tetris was the first entertainment software to be exported from the Soviet Union to the US, where it was published by Spectrum HoloByte for Commodore 64 and IBM PC.`,
    `Tetris is a popular use of tetrominoes, the four-element special case of polyominoes.`,
    `Polyominoes have been used in popular puzzles since at least 1907, and the name was given by the mathematician Solomon W. Golomb in 1953.`,
    `The game, or one of its many variants, is available for nearly every video game console and computer operating system.`,
    `It is also available on devices such as graphing calculators, mobile phones, portable media players, PDAs, Network music players and as an Easter egg on non-media products like oscilloscopes.`,
    `It has inspired Tetris serving dishes and been played on the sides of various buildings.`,
    `While versions of Tetris were sold for a range of 1980s home computer platforms as well as arcades, it was the successful handheld version for the Game Boy launched in 1989 that established the game as one of the most popular.`,
    `Electronic Gaming Monthly's 100th issue had Tetris in first place as "Greatest Game of All Time".`,
    `In 2007, Tetris came in second place in IGN's "100 Greatest Video Games of All Time". In January 2010, it was announced that the Tetris franchise had sold more than 170 million copies`,
    `Approximately 70 million physical copies and over 100 million copies for cell phones, making it the best selling paid-downloaded game of all time.`
  ]
  
  const backgrounds = [
    "REBECCAPURPLE",
    "BLUEVIOLET",
    "DARKVIOLET",
    "DARKORCHID",
    "DARKMAGENTA",
    "PURPLE",
    "INDIGO",
    "SLATEBLUE",
    "DARKSLATEBLUE",
    "MEDIUMSLATEBLUE",
  ]
  
  const bodyEl = document.querySelector("body");
  const info = document.querySelector(".info");
  const gameOverScreen = document.querySelector(".game-over");
  const gameOverButton = document.querySelector(".game-over button");
  const helpScreen = document.querySelector(".help");
  const helpButton = document.querySelector(".help-show");
  const cvs = document.getElementById("tetris");
  const ctx = cvs.getContext("2d");
  ctx.scale(BOARD_WIDTH_PX / BOARD_WIDTH, BOARD_HEIGHT_PX / BOARD_HEIGHT);
  const cvsNext = document.getElementById("tetris-next");
  const ctxNext = cvsNext.getContext("2d");
  ctxNext.scale(BOARD_WIDTH_PX / BOARD_WIDTH, BOARD_HEIGHT_PX / BOARD_HEIGHT);
  
  function Block(value, color) {
    this.value = value;
    this.color = color;
  }
  
  /*
    Init State
  */
  
  const arena = {
    matrix: createMatrix(BOARD_HEIGHT, BOARD_WIDTH),
    color: "#000",
  };
  const pieces = {
    t: {
      matrix: [
        [0, 1, 0],
        [1, 1, 1]
      ],
      color: "#7F63FF"
    },
    square: {
      matrix: [
        [1, 1],
        [1, 1]
      ],
      color: "#FFEBE3"
    },
    lLeft: {
      matrix: [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      color: "#5DBF95"
    },
    lRight: {
      matrix: [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      color: "#FFEDAA"
    },
    crookedLeft: {
      matrix: [
        [0, 1],
        [1, 1],
        [1, 0]
      ],
      color: "#FFFBED"
    },
    crookedRight: {
      matrix: [
        [1, 0],
        [1, 1],
        [0, 1]
      ],
      color: "#92E3C0"
    },
    straight: {
      matrix: [
        [1],
        [1],
        [1],
        [1]
      ],
      color: "#C2B5FD"
    }
  }
  
  const randomizePiece = pieces => {
    const pKeys = Object.keys(pieces);
    const randKey = pKeys[Math.floor(Math.random() * pKeys.length)];
    return pieces[randKey];
  };
  
  let pieceMatrixStack = new Array(5).fill(0).map((x) => valToBlock(randomizePiece(pieces)));
  
  const player = {
    pos: {
      x: getArenaMiddle(),
      y: 0,
    },
    matrix: pieceMatrixStack.pop(),
    lines: 0,
    score: 0,
    level: 1,
  }
  
  
  /*
    Game logic
  */
  
  function getIndexFromLevel(arr, level) {
    return arr[(level - 1) % arr.length];
  }
  
  function valToBlock(piece) {
    return piece.matrix.map(row => row.map(val => new Block(val, piece.color)));
  }
  
  function collision(arena, playerPos, playerMatrix) {
    const [p, m] = [playerPos, playerMatrix];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (
          m[y][x].value &&
          (arena.matrix[y + p.y] && arena.matrix[y + p.y][x + p.x].value) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
  
  function checkRowTetris(row) {
    const len = row.length;
    const total = row.reduce((acc, block) => block.value + acc, 0);
    if (total >= len) {
      return true;
    }
    return false;
  }
  
  function checkFull() {
    const totals = arena.matrix[0].map((_, i) => {
      return arena.matrix.reverse().reduce((acc, row, height) => {
        const val = row[i].value;
        return val !== 0 ? height + 1 : acc;
      }, 0);
    });
    return totals.filter(total => total >= BOARD_HEIGHT).length ? true : false;
  }
  
  function clearTetris(arena) {
    const cleared = arena.matrix.reduce((clearedArena, row) => {
      if (!checkRowTetris(row)) {
        clearedArena.push(row);
      }
      return clearedArena;
    }, []);
    clearedUpdate(cleared)
  
    return fillUpArenaMatrix(cleared);
  }
  
  function clearedUpdate(cleared) {
    const dLines = BOARD_HEIGHT - cleared.length;
    player.score += dLines * 100 * player.level;
    player.lines += dLines;
    player.level = Math.floor(player.lines / LINE_LEVEL_INCREMENT) + 1;
    bodyEl.style.backgroundColor = getIndexFromLevel(backgrounds, player.level);
    dropInterval = 1000 / (Math.sqrt(player.level));
    if (checkFull()) {
      stop();
      gameOverScreen.style.display = "flex";
    }
  }
  
  function createMatrix(y, x) {
    const arena = [];
    while (y--) {
      arena.push(new Array(x).fill(new Block(0)));
    }
    return arena;
  }
  
  function fillUpArenaMatrix(matrix) {
    while (matrix.length < BOARD_HEIGHT) {
      matrix.unshift(new Array(BOARD_WIDTH).fill(new Block(0)));
    }
    return matrix;
  }
  
  function hardDrop() {
    while (playerDrop()) { }
  }
  
  function getMatrixWidth(matrix) {
    const combined = matrix.reduce((acc, row) => {
      return acc.map((block, i) => block.value + row[i]);
    });
    return combined.filter(block => block).length;
  }
  
  function getArenaMiddle() {
    return (BOARD_WIDTH / 2) - 1;
  }
  
  function merge(arena, player) {
    const m = arena.matrix;
    player.matrix.map((row, y) => {
      row.map((block, x) => {
        if (block.value) {
          m[y + player.pos.y][x + player.pos.x] = block;
        }
      })
    })
    return m;
  }
  
  function playerDrop() {
    player.pos.y++;
    if (collision(arena, player.pos, player.matrix)) {
      player.pos.y--;
      // Update the arena matrix
      arena.matrix = merge(arena, player);
      arena.matrix = clearTetris(arena);
      // Next piece
      player.matrix = pieceMatrixStack.shift();
      const newBlock = valToBlock(randomizePiece(pieces));
      pieceMatrixStack.push(newBlock)
      // Put piece back to the top
      player.pos.y = 0;
      player.pos.x = getArenaMiddle();
      return false;
    }
    return true;
  }
  
  function resetGame() {
    player.pos = {
      x: getArenaMiddle(),
      y: 0,
    }
    player.matrix = pieceMatrixStack.pop();
    player.lines = 0;
    player.score = 0;
    player.level = 1;
  
    arena.matrix = createMatrix(BOARD_HEIGHT, BOARD_WIDTH);
    pieceMatrixStack = new Array(5).fill(0).map((x) => valToBlock(randomizePiece(pieces)));
  }
  
  function rotatePiece(clockwise = false) {
    const originalMatrix = clockwise ? player.matrix : player.matrix.reverse();
    const matrix = clockwise ? player.matrix.reverse() : player.matrix;
    // Get a rotated version
    const rotated = matrix.reduce((rotated, row) => {
      row = clockwise ? row : row.reverse();
      row.map((val, x) => {
        if (!rotated[x]) {
          rotated[x] = [];
        }
        rotated[x].push(val);
      })
      return rotated;
    }, [])
    if (rotationCollision(rotated)) {
      return player.matrix = originalMatrix;
    }
    player.matrix = rotated;
  }
  
  function rotationCollision(rotated) {
    // Check collision with right wall
    if ((player.pos.x + getMatrixWidth(rotated)) > BOARD_WIDTH) {
      return true;
    }
    if (collision(arena, player.pos, rotated)) {
      return true;
    }
    return false;
  }
  
  
  /*
    Draw functions
  */
  
  function draw() {
    // Clear board
    ctx.fillStyle = arena.color;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctxNext.fillStyle = arena.color;
    ctxNext.fillRect(0, 0, cvs.width, cvs.height);
    // Draw
    drawInfo();
    drawMatrix({ matrix: arena.matrix, ctx });
    drawMatrix({ matrix: player.matrix, offset: player.pos, ctx });
    drawNextPieces();
  }
  
  function drawBlock({ block, x, y, ctx }) {
    if (block.value) {
      ctx.fillStyle = block.color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  
  function drawInfo() {
    // Score
    info.innerHTML = `
      <div class="section score"><span>Score:</span> ${player.score}</div>
      <div class="section lines"><span>Lines:</span> ${player.lines}</div>
      <div class="section level"><span>Level:</span> ${player.level}</div>
      <div class="section quote">${quotes[player.level - 1]}</div>
    `;
  }
  
  function drawMatrix({
    matrix,
    offset = { x: 0, y: 0 },
    ctx,
  }) {
    matrix.map((row, y) => {
      row.map((block, x) => drawBlock({ block, x: x + offset.x, y: y + offset.y, ctx }));
    });
  }
  
  function drawNextPieces() {
    pieceMatrixStack.map((matrix, i) => {
      drawMatrix({
        matrix,
        offset: { x: 1, y: 5 * i + 1 },
        ctx: ctxNext,
      })
    });
  }
  
  /*
    Controls
  */
  document.addEventListener("keydown", e => {
    if (e.keyCode === 37) { // left
      handleLeft();
    }
    if (e.keyCode === 39) { // right
      handleRight();
    }
    if (e.keyCode === 40) { // down
      handleDown();
      dropCounter = 0;
    }
    if (e.keyCode === 38) { // up
      handleRotate(true);
    }
    if (e.keyCode === 65) { // a
      handleRotate(true);
    }
    if (e.keyCode === 83) { // s
      handleRotate(false);
    }
    if (e.keyCode === 32) { // space
      hardDrop();
    }
  })
  function handleLeft() {
    player.pos.x--;
    if (player.pos.x < 0 || collision(arena, player.pos, player.matrix)) {
      player.pos.x++;
    }
  }
  function handleRight() {
    const mWidth = getMatrixWidth(player.matrix);
    player.pos.x++;
    if ((player.pos.x + mWidth) > BOARD_WIDTH || collision(arena, player.pos, player.matrix)) {
      player.pos.x--;
    }
  }
  function handleDown() {
    if ((player.pos.y + 1) <= BOARD_HEIGHT) {
      playerDrop();
    }
  }
  function handleDown() {
    if ((player.pos.y + 1) <= BOARD_HEIGHT) {
      playerDrop();
    }
  }
  function handleRotate(clockwise) {
    rotatePiece(clockwise);
  }
  gameOverButton.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    resetGame();
    start();
  });
  helpButton.addEventListener("click", () => {
    if (helpScreen.style.display === "none") {
      stop();
      return helpScreen.style.display = "flex";
    }
    start();
    helpScreen.style.display = "none";
  });
  
  
  /*
    Game loop
  */
  let requestId;
  
  let dropCounter = 0;
  let dropInterval = 1500;
  let lastTime = 0;
  
  function update(time = 0) {
    requestId = undefined;
    const dTime = time - lastTime;
    lastTime = time;
    dropCounter += dTime;
  
    // Update state
    if (dropCounter > dropInterval) {
      playerDrop();
      dropCounter = 0;
    }
    draw();
    start();
  }
  
  function start() {
    if (!requestId) {
      requestId = requestAnimationFrame(update);
    }
  }
  
  function stop() {
    if (requestId) {
      cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  }
  
  /*
    Start
  */
  bodyEl.style.background = getIndexFromLevel(backgrounds, player.level);
  update();
  
  
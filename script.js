const grid = document.getElementById('photo-grid');
const startButton = document.getElementById('start-button');
const message = document.getElementById('message');
const backgroundMusic = document.getElementById('background-music');
const clickSound = document.getElementById('click-sound');

const tiles = 16; // Number of tiles
let revealedTiles = 0;

startButton.addEventListener('click', () => {
  startButton.classList.add('hidden');
  backgroundMusic.play();
  generateGrid();
});

function generateGrid() {
  for (let i = 0; i < tiles; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.addEventListener('click', () => revealTile(tile));
    grid.appendChild(tile);
  }
}

function revealTile(tile) {
  if (!tile.classList.contains('revealed')) {
    tile.classList.add('revealed');
    clickSound.play();
    revealedTiles++;
    if (revealedTiles === tiles) {
      showMessage();
    }
  }
}

function showMessage() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  message.classList.remove('hidden');
}

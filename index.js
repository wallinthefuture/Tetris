import Game from './src/game.js';
import View from './src/view.js';

const container = document.querySelector('.container');

const game = new Game();
const view = new View(container, 758, 428, 10, 20);

const canvas = document.querySelector('canvas');
canvas.classList.add('canvas');

window.game = game;
window.view = view;

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37: //left arrow
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 38: //UP arrow
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 39: //Right arrow
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 40: //Down arrow
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
});

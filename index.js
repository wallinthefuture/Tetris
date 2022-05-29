import Game from './src/game.js';
import View from './src/view.js';

const container = document.querySelector('.container');

const game = new Game();
const view = new View(container, 758, 428, 10, 20);

const canvas = document.querySelector('canvas');
canvas.classList.add('canvas');

window.game = game;
window.view = view;

view.render(game.getState());

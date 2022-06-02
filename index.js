import Game from './src/game.js';
import View from './src/view.js';
import Controller from './src/controller.js';

const container = document.querySelector('.container');

const game = new Game();
const view = new View(container, 848, 548, 10, 20);
const controller = new Controller(game, view);
const canvas = document.querySelector('canvas');
canvas.classList.add('canvas');

window.game = game;
window.view = view;
window.controller = controller;

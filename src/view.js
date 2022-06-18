export default class View {
  static colors = {
    1: 'cyan',
    2: 'blue',
    3: 'orange',
    4: 'yellow',
    5: 'green',
    6: 'purple',
    7: 'red',
  };

  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.playfieldX = 0;
    this.playfieldY = 0;
    this.playfieldWidth = (this.width * 329) / 374;
    this.playfieldHeight = (this.height * 80.4) / 107;

    this.blockWidth = this.playfieldWidth / columns;
    this.blockHeight = this.playfieldHeight / rows;

    this.panelUpX = 0;
    this.panelUpY = 0;
    this.panelRightX = this.playfieldWidth + 10;
    this.panelRightY = 0;
    this.panelUpWidth = this.width;
    this.panelUpHeight = (this.height * 30) / 107;
    this.panelRightWidth = (this.width * 45) / 374;
    this.panelRightHeight = this.height;
    this.blockNextWidth = this.panelRightWidth / 5.6;
    this.blockNextHeight = this.panelRightHeight / 26;
    this.element.appendChild(this.canvas);
  }

  renderMainScreen(state) {
    this.clearScreen();
    this.renderPlayField(state);
    this.renderPanel(state);
  }

  renderStartScreen() {
    this.context.fillStyle = 'white';
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(
      'Press ENTER to Start',
      this.playfieldWidth / 2,
      this.playfieldHeight / 2
    );
  }

  renderPauseScreen() {
    this.context.fillStyle = 'rgba(0,0,0,0.75)';
    this.context.fillRect(
      2,
      this.panelUpHeight - 29,
      this.playfieldWidth,
      this.playfieldHeight
    );

    this.context.fill();
    this.context.fillStyle = 'white';
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(
      'Press ENTER to Resume',
      this.playfieldWidth / 2,
      this.playfieldHeight / 2
    );
  }

  renderEndScreen({ score }) {
    const button = document.querySelector('.button');
    this.clearScreen();
    this.context.fillStyle = 'rgba(0,0,0,0.75)';
    this.context.fillRect(
      2,
      this.panelUpHeight - 29,
      this.playfieldWidth,
      this.playfieldHeight
    );

    this.context.fill();
    this.context.fillStyle = 'white';
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(
      'Game Over',
      this.playfieldWidth / 2,
      this.playfieldHeight / 2
    );
    this.context.fillText(
      `Score: ${score}`,
      this.playfieldWidth / 2,
      this.playfieldHeight / 2 + 48
    );
    this.context.fillText(
      'Press ENTER to Restart',
      this.playfieldWidth / 2,
      this.playfieldHeight / 2 + 98
    );
    button.classList.add('active');
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayField({ playfield }) {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this.renderBlock(
            x * this.blockWidth,
            this.panelUpHeight - 30 + y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            View.colors[block]
          );
        }
      }
    }
  }

  renderPanel({ level, score, lines, nextPiece }) {
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'white';
    this.context.font = '14px "Press Start 2P"';

    this.context.fillText(
      `Score: ${score}`,
      this.panelUpX + 255,
      this.panelUpY + 20
    );
    this.context.fillText(
      `Lines: ${lines}`,
      this.panelUpX + 255,
      this.panelUpY + 44
    );
    this.context.fillText(
      `Level: ${level}`,
      this.panelUpX + 255,
      this.panelUpY + 68
    );
    this.context.fillText(`Next`, this.panelRightX, this.panelRightY + 160);

    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];

        if (block) {
          this.renderBlock(
            this.panelRightX + x * this.blockNextWidth - 3.8,
            this.panelRightY + 170 + y * this.blockNextHeight,
            this.blockNextWidth,
            this.blockNextHeight,

            View.colors[block]
          );
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}

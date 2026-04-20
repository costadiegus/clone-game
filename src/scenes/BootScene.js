export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.cameras.main;

    // --- Criação Visual da Barra de Carregamento ---
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Carregando...', {
      font: '20px monospace',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // --- Listeners do Loader ---
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // --- Carregamento Centralizado de Assets ---
    // Imagens e Sprites
    this.load.image('fireboy-idle', './src/assets/fireboy.png');
    this.load.image('watergirl-idle', './src/assets/watergirl.png');
    this.load.image('fireboy-jump', './src/assets/fireboy-jump.png');
    this.load.image('watergirl-jump', './src/assets/watergirl-jump.png');
    this.load.spritesheet('fireboy-walk', './src/assets/fireboy-walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('watergirl-walk', './src/assets/watergirl-walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('door-red', './src/assets/door-red.png');
    this.load.image('door-blue', './src/assets/door-blue.png');

    // Áudios (Carregar tudo aqui garante que o som estará pronto no Menu)
    this.load.audio('backgroundMusic', './src/assets/background-music.mp3');
    this.load.audio('gameOverMusic', './src/assets/game-over-music.mp3');
    this.load.audio('levelSceneMusic', './src/assets/level-scene-music.mp3');
    this.load.audio('click', './src/assets/click.mp3');
    this.load.audio('death', './src/assets/death.mp3');
    this.load.audio('jump', './src/assets/jump.mp3');
    this.load.audio('jump-fire', './src/assets/jump-fire.mp3');
    this.load.audio('jump-water', './src/assets/jump-water.mp3');
  }

  create() {
    this.game.audioManager.setMusicVolume(1);
    this.scene.start('MenuScene');
  }
}
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    const { width, height } = this.cameras.main;

    // fundo simples
    this.cameras.main.setBackgroundColor('#000');

    // barra de progresso
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        width / 2 - 150,
        height / 2 - 15,
        300 * value,
        30
      );
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });

    const BASE_URL = import.meta.env.BASE_URL;
    // =========================
    // 🖼️ Splash (carregado aqui)
    // =========================
    this.load.image('splash', BASE_URL + 'src/assets/splash-screen.png');

    // =========================
    // 🎵 Áudio
    // =========================
    this.load.audio('intro', BASE_URL + 'src/assets/intro.mp3');
    this.load.audio('backgroundMusic', BASE_URL + 'src/assets/background-music.mp3');
    this.load.audio('gameOverMusic', BASE_URL + 'src/assets/game-over-music.mp3');
    this.load.audio('levelSceneMusic', BASE_URL + 'src/assets/level-scene-music.mp3');
    this.load.audio('click', BASE_URL + 'src/assets/click.mp3');
    this.load.audio('death', BASE_URL + 'src/assets/death.mp3');
    this.load.audio('jump', BASE_URL + 'src/assets/jump.mp3');
    this.load.audio('jump-fire', BASE_URL + 'src/assets/jump-fire.mp3');
    this.load.audio('jump-water', BASE_URL + 'src/assets/jump-water.mp3');

    // =========================
    // 🎮 Assets do jogo
    // =========================
    this.load.image('fireboy-idle', BASE_URL + 'src/assets/fireboy.png');
    this.load.image('watergirl-idle', BASE_URL + 'src/assets/watergirl.png');
    this.load.image('fireboy-jump', BASE_URL + 'src/assets/fireboy-jump.png');
    this.load.image('watergirl-jump', BASE_URL + 'src/assets/watergirl-jump.png');
    this.load.spritesheet('fireboy-walk', BASE_URL + 'src/assets/fireboy-walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('watergirl-walk', BASE_URL + 'src/assets/watergirl-walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('door-red', BASE_URL + 'src/assets/door-red.png');
    this.load.image('door-blue', BASE_URL + 'src/assets/door-blue.png');
    this.load.image('mute', BASE_URL + 'src/assets/mute.png');
    this.load.image('unmute', BASE_URL + 'src/assets/unmute.png');

  }

  create() {
    // vai direto pra splash
    this.scene.launch('UIScene');
    this.scene.start('SplashScene');
  }
}